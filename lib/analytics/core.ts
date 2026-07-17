import Clarity from "@microsoft/clarity"
import { analyticsConfig } from "./config"
import { getSessionDurationMs, getSessionId, getVisitorStatus } from "./storage"
import type { AnalyticsEventName, AnalyticsEventParams, AnalyticsEventOptions } from "./types"
import { getDeviceContext, sanitizeEventParams } from "./utils"

let gaInitialized = false
let clarityInitialized = false
const dedupeCache = new Map<string, number>()

export function initializeAnalytics() {
  if (typeof window === "undefined") return

  initializeGoogleAnalytics()
  initializeMicrosoftClarity()
}

export function initializeGoogleAnalytics() {
  if (typeof window === "undefined" || !analyticsConfig.gaMeasurementId) return

  const globalState = getAnalyticsGlobalState()

  if (gaInitialized || globalState.gaInitialized) {
    gaInitialized = true
    return
  }

  window.dataLayer = window.dataLayer ?? []
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

  gaInitialized = true
  globalState.gaInitialized = true
  globalState.gaMeasurementId = analyticsConfig.gaMeasurementId
}

export function initializeMicrosoftClarity() {
  if (typeof window === "undefined" || !analyticsConfig.clarityProjectId) return

  const globalState = getAnalyticsGlobalState()

  if (clarityInitialized || globalState.clarityInitialized) {
    clarityInitialized = true
    return
  }

  try {
    Clarity.init(analyticsConfig.clarityProjectId)
    Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" })

    const sessionId = getSessionId()
    Clarity.identify(
      sessionId,
      sessionId,
      `${window.location.pathname}${window.location.search}`,
      document.title
    )
  } catch {
    return
  }

  clarityInitialized = true
  globalState.clarityInitialized = true
  globalState.clarityProjectId = analyticsConfig.clarityProjectId
}

export function updateAnalyticsConsent(status: "granted" | "denied") {
  if (typeof window === "undefined") return

  const analyticsStorage = status === "granted" ? "granted" : "denied"

  try {
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      analytics_storage: analyticsStorage,
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: status === "granted" ? "granted" : "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    })
  } catch {
    // Consent updates should not surface third-party failures to visitors.
  }

  if (isClarityInitialized()) {
    try {
      Clarity.consentV2({
        ad_Storage: "denied",
        analytics_Storage: status === "granted" ? "granted" : "denied",
      })
    } catch {
      // Ignore blocked or unavailable Clarity APIs.
    }
  }
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
  options: AnalyticsEventOptions = {}
) {
  if (typeof window === "undefined") return
  if (!isGoogleAnalyticsInitialized() && !isClarityInitialized()) return
  if (options.dedupeKey && isDuplicateEvent(options.dedupeKey)) return

  const eventParams = sanitizeEventParams({
    ...getBaseEventParams(),
    ...params,
    send_to: analyticsConfig.gaMeasurementId || undefined,
    debug_mode: analyticsConfig.debugMode || undefined,
    non_interaction: options.nonInteraction || undefined,
    transport_type: options.transport === "beacon" ? "beacon" : undefined,
  })

  if (window.gtag && isGoogleAnalyticsInitialized() && analyticsConfig.gaMeasurementId) {
    window.gtag("event", eventName, eventParams)
  }

  if (isClarityInitialized() && analyticsConfig.clarityProjectId) {
    try {
      Clarity.event(eventName)
      setClarityTags(eventName, eventParams)
    } catch {
      // Third-party blockers should not break interaction handlers.
    }
  }
}

export function trackAnalyticsPageView(params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return
  if (!isGoogleAnalyticsInitialized() && !isClarityInitialized()) return

  const eventParams = sanitizeEventParams({
    ...getBaseEventParams(),
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    send_to: analyticsConfig.gaMeasurementId || undefined,
    debug_mode: analyticsConfig.debugMode || undefined,
    ...params,
  })
  const pageLocation =
    typeof eventParams.page_location === "string" ? eventParams.page_location : window.location.href

  if (isDuplicateEvent(`page_view:${pageLocation}`)) return

  if (window.gtag && isGoogleAnalyticsInitialized() && analyticsConfig.gaMeasurementId) {
    window.gtag("config", analyticsConfig.gaMeasurementId, {
      send_page_view: false,
      page_title: eventParams.page_title,
      page_location: pageLocation,
      page_path: eventParams.page_path,
    })
    window.gtag("event", "page_view", eventParams)
  }

  if (isClarityInitialized() && analyticsConfig.clarityProjectId) {
    try {
      Clarity.event("page_view")
      setClarityTags("page_view", eventParams)

      const sessionId = getSessionId()
      Clarity.identify(
        sessionId,
        sessionId,
        `${window.location.pathname}${window.location.search}`,
        document.title
      )
    } catch {
      // Keep page rendering resilient if the Clarity client is blocked.
    }
  }
}

function getBaseEventParams(): AnalyticsEventParams {
  const visitorStatus = getVisitorStatus()
  const sessionId = getSessionId()

  return {
    ...getDeviceContext(),
    ...visitorStatus,
    session_id: sessionId,
    session_duration_ms: getSessionDurationMs(),
  }
}

function isDuplicateEvent(dedupeKey: string) {
  const now = Date.now()
  const previousTime = dedupeCache.get(dedupeKey)

  Array.from(dedupeCache.entries()).forEach(([key, timestamp]) => {
    if (now - timestamp > 10_000) dedupeCache.delete(key)
  })

  if (previousTime && now - previousTime < 750) return true

  dedupeCache.set(dedupeKey, now)
  return false
}

function getAnalyticsGlobalState() {
  window.__gokulamAnalyticsState = window.__gokulamAnalyticsState ?? {}
  return window.__gokulamAnalyticsState
}

function isGoogleAnalyticsInitialized() {
  if (gaInitialized) return true
  if (typeof window === "undefined") return false

  return window.__gokulamAnalyticsState?.gaInitialized === true
}

function isClarityInitialized() {
  if (clarityInitialized) return true
  if (typeof window === "undefined") return false

  return window.__gokulamAnalyticsState?.clarityInitialized === true
}

function setClarityTags(eventName: AnalyticsEventName | "page_view", params: AnalyticsEventParams) {
  const allowedTagKeys = [
    "page_id",
    "page_path",
    "property_id",
    "property_slug",
    "section_id",
    "device_category",
    "visitor_type",
  ]

  Clarity.setTag("last_event", eventName)

  allowedTagKeys.forEach((key) => {
    const value = params[key]

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      Clarity.setTag(key, String(value))
    }
  })
}

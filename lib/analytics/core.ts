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
  if (typeof window === "undefined" || gaInitialized || !analyticsConfig.gaMeasurementId) return

  window.dataLayer = window.dataLayer ?? []
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  })

  window.gtag("js", new Date())
  window.gtag("config", analyticsConfig.gaMeasurementId, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: "SameSite=Lax;Secure",
  })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaMeasurementId}`
  document.head.appendChild(script)

  gaInitialized = true
}

export function initializeMicrosoftClarity() {
  if (typeof window === "undefined" || clarityInitialized || !analyticsConfig.clarityProjectId) return

  Clarity.init(analyticsConfig.clarityProjectId)
  Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" })

  const sessionId = getSessionId()
  Clarity.identify(sessionId, sessionId, window.location.pathname)

  clarityInitialized = true
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
  options: AnalyticsEventOptions = {}
) {
  if (typeof window === "undefined") return
  if (!gaInitialized && !clarityInitialized) return
  if (options.dedupeKey && isDuplicateEvent(options.dedupeKey)) return

  const eventParams = sanitizeEventParams({
    ...getBaseEventParams(),
    ...params,
    debug_mode: analyticsConfig.debugMode || undefined,
    non_interaction: options.nonInteraction || undefined,
    transport_type: options.transport === "beacon" ? "beacon" : undefined,
  })

  if (window.gtag && analyticsConfig.gaMeasurementId) {
    window.gtag("event", eventName, eventParams)
  }

  if (clarityInitialized && analyticsConfig.clarityProjectId) {
    Clarity.event(eventName)
    setClarityTags(eventName, eventParams)
  }
}

export function trackAnalyticsPageView(params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return
  if (!gaInitialized && !clarityInitialized) return

  const eventParams = sanitizeEventParams({
    ...getBaseEventParams(),
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    ...params,
  })

  if (window.gtag && analyticsConfig.gaMeasurementId) {
    window.gtag("event", "page_view", eventParams)
  }

  if (clarityInitialized && analyticsConfig.clarityProjectId) {
    Clarity.event("page_view")
    setClarityTags("page_view", eventParams)

    // Call identify for optimal page-level user tracking
    const sessionId = getSessionId()
    Clarity.identify(sessionId, sessionId, window.location.pathname)
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

function setClarityTags(eventName: AnalyticsEventName | "page_view", params: AnalyticsEventParams) {
  const allowedTagKeys = [
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

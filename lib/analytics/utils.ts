import { analyticsConfig, privacySafeInputSelector } from "./config"
import type { AnalyticsEventParams, DeviceContext, ElementDescriptor } from "./types"

export function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

export function createPageId(path: string) {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(16).slice(2)

  return `${path}:${Date.now()}:${randomPart}`
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function round(value: number, decimals = 0) {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export function getCurrentPagePath() {
  if (!isBrowser()) return "/"
  return `${window.location.pathname}${window.location.search}`
}

export function getCurrentPageUrl() {
  if (!isBrowser()) return ""
  return window.location.href
}

export function sanitizePath(value: string) {
  if (!value) return ""

  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, window.location.origin)
    return `${url.pathname}${url.hash}`
  } catch {
    return value.split("?")[0].slice(0, analyticsConfig.maxEventParamLength)
  }
}

export function sanitizeString(value: string, maxLength = analyticsConfig.maxEventParamLength) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength)
}

export function sanitizeEventParams(params: AnalyticsEventParams = {}) {
  return Object.entries(params).reduce<AnalyticsEventParams>((safeParams, [key, value]) => {
    if (value === undefined || value === null) return safeParams

    const safeKey = key
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .slice(0, 40)

    if (!safeKey) return safeParams

    if (typeof value === "string") {
      safeParams[safeKey] = sanitizeString(value)
      return safeParams
    }

    if (typeof value === "number") {
      safeParams[safeKey] = Number.isFinite(value) ? value : 0
      return safeParams
    }

    safeParams[safeKey] = value
    return safeParams
  }, {})
}

export function getDeviceContext(): DeviceContext {
  if (!isBrowser()) {
    return {
      device_category: "desktop",
      browser: "unknown",
      operating_system: "unknown",
      screen_resolution: "",
      viewport_size: "",
      language: "",
      timezone: "",
      referrer: "",
      referrer_host: "",
      traffic_source: "direct",
    }
  }

  const userAgent = window.navigator.userAgent
  const width = window.innerWidth
  const deviceCategory = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop"
  const referrer = document.referrer ? sanitizePath(document.referrer) : ""

  return {
    device_category: deviceCategory,
    browser: detectBrowser(userAgent),
    operating_system: detectOperatingSystem(userAgent),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    language: window.navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer,
    referrer_host: getReferrerHost(document.referrer),
    traffic_source: getTrafficSource(document.referrer),
  }
}

function detectBrowser(userAgent: string) {
  if (/Edg\//.test(userAgent)) return "Edge"
  if (/Chrome\//.test(userAgent) && !/Chromium/.test(userAgent)) return "Chrome"
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) return "Safari"
  if (/Firefox\//.test(userAgent)) return "Firefox"
  if (/OPR\//.test(userAgent)) return "Opera"
  return "Other"
}

function detectOperatingSystem(userAgent: string) {
  if (/Windows NT/.test(userAgent)) return "Windows"
  if (/Mac OS X/.test(userAgent) && !/Mobile/.test(userAgent)) return "macOS"
  if (/Android/.test(userAgent)) return "Android"
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS"
  if (/Linux/.test(userAgent)) return "Linux"
  return "Other"
}

function getReferrerHost(referrer: string) {
  if (!referrer) return ""

  try {
    return new URL(referrer).hostname
  } catch {
    return ""
  }
}

function getTrafficSource(referrer: string) {
  if (!referrer) return "direct"

  const host = getReferrerHost(referrer)

  if (!host) return "direct"
  if (/google|bing|yahoo|duckduckgo|baidu|yandex/i.test(host)) return "organic_search"
  if (/instagram|facebook|twitter|x\.com|linkedin|pinterest|youtube/i.test(host)) return "social"
  if (host === window.location.hostname) return "internal"

  return "referral"
}

export function isSensitiveElement(element: Element | null) {
  if (!element) return false
  return Boolean(element.closest(privacySafeInputSelector))
}

export function isInteractiveElement(element: Element | null) {
  if (!element) return false

  return Boolean(
    element.closest(
      [
        "a",
        "button",
        "input",
        "select",
        "textarea",
        "summary",
        "[role='button']",
        "[role='link']",
        "[data-analytics-clickable]",
      ].join(",")
    )
  )
}

export function getElementDescriptor(target: EventTarget | null): ElementDescriptor {
  if (!(target instanceof Element) || isSensitiveElement(target)) {
    return {
      element_tag: "",
      element_label: "",
      element_role: "",
      element_id: "",
      element_href: "",
      element_surface: "",
      element_section: "",
    }
  }

  const element = target.closest<HTMLElement>(
    "a,button,[role='button'],[role='link'],[data-analytics-clickable]"
  ) ?? target.closest<HTMLElement>("[data-analytics-label]") ?? target.closest<HTMLElement>("section,div,span")

  if (!element) {
    return {
      element_tag: target.tagName.toLowerCase(),
      element_label: "",
      element_role: "",
      element_id: "",
      element_href: "",
      element_surface: "",
      element_section: "",
    }
  }

  const anchor = element.closest<HTMLAnchorElement>("a")
  const surface = element.closest<HTMLElement>("[data-analytics-surface]")?.dataset.analyticsSurface ?? ""
  const section = element.closest<HTMLElement>("[data-analytics-section]")?.dataset.analyticsSection ?? ""
  const label =
    element.dataset.analyticsLabel ??
    element.getAttribute("aria-label") ??
    element.getAttribute("title") ??
    element.textContent ??
    ""

  return {
    element_tag: element.tagName.toLowerCase(),
    element_label: sanitizeString(label, 80),
    element_role: element.getAttribute("role") ?? "",
    element_id: sanitizeString(element.id, 64),
    element_href: anchor ? sanitizeHref(anchor.href) : "",
    element_surface: sanitizeString(surface, 40),
    element_section: sanitizeString(section, 40),
  }
}

export function sanitizeHref(href: string) {
  if (!href) return ""

  try {
    const url = new URL(href)

    if (url.protocol === "mailto:") return "mailto"
    if (url.protocol === "tel:") return "tel"
    if (url.origin === window.location.origin) return sanitizePath(url.href)

    return url.hostname
  } catch {
    return ""
  }
}

export function getDataAnalyticsParams(element: HTMLElement | null) {
  if (!element) return {}

  const params: AnalyticsEventParams = {}

  Object.entries(element.dataset).forEach(([key, value]) => {
    if (!key.startsWith("analytics") || key === "analyticsEvent") return
    if (!value) return

    const paramKey = key
      .replace(/^analytics/, "")
      .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

    params[paramKey] = value
  })

  return params
}

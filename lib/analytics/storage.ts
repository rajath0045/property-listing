import { analyticsConfig } from "./config"
import type { AnalyticsConsentStatus } from "./types"

const oneYearInSeconds = 60 * 60 * 24 * 365
const visitorSeenKey = "gokulam_analytics_visitor_seen"
const visitCountKey = "gokulam_analytics_visit_count"
const sessionIdKey = "gokulam_analytics_session_id"
const sessionStartedAtKey = "gokulam_analytics_session_started_at"
const journeyKey = "gokulam_analytics_journey"

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

function readCookie(name: string) {
  if (!canUseBrowserStorage()) return null

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null
}

function writeCookie(name: string, value: string) {
  if (!canUseBrowserStorage()) return

  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${oneYearInSeconds}`,
    "Path=/",
    "SameSite=Lax",
    window.location.protocol === "https:" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ")
}

export function getStoredConsent(): AnalyticsConsentStatus {
  const stored = readCookie(analyticsConfig.consentCookieName)

  if (stored === "granted" || stored === "denied") {
    return stored
  }

  return "unknown"
}

export function setStoredConsent(status: Exclude<AnalyticsConsentStatus, "unknown">) {
  writeCookie(analyticsConfig.consentCookieName, status)
}

export function getSessionId() {
  if (!canUseBrowserStorage()) return ""

  const existing = window.sessionStorage.getItem(sessionIdKey)

  if (existing) return existing

  const sessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  window.sessionStorage.setItem(sessionIdKey, sessionId)
  window.sessionStorage.setItem(sessionStartedAtKey, String(Date.now()))

  return sessionId
}

export function getSessionDurationMs() {
  if (!canUseBrowserStorage()) return 0

  const startedAt = Number(window.sessionStorage.getItem(sessionStartedAtKey) ?? Date.now())
  return Math.max(0, Date.now() - startedAt)
}

export function getVisitorStatus() {
  if (!canUseBrowserStorage()) {
    return {
      visitor_type: "new",
      visit_count: 1,
    }
  }

  const hasSeenVisitor = window.localStorage.getItem(visitorSeenKey) === "true"
  const previousVisitCount = Number(window.localStorage.getItem(visitCountKey) ?? "0")
  const visitCount = previousVisitCount + (window.sessionStorage.getItem(sessionIdKey) ? 0 : 1)

  window.localStorage.setItem(visitorSeenKey, "true")
  window.localStorage.setItem(visitCountKey, String(Math.max(visitCount, previousVisitCount || 1)))

  return {
    visitor_type: hasSeenVisitor ? "returning" : "new",
    visit_count: Math.max(visitCount, previousVisitCount || 1),
  }
}

export function readJourney() {
  if (!canUseBrowserStorage()) return []

  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(journeyKey) ?? "[]")
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []
  } catch {
    return []
  }
}

export function appendJourney(path: string) {
  if (!canUseBrowserStorage()) return []

  const journey = readJourney()
  const lastPath = journey.at(-1)
  const nextJourney = lastPath === path ? journey : [...journey, path]
  const trimmedJourney = nextJourney.slice(-analyticsConfig.maxJourneyEntries)

  window.sessionStorage.setItem(journeyKey, JSON.stringify(trimmedJourney))

  return trimmedJourney
}

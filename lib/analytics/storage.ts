import { analyticsConfig } from "./config"
import type { AnalyticsConsentStatus } from "./types"

const oneYearInSeconds = 60 * 60 * 24 * 365
const visitorSeenKey = "gokulam_analytics_visitor_seen"
const visitCountKey = "gokulam_analytics_visit_count"
const sessionIdKey = "gokulam_analytics_session_id"
const sessionStartedAtKey = "gokulam_analytics_session_started_at"
const journeyKey = "gokulam_analytics_journey"

let memorySessionId = ""
let memorySessionStartedAt = Date.now()
let memoryVisitorSeen = false
let memoryVisitCount = 0
let memoryJourney: string[] = []

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

function readCookie(name: string) {
  if (!canUseBrowserStorage()) return null

  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))

    return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null
  } catch {
    return null
  }
}

function writeCookie(name: string, value: string) {
  if (!canUseBrowserStorage()) return

  try {
    document.cookie = [
      `${name}=${encodeURIComponent(value)}`,
      `Max-Age=${oneYearInSeconds}`,
      "Path=/",
      "SameSite=Lax",
      window.location.protocol === "https:" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ")
  } catch {
    // Storage can be unavailable in hardened browser modes; analytics should never break the app.
  }
}

function getStorage(type: "local" | "session") {
  if (!canUseBrowserStorage()) return null

  try {
    return type === "local" ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

function readStorage(type: "local" | "session", key: string) {
  try {
    return getStorage(type)?.getItem(key) ?? null
  } catch {
    return null
  }
}

function writeStorage(type: "local" | "session", key: string, value: string) {
  try {
    getStorage(type)?.setItem(key, value)
  } catch {
    // Ignore unavailable storage/quota failures; in-memory fallbacks keep tracking stable.
  }
}

export function getStoredConsent(): AnalyticsConsentStatus {
  const stored = readCookie(analyticsConfig.consentCookieName)

  if (stored === "granted" || stored === "denied") {
    return stored
  }

  return analyticsConfig.requireConsent ? "unknown" : "granted"
}

export function setStoredConsent(status: Exclude<AnalyticsConsentStatus, "unknown">) {
  writeCookie(analyticsConfig.consentCookieName, status)
}

export function getSessionId() {
  if (!canUseBrowserStorage()) return ""

  const existing = readStorage("session", sessionIdKey)

  if (existing) {
    memorySessionId = existing
    return existing
  }

  if (memorySessionId) return memorySessionId

  const sessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  memorySessionId = sessionId
  memorySessionStartedAt = Date.now()
  writeStorage("session", sessionIdKey, sessionId)
  writeStorage("session", sessionStartedAtKey, String(memorySessionStartedAt))

  return sessionId
}

export function getSessionDurationMs() {
  if (!canUseBrowserStorage()) return 0

  const storedStartedAt = Number(readStorage("session", sessionStartedAtKey) ?? memorySessionStartedAt)
  const startedAt = Number.isFinite(storedStartedAt) ? storedStartedAt : memorySessionStartedAt

  return Math.max(0, Date.now() - startedAt)
}

export function getVisitorStatus() {
  if (!canUseBrowserStorage()) {
    return {
      visitor_type: "new",
      visit_count: 1,
    }
  }

  const storedVisitorSeen = readStorage("local", visitorSeenKey)
  const hasSeenVisitor = storedVisitorSeen === "true" || (storedVisitorSeen === null && memoryVisitorSeen)
  const storedVisitCount = Number(readStorage("local", visitCountKey) ?? memoryVisitCount)
  const previousVisitCount = Number.isFinite(storedVisitCount) ? storedVisitCount : memoryVisitCount
  const hasSession = Boolean(readStorage("session", sessionIdKey) ?? memorySessionId)
  const visitCount = previousVisitCount + (hasSession ? 0 : 1)
  const nextVisitCount = Math.max(visitCount, previousVisitCount || 1)

  memoryVisitorSeen = true
  memoryVisitCount = nextVisitCount
  writeStorage("local", visitorSeenKey, "true")
  writeStorage("local", visitCountKey, String(nextVisitCount))

  return {
    visitor_type: hasSeenVisitor ? "returning" : "new",
    visit_count: nextVisitCount,
  }
}

export function readJourney() {
  if (!canUseBrowserStorage()) return []

  try {
    const storedJourney = readStorage("session", journeyKey)
    if (!storedJourney) return memoryJourney

    const parsed = JSON.parse(storedJourney)
    const journey = Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []
    memoryJourney = journey

    return journey
  } catch {
    return memoryJourney
  }
}

export function appendJourney(path: string) {
  if (!canUseBrowserStorage()) return []

  const journey = readJourney()
  const lastPath = journey.at(-1)
  const nextJourney = lastPath === path ? journey : [...journey, path]
  const trimmedJourney = nextJourney.slice(-analyticsConfig.maxJourneyEntries)

  memoryJourney = trimmedJourney
  writeStorage("session", journeyKey, JSON.stringify(trimmedJourney))

  return trimmedJourney
}

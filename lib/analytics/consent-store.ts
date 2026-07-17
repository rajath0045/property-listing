import { getStoredConsent, setStoredConsent } from "./storage"
import type { AnalyticsConsentStatus } from "./types"

type ConsentListener = () => void

const listeners = new Set<ConsentListener>()

export function getConsentSnapshot(): AnalyticsConsentStatus {
  return getStoredConsent()
}

export function getConsentServerSnapshot(): AnalyticsConsentStatus {
  return "unknown"
}

export function subscribeToConsent(listener: ConsentListener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function updateConsent(status: Exclude<AnalyticsConsentStatus, "unknown">) {
  setStoredConsent(status)
  listeners.forEach((listener) => listener())
}

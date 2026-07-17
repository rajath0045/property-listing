"use client"

import { Suspense, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { AnalyticsContext } from "./analytics-context"
import { AnalyticsConsentBanner } from "@/components/analytics/analytics-consent-banner"
import { AnalyticsRuntime } from "@/components/analytics/analytics-runtime"
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeToConsent,
  updateConsent,
} from "@/lib/analytics/consent-store"
import {
  initializeAnalytics,
  trackAnalyticsEvent,
  trackAnalyticsPageView,
  updateAnalyticsConsent,
} from "@/lib/analytics/core"
import type {
  AnalyticsEventName,
  AnalyticsEventOptions,
  AnalyticsEventParams,
} from "@/lib/analytics/types"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const consentStatus = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  )
  const [isInitialized, setIsInitialized] = useState(false)
  const hasConsent = consentStatus === "granted"

  useEffect(() => {
    if (!hasConsent || isInitialized) return

    initializeAnalytics()
    const timeoutId = window.setTimeout(() => {
      setIsInitialized(true)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [hasConsent, isInitialized])

  const acceptAnalytics = useCallback(() => {
    updateConsent("granted")
  }, [])

  const declineAnalytics = useCallback(() => {
    updateConsent("denied")
    updateAnalyticsConsent("denied")
    setIsInitialized(false)
  }, [])

  const resetAnalyticsConsent = useCallback(() => {
    updateConsent("denied")
    updateAnalyticsConsent("denied")
    setIsInitialized(false)
  }, [])

  const trackEvent = useCallback(
    (eventName: AnalyticsEventName, params?: AnalyticsEventParams, options?: AnalyticsEventOptions) => {
      if (!hasConsent || !isInitialized) return
      trackAnalyticsEvent(eventName, params, options)
    },
    [hasConsent, isInitialized]
  )

  const trackPageView = useCallback(
    (params?: AnalyticsEventParams) => {
      if (!hasConsent || !isInitialized) return
      trackAnalyticsPageView(params)
    },
    [hasConsent, isInitialized]
  )

  const value = useMemo(
    () => ({
      consentStatus,
      hasConsent,
      isInitialized,
      acceptAnalytics,
      declineAnalytics,
      resetAnalyticsConsent,
      trackEvent,
      trackPageView,
    }),
    [
      consentStatus,
      hasConsent,
      isInitialized,
      acceptAnalytics,
      declineAnalytics,
      resetAnalyticsConsent,
      trackEvent,
      trackPageView,
    ]
  )

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <AnalyticsRuntime enabled={hasConsent && isInitialized} />
      </Suspense>
      <AnalyticsConsentBanner />
    </AnalyticsContext.Provider>
  )
}

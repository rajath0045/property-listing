"use client"

import { useCallback } from "react"
import { useAnalytics } from "./use-analytics"
import type { AnalyticsEventName, AnalyticsEventOptions, AnalyticsEventParams } from "@/lib/analytics/types"

export function useTrackEvent() {
  const { trackEvent } = useAnalytics()

  return useCallback(
    (eventName: AnalyticsEventName, params?: AnalyticsEventParams, options?: AnalyticsEventOptions) => {
      trackEvent(eventName, params, options)
    },
    [trackEvent]
  )
}

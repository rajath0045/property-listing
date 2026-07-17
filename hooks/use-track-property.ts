"use client"

import { useCallback, useEffect, useMemo } from "react"
import { analyticsEvents } from "@/lib/analytics/config"
import { clearCurrentProperty, setCurrentProperty } from "@/lib/analytics/state"
import type { AnalyticsEventParams, PropertyAnalyticsContext } from "@/lib/analytics/types"
import { getCurrentPagePath } from "@/lib/analytics/utils"
import { useAnalytics } from "./use-analytics"

interface UseTrackPropertyOptions {
  trackView?: boolean
}

export function useTrackProperty(
  property?: PropertyAnalyticsContext,
  { trackView = false }: UseTrackPropertyOptions = {}
) {
  const { hasConsent, isInitialized, trackEvent } = useAnalytics()
  const propertyParams = useMemo(
    () => (property ? { ...property } : undefined),
    [property]
  )

  useEffect(() => {
    if (!hasConsent || !isInitialized || !propertyParams) return

    setCurrentProperty(propertyParams)

    if (trackView) {
      const pagePath = getCurrentPagePath()

      trackEvent(
        analyticsEvents.propertyViewed,
        {
          ...propertyParams,
          page_path: pagePath,
        },
        {
          dedupeKey: `property-view:${propertyParams.property_id}:${pagePath}`,
        }
      )
    }

    return () => {
      clearCurrentProperty(propertyParams.property_id)
    }
  }, [hasConsent, isInitialized, propertyParams, trackEvent, trackView])

  const trackPropertyEvent = useCallback(
    (eventName: Parameters<typeof trackEvent>[0], params: AnalyticsEventParams = {}) => {
      trackEvent(eventName, {
        ...propertyParams,
        ...params,
      })
    },
    [propertyParams, trackEvent]
  )

  return useMemo(
    () => ({
      trackPropertyCardClick: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyCardClicked, params),
      trackPropertyCardHover: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyCardHover, params),
      trackGalleryOpened: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyGalleryOpened, params),
      trackImageChanged: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyImageChanged, params),
      trackImageViewed: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyImageViewed, params),
      trackMapLoaded: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyMapLoaded, params),
      trackMarkerClick: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyMarkerClicked, params),
      trackBookingButtonClick: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.bookingButtonClicked, params),
      trackContactButtonClick: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.contactButtonClicked, params),
      trackFavoriteClick: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.favoriteClicked, params),
      trackComparison: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.propertyComparison, params),
      trackShareClick: (params?: AnalyticsEventParams) =>
        trackPropertyEvent(analyticsEvents.shareButtonClicked, params),
    }),
    [trackPropertyEvent]
  )
}

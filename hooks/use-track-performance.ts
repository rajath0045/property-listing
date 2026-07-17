"use client"

import { useEffect, useRef } from "react"
import { useReportWebVitals } from "next/web-vitals"
import { analyticsEvents } from "@/lib/analytics/config"
import { round, sanitizePath } from "@/lib/analytics/utils"
import { useAnalytics } from "./use-analytics"

interface UseTrackPerformanceOptions {
  enabled?: boolean
}

interface ImageStats {
  count: number
  totalDuration: number
  slowCount: number
  transferSize: number
}

export function useTrackPerformance({ enabled = true }: UseTrackPerformanceOptions = {}) {
  const { trackEvent } = useAnalytics()
  const reportedNavigationRef = useRef(false)
  const imageStatsRef = useRef<ImageStats>({
    count: 0,
    totalDuration: 0,
    slowCount: 0,
    transferSize: 0,
  })

  useReportWebVitals((metric) => {
    if (!enabled) return

    trackEvent(
      analyticsEvents.coreWebVital,
      {
        metric_name: metric.name,
        metric_value: round(metric.value, metric.name === "CLS" ? 4 : 0),
        metric_id: metric.id,
        metric_rating: getWebVitalRating(metric.name, metric.value),
        metric_start_time_ms: round(metric.startTime, 0),
        metric_label: "label" in metric ? metric.label : "web-vital",
      },
      {
        dedupeKey: `web-vital:${metric.id}`,
        nonInteraction: true,
      }
    )
  })

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const reportNavigationTiming = () => {
      if (reportedNavigationRef.current) return

      const navigationEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined

      if (!navigationEntry) return

      reportedNavigationRef.current = true
      trackEvent(
        analyticsEvents.navigationTiming,
        {
          page_path: `${window.location.pathname}${window.location.search}`,
          navigation_type: navigationEntry.type,
          dns_ms: round(navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart, 0),
          tcp_ms: round(navigationEntry.connectEnd - navigationEntry.connectStart, 0),
          request_ms: round(navigationEntry.responseStart - navigationEntry.requestStart, 0),
          response_ms: round(navigationEntry.responseEnd - navigationEntry.responseStart, 0),
          dom_interactive_ms: round(navigationEntry.domInteractive, 0),
          dom_complete_ms: round(navigationEntry.domComplete, 0),
          load_event_ms: round(navigationEntry.loadEventEnd, 0),
          transfer_size: navigationEntry.transferSize,
        },
        {
          dedupeKey: `navigation:${window.location.pathname}`,
          nonInteraction: true,
        }
      )
    }

    if (document.readyState === "complete") {
      window.setTimeout(reportNavigationTiming, 0)
    } else {
      window.addEventListener("load", reportNavigationTiming, { once: true })
    }

    return () => {
      window.removeEventListener("load", reportNavigationTiming)
    }
  }, [enabled, trackEvent])

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || typeof PerformanceObserver === "undefined") return
    if (!PerformanceObserver.supportedEntryTypes.includes("resource")) return

    const seenResourceEntries = new Set<string>()

    const handleResourceEntry = (entry: PerformanceResourceTiming) => {
      if (seenResourceEntries.has(`${entry.name}:${entry.startTime}`)) return
      seenResourceEntries.add(`${entry.name}:${entry.startTime}`)

      if (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest") {
        trackApiTiming(entry)
        return
      }

      if (entry.initiatorType === "img") {
        updateImageStats(entry)
      }
    }

    const trackApiTiming = (entry: PerformanceResourceTiming) => {
      const url = new URL(entry.name)
      const isSameOriginApi = url.origin === window.location.origin && url.pathname.startsWith("/api/")

      if (!isSameOriginApi) return

      trackEvent(
        analyticsEvents.apiResponseTime,
        {
          api_path: sanitizePath(entry.name),
          duration_ms: round(entry.duration, 0),
          response_ms: round(entry.responseEnd - entry.responseStart, 0),
          transfer_size: entry.transferSize,
          status_hint: entry.responseStatus || undefined,
        },
        {
          dedupeKey: `api:${entry.name}:${entry.startTime}`,
          nonInteraction: true,
        }
      )
    }

    const updateImageStats = (entry: PerformanceResourceTiming) => {
      const url = new URL(entry.name)

      if (url.origin !== window.location.origin) return

      imageStatsRef.current.count += 1
      imageStatsRef.current.totalDuration += entry.duration
      imageStatsRef.current.transferSize += entry.transferSize

      if (entry.duration > 1000) {
        imageStatsRef.current.slowCount += 1
      }
    }

    const flushImageStats = () => {
      const stats = imageStatsRef.current

      if (stats.count === 0) return

      trackEvent(
        analyticsEvents.imageLoadingSummary,
        {
          image_count: stats.count,
          avg_image_load_ms: round(stats.totalDuration / stats.count, 0),
          slow_image_count: stats.slowCount,
          total_image_transfer_size: stats.transferSize,
          page_path: `${window.location.pathname}${window.location.search}`,
        },
        {
          dedupeKey: `image-summary:${window.location.pathname}:${stats.count}`,
          nonInteraction: true,
          transport: "beacon",
        }
      )

      imageStatsRef.current = {
        count: 0,
        totalDuration: 0,
        slowCount: 0,
        transferSize: 0,
      }
    }

    performance.getEntriesByType("resource").forEach((entry) => {
      handleResourceEntry(entry as PerformanceResourceTiming)
    })

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        handleResourceEntry(entry as PerformanceResourceTiming)
      })
    })

    observer.observe({ type: "resource", buffered: true })
    window.addEventListener("pagehide", flushImageStats)

    return () => {
      observer.disconnect()
      window.removeEventListener("pagehide", flushImageStats)
      flushImageStats()
    }
  }, [enabled, trackEvent])
}

function getWebVitalRating(metricName: string, value: number) {
  if (metricName === "CLS") {
    if (value <= 0.1) return "good"
    if (value <= 0.25) return "needs_improvement"
    return "poor"
  }

  if (metricName === "LCP") {
    if (value <= 2500) return "good"
    if (value <= 4000) return "needs_improvement"
    return "poor"
  }

  if (metricName === "INP") {
    if (value <= 200) return "good"
    if (value <= 500) return "needs_improvement"
    return "poor"
  }

  if (metricName === "FCP" || metricName === "TTFB") {
    if (value <= 1800) return "good"
    if (value <= 3000) return "needs_improvement"
    return "poor"
  }

  return "unknown"
}

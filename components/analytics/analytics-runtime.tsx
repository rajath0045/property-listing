"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageExit } from "@/lib/analytics/exit"
import { resetSectionStore } from "@/lib/analytics/section-store"
import { resetPageContext } from "@/lib/analytics/state"
import { appendJourney, readJourney } from "@/lib/analytics/storage"
import { getCurrentPagePath } from "@/lib/analytics/utils"
import { useAnalytics } from "@/hooks/use-analytics"
import { useTrackExit } from "@/hooks/use-track-exit"
import { useTrackInteractions } from "@/hooks/use-track-interactions"
import { useTrackPerformance } from "@/hooks/use-track-performance"
import { useTrackScroll } from "@/hooks/use-track-scroll"

interface AnalyticsRuntimeProps {
  enabled: boolean
}

export function AnalyticsRuntime({ enabled }: AnalyticsRuntimeProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const routeKey = search ? `${pathname}?${search}` : pathname
  const previousPathRef = useRef<string | null>(null)
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const nextPath = getCurrentPagePath()
    const previousPath = previousPathRef.current

    if (previousPath === nextPath) return

    if (previousPath && previousPath !== nextPath) {
      trackPageExit("route_change")
      resetSectionStore()
    }

    const previousJourney = readJourney()
    const previousPagePath = previousJourney.at(-1) ?? ""
    const journey = appendJourney(nextPath)
    const pageContext = resetPageContext(nextPath)

    trackPageView({
      page_id: pageContext.page_id,
      page_path: nextPath,
      page_title: document.title,
      page_referrer: previousPath ? `${window.location.origin}${previousPath}` : document.referrer,
      previous_page_path: previousPagePath === nextPath ? previousJourney.at(-2) : previousPagePath,
      journey_depth: journey.length,
      entry_page_path: journey[0] ?? nextPath,
    })

    previousPathRef.current = nextPath
  }, [enabled, routeKey, trackPageView])

  useTrackScroll({ enabled })
  useTrackExit({ enabled })
  useTrackPerformance({ enabled })
  useTrackInteractions({ enabled })

  return null
}

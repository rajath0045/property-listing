"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { analyticsConfig, analyticsEvents } from "@/lib/analytics/config"
import { setMaxScrollPercent } from "@/lib/analytics/state"
import { clamp, round } from "@/lib/analytics/utils"
import { useAnalytics } from "./use-analytics"

interface UseTrackScrollOptions {
  enabled?: boolean
}

export function useTrackScroll({ enabled = true }: UseTrackScrollOptions = {}) {
  const pathname = usePathname()
  const sentMilestonesRef = useRef<Set<number>>(new Set())
  const tickingRef = useRef(false)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    sentMilestonesRef.current = new Set()
  }, [pathname])

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const calculateScroll = () => {
      const documentElement = document.documentElement
      const scrollHeight = Math.max(documentElement.scrollHeight, document.body.scrollHeight)
      const viewportHeight = window.innerHeight
      const scrollableDistance = Math.max(1, scrollHeight - viewportHeight)
      const scrollDepthPercent = clamp((window.scrollY / scrollableDistance) * 100, 0, 100)
      const pageCompletedPercent = clamp(((window.scrollY + viewportHeight) / scrollHeight) * 100, 0, 100)
      const completedRounded = round(pageCompletedPercent, 1)

      setMaxScrollPercent(completedRounded)

      analyticsConfig.scrollMilestones.forEach((milestone) => {
        if (completedRounded < milestone || sentMilestonesRef.current.has(milestone)) return

        sentMilestonesRef.current.add(milestone)
        trackEvent(
          analyticsEvents.scrollMilestone,
          {
            milestone_percent: milestone,
            page_completed_percent: completedRounded,
            scroll_depth_percent: round(scrollDepthPercent, 1),
            page_path: `${window.location.pathname}${window.location.search}`,
          },
          {
            dedupeKey: `scroll:${pathname}:${milestone}`,
            nonInteraction: true,
          }
        )
      })

      tickingRef.current = false
    }

    const handleScroll = () => {
      if (tickingRef.current) return

      tickingRef.current = true
      window.requestAnimationFrame(calculateScroll)
    }

    calculateScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [enabled, pathname, trackEvent])
}

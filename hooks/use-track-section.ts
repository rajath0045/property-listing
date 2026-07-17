"use client"

import { useEffect, useRef } from "react"
import { analyticsConfig, analyticsEvents } from "@/lib/analytics/config"
import { endSectionView, startSectionView, updateSectionVisibility } from "@/lib/analytics/section-store"
import type { SectionSnapshot, TrackSectionOptions } from "@/lib/analytics/types"
import { useAnalytics } from "./use-analytics"

function toSectionParams(snapshot: SectionSnapshot, exitReason?: string) {
  return {
    section_id: snapshot.section_id,
    section_name: snapshot.section_name,
    page_path: snapshot.page_path,
    property_id: snapshot.property_id,
    first_visible_time: snapshot.first_visible_time,
    total_visible_duration_ms: snapshot.total_visible_duration_ms,
    max_visible_percent: snapshot.max_visible_percent,
    visible_count: snapshot.visible_count,
    exit_reason: exitReason,
  }
}

export function useTrackSection<TElement extends HTMLElement = HTMLElement>({
  sectionId,
  sectionName,
  pageType,
  propertyId,
  propertySlug,
  minimumVisibleRatio = analyticsConfig.sectionMinimumVisibleRatio,
}: TrackSectionOptions) {
  const ref = useRef<TElement | null>(null)
  const isVisibleRef = useRef(false)
  const lastRatioRef = useRef(0)
  const { hasConsent, isInitialized, trackEvent } = useAnalytics()

  useEffect(() => {
    if (!hasConsent || !isInitialized || !ref.current || typeof IntersectionObserver === "undefined") {
      return
    }

    const element = ref.current
    const options: TrackSectionOptions = {
      sectionId,
      sectionName,
      pageType,
      propertyId,
      propertySlug,
      minimumVisibleRatio,
    }

    const handleEnter = (ratio: number) => {
      const snapshot = startSectionView(options, ratio)
      isVisibleRef.current = true

      trackEvent(analyticsEvents.sectionEnter, {
        ...toSectionParams(snapshot),
        page_type: pageType,
        property_slug: propertySlug,
      })
    }

    const handleExit = (reason: string) => {
      const snapshot = endSectionView(options)

      if (!snapshot) return

      isVisibleRef.current = false
      trackEvent(
        analyticsEvents.sectionExit,
        {
          ...toSectionParams(snapshot, reason),
          page_type: pageType,
          property_slug: propertySlug,
        },
        {
          transport: reason === "document_hidden" || reason === "unmount" ? "beacon" : undefined,
        }
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry?.intersectionRatio ?? 0
        const meetsVisibleThreshold = Boolean(entry?.isIntersecting) && ratio >= minimumVisibleRatio

        lastRatioRef.current = ratio

        if (meetsVisibleThreshold && !isVisibleRef.current) {
          handleEnter(ratio)
          return
        }

        if (meetsVisibleThreshold && isVisibleRef.current) {
          updateSectionVisibility(options, ratio)
          return
        }

        if (!meetsVisibleThreshold && isVisibleRef.current) {
          handleExit("intersection_exit")
        }
      },
      {
        threshold: [0, 0.1, 0.15, 0.25, 0.5, 0.75, 1],
      }
    )

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isVisibleRef.current) {
        handleExit("document_hidden")
        return
      }

      if (
        document.visibilityState === "visible" &&
        !isVisibleRef.current &&
        lastRatioRef.current >= minimumVisibleRatio
      ) {
        handleEnter(lastRatioRef.current)
      }
    }

    observer.observe(element)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)

      if (isVisibleRef.current) {
        handleExit("unmount")
      }
    }
  }, [
    hasConsent,
    isInitialized,
    minimumVisibleRatio,
    pageType,
    propertyId,
    propertySlug,
    sectionId,
    sectionName,
    trackEvent,
  ])

  return ref
}

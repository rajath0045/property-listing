"use client"

import { createElement, type ReactNode } from "react"
import { useTrackSection } from "@/hooks/use-track-section"

type TrackableElement = "div" | "section" | "main" | "aside" | "footer" | "header"

interface TrackedSectionProps {
  as?: TrackableElement
  id?: string
  className?: string
  sectionId: string
  sectionName: string
  pageType?: string
  propertyId?: string
  propertySlug?: string
  children: ReactNode
}

export function TrackedSection({
  as = "section",
  id,
  className,
  sectionId,
  sectionName,
  pageType,
  propertyId,
  propertySlug,
  children,
}: TrackedSectionProps) {
  const ref = useTrackSection<HTMLElement>({
    sectionId,
    sectionName,
    pageType,
    propertyId,
    propertySlug,
  })

  return createElement(
    as,
    {
      ref,
      id,
      className,
      "data-analytics-section": sectionId,
      "data-analytics-section-name": sectionName,
    },
    children
  )
}

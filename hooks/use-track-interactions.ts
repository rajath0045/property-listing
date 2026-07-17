"use client"

import { useEffect, useRef } from "react"
import { analyticsConfig, analyticsEvents } from "@/lib/analytics/config"
import { setLastClickedElement } from "@/lib/analytics/state"
import type { AnalyticsEventName, AnalyticsEventParams } from "@/lib/analytics/types"
import {
  getDataAnalyticsParams,
  getElementDescriptor,
  isInteractiveElement,
  isSensitiveElement,
  sanitizeHref,
} from "@/lib/analytics/utils"
import { useAnalytics } from "./use-analytics"

interface UseTrackInteractionsOptions {
  enabled?: boolean
}

interface ClickPoint {
  x: number
  y: number
  timestamp: number
}

export function useTrackInteractions({ enabled = true }: UseTrackInteractionsOptions = {}) {
  const { trackEvent } = useAnalytics()
  const recentClicksRef = useRef<ClickPoint[]>([])
  const lastRageClickAtRef = useRef(0)

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || isSensitiveElement(event.target)) return

      const descriptor = getElementDescriptor(event.target)
      const descriptorParams: AnalyticsEventParams = { ...descriptor }
      const interactiveElement = event.target.closest<HTMLElement>(
        "a,button,[role='button'],[role='link'],[data-analytics-clickable],[data-analytics-event]"
      )
      const anchor = event.target.closest<HTMLAnchorElement>("a")

      setLastClickedElement(descriptor)
      trackDataAttributeEvent(interactiveElement, descriptorParams)
      trackNavigationSurfaces(event.target, descriptorParams, anchor)
      trackSpecialLinks(anchor, descriptorParams, interactiveElement)
      trackDeadClick(event, descriptorParams)
      trackRageClick(event, descriptorParams)
    }

    const trackDataAttributeEvent = (element: HTMLElement | null, descriptor: AnalyticsEventParams) => {
      const eventName = element?.dataset.analyticsEvent as AnalyticsEventName | undefined

      if (!eventName) return

      trackEvent(eventName, {
        ...descriptor,
        ...getDataAnalyticsParams(element),
      })
    }

    const trackNavigationSurfaces = (
      target: Element,
      descriptor: AnalyticsEventParams,
      anchor: HTMLAnchorElement | null
    ) => {
      const header = target.closest("header")
      const footer = target.closest("footer")

      if (header) {
        trackEvent(analyticsEvents.navbarClick, {
          ...descriptor,
          destination: anchor ? sanitizeHref(anchor.href) : "",
          nav_location: "header",
        })
      }

      if (footer) {
        trackEvent(analyticsEvents.footerLinkClick, {
          ...descriptor,
          destination: anchor ? sanitizeHref(anchor.href) : "",
          footer_location: "footer",
        })
      }
    }

    const trackSpecialLinks = (
      anchor: HTMLAnchorElement | null,
      descriptor: AnalyticsEventParams,
      interactiveElement: HTMLElement | null
    ) => {
      if (!anchor) return

      const dataEventName = interactiveElement?.dataset.analyticsEvent
      const href = anchor.href
      const url = new URL(href)

      if (url.protocol === "tel:" && dataEventName !== analyticsEvents.phoneNumberClicked) {
        trackEvent(analyticsEvents.phoneNumberClicked, descriptor)
      }

      if (url.protocol === "mailto:" && dataEventName !== analyticsEvents.emailClicked) {
        trackEvent(analyticsEvents.emailClicked, descriptor)
      }

      if (
        url.protocol.startsWith("http") &&
        url.origin !== window.location.origin &&
        dataEventName !== analyticsEvents.externalLinkClicked
      ) {
        trackEvent(analyticsEvents.externalLinkClicked, {
          ...descriptor,
          outbound_domain: url.hostname,
        })
      }
    }

    const trackDeadClick = (event: MouseEvent, descriptor: AnalyticsEventParams) => {
      if (isInteractiveElement(event.target as Element)) return
      if (window.getSelection()?.toString()) return

      trackEvent(
        analyticsEvents.deadClick,
        {
          ...descriptor,
          click_x: Math.round(event.clientX),
          click_y: Math.round(event.clientY),
        },
        {
          dedupeKey: `dead-click:${Math.round(event.clientX / 20)}:${Math.round(event.clientY / 20)}`,
        }
      )
    }

    const trackRageClick = (event: MouseEvent, descriptor: AnalyticsEventParams) => {
      const now = Date.now()

      recentClicksRef.current = [...recentClicksRef.current, { x: event.clientX, y: event.clientY, timestamp: now }]
        .filter((click) => now - click.timestamp <= analyticsConfig.rageClickWindowMs)

      const closeClicks = recentClicksRef.current.filter((click) => {
        const distance = Math.hypot(click.x - event.clientX, click.y - event.clientY)
        return distance <= analyticsConfig.rageClickRadiusPx
      })

      if (closeClicks.length < analyticsConfig.rageClickCount) return
      if (now - lastRageClickAtRef.current < analyticsConfig.rageClickWindowMs) return

      lastRageClickAtRef.current = now
      trackEvent(analyticsEvents.rageClick, {
        ...descriptor,
        click_count: closeClicks.length,
        click_x: Math.round(event.clientX),
        click_y: Math.round(event.clientY),
      })
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [enabled, trackEvent])
}

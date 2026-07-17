import { analyticsEvents } from "./config"
import { trackAnalyticsEvent } from "./core"
import { getSectionSnapshots } from "./section-store"
import { getPageContext, getPageTimeMs, hasExitBeenSent, markExitSent } from "./state"
import { getSessionDurationMs } from "./storage"
import { getDeviceContext, round } from "./utils"

export function trackPageExit(reason: "pagehide" | "beforeunload" | "visibility_hidden" | "route_change") {
  if (typeof window === "undefined") return
  if (hasExitBeenSent()) return

  const page = getPageContext()
  const sections = getSectionSnapshots()
  const currentProperty = page.current_property
  const viewedSectionCount = sections.filter((section) => section.total_visible_duration_ms > 0).length
  const totalSectionTime = sections.reduce(
    (duration, section) => duration + section.total_visible_duration_ms,
    0
  )

  markExitSent()

  trackAnalyticsEvent(
    analyticsEvents.pageExit,
    {
      page_id: page.page_id,
      page_path: page.page_path,
      page_title: page.page_title,
      exit_reason: reason,
      current_url: page.page_url,
      property_id: currentProperty?.property_id,
      property_slug: currentProperty?.property_slug,
      property_name: currentProperty?.property_name,
      scroll_position_px: Math.round(window.scrollY),
      max_scroll_percent: round(page.max_scroll_percent, 1),
      page_time_spent_ms: getPageTimeMs(),
      session_duration_ms: getSessionDurationMs(),
      viewed_section_count: viewedSectionCount,
      total_section_visible_ms: Math.round(totalSectionTime),
      last_viewed_section: page.last_viewed_section,
      last_clicked_label: page.last_clicked_element?.element_label,
      last_clicked_tag: page.last_clicked_element?.element_tag,
      last_clicked_surface: page.last_clicked_element?.element_surface,
      last_clicked_href: page.last_clicked_element?.element_href,
      ...getDeviceContext(),
    },
    {
      transport: "beacon",
      dedupeKey: `page_exit:${page.page_id}`,
      nonInteraction: true,
    }
  )
}

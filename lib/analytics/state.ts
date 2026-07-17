import type { AnalyticsPageContext, ElementDescriptor, PropertyAnalyticsContext } from "./types"
import { createPageId, getCurrentPagePath, getCurrentPageUrl } from "./utils"

let pageContext: AnalyticsPageContext = createPageContext()

function createPageContext(path = getCurrentPagePath()): AnalyticsPageContext {
  const now = Date.now()

  return {
    page_id: createPageId(path),
    page_path: path,
    page_url: getCurrentPageUrl(),
    page_title: typeof document !== "undefined" ? document.title : "",
    page_started_at: now,
    page_started_at_iso: new Date(now).toISOString(),
    max_scroll_percent: 0,
    exit_sent: false,
  }
}

export function resetPageContext(path = getCurrentPagePath()) {
  pageContext = createPageContext(path)
  return pageContext
}

export function getPageContext() {
  return pageContext
}

export function setCurrentProperty(property?: PropertyAnalyticsContext) {
  pageContext.current_property = property
}

export function clearCurrentProperty(propertyId?: string) {
  if (!propertyId || pageContext.current_property?.property_id === propertyId) {
    pageContext.current_property = undefined
  }
}

export function setLastClickedElement(element: ElementDescriptor) {
  pageContext.last_clicked_element = element
}

export function setLastViewedSection(sectionId: string) {
  pageContext.last_viewed_section = sectionId
}

export function setMaxScrollPercent(percent: number) {
  pageContext.max_scroll_percent = Math.max(pageContext.max_scroll_percent, percent)
}

export function getPageTimeMs() {
  return Math.max(0, Date.now() - pageContext.page_started_at)
}

export function markExitSent() {
  pageContext.exit_sent = true
}

export function hasExitBeenSent() {
  return pageContext.exit_sent
}

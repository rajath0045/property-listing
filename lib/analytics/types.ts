export type AnalyticsConsentStatus = "granted" | "denied" | "unknown"

export type AnalyticsEventParam = string | number | boolean | null | undefined
export type AnalyticsEventParams = Record<string, AnalyticsEventParam>

export type AnalyticsEventName =
  | "page_view"
  | "property_viewed"
  | "property_card_clicked"
  | "property_card_hover"
  | "property_gallery_opened"
  | "property_gallery_category_clicked"
  | "property_image_changed"
  | "property_image_viewed"
  | "property_map_loaded"
  | "property_marker_clicked"
  | "booking_button_clicked"
  | "contact_button_clicked"
  | "search_performed"
  | "filter_changed"
  | "sort_changed"
  | "favorite_clicked"
  | "navbar_click"
  | "footer_link_click"
  | "scroll_milestone"
  | "page_exit"
  | "section_enter"
  | "section_exit"
  | "property_comparison"
  | "share_button_clicked"
  | "phone_number_clicked"
  | "email_clicked"
  | "external_link_clicked"
  | "cta_button_clicked"
  | "dead_click"
  | "rage_click"
  | "modal_opened"
  | "dropdown_opened"
  | "accordion_opened"
  | "review_expanded"
  | "map_interaction"
  | "map_zoom"
  | "marker_hover"
  | "image_zoom"
  | "core_web_vital"
  | "navigation_timing"
  | "api_response_time"
  | "image_loading_summary"

export interface AnalyticsEventOptions {
  dedupeKey?: string
  nonInteraction?: boolean
  transport?: "beacon"
}

export interface DeviceContext {
  device_category: "desktop" | "tablet" | "mobile"
  browser: string
  operating_system: string
  screen_resolution: string
  viewport_size: string
  language: string
  timezone: string
  referrer: string
  referrer_host: string
  traffic_source: string
}

export interface ElementDescriptor {
  element_tag: string
  element_label: string
  element_role: string
  element_id: string
  element_href: string
  element_surface: string
  element_section: string
}

export interface PropertyAnalyticsContext {
  property_id: string
  property_name: string
  property_slug: string
  property_location?: string
  property_price?: number
  property_rating?: number
}

export interface SectionSnapshot {
  section_id: string
  section_name: string
  page_path: string
  property_id?: string
  first_visible_time: string
  total_visible_duration_ms: number
  max_visible_percent: number
  visible_count: number
  is_visible: boolean
}

export interface AnalyticsPageContext {
  page_id: string
  page_path: string
  page_url: string
  page_title: string
  page_started_at: number
  page_started_at_iso: string
  max_scroll_percent: number
  last_clicked_element?: ElementDescriptor
  last_viewed_section?: string
  current_property?: PropertyAnalyticsContext
  exit_sent: boolean
}

export interface TrackSectionOptions {
  sectionId: string
  sectionName: string
  pageType?: string
  propertyId?: string
  propertySlug?: string
  minimumVisibleRatio?: number
}

export interface AnalyticsContextValue {
  consentStatus: AnalyticsConsentStatus
  hasConsent: boolean
  isInitialized: boolean
  acceptAnalytics: () => void
  declineAnalytics: () => void
  resetAnalyticsConsent: () => void
  trackEvent: (
    eventName: AnalyticsEventName,
    params?: AnalyticsEventParams,
    options?: AnalyticsEventOptions
  ) => void
  trackPageView: (params?: AnalyticsEventParams) => void
}

export type GtagCommand = (...args: unknown[]) => void
export type ClarityCommand = ((...args: unknown[]) => void) & {
  q?: unknown[][]
}

export interface AnalyticsGlobalState {
  gaInitialized?: boolean
  gaMeasurementId?: string
  clarityInitialized?: boolean
  clarityProjectId?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagCommand
    clarity?: ClarityCommand
    __gokulamAnalyticsState?: AnalyticsGlobalState
  }
}

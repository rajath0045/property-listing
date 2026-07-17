import type { AnalyticsEventName } from "./types"

function readPublicEnv(value: string | undefined) {
  return value?.trim() ?? ""
}

const defaultGaMeasurementId = "G-F6W88S80WS"

export const analyticsConfig = {
  gaMeasurementId: readPublicEnv(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) || defaultGaMeasurementId,
  clarityProjectId: readPublicEnv(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID),
  debugMode: readPublicEnv(process.env.NEXT_PUBLIC_ANALYTICS_DEBUG).toLowerCase() === "true",
  requireConsent: readPublicEnv(process.env.NEXT_PUBLIC_ANALYTICS_REQUIRE_CONSENT).toLowerCase() === "true",
  consentCookieName: "gokulam_analytics_consent",
  consentVersion: "2026-07-17",
  maxEventParamLength: 100,
  maxJourneyEntries: 20,
  sectionMinimumVisibleRatio: 0.15,
  scrollMilestones: [25, 50, 75, 90, 100],
  rageClickWindowMs: 1200,
  rageClickRadiusPx: 32,
  rageClickCount: 4,
}

export const analyticsEvents = {
  pageView: "page_view",
  propertyViewed: "property_viewed",
  propertyCardClicked: "property_card_clicked",
  propertyCardHover: "property_card_hover",
  propertyGalleryOpened: "property_gallery_opened",
  propertyGalleryCategoryClicked: "property_gallery_category_clicked",
  propertyImageChanged: "property_image_changed",
  propertyImageViewed: "property_image_viewed",
  propertyMapLoaded: "property_map_loaded",
  propertyMarkerClicked: "property_marker_clicked",
  bookingButtonClicked: "booking_button_clicked",
  contactButtonClicked: "contact_button_clicked",
  searchPerformed: "search_performed",
  filterChanged: "filter_changed",
  sortChanged: "sort_changed",
  favoriteClicked: "favorite_clicked",
  navbarClick: "navbar_click",
  footerLinkClick: "footer_link_click",
  scrollMilestone: "scroll_milestone",
  pageExit: "page_exit",
  sectionEnter: "section_enter",
  sectionExit: "section_exit",
  propertyComparison: "property_comparison",
  shareButtonClicked: "share_button_clicked",
  phoneNumberClicked: "phone_number_clicked",
  emailClicked: "email_clicked",
  externalLinkClicked: "external_link_clicked",
  ctaButtonClicked: "cta_button_clicked",
  deadClick: "dead_click",
  rageClick: "rage_click",
  modalOpened: "modal_opened",
  dropdownOpened: "dropdown_opened",
  accordionOpened: "accordion_opened",
  reviewExpanded: "review_expanded",
  mapInteraction: "map_interaction",
  mapZoom: "map_zoom",
  markerHover: "marker_hover",
  imageZoom: "image_zoom",
  coreWebVital: "core_web_vital",
  navigationTiming: "navigation_timing",
  apiResponseTime: "api_response_time",
  imageLoadingSummary: "image_loading_summary",
} satisfies Record<string, AnalyticsEventName>

export const privacySafeInputSelector = [
  "input",
  "textarea",
  "select",
  "[contenteditable='true']",
  "[data-analytics-private]",
  ".clarity-mask",
].join(",")

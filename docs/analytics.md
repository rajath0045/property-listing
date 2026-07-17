# Analytics Setup

This project uses only free analytics tools:

- Google Analytics 4 for aggregate reporting, funnels, events, traffic, geography, devices, and Core Web Vitals.
- Microsoft Clarity for heatmaps, click maps, scroll maps, rage/dead click analysis, and session recordings.
- First-party TypeScript tracking utilities for property, section, scroll, exit, and performance events.

Analytics scripts load only after the visitor grants consent in the cookie banner.

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
NEXT_PUBLIC_ANALYTICS_DEBUG=false
NEXT_PUBLIC_ANALYTICS_REQUIRE_CONSENT=false
```

Restart the Next.js dev server after changing these values.

`NEXT_PUBLIC_*` values are baked into the client bundle at build time. On Vercel, set these values before deploying so production builds receive the correct GA4 Measurement ID and Clarity Project ID.

By default, analytics initializes immediately so GA4 Realtime and Clarity can receive production visits. If you need strict opt-in consent before any analytics scripts load, set `NEXT_PUBLIC_ANALYTICS_REQUIRE_CONSENT=true`; visitors who have previously clicked Decline must clear the `gokulam_analytics_consent` cookie or click an app-provided reset control before analytics can start again.

## GA4 Configuration

1. Open Google Analytics.
2. Create or select a GA4 property.
3. Go to Admin > Data streams > Web.
4. Copy the Measurement ID, for example `G-XXXXXXXXXX`.
5. Add it as `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
6. In Admin > Custom definitions, register the event parameters you want to report on most often:
   `property_id`, `property_slug`, `property_name`, `section_id`, `section_name`,
   `cta_label`, `image_url`, `image_index`, `search_term`, `filter_name`, `sort_option`,
   `max_scroll_percent`, `page_time_spent_ms`, `last_viewed_section`, and `visitor_type`.
7. In Reports > Engagement > Events, confirm custom events appear after consent is accepted.
8. In Explore, build funnels such as `property_viewed` > `property_gallery_opened` > `booking_button_clicked`.

This app sends manual `page_view` events so it can include journey and property context. In the GA4 web data stream, disable the Enhanced Measurement advanced setting named "Page changes based on browser history events" to avoid duplicate SPA page views.

## Microsoft Clarity Configuration

1. Open Microsoft Clarity.
2. Create a project for this domain.
3. Copy the project ID from the install snippet URL.
4. Add it as `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
5. After consent is accepted, Clarity automatically records heatmaps, scroll maps, click maps, rage clicks, dead clicks, and session replay.
6. Use Clarity filters for custom tags such as `property_id`, `property_slug`, `section_id`, `device_category`, and `visitor_type`.

## Custom Events

- `page_view`
- `property_viewed`
- `property_card_clicked`
- `property_card_hover`
- `property_gallery_opened`
- `property_gallery_category_clicked`
- `property_image_changed`
- `property_image_viewed`
- `property_map_loaded`
- `property_marker_clicked`
- `booking_button_clicked`
- `contact_button_clicked`
- `search_performed`
- `filter_changed`
- `sort_changed`
- `favorite_clicked`
- `navbar_click`
- `footer_link_click`
- `scroll_milestone`
- `page_exit`
- `section_enter`
- `section_exit`
- `property_comparison`
- `share_button_clicked`
- `phone_number_clicked`
- `email_clicked`
- `external_link_clicked`
- `cta_button_clicked`
- `dead_click`
- `rage_click`
- `modal_opened`
- `dropdown_opened`
- `accordion_opened`
- `review_expanded`
- `map_interaction`
- `map_zoom`
- `marker_hover`
- `image_zoom`
- `core_web_vital`
- `navigation_timing`
- `api_response_time`
- `image_loading_summary`

## Extension Pattern

Use `useTrackEvent()` for generic controls:

```tsx
trackEvent("search_performed", {
  search_term: query,
  result_count: results.length,
})
```

Use `useTrackProperty()` for property-specific interactions:

```tsx
trackFavoriteClick({
  favorite_state: "added",
  list_location: "property_page",
})
```

Wrap new page sections with `TrackedSection` to capture first visible time, total visible duration, and max visible percentage.

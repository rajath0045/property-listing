"use client"

import { useMemo } from "react"
import { useTrackProperty } from "@/hooks/use-track-property"
import { getCurrentPrice, type Property } from "@/lib/properties"

interface PropertyPageAnalyticsProps {
  property: Property
}

export function PropertyPageAnalytics({ property }: PropertyPageAnalyticsProps) {
  const propertyContext = useMemo(
    () => ({
      property_id: property.id,
      property_name: property.name,
      property_slug: property.slug,
      property_location: property.location,
      property_price: getCurrentPrice(property),
      property_rating: property.rating,
    }),
    [property]
  )

  useTrackProperty(propertyContext, { trackView: true })

  return null
}

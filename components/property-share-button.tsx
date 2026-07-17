"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTrackProperty } from "@/hooks/use-track-property"
import type { PropertyAnalyticsContext } from "@/lib/analytics/types"

interface PropertyShareButtonProps {
  property: PropertyAnalyticsContext
}

export function PropertyShareButton({ property }: PropertyShareButtonProps) {
  const { trackShareClick } = useTrackProperty(property)

  const handleShare = async () => {
    const url = window.location.href

    trackShareClick({
      share_method: "native_or_clipboard",
      page_path: `${window.location.pathname}${window.location.search}`,
    })

    try {
      if (navigator.share) {
        await navigator.share({
          title: property.property_name,
          url,
        })
        return
      }

      await navigator.clipboard?.writeText(url)
    } catch {
      // Share cancellation and clipboard denial should not surface as console errors.
    }
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  )
}

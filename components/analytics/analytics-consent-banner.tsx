"use client"

import { ShieldCheck } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { Button } from "@/components/ui/button"

export function AnalyticsConsentBanner() {
  const { consentStatus, acceptAnalytics, declineAnalytics } = useAnalytics()

  if (consentStatus !== "unknown") return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-[10000] mx-auto max-w-3xl rounded-lg border border-border bg-card p-4 text-card-foreground shadow-2xl sm:bottom-5 sm:flex sm:items-center sm:justify-between sm:gap-5">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">Analytics consent</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            We use free, privacy-conscious analytics to understand visits, clicks, scrolling, performance,
            heatmaps, and session recordings. Sensitive form values are never collected.
          </p>
        </div>
      </div>

      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <Button variant="outline" size="sm" onClick={declineAnalytics}>
          Decline
        </Button>
        <Button size="sm" onClick={acceptAnalytics}>
          Allow
        </Button>
      </div>
    </div>
  )
}

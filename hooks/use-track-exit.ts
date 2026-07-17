"use client"

import { useEffect } from "react"
import { trackPageExit } from "@/lib/analytics/exit"

interface UseTrackExitOptions {
  enabled?: boolean
}

export function useTrackExit({ enabled = true }: UseTrackExitOptions = {}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const handlePageHide = () => trackPageExit("pagehide")
    const handleBeforeUnload = () => trackPageExit("beforeunload")
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        trackPageExit("visibility_hidden")
      }
    }

    window.addEventListener("pagehide", handlePageHide)
    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("pagehide", handlePageHide)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [enabled])
}

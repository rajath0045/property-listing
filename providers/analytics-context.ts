"use client"

import { createContext } from "react"
import type { AnalyticsContextValue } from "@/lib/analytics/types"

export const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

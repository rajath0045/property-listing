"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { MapPin, Home, Train, Building, Landmark, Dumbbell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { properties, landmarks, Property, Landmark as LandmarkType, formatPrice } from "@/lib/properties"

interface PropertyMapProps {
  highlightedPropertyId?: string
  showAllProperties?: boolean
}

const landmarkIcons: Record<LandmarkType["type"], string> = {
  railway: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M4 11h16"/><path d="M12 3v10"/><path d="m8 16-2 5h12l-2-5"/></svg>`,
  museum: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20v-6M2 20v-6M10 20v-6M14 20v-6M18 20v-6M6 20v-6"/><path d="M2 20h20M5 14h14M12 4 3 10h18Z"/></svg>`,
  palace: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="22" y2="22"/><line x1="8" x2="8" y1="14" y2="18"/><line x1="12" x2="12" y1="14" y2="18"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M4 18v-2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M12 2a3 3 0 0 0-3 3v2h6V5a3 3 0 0 0-3-3Z"/></svg>`,
  yoga: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18.5 5.5 1.5-1.5"/><path d="m5.5 18.5-1.5 1.5"/><path d="M8.5 2 2 8.5"/><path d="m15.5 22 6.5-6.5"/><path d="M8 5c.5.5.5 1.5 0 2s-1.5.5-2 0-.5-1.5 0-2 1.5-.5 2 0Z"/><path d="M18 15c.5.5.5 1.5 0 2s-1.5.5-2 0-.5-1.5 0-2 1.5-.5 2 0Z"/></svg>`,
  attraction: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
}

const landmarkColors: Record<LandmarkType["type"], string> = {
  railway: "bg-blue-100 text-blue-700 border-blue-300",
  museum: "bg-amber-100 text-amber-700 border-amber-300",
  palace: "bg-rose-100 text-rose-700 border-rose-300",
  yoga: "bg-emerald-100 text-emerald-700 border-emerald-300",
  attraction: "bg-purple-100 text-purple-700 border-purple-300",
}

const LEAFLET_CSS_ID = "leaflet-css"
const LEAFLET_JS_ID = "leaflet-js"
const LEAFLET_CSS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
const LEAFLET_JS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"

let leafletPromise: Promise<any> | null = null

function ensureLeafletCss() {
  if (document.getElementById(LEAFLET_CSS_ID)) return

  const link = document.createElement("link")
  link.id = LEAFLET_CSS_ID
  link.rel = "stylesheet"
  link.href = LEAFLET_CSS_URL
  document.head.appendChild(link)
}

function loadLeaflet() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Leaflet can only load in the browser"))
  }

  if ((window as any).L) {
    ensureLeafletCss()
    return Promise.resolve((window as any).L)
  }

  if (leafletPromise) return leafletPromise

  ensureLeafletCss()

  leafletPromise = new Promise((resolve, reject) => {
    let settled = false
    const existingScript = document.getElementById(LEAFLET_JS_ID) as HTMLScriptElement | null
    const script = existingScript ?? document.createElement("script")

    const cleanup = () => {
      window.clearTimeout(timeoutId)
      script.removeEventListener("load", handleLoad)
      script.removeEventListener("error", handleError)
    }

    const handleLoad = () => {
      if (settled) return
      settled = true
      cleanup()
      if ((window as any).L) {
        script.dataset.loaded = "true"
        resolve((window as any).L)
      } else {
        reject(new Error("Leaflet script loaded without exposing window.L"))
      }
    }

    const handleError = () => {
      if (settled) return
      settled = true
      cleanup()
      leafletPromise = null
      reject(new Error("Leaflet script failed to load"))
    }

    const timeoutId = window.setTimeout(() => {
      if (settled) return
      settled = true
      cleanup()
      leafletPromise = null
      reject(new Error("Leaflet script timed out"))
    }, 10000)

    script.addEventListener("load", handleLoad)
    script.addEventListener("error", handleError)

    if (script.dataset.loaded === "true") {
      handleLoad()
      return
    }

    if (!existingScript) {
      script.id = LEAFLET_JS_ID
      script.src = LEAFLET_JS_URL
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  })

  return leafletPromise
}

function getMarkerPosition(
  coordinates: { lat: number; lng: number },
  points: { lat: number; lng: number }[]
) {
  const latitudes = points.map((point) => point.lat)
  const longitudes = points.map((point) => point.lng)
  const minLat = Math.min(...latitudes)
  const maxLat = Math.max(...latitudes)
  const minLng = Math.min(...longitudes)
  const maxLng = Math.max(...longitudes)
  const latSpan = maxLat - minLat || 0.01
  const lngSpan = maxLng - minLng || 0.01

  return {
    left: `${((coordinates.lng - minLng) / lngSpan) * 80 + 10}%`,
    top: `${(1 - (coordinates.lat - minLat) / latSpan) * 80 + 10}%`,
  }
}

function StaticMapFallback({
  displayProperties,
  highlightedPropertyId,
  onSelectProperty,
}: {
  displayProperties: Property[]
  highlightedPropertyId?: string
  onSelectProperty: (property: Property) => void
}) {
  const points = [
    ...displayProperties.map((property) => property.coordinates),
    ...landmarks.map((landmark) => landmark.coordinates),
  ]

  return (
    <div className="absolute inset-0 overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--border)_60%,transparent)_1px,transparent_1px),linear-gradient(color-mix(in_oklab,var(--border)_60%,transparent)_1px,transparent_1px)] bg-[length:48px_48px]" />
      <div className="absolute inset-0 bg-card/25" />

      {landmarks.map((landmark) => {
        const position = getMarkerPosition(landmark.coordinates, points)
        return (
          <div
            key={landmark.name}
            className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-md ${landmarkColors[landmark.type]}`}
            style={position}
            title={landmark.name}
          >
            <MapPin className="h-3.5 w-3.5" />
          </div>
        )
      })}

      {displayProperties.map((property) => {
        const position = getMarkerPosition(property.coordinates, points)
        const isHighlighted = property.id === highlightedPropertyId

        return (
          <button
            key={property.id}
            type="button"
            onClick={() => onSelectProperty(property)}
            className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-2 text-xs shadow-lg transition-transform hover:scale-105 ${
              isHighlighted
                ? "scale-110 bg-primary font-semibold text-primary-foreground"
                : "bg-card font-medium text-foreground"
            }`}
            style={position}
            aria-label={`Show ${property.name} on map`}
          >
            <Home className="h-3.5 w-3.5" />
            {formatPrice(property.pricing.basePrice)}
          </button>
        )
      })}

      <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-border bg-card/95 px-3 py-2 text-xs text-muted-foreground shadow-sm">
        Interactive map tiles are temporarily unavailable. Coordinates and markers are shown from verified local listing data.
      </div>
    </div>
  )
}

export function PropertyMap({ highlightedPropertyId, showAllProperties = true }: PropertyMapProps) {
  const highlightedProperty = useMemo(
    () => properties.find((property) => property.id === highlightedPropertyId),
    [highlightedPropertyId]
  )
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(highlightedProperty ?? null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [leafletStatus, setLeafletStatus] = useState<"loading" | "ready" | "error">("loading")

  const displayProperties = useMemo(() => {
    return showAllProperties 
      ? properties 
      : highlightedPropertyId 
        ? properties.filter(p => p.id === highlightedPropertyId)
        : properties
  }, [showAllProperties, highlightedPropertyId])

  useEffect(() => {
    if (typeof window === "undefined") return
    let cancelled = false

    loadLeaflet()
      .then(() => {
        if (!cancelled) setLeafletStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setLeafletStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (leafletStatus !== "ready" || !mapContainerRef.current) return
    const L = (window as any).L
    if (!L) return

    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    let mapCenter = [12.333, 76.625] // Gokulam center
    let initialZoom = 15

    if (highlightedProperty) {
      mapCenter = [highlightedProperty.coordinates.lat, highlightedProperty.coordinates.lng]
      initialZoom = 16
    } else if (displayProperties.length === 1) {
      mapCenter = [displayProperties[0].coordinates.lat, displayProperties[0].coordinates.lng]
      initialZoom = 16
    }

    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: initialZoom,
      scrollWheelZoom: false,
      zoomControl: true,
    })
    mapRef.current = map

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map)

    displayProperties.forEach((property) => {
      const isHighlighted = property.id === highlightedPropertyId
      
      const markerHtml = `
        <div class="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border shadow-lg transition-transform hover:scale-105 ${
          isHighlighted 
            ? "bg-primary text-primary-foreground font-semibold scale-110" 
            : "bg-card text-foreground font-medium"
        } whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="text-xs">₹${property.pricing.basePrice}</span>
        </div>
      `
      
      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-property-marker',
        iconSize: [80, 32],
        iconAnchor: [40, 16]
      })

      const marker = L.marker([property.coordinates.lat, property.coordinates.lng], { icon: customIcon }).addTo(map)
      marker.bindPopup(`
        <strong>${property.name}</strong>
        <div>${property.location}</div>
        <div>${formatPrice(property.pricing.basePrice)} / night</div>
      `)

      marker.on("click", () => {
        setSelectedProperty(property)
        marker.openPopup()
      })
    })

    landmarks.forEach((landmark) => {
      const iconHtml = `
        <div class="w-8 h-8 rounded-full border border-border flex items-center justify-center shadow-md ${landmarkColors[landmark.type]}">
          ${landmarkIcons[landmark.type]}
        </div>
      `
      const landmarkIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-landmark-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      const marker = L.marker([landmark.coordinates.lat, landmark.coordinates.lng], { icon: landmarkIcon }).addTo(map)
      marker.bindTooltip(landmark.name, {
        direction: 'top',
        className: 'bg-foreground text-card text-xs border-none font-sans px-2 py-1 rounded shadow-md',
        opacity: 0.9,
      })
    })

    if (!highlightedProperty && displayProperties.length > 1) {
      const bounds = L.latLngBounds(
        displayProperties.map((property) => [property.coordinates.lat, property.coordinates.lng])
      )
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
    }

    window.requestAnimationFrame(() => {
      map.invalidateSize()
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [leafletStatus, highlightedPropertyId, highlightedProperty, displayProperties])

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
      {/* Map Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="font-medium text-foreground">
            {highlightedProperty ? highlightedProperty.name : "Gokulam, Mysuru"}
          </h3>
        </div>
        <Badge variant="secondary" className="text-xs font-normal">
          {displayProperties.length} {displayProperties.length === 1 ? "Homestay" : "Homestays"}
        </Badge>
      </div>

      {/* Map Visualization */}
      <div className="relative h-[450px] bg-secondary/10">
        {leafletStatus !== "error" && <div ref={mapContainerRef} className="h-full w-full z-10" />}

        {leafletStatus === "loading" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-secondary/40 text-sm font-medium text-muted-foreground">
            Loading map
          </div>
        )}

        {leafletStatus === "error" && (
          <StaticMapFallback
            displayProperties={displayProperties}
            highlightedPropertyId={highlightedPropertyId}
            onSelectProperty={setSelectedProperty}
          />
        )}

        {/* Selected Property Overlay */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[1000]">
            <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground text-sm line-clamp-1">{selectedProperty.name}</h4>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="text-muted-foreground hover:text-foreground text-lg leading-none"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedProperty.location}</span>
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-foreground">
                      {formatPrice(selectedProperty.pricing.basePrice)}
                    </span>
                    <span className="text-muted-foreground text-xs"> / night</span>
                  </div>
                  <Link
                    href={`/property/${selectedProperty.slug}`}
                    className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Landmarks Legend List */}
      <div className="p-4 border-t border-border bg-secondary/5">
        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Nearby Landmarks</h4>
        <div className="flex flex-wrap gap-2.5">
          {landmarks.map((landmark) => {
            const colors = landmarkColors[landmark.type]
            let icon: React.ReactNode;
            
            if (landmark.type === "railway") icon = <Train className="w-3.5 h-3.5" />
            else if (landmark.type === "museum") icon = <Building className="w-3.5 h-3.5" />
            else if (landmark.type === "palace") icon = <Landmark className="w-3.5 h-3.5" />
            else if (landmark.type === "yoga") icon = <Dumbbell className="w-3.5 h-3.5" />
            else icon = <MapPin className="w-3.5 h-3.5" />

            return (
              <div
                key={landmark.name}
                className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full text-xs border border-border shadow-xs"
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${colors}`}>
                  {icon}
                </span>
                <span className="text-foreground font-medium">{landmark.name}</span>
                <span className="text-muted-foreground text-[10px]">({landmark.distance})</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MapPin, Home, Plane, UtensilsCrossed, ShoppingBag, Palmtree } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { properties, landmarks, Property, Landmark } from "@/lib/properties"

interface PropertyMapProps {
  highlightedPropertyId?: string
  showAllProperties?: boolean
}

const landmarkIcons: Record<Landmark["type"], React.ReactNode> = {
  beach: <Palmtree className="w-4 h-4" />,
  restaurant: <UtensilsCrossed className="w-4 h-4" />,
  attraction: <MapPin className="w-4 h-4" />,
  airport: <Plane className="w-4 h-4" />,
  shopping: <ShoppingBag className="w-4 h-4" />,
}

export function PropertyMap({ highlightedPropertyId, showAllProperties = true }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    highlightedPropertyId ? properties.find(p => p.id === highlightedPropertyId) || null : null
  )
  const [mapError, setMapError] = useState(false)

  // This is a visual representation - in production, you'd integrate with Google Maps API
  const displayProperties = showAllProperties 
    ? properties 
    : highlightedPropertyId 
      ? properties.filter(p => p.id === highlightedPropertyId)
      : properties

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      {/* Map Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Explore Our Properties</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {displayProperties.length} Properties
        </Badge>
      </div>

      {/* Map Visualization */}
      <div 
        ref={mapRef}
        className="relative h-[400px] bg-secondary/20 overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '333' : 'ddd'}' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Property Markers */}
        {displayProperties.map((property, index) => {
          const isHighlighted = property.id === highlightedPropertyId
          const isSelected = selectedProperty?.id === property.id
          // Position markers in a visually appealing layout
          const positions = [
            { top: "20%", left: "30%" },
            { top: "35%", left: "70%" },
            { top: "60%", left: "25%" },
            { top: "45%", left: "55%" },
          ]
          const pos = positions[index % positions.length]

          return (
            <button
              key={property.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                isHighlighted || isSelected ? "scale-125 z-20" : "hover:scale-110"
              }`}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => setSelectedProperty(property)}
            >
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg ${
                  isHighlighted || isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                } transition-colors`}
              >
                <Home className="w-4 h-4" />
                <span className="font-semibold text-sm whitespace-nowrap">
                  ${property.pricing.basePrice}
                </span>
              </div>
              {/* Pin */}
              <div
                className={`w-3 h-3 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 ${
                  isHighlighted || isSelected ? "bg-primary" : "bg-card"
                }`}
              />
            </button>
          )
        })}

        {/* Landmark Markers */}
        {landmarks.slice(0, 3).map((landmark, index) => {
          const positions = [
            { top: "75%", left: "40%" },
            { top: "15%", left: "60%" },
            { top: "80%", left: "75%" },
          ]
          const pos = positions[index % positions.length]

          return (
            <div
              key={landmark.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-0"
              style={{ top: pos.top, left: pos.left }}
              title={landmark.name}
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                {landmarkIcons[landmark.type]}
              </div>
            </div>
          )
        })}

        {/* Selected Property Info */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-30">
            <Card className="bg-card border-border shadow-xl">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{selectedProperty.name}</h4>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selectedProperty.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">
                      ${selectedProperty.pricing.basePrice}
                    </span>
                    <span className="text-muted-foreground text-sm"> / night</span>
                  </div>
                  <Link
                    href={`/property/${selectedProperty.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Landmarks List */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Nearby Landmarks</h4>
        <div className="flex flex-wrap gap-2">
          {landmarks.map((landmark) => (
            <div
              key={landmark.name}
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full text-sm"
            >
              <span className="text-muted-foreground">{landmarkIcons[landmark.type]}</span>
              <span className="text-foreground">{landmark.name}</span>
              <span className="text-muted-foreground">({landmark.distance})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

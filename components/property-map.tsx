"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Home, Train, Building, Landmark, Dumbbell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { properties, landmarks, Property, Landmark as LandmarkType, formatPrice } from "@/lib/properties"

interface PropertyMapProps {
  highlightedPropertyId?: string
  showAllProperties?: boolean
}

const landmarkIcons: Record<LandmarkType["type"], React.ReactNode> = {
  railway: <Train className="w-4 h-4" />,
  museum: <Building className="w-4 h-4" />,
  palace: <Landmark className="w-4 h-4" />,
  yoga: <Dumbbell className="w-4 h-4" />,
  attraction: <MapPin className="w-4 h-4" />,
}

const landmarkColors: Record<LandmarkType["type"], string> = {
  railway: "bg-blue-100 text-blue-700",
  museum: "bg-amber-100 text-amber-700",
  palace: "bg-rose-100 text-rose-700",
  yoga: "bg-green-100 text-green-700",
  attraction: "bg-purple-100 text-purple-700",
}

export function PropertyMap({ highlightedPropertyId, showAllProperties = true }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    highlightedPropertyId ? properties.find(p => p.id === highlightedPropertyId) || null : null
  )

  const displayProperties = showAllProperties 
    ? properties 
    : highlightedPropertyId 
      ? properties.filter(p => p.id === highlightedPropertyId)
      : properties

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
      {/* Map Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-medium text-foreground">Gokulam, Mysuru</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {displayProperties.length} Homestays
        </Badge>
      </div>

      {/* Map Visualization */}
      <div 
        className="relative h-[400px] bg-secondary/30 overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23e5e5e0' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Gokulam Area Label */}
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Area</p>
          <p className="font-medium text-foreground text-sm">Gokulam, Mysuru</p>
        </div>

        {/* Property Markers */}
        {displayProperties.map((property, index) => {
          const isHighlighted = property.id === highlightedPropertyId
          const isSelected = selectedProperty?.id === property.id
          const positions = [
            { top: "35%", left: "45%" },
            { top: "45%", left: "30%" },
            { top: "30%", left: "60%" },
            { top: "55%", left: "55%" },
          ]
          const pos = positions[index % positions.length]

          return (
            <button
              key={property.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                isHighlighted || isSelected ? "scale-110 z-20" : "hover:scale-105"
              }`}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => setSelectedProperty(property)}
            >
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-md ${
                  isHighlighted || isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                } transition-colors border border-border`}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">
                  {formatPrice(property.pricing.basePrice)}
                </span>
              </div>
            </button>
          )
        })}

        {/* Landmark Markers */}
        {landmarks.map((landmark, index) => {
          const positions = [
            { top: "80%", left: "50%" },  // Railway Station
            { top: "75%", left: "35%" },  // Rail Museum
            { top: "85%", left: "70%" },  // Palace
            { top: "40%", left: "48%" },  // Yoga Center
            { top: "90%", left: "80%" },  // Chamundi Hills
          ]
          const pos = positions[index % positions.length]

          return (
            <div
              key={landmark.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-0 group"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${landmarkColors[landmark.type]}`}>
                {landmarkIcons[landmark.type]}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-foreground text-card text-xs px-2 py-1 rounded whitespace-nowrap">
                  {landmark.name}
                </div>
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
                  <h4 className="font-medium text-foreground">{selectedProperty.name}</h4>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="text-muted-foreground hover:text-foreground text-xl leading-none"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selectedProperty.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-foreground">
                      {formatPrice(selectedProperty.pricing.basePrice)}
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
        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Nearby Landmarks</h4>
        <div className="flex flex-wrap gap-2">
          {landmarks.map((landmark) => (
            <div
              key={landmark.name}
              className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg text-sm"
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center ${landmarkColors[landmark.type]}`}>
                {landmarkIcons[landmark.type]}
              </span>
              <span className="text-foreground">{landmark.name}</span>
              <span className="text-muted-foreground text-xs">({landmark.distance})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, Bed, Bath, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Property, getCurrentPrice, getPriceLabel, formatPrice } from "@/lib/properties"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const currentPrice = getCurrentPrice(property)
  const priceLabel = getPriceLabel(property)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <Link href={`/property/${property.slug}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[currentImage]}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  idx === currentImage ? "bg-card" : "bg-card/50"
                }`}
              />
            ))}
          </div>

          {/* Price Badge */}
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground px-2.5 py-1 text-xs">
            {priceLabel}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-medium text-foreground line-clamp-1">{property.name}</h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-medium text-sm text-foreground">{property.rating}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-3">{property.location}</p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{property.maxGuests}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1 pt-2 border-t border-border">
            <span className="text-lg font-semibold text-foreground">{formatPrice(currentPrice)}</span>
            <span className="text-muted-foreground text-sm">/ night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

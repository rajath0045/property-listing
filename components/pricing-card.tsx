"use client"

import { Calendar, MessageCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Property, getCurrentPrice, getPriceLabel } from "@/lib/properties"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PricingCardProps {
  property: Property
}

export function PricingCard({ property }: PricingCardProps) {
  const currentPrice = getCurrentPrice(property)
  const priceLabel = getPriceLabel(property)
  const whatsappNumber = "1234567890"
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking ${property.name} in ${property.location}. Could you please provide more information about availability?`
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <Card className="sticky top-24 border-border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">${currentPrice}</span>
              <span className="text-muted-foreground">/ night</span>
            </div>
            <Badge variant="secondary" className="mt-2">
              {priceLabel} Rate
            </Badge>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Prices vary based on season and day of week. Contact us for exact rates.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pricing Breakdown */}
        <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Dynamic Pricing
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weekday</span>
              <span className="text-foreground font-medium">${property.pricing.basePrice}/night</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weekend</span>
              <span className="text-foreground font-medium">${property.pricing.weekendPrice}/night</span>
            </div>
            {property.pricing.seasonalPricing.map((season) => (
              <div key={season.season} className="flex justify-between">
                <span className="text-muted-foreground">{season.season}</span>
                <span className="text-foreground font-medium">${season.price}/night</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            size="lg"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-6 text-lg rounded-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Inquire via WhatsApp
          </Button>
        </a>

        <p className="text-center text-xs text-muted-foreground">
          We typically respond within 30 minutes
        </p>

        {/* Additional Info */}
        <div className="pt-4 border-t border-border space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Minimum stay</span>
            <span className="text-foreground">2 nights</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-in</span>
            <span className="text-foreground">3:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-out</span>
            <span className="text-foreground">11:00 AM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

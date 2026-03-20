import {
  Wifi,
  Car,
  Waves,
  Flame,
  Tv,
  Wind,
  UtensilsCrossed,
  WashingMachine,
  Dumbbell,
  TreePine,
  Mountain,
  Building2,
  Sun,
  Thermometer,
  DoorOpen,
  Wine,
  Laptop,
  ShowerHead,
  Users,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AmenitiesListProps {
  amenities: string[]
}

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="w-5 h-5" />,
  "Parking": <Car className="w-5 h-5" />,
  "Private Pool": <Waves className="w-5 h-5" />,
  "Pool": <Waves className="w-5 h-5" />,
  "Infinity Pool": <Waves className="w-5 h-5" />,
  "Hot Tub": <Flame className="w-5 h-5" />,
  "Fireplace": <Flame className="w-5 h-5" />,
  "Smart TV": <Tv className="w-5 h-5" />,
  "TV": <Tv className="w-5 h-5" />,
  "Air Conditioning": <Wind className="w-5 h-5" />,
  "Full Kitchen": <UtensilsCrossed className="w-5 h-5" />,
  "Washer/Dryer": <WashingMachine className="w-5 h-5" />,
  "Gym Access": <Dumbbell className="w-5 h-5" />,
  "Beach Access": <Sun className="w-5 h-5" />,
  "Garden": <TreePine className="w-5 h-5" />,
  "Mountain View": <Mountain className="w-5 h-5" />,
  "Ocean View": <Waves className="w-5 h-5" />,
  "City View": <Building2 className="w-5 h-5" />,
  "Heating": <Thermometer className="w-5 h-5" />,
  "Doorman": <DoorOpen className="w-5 h-5" />,
  "Elevator": <DoorOpen className="w-5 h-5" />,
  "Wine Fridge": <Wine className="w-5 h-5" />,
  "Workspace": <Laptop className="w-5 h-5" />,
  "Dedicated workspace": <Laptop className="w-5 h-5" />,
  "Outdoor Shower": <ShowerHead className="w-5 h-5" />,
  "BBQ Grill": <Flame className="w-5 h-5" />,
  "BBQ": <Flame className="w-5 h-5" />,
  "Deck": <Sun className="w-5 h-5" />,
  "Outdoor Dining": <UtensilsCrossed className="w-5 h-5" />,
  "Ski Storage": <Mountain className="w-5 h-5" />,
  "Hiking Access": <TreePine className="w-5 h-5" />,
  "Smart Home": <Tv className="w-5 h-5" />,
  "Rooftop Access": <Building2 className="w-5 h-5" />,
  "Game Room": <Users className="w-5 h-5" />,
  "Beach Equipment": <Sun className="w-5 h-5" />,
  "Yoga Deck": <Users className="w-5 h-5" />,
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">What this place offers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 text-foreground">
              <span className="text-muted-foreground">
                {amenityIcons[amenity] || <Check className="w-5 h-5" />}
              </span>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

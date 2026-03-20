export interface Property {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  location: string
  coordinates: { lat: number; lng: number }
  images: string[]
  amenities: string[]
  bedrooms: number
  bathrooms: number
  maxGuests: number
  pricing: {
    basePrice: number
    weekendPrice: number
    seasonalPricing: {
      season: string
      startMonth: number
      endMonth: number
      price: number
    }[]
  }
  rating: number
  reviewCount: number
}

export interface Landmark {
  name: string
  type: "beach" | "restaurant" | "attraction" | "airport" | "shopping"
  coordinates: { lat: number; lng: number }
  distance: string
}

export const properties: Property[] = [
  {
    id: "1",
    name: "Seaside Villa Retreat",
    slug: "seaside-villa-retreat",
    description: "Experience luxury beachfront living at its finest. This stunning villa offers panoramic ocean views, a private pool, and direct beach access. Perfect for families or groups seeking an unforgettable coastal escape. The open-plan living area flows seamlessly to the outdoor terrace, creating the perfect space for entertaining or relaxing with loved ones.",
    shortDescription: "Beachfront luxury with private pool and stunning ocean views",
    location: "Malibu, California",
    coordinates: { lat: 34.0259, lng: -118.7798 },
    images: [
      "/properties/villa-1.jpg",
      "/properties/villa-1-interior.jpg",
      "/properties/villa-1-pool.jpg",
      "/properties/villa-1-bedroom.jpg",
    ],
    amenities: ["Private Pool", "Beach Access", "WiFi", "Air Conditioning", "Full Kitchen", "Washer/Dryer", "Parking", "BBQ Grill", "Ocean View", "Smart TV", "Hot Tub", "Outdoor Shower"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    pricing: {
      basePrice: 450,
      weekendPrice: 550,
      seasonalPricing: [
        { season: "Summer", startMonth: 6, endMonth: 8, price: 650 },
        { season: "Winter Holidays", startMonth: 12, endMonth: 12, price: 700 },
      ],
    },
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: "2",
    name: "Mountain View Chalet",
    slug: "mountain-view-chalet",
    description: "Nestled in the heart of the mountains, this charming chalet offers the perfect blend of rustic elegance and modern comfort. Wake up to breathtaking mountain views, enjoy cozy evenings by the fireplace, and explore nearby hiking trails. Ideal for nature lovers and adventure seekers alike.",
    shortDescription: "Rustic mountain retreat with fireplace and scenic trails",
    location: "Aspen, Colorado",
    coordinates: { lat: 39.1911, lng: -106.8175 },
    images: [
      "/properties/chalet-1.jpg",
      "/properties/chalet-1-interior.jpg",
      "/properties/chalet-1-view.jpg",
      "/properties/chalet-1-bedroom.jpg",
    ],
    amenities: ["Fireplace", "Mountain View", "WiFi", "Heating", "Full Kitchen", "Ski Storage", "Parking", "Deck", "Hiking Access", "Smart TV", "Hot Tub", "Game Room"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricing: {
      basePrice: 350,
      weekendPrice: 420,
      seasonalPricing: [
        { season: "Ski Season", startMonth: 12, endMonth: 3, price: 550 },
        { season: "Fall Colors", startMonth: 9, endMonth: 10, price: 400 },
      ],
    },
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Urban Luxury Penthouse",
    slug: "urban-luxury-penthouse",
    description: "Experience city living at its finest in this sophisticated penthouse apartment. Floor-to-ceiling windows offer stunning skyline views, while the modern interior provides all the comforts of home. Located in the heart of downtown, you'll be steps away from world-class dining, shopping, and entertainment.",
    shortDescription: "Stunning skyline views in the heart of downtown",
    location: "New York City, NY",
    coordinates: { lat: 40.7580, lng: -73.9855 },
    images: [
      "/properties/penthouse-1.jpg",
      "/properties/penthouse-1-living.jpg",
      "/properties/penthouse-1-view.jpg",
      "/properties/penthouse-1-bedroom.jpg",
    ],
    amenities: ["City View", "Rooftop Access", "WiFi", "Air Conditioning", "Full Kitchen", "Gym Access", "Doorman", "Elevator", "Smart Home", "Smart TV", "Wine Fridge", "Workspace"],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricing: {
      basePrice: 500,
      weekendPrice: 600,
      seasonalPricing: [
        { season: "New Year", startMonth: 12, endMonth: 1, price: 800 },
        { season: "Summer", startMonth: 6, endMonth: 8, price: 550 },
      ],
    },
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "4",
    name: "Tropical Paradise Villa",
    slug: "tropical-paradise-villa",
    description: "Escape to paradise in this stunning tropical villa surrounded by lush gardens and swaying palms. Features an infinity pool overlooking the ocean, outdoor dining areas, and spacious interiors designed for relaxation. Perfect for a romantic getaway or family vacation in the sun.",
    shortDescription: "Tropical escape with infinity pool and ocean views",
    location: "Maui, Hawaii",
    coordinates: { lat: 20.7984, lng: -156.3319 },
    images: [
      "/properties/tropical-1.jpg",
      "/properties/tropical-1-pool.jpg",
      "/properties/tropical-1-garden.jpg",
      "/properties/tropical-1-bedroom.jpg",
    ],
    amenities: ["Infinity Pool", "Ocean View", "WiFi", "Air Conditioning", "Full Kitchen", "Outdoor Dining", "Parking", "BBQ", "Garden", "Smart TV", "Beach Equipment", "Yoga Deck"],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    pricing: {
      basePrice: 600,
      weekendPrice: 700,
      seasonalPricing: [
        { season: "Peak Season", startMonth: 12, endMonth: 3, price: 850 },
        { season: "Summer", startMonth: 6, endMonth: 8, price: 750 },
      ],
    },
    rating: 4.9,
    reviewCount: 203,
  },
]

export const landmarks: Landmark[] = [
  { name: "Malibu Beach", type: "beach", coordinates: { lat: 34.0329, lng: -118.7856 }, distance: "0.5 miles" },
  { name: "Nobu Malibu", type: "restaurant", coordinates: { lat: 34.0362, lng: -118.7823 }, distance: "2 miles" },
  { name: "Santa Monica Pier", type: "attraction", coordinates: { lat: 34.0093, lng: -118.4960 }, distance: "15 miles" },
  { name: "LAX Airport", type: "airport", coordinates: { lat: 33.9425, lng: -118.4081 }, distance: "25 miles" },
  { name: "Malibu Country Mart", type: "shopping", coordinates: { lat: 34.0317, lng: -118.6804 }, distance: "5 miles" },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getCurrentPrice(property: Property): number {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const dayOfWeek = now.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  // Check seasonal pricing first
  for (const seasonal of property.pricing.seasonalPricing) {
    if (seasonal.startMonth <= seasonal.endMonth) {
      if (currentMonth >= seasonal.startMonth && currentMonth <= seasonal.endMonth) {
        return seasonal.price
      }
    } else {
      // Handle seasons that span year end (e.g., Dec to Jan)
      if (currentMonth >= seasonal.startMonth || currentMonth <= seasonal.endMonth) {
        return seasonal.price
      }
    }
  }

  // Return weekend or base price
  return isWeekend ? property.pricing.weekendPrice : property.pricing.basePrice
}

export function getPriceLabel(property: Property): string {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const dayOfWeek = now.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  for (const seasonal of property.pricing.seasonalPricing) {
    if (seasonal.startMonth <= seasonal.endMonth) {
      if (currentMonth >= seasonal.startMonth && currentMonth <= seasonal.endMonth) {
        return seasonal.season
      }
    } else {
      if (currentMonth >= seasonal.startMonth || currentMonth <= seasonal.endMonth) {
        return seasonal.season
      }
    }
  }

  return isWeekend ? "Weekend" : "Weekday"
}

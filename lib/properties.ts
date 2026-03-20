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
  type: "railway" | "museum" | "palace" | "yoga" | "attraction"
  coordinates: { lat: number; lng: number }
  distance: string
}

// Gokulam, Mysuru center coordinates
const GOKULAM_CENTER = { lat: 12.3252, lng: 76.6402 }

export const properties: Property[] = [
  {
    id: "1",
    name: "Serene Garden Homestay",
    slug: "serene-garden-homestay",
    description: "A peaceful retreat in the heart of Gokulam, surrounded by lush greenery and flowering plants. This clean and comfortable homestay offers a perfect blend of traditional Mysuru hospitality and modern amenities. Wake up to the sounds of birds and enjoy your morning chai in our beautiful garden. Ideal for yoga practitioners and those seeking a quiet, rejuvenating stay.",
    shortDescription: "Peaceful garden homestay with traditional Mysuru hospitality",
    location: "Gokulam, Mysuru",
    coordinates: { lat: 12.3262, lng: 76.6412 },
    images: [
      "/properties/homestay-1.jpg",
      "/properties/homestay-1-room.jpg",
      "/properties/homestay-1-garden.jpg",
      "/properties/homestay-1-dining.jpg",
    ],
    amenities: ["Garden View", "Free WiFi", "Hot Water", "Home-cooked Meals", "Yoga Space", "Parking", "Daily Cleaning", "Filtered Water", "Fan/AC", "Laundry Service", "Airport Pickup", "Local Guide"],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricing: {
      basePrice: 1800,
      weekendPrice: 2200,
      seasonalPricing: [
        { season: "Dasara Festival", startMonth: 9, endMonth: 10, price: 3000 },
        { season: "Winter Season", startMonth: 12, endMonth: 2, price: 2500 },
      ],
    },
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: "2",
    name: "Cozy Corner Homestay",
    slug: "cozy-corner-homestay",
    description: "Located in a quiet residential area of Gokulam, this charming homestay offers a homely atmosphere with all modern comforts. The rooms are well-ventilated with natural light, and our hosts ensure a warm, welcoming experience. Perfect for solo travelers, couples, or small families looking for an authentic Mysuru experience. Walking distance to popular yoga shalas and local eateries.",
    shortDescription: "Homely comfort in a quiet Gokulam neighborhood",
    location: "Gokulam, Mysuru",
    coordinates: { lat: 12.3245, lng: 76.6395 },
    images: [
      "/properties/homestay-2.jpg",
      "/properties/homestay-2-room.jpg",
      "/properties/homestay-2-balcony.jpg",
      "/properties/homestay-2-living.jpg",
    ],
    amenities: ["Balcony", "Free WiFi", "Hot Water", "Breakfast Included", "Ceiling Fan", "Parking", "Daily Cleaning", "Filtered Water", "Mosquito Net", "Book Library", "Tea/Coffee Maker", "Bicycle Rental"],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricing: {
      basePrice: 1200,
      weekendPrice: 1500,
      seasonalPricing: [
        { season: "Dasara Festival", startMonth: 9, endMonth: 10, price: 2000 },
        { season: "Winter Season", startMonth: 12, endMonth: 2, price: 1800 },
      ],
    },
    rating: 4.7,
    reviewCount: 124,
  },
  {
    id: "3",
    name: "Heritage House Homestay",
    slug: "heritage-house-homestay",
    description: "Experience the charm of old Mysuru in this beautifully maintained heritage home. With traditional architecture, antique furniture, and a peaceful courtyard, this homestay transports you to a simpler time while providing modern comforts. Our family has been welcoming guests for over 30 years, sharing stories of Mysuru's rich culture and history.",
    shortDescription: "Traditional heritage home with authentic Mysuru character",
    location: "Gokulam, Mysuru",
    coordinates: { lat: 12.3270, lng: 76.6420 },
    images: [
      "/properties/homestay-3.jpg",
      "/properties/homestay-3-courtyard.jpg",
      "/properties/homestay-3-room.jpg",
      "/properties/homestay-3-dining.jpg",
    ],
    amenities: ["Heritage Architecture", "Courtyard", "Free WiFi", "Hot Water", "Traditional Breakfast", "Parking", "Daily Cleaning", "Filtered Water", "AC Available", "Cultural Tours", "Cooking Classes", "Yoga Arrangements"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricing: {
      basePrice: 2500,
      weekendPrice: 3000,
      seasonalPricing: [
        { season: "Dasara Festival", startMonth: 9, endMonth: 10, price: 4000 },
        { season: "Winter Season", startMonth: 12, endMonth: 2, price: 3500 },
      ],
    },
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "4",
    name: "Peaceful Nest Homestay",
    slug: "peaceful-nest-homestay",
    description: "A modern, clean homestay designed for comfort and tranquility. Located on a quiet street in Gokulam, this property offers spacious rooms with contemporary amenities while maintaining a warm, homely feel. The rooftop terrace provides beautiful views of Chamundi Hills. Perfect for extended stays, especially for yoga students and digital nomads.",
    shortDescription: "Modern comfort with rooftop views of Chamundi Hills",
    location: "Gokulam, Mysuru",
    coordinates: { lat: 12.3235, lng: 76.6388 },
    images: [
      "/properties/homestay-4.jpg",
      "/properties/homestay-4-room.jpg",
      "/properties/homestay-4-terrace.jpg",
      "/properties/homestay-4-kitchen.jpg",
    ],
    amenities: ["Rooftop Terrace", "Hill View", "Free WiFi", "Hot Water", "Kitchenette", "Workspace", "Parking", "Daily Cleaning", "AC", "Washing Machine", "Long-stay Discount", "Yoga Mat Provided"],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricing: {
      basePrice: 2000,
      weekendPrice: 2400,
      seasonalPricing: [
        { season: "Dasara Festival", startMonth: 9, endMonth: 10, price: 3200 },
        { season: "Winter Season", startMonth: 12, endMonth: 2, price: 2800 },
      ],
    },
    rating: 4.8,
    reviewCount: 98,
  },
]

export const landmarks: Landmark[] = [
  { name: "Mysuru Railway Station", type: "railway", coordinates: { lat: 12.2958, lng: 76.6394 }, distance: "2 km" },
  { name: "Mysore Rail Museum", type: "museum", coordinates: { lat: 12.3050, lng: 76.6380 }, distance: "2 km" },
  { name: "Mysuru Palace", type: "palace", coordinates: { lat: 12.3052, lng: 76.6552 }, distance: "4 km" },
  { name: "Yoga Center (KPJAYI)", type: "yoga", coordinates: { lat: 12.3260, lng: 76.6400 }, distance: "0.5 km" },
  { name: "Chamundi Hills", type: "attraction", coordinates: { lat: 12.2724, lng: 76.6701 }, distance: "8 km" },
]

export const WHATSAPP_NUMBER = "919876543210" // Replace with actual number

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
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
      // Handle seasons that span year end (e.g., Dec to Feb)
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

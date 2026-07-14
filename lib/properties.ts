export interface Property {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  location: string
  coordinates: { lat: number; lng: number }
  images: string[]
  imageCategories: { name: string; images: string[] }[]
  amenities: string[]
  bedrooms: number
  beds: number
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
    name: "Peaceful Oasis House",
    slug: "serene-garden-homestay",
    description: "Take a break and unwind at this peaceful oasis. It is a brand new ground floor house featuring 2 rooms, one attached bathroom, and one general bathroom. Centrally located, it is close to the Railway Station, Palace, GRS, and other tourist spots, as well as all yoga shalas in Gokulam. Couples are allowed. The property boasts uninterrupted power supply (UPS), 24/7 water, and internet. Includes a fully equipped kitchen (fridge, washing machine, gas stove) and car parking right in front of the house.",
    shortDescription: "Brand new ground floor 2BR house centrally located near all major tourist spots and yoga shalas.",
    location: "Gokulam, Mysuru",
    coordinates: { lat: 12.3262, lng: 76.6412 },
    images: [
      "/properties/house362/1000929609.jpg",
      "/properties/house362/1000929613.jpg",
      "/properties/house362/1000929614.jpg",
      "/properties/house362/1000929615.jpg",
      "/properties/house362/1000929617.jpg",
      "/properties/house362/1000929618.jpg",
      "/properties/house362/1000929620.jpg",
    ],
    imageCategories: [
      {
        name: "Living room",
        images: ["/properties/house362/1000929609.jpg", "/properties/house362/1000929613.jpg"],
      },
      {
        name: "Full kitchen",
        images: ["/properties/house362/1000929614.jpg", "/properties/house362/1000929615.jpg"],
      },
      {
        name: "Bedroom",
        images: ["/properties/house362/1000929617.jpg", "/properties/house362/1000929618.jpg"],
      },
      {
        name: "Bathroom",
        images: ["/properties/house362/1000929620.jpg"],
      }
    ],
    amenities: ["Wifi", "Kitchen", "Hot water", "Shower gel", "Free washer", "Bed linen", "Iron", "Wardrobe", "TV", "Cot", "Ceiling fan", "Security cameras", "Refrigerator", "Cooking basics", "Kettle", "Rice cooker", "Dining table", "Free parking", "Smoking allowed", "Long-term stays allowed", "Self check-in", "Housekeeping available", "UPS Power Backup"],
    bedrooms: 2,
    beds: 2,
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
    id: "5",
    name: "One Bedroom House - First Floor",
    slug: "first-floor-1bhk",
    description: "A comfortable one-bedroom house located on the first floor. Perfect for small families or couples looking for a cozy stay in Mysore. Close to local amenities and tourist attractions.",
    shortDescription: "Cozy 1BHK first floor house in Mysore.",
    location: "Mysuru",
    coordinates: { lat: 12.3052, lng: 76.6552 },
    images: [
      "/properties/firstfloor1bhk/1000480254.jpg",
      "/properties/firstfloor1bhk/1000962447.jpg",
      "/properties/firstfloor1bhk/1000962454.jpg",
      "/properties/firstfloor1bhk/1000962455.jpg",
      "/properties/firstfloor1bhk/1000962456.jpg",
      "/properties/firstfloor1bhk/1000962457.jpg",
    ],
    imageCategories: [
      {
        name: "Rooms",
        images: ["/properties/firstfloor1bhk/1000480254.jpg", "/properties/firstfloor1bhk/1000962447.jpg", "/properties/firstfloor1bhk/1000962454.jpg"],
      },
      {
        name: "Other",
        images: ["/properties/firstfloor1bhk/1000962455.jpg", "/properties/firstfloor1bhk/1000962456.jpg", "/properties/firstfloor1bhk/1000962457.jpg"],
      }
    ],
    amenities: ["Wifi", "Kitchen", "Hot water", "TV", "Free parking"],
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricing: {
      basePrice: 1500,
      weekendPrice: 1800,
      seasonalPricing: [],
    },
    rating: 4.5,
    reviewCount: 12,
  },
  {
    id: "6",
    name: "Nature's Bliss - Home in Gokulam",
    slug: "nature-bliss-2bhk",
    description: "Nature's Bliss- Home in Gokulam at heart of Mysore. A beautiful 2BHK stay surrounded by nature, offering a peaceful and relaxing environment. Located conveniently in Gokulam.",
    shortDescription: "Nature's Bliss- Home in Gokulam at heart of Mysore.",
    location: "Gokulam, Mysuru",
    coordinates: { lat: 12.3252, lng: 76.6402 },
    images: [
      "/properties/naturebliss2bhk/1000071380.jpg",
      "/properties/naturebliss2bhk/1000071383.jpg",
      "/properties/naturebliss2bhk/1000075161.jpg",
      "/properties/naturebliss2bhk/1000075169.jpg",
      "/properties/naturebliss2bhk/1000075170.jpg",
      "/properties/naturebliss2bhk/1000075171.jpg",
    ],
    imageCategories: [
      {
        name: "Rooms",
        images: ["/properties/naturebliss2bhk/1000071380.jpg", "/properties/naturebliss2bhk/1000071383.jpg", "/properties/naturebliss2bhk/1000075161.jpg"],
      },
      {
        name: "Other",
        images: ["/properties/naturebliss2bhk/1000075169.jpg", "/properties/naturebliss2bhk/1000075170.jpg", "/properties/naturebliss2bhk/1000075171.jpg"],
      }
    ],
    amenities: ["Wifi", "Kitchen", "Hot water", "TV", "Free parking", "Balcony"],
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricing: {
      basePrice: 2000,
      weekendPrice: 2500,
      seasonalPricing: [],
    },
    rating: 4.8,
    reviewCount: 34,
  },
  {
    id: "7",
    name: "Ground Floor Studio Room",
    slug: "ground-floor-studio-room",
    description: "A convenient and comfortable ground floor studio room in Mysore. Ideal for solo travelers or couples looking for a budget-friendly and accessible stay.",
    shortDescription: "Convenient ground floor studio room in Mysore.",
    location: "Mysuru",
    coordinates: { lat: 12.3052, lng: 76.6552 },
    images: [
      "/properties/groundfloorstudioroom/1000707120.jpg",
      "/properties/groundfloorstudioroom/1000707121.jpg",
      "/properties/groundfloorstudioroom/1000707124.jpg",
      "/properties/groundfloorstudioroom/1000707140.jpg",
      "/properties/groundfloorstudioroom/1000734830.jpg",
    ],
    imageCategories: [
      {
        name: "Rooms",
        images: ["/properties/groundfloorstudioroom/1000707120.jpg", "/properties/groundfloorstudioroom/1000707121.jpg", "/properties/groundfloorstudioroom/1000707124.jpg"],
      },
      {
        name: "Other",
        images: ["/properties/groundfloorstudioroom/1000707140.jpg", "/properties/groundfloorstudioroom/1000734830.jpg"],
      }
    ],
    amenities: ["Wifi", "Hot water", "TV", "Free parking"],
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricing: {
      basePrice: 1000,
      weekendPrice: 1200,
      seasonalPricing: [],
    },
    rating: 4.3,
    reviewCount: 8,
  }
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

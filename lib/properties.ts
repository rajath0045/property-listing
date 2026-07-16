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
  specifications: {
    propertyType: string
    bedArrangements: string[]
    bathDetails: string
    guestCapacity: string
  }
  houseRules: string[]
  bookingInformation: {
    checkIn: string
    checkOut: string
    selfCheckIn: boolean
    cancellationPolicy: string
  }
  nearbyPlaces: { name: string; distance: string; type: string }[]
}

export interface Landmark {
  name: string
  type: "railway" | "museum" | "palace" | "yoga" | "attraction"
  coordinates: { lat: number; lng: number }
  distance: string
}

export const properties: Property[] = [
  {
    "id": "rooftop-studio",
    "name": "Rooftop studio room in Gokulam",
    "slug": "rooftop-studio-room",
    "description": "Take a break and unwind at this peaceful oasis. Located in the heart of Gokulam, this cozy rooftop studio room offers a quiet and private space with scenic views of the surrounding neighborhood. It features a private attached bathroom, high-speed WiFi, a small kitchenette setup, and a spacious terrace area to relax and enjoy the fresh air. Ideal for solo travelers, couples, or yoga practitioners looking for a peaceful stay near all major shalas.",
    "shortDescription": "Cozy private rooftop studio room with attached bathroom and large terrace in Gokulam.",
    "location": "Gokulam, Mysuru",
    "coordinates": {
      "lat": 12.3339,
      "lng": 76.626
    },
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": 1,
    "maxGuests": 2,
    "rating": 5,
    "reviewCount": 4,
    "pricing": {
      "basePrice": 1200,
      "weekendPrice": 1400,
      "seasonalPricing": [
        {
          "season": "Dasara Festival",
          "startMonth": 9,
          "endMonth": 10,
          "price": 2200
        },
        {
          "season": "Winter Season",
          "startMonth": 12,
          "endMonth": 2,
          "price": 1800
        }
      ]
    },
    "specifications": {
      "propertyType": "Room in a rental unit",
      "bedArrangements": [
      "1 Double Bed"
      ],
      "bathDetails": "1 Private Attached Bathroom",
      "guestCapacity": "Up to 2 guests"
    },
    "amenities": [
      "Lock on bedroom door",
      "Kitchen",
      "Wifi",
      "Dedicated workspace",
      "Free parking on premises"
    ],
    "houseRules": [
      "Check-in after 12:00 PM",
      "Check-out before 11:00 AM",
      "2 guests maximum",
      "Commercial photography allowed",
      "Smoking is allowed"
    ],
    "bookingInformation": {
      "checkIn": "12:00 PM",
      "checkOut": "11:00 AM",
      "selfCheckIn": true,
      "cancellationPolicy": "Flexible (cancel up to 24 hours before arrival)"
    },
    "images": [
      "/properties/rooftop-studio-room/bedroom/109979da-1f3c-497f-b190-94532c6f0da8.avif",
      "/properties/rooftop-studio-room/bedroom/254a1744-e912-48da-b6ed-dac53da80150.avif",
      "/properties/rooftop-studio-room/bedroom/76bbeaa1-3202-47d0-b4b7-2e3ad45f96dd.avif",
      "/properties/rooftop-studio-room/bedroom/cf5cb706-6ac3-46e3-a057-9968579eb461.avif",
      "/properties/rooftop-studio-room/bedroom/f8c79ab2-a771-4666-9862-6c65d7905372.avif",
      "/properties/rooftop-studio-room/bathroom/14de22c3-8969-4dac-98e2-9dfd9e032af7.avif",
      "/properties/rooftop-studio-room/bathroom/69c1449e-39a1-4cd8-bcaa-788b9e2ae758.avif",
      "/properties/rooftop-studio-room/kitchen/b9c90c76-c837-4d2f-815b-5210fffb729a.avif",
      "/properties/rooftop-studio-room/kitchen/d94a8e2b-8f9c-4914-8d61-3bc13ee166ac.avif",
      "/properties/rooftop-studio-room/exterior/0cda5a18-1eb4-4826-a0b3-5c955d716332.avif",
      "/properties/rooftop-studio-room/exterior/2bd7197f-eaba-4169-b5db-024c52d699b9.avif",
      "/properties/rooftop-studio-room/exterior/5907c17c-9efe-4d2d-aead-a6baf211dd41.avif",
      "/properties/rooftop-studio-room/exterior/8df70c79-e431-4e1c-b7e6-c663f7602e37.avif",
      "/properties/rooftop-studio-room/exterior/a59f63c7-d0cb-4551-8908-14acf20163a4.avif",
      "/properties/rooftop-studio-room/exterior/c82780c4-3133-44fe-9632-40eb618d461b.avif",
      "/properties/rooftop-studio-room/additional/64f03761-89e1-4b7d-b9c2-610766bfce64.avif",
      "/properties/rooftop-studio-room/additional/eb9f6ee0-8457-476d-a341-a538951b0525.avif"
    ],
    "imageCategories": [
      {
        "name": "Bedroom",
        "images": [
          "/properties/rooftop-studio-room/bedroom/109979da-1f3c-497f-b190-94532c6f0da8.avif",
          "/properties/rooftop-studio-room/bedroom/254a1744-e912-48da-b6ed-dac53da80150.avif",
          "/properties/rooftop-studio-room/bedroom/76bbeaa1-3202-47d0-b4b7-2e3ad45f96dd.avif",
          "/properties/rooftop-studio-room/bedroom/cf5cb706-6ac3-46e3-a057-9968579eb461.avif",
          "/properties/rooftop-studio-room/bedroom/f8c79ab2-a771-4666-9862-6c65d7905372.avif"
        ]
      },
      {
        "name": "Bathroom",
        "images": [
          "/properties/rooftop-studio-room/bathroom/14de22c3-8969-4dac-98e2-9dfd9e032af7.avif",
          "/properties/rooftop-studio-room/bathroom/69c1449e-39a1-4cd8-bcaa-788b9e2ae758.avif"
        ]
      },
      {
        "name": "Kitchen",
        "images": [
          "/properties/rooftop-studio-room/kitchen/b9c90c76-c837-4d2f-815b-5210fffb729a.avif",
          "/properties/rooftop-studio-room/kitchen/d94a8e2b-8f9c-4914-8d61-3bc13ee166ac.avif"
        ]
      },
      {
        "name": "Exterior",
        "images": [
          "/properties/rooftop-studio-room/exterior/0cda5a18-1eb4-4826-a0b3-5c955d716332.avif",
          "/properties/rooftop-studio-room/exterior/2bd7197f-eaba-4169-b5db-024c52d699b9.avif",
          "/properties/rooftop-studio-room/exterior/5907c17c-9efe-4d2d-aead-a6baf211dd41.avif",
          "/properties/rooftop-studio-room/exterior/8df70c79-e431-4e1c-b7e6-c663f7602e37.avif",
          "/properties/rooftop-studio-room/exterior/a59f63c7-d0cb-4551-8908-14acf20163a4.avif",
          "/properties/rooftop-studio-room/exterior/c82780c4-3133-44fe-9632-40eb618d461b.avif"
        ]
      },
      {
        "name": "Additional",
        "images": [
          "/properties/rooftop-studio-room/additional/64f03761-89e1-4b7d-b9c2-610766bfce64.avif",
          "/properties/rooftop-studio-room/additional/eb9f6ee0-8457-476d-a341-a538951b0525.avif"
        ]
      }
    ],
    "nearbyPlaces": [
      {
        "name": "Yoga Center (Gokulam Shalas)",
        "distance": "0.2 km - 0.8 km",
        "type": "yoga"
      },
      {
        "name": "Mysuru Railway Station",
        "distance": "2.5 km",
        "type": "railway"
      },
      {
        "name": "Mysuru Palace",
        "distance": "4.5 km",
        "type": "palace"
      },
      {
        "name": "Mysore Rail Museum",
        "distance": "2.8 km",
        "type": "museum"
      },
      {
        "name": "Chamundi Hills",
        "distance": "9.0 km",
        "type": "attraction"
      }
    ]
  },
  {
    "id": "ground-floor-brand-new",
    "name": "Ground Floor Brand New 2BR House",
    "slug": "ground-floor-brand-new",
    "description": "Take a break and unwind at this peaceful oasis. It is a brand new ground floor 2 BHK house located at the center of the city in Gokulam, Mysuru. It features 2 comfortable bedrooms, 1 attached bathroom, and 1 general bathroom. The property boasts uninterrupted power supply (UPS/Inverter), 24/7 water, and high-speed internet. Includes a fully equipped kitchen (fridge, washing machine, gas stove) and dedicated car parking right in front of the house. Centrally located, it is close to the Railway Station, Palace, GRS Fantasy Park, and all major yoga shalas in Gokulam. Couples are allowed.",
    "shortDescription": "Brand new ground floor 2BR homestay with UPS backup, centrally located near yoga shalas.",
    "location": "Gokulam, Mysuru",
    "coordinates": {
      "lat": 12.3321,
      "lng": 76.6263
    },
    "bedrooms": 2,
    "beds": 2,
    "bathrooms": 2,
    "maxGuests": 4,
    "rating": 4.93,
    "reviewCount": 42,
    "pricing": {
      "basePrice": 1800,
      "weekendPrice": 2200,
      "seasonalPricing": [
        {
          "season": "Dasara Festival",
          "startMonth": 9,
          "endMonth": 10,
          "price": 3000
        },
        {
          "season": "Winter Season",
          "startMonth": 12,
          "endMonth": 2,
          "price": 2500
        }
      ]
    },
    "specifications": {
      "propertyType": "Entire home (2 BHK House)",
      "bedArrangements": [
        "2 Queen Beds"
      ],
      "bathDetails": "2 Bathrooms (1 Attached, 1 General)",
      "guestCapacity": "Up to 4 guests"
    },
    "amenities": [
      "Wifi",
      "Full kitchen",
      "Hot water",
      "Washing machine",
      "Refrigerator",
      "UPS Power Backup",
      "Gas stove",
      "Dining area",
      "Car parking",
      "Couples allowed",
      "Self check-in",
      "Iron",
      "TV",
      "Ceiling fan"
    ],
    "houseRules": [
      "Check-in after 12:00 PM",
      "Check-out before 11:00 AM",
      "No smoking inside",
      "Quiet hours after 10:00 PM",
      "Car parking in front of house"
    ],
    "bookingInformation": {
      "checkIn": "12:00 PM",
      "checkOut": "11:00 AM",
      "selfCheckIn": true,
      "cancellationPolicy": "Flexible"
    },
    "images": [
      "/properties/ground-floor-brand-new/bedroom 1/22297820-d57b-44e5-8f64-c732fd42a580.avif",
      "/properties/ground-floor-brand-new/bedroom 1/238ab7d9-b28f-4277-b0a9-39eab487c8cf.avif",
      "/properties/ground-floor-brand-new/bedroom 1/3041ff6d-dcb8-45a0-a548-7673c0c3841a.avif",
      "/properties/ground-floor-brand-new/bedroom 1/4e520955-5b96-4b1d-b09d-5790cbde0f0e.avif",
      "/properties/ground-floor-brand-new/bedroom 1/851d8669-7026-4e10-ab5f-74048027b0e5.avif",
      "/properties/ground-floor-brand-new/bedroom 1/8c183f19-d656-4419-93fd-23504364bd8d.avif",
      "/properties/ground-floor-brand-new/bedroom 1/982b2ece-28d7-443e-8fbc-d473cb5bff23.avif",
      "/properties/ground-floor-brand-new/bedroom 1/ad29622d-762e-4296-bc96-381ec64b2b23.avif",
      "/properties/ground-floor-brand-new/bedroom 1/dcc09a12-5bb2-45ea-8777-689089f74d99.avif",
      "/properties/ground-floor-brand-new/bedroom 1/fce363e7-8285-4d40-88f8-0a37057a43d1.avif",
      "/properties/ground-floor-brand-new/bedroom 2/04afc3a7-1b8b-47c6-8d3e-9805c3e8a097.avif",
      "/properties/ground-floor-brand-new/bedroom 2/124d2c90-f4c0-46cb-9297-156ce6ef4c95.avif",
      "/properties/ground-floor-brand-new/bedroom 2/167d00b8-2c41-4624-92cb-c04e6d09fbe6.avif",
      "/properties/ground-floor-brand-new/bedroom 2/9b0abc19-f0ce-4dae-87d1-c582bba8526d.avif",
      "/properties/ground-floor-brand-new/bedroom 2/b1023be5-4fba-4392-b134-7eb9e33b8d93.avif",
      "/properties/ground-floor-brand-new/bedroom 2/d2b34193-67ab-4389-926c-a38fe02e2bc1.avif",
      "/properties/ground-floor-brand-new/bathroom 1/6b7541e4-1ac2-431f-afec-be6ed4875766.avif",
      "/properties/ground-floor-brand-new/bathroom 1/de5358e3-d431-41a3-b2c7-32f81cde1e5f.avif",
      "/properties/ground-floor-brand-new/bathroom 2/5e82a3a9-1e6a-4c2f-8396-626b58619b73.avif",
      "/properties/ground-floor-brand-new/bathroom 2/87b9c458-98b5-43aa-91e8-4c389bf46a71.avif",
      "/properties/ground-floor-brand-new/bathroom 2/d0eb2bb3-6d17-4d90-bfd3-b3590bf99b05.avif",
      "/properties/ground-floor-brand-new/living room/7f45466b-bcff-47b4-94ee-c0676f8ffee7.avif",
      "/properties/ground-floor-brand-new/dining area/042ddc3a-adf0-45c2-aa56-8c26c479d451.avif",
      "/properties/ground-floor-brand-new/dining area/1a96c92c-1fa6-41dc-80c9-1f1015fff467.avif",
      "/properties/ground-floor-brand-new/dining area/7da68556-ee8e-4403-849b-014695f94c7e.avif",
      "/properties/ground-floor-brand-new/dining area/bac961d3-e53b-4bfc-9ea5-fb1450ed1ba3.avif",
      "/properties/ground-floor-brand-new/full kitchen/39577cf8-4aec-4962-83d9-03ac8c6c63bf.avif",
      "/properties/ground-floor-brand-new/full kitchen/4cbaa9c1-2082-4460-8c34-74cb519a5952.avif",
      "/properties/ground-floor-brand-new/full kitchen/a4b72717-6514-4055-8b45-61cd00be217b.avif",
      "/properties/ground-floor-brand-new/full kitchen/e9e5f505-2cea-4e6e-9833-a2c4737ec50c.avif",
      "/properties/ground-floor-brand-new/exterior/2c2770b9-9533-461a-a619-85fe70163ecc.avif",
      "/properties/ground-floor-brand-new/exterior/324460bd-c98e-49f5-8b74-dfe3695f23a8.avif",
      "/properties/ground-floor-brand-new/exterior/6977968f-4730-4382-967c-04697f08708e.avif",
      "/properties/ground-floor-brand-new/exterior/bb7fd03b-02d2-4e9d-9d96-8c3f3b9e59cb.avif",
      "/properties/ground-floor-brand-new/additional/34f09a1e-4a15-4715-9d73-0c32640f2c0e.avif"
    ],
    "imageCategories": [
      {
        "name": "Bedroom 1",
        "images": [
          "/properties/ground-floor-brand-new/bedroom 1/22297820-d57b-44e5-8f64-c732fd42a580.avif",
          "/properties/ground-floor-brand-new/bedroom 1/238ab7d9-b28f-4277-b0a9-39eab487c8cf.avif",
          "/properties/ground-floor-brand-new/bedroom 1/3041ff6d-dcb8-45a0-a548-7673c0c3841a.avif",
          "/properties/ground-floor-brand-new/bedroom 1/4e520955-5b96-4b1d-b09d-5790cbde0f0e.avif",
          "/properties/ground-floor-brand-new/bedroom 1/851d8669-7026-4e10-ab5f-74048027b0e5.avif",
          "/properties/ground-floor-brand-new/bedroom 1/8c183f19-d656-4419-93fd-23504364bd8d.avif",
          "/properties/ground-floor-brand-new/bedroom 1/982b2ece-28d7-443e-8fbc-d473cb5bff23.avif",
          "/properties/ground-floor-brand-new/bedroom 1/ad29622d-762e-4296-bc96-381ec64b2b23.avif",
          "/properties/ground-floor-brand-new/bedroom 1/dcc09a12-5bb2-45ea-8777-689089f74d99.avif",
          "/properties/ground-floor-brand-new/bedroom 1/fce363e7-8285-4d40-88f8-0a37057a43d1.avif"
        ]
      },
      {
        "name": "Bedroom 2",
        "images": [
          "/properties/ground-floor-brand-new/bedroom 2/04afc3a7-1b8b-47c6-8d3e-9805c3e8a097.avif",
          "/properties/ground-floor-brand-new/bedroom 2/124d2c90-f4c0-46cb-9297-156ce6ef4c95.avif",
          "/properties/ground-floor-brand-new/bedroom 2/167d00b8-2c41-4624-92cb-c04e6d09fbe6.avif",
          "/properties/ground-floor-brand-new/bedroom 2/9b0abc19-f0ce-4dae-87d1-c582bba8526d.avif",
          "/properties/ground-floor-brand-new/bedroom 2/b1023be5-4fba-4392-b134-7eb9e33b8d93.avif",
          "/properties/ground-floor-brand-new/bedroom 2/d2b34193-67ab-4389-926c-a38fe02e2bc1.avif"
        ]
      },
      {
        "name": "Bathroom 1",
        "images": [
          "/properties/ground-floor-brand-new/bathroom 1/6b7541e4-1ac2-431f-afec-be6ed4875766.avif",
          "/properties/ground-floor-brand-new/bathroom 1/de5358e3-d431-41a3-b2c7-32f81cde1e5f.avif"
        ]
      },
      {
        "name": "Bathroom 2",
        "images": [
          "/properties/ground-floor-brand-new/bathroom 2/5e82a3a9-1e6a-4c2f-8396-626b58619b73.avif",
          "/properties/ground-floor-brand-new/bathroom 2/87b9c458-98b5-43aa-91e8-4c389bf46a71.avif",
          "/properties/ground-floor-brand-new/bathroom 2/d0eb2bb3-6d17-4d90-bfd3-b3590bf99b05.avif"
        ]
      },
      {
        "name": "Living Room",
        "images": [
          "/properties/ground-floor-brand-new/living room/7f45466b-bcff-47b4-94ee-c0676f8ffee7.avif"
        ]
      },
      {
        "name": "Dining Area",
        "images": [
          "/properties/ground-floor-brand-new/dining area/042ddc3a-adf0-45c2-aa56-8c26c479d451.avif",
          "/properties/ground-floor-brand-new/dining area/1a96c92c-1fa6-41dc-80c9-1f1015fff467.avif",
          "/properties/ground-floor-brand-new/dining area/7da68556-ee8e-4403-849b-014695f94c7e.avif",
          "/properties/ground-floor-brand-new/dining area/bac961d3-e53b-4bfc-9ea5-fb1450ed1ba3.avif"
        ]
      },
      {
        "name": "Full Kitchen",
        "images": [
          "/properties/ground-floor-brand-new/full kitchen/39577cf8-4aec-4962-83d9-03ac8c6c63bf.avif",
          "/properties/ground-floor-brand-new/full kitchen/4cbaa9c1-2082-4460-8c34-74cb519a5952.avif",
          "/properties/ground-floor-brand-new/full kitchen/a4b72717-6514-4055-8b45-61cd00be217b.avif",
          "/properties/ground-floor-brand-new/full kitchen/e9e5f505-2cea-4e6e-9833-a2c4737ec50c.avif"
        ]
      },
      {
        "name": "Exterior",
        "images": [
          "/properties/ground-floor-brand-new/exterior/2c2770b9-9533-461a-a619-85fe70163ecc.avif",
          "/properties/ground-floor-brand-new/exterior/324460bd-c98e-49f5-8b74-dfe3695f23a8.avif",
          "/properties/ground-floor-brand-new/exterior/6977968f-4730-4382-967c-04697f08708e.avif",
          "/properties/ground-floor-brand-new/exterior/bb7fd03b-02d2-4e9d-9d96-8c3f3b9e59cb.avif"
        ]
      },
      {
        "name": "Additional",
        "images": [
          "/properties/ground-floor-brand-new/additional/34f09a1e-4a15-4715-9d73-0c32640f2c0e.avif"
        ]
      }
    ],
    "nearbyPlaces": [
      {
        "name": "Yoga Center (Gokulam Shalas)",
        "distance": "0.2 km - 0.8 km",
        "type": "yoga"
      },
      {
        "name": "Mysuru Railway Station",
        "distance": "2.5 km",
        "type": "railway"
      },
      {
        "name": "Mysuru Palace",
        "distance": "4.5 km",
        "type": "palace"
      },
      {
        "name": "Mysore Rail Museum",
        "distance": "2.8 km",
        "type": "museum"
      },
      {
        "name": "Chamundi Hills",
        "distance": "9.0 km",
        "type": "attraction"
      }
    ]
  },
  {
    "id": "studio-room-gokulam",
    "name": "Ground Floor Studio Room in Gokulam",
    "slug": "studio-room-gokulam",
    "description": "It is a convenient and comfortable ground floor studio room located in the heart of Gokulam, Mysuru. Perfect for solo travelers, students, or couples looking for a budget-friendly stay. Features include high-speed WiFi, a refrigerator, a washing machine, and UPS power backup. The space has an open room layout with a double bed and an open kitchen equipped with a gas stove and basic cooking utensils. Located in a quiet neighborhood with easy access to yoga shalas, cafes, parks, the railway station, and Mysuru Palace.",
    "shortDescription": "Cozy ground floor studio with WiFi, kitchen, and UPS backup in Gokulam.",
    "location": "Gokulam, Mysuru",
    "coordinates": {
      "lat": 12.332,
      "lng": 76.6264
    },
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": 1,
    "maxGuests": 2,
    "rating": 4.75,
    "reviewCount": 18,
    "pricing": {
      "basePrice": 1000,
      "weekendPrice": 1200,
      "seasonalPricing": [
        {
          "season": "Dasara Festival",
          "startMonth": 9,
          "endMonth": 10,
          "price": 1800
        },
        {
          "season": "Winter Season",
          "startMonth": 12,
          "endMonth": 2,
          "price": 1400
        }
      ]
    },
    "specifications": {
      "propertyType": "Entire home (Studio Room)",
      "bedArrangements": [
        "1 Double Bed"
      ],
      "bathDetails": "1 Bathroom",
      "guestCapacity": "Up to 2 guests"
    },
    "amenities": [
      "Wifi",
      "Kitchen",
      "Hot water",
      "Washing machine",
      "Refrigerator",
      "UPS Power Backup",
      "Gas stove",
      "Cooking basics",
      "Ceiling fan",
      "Free parking"
    ],
    "houseRules": [
      "Check-in after 12:00 PM",
      "Check-out before 11:00 AM",
      "Couples allowed",
      "Quiet hours after 10:00 PM",
      "No smoking inside"
    ],
    "bookingInformation": {
      "checkIn": "12:00 PM",
      "checkOut": "11:00 AM",
      "selfCheckIn": true,
      "cancellationPolicy": "Flexible"
    },
    "images": [
      "/properties/studio-room-gokulam/bedroom/a6c1153a-e42e-4c34-836d-6fc89c1d5505.avif",
      "/properties/studio-room-gokulam/bedroom/b333c725-e7dc-4788-965a-010c53610b86.avif",
      "/properties/studio-room-gokulam/bedroom/d6dcf13c-62ac-4829-b56c-e8fdbb5d2ff9.avif",
      "/properties/studio-room-gokulam/bathroom/d1234ea9-c217-45eb-a03f-1a354e64b393.avif",
      "/properties/studio-room-gokulam/additional/14415c00-f110-4cbb-8091-3dc5374cc76f.avif",
      "/properties/studio-room-gokulam/additional/530cbfb0-e305-4433-8f6a-7c4eb4038946.avif",
      "/properties/studio-room-gokulam/additional/568df941-f467-45e3-af99-a187ebd29da2.avif",
      "/properties/studio-room-gokulam/additional/8d06a6ec-bde3-4c52-8649-c4456b489d2e.avif",
      "/properties/studio-room-gokulam/additional/b128e284-5db1-4d7b-8eb3-7eb851d93b29.avif",
      "/properties/studio-room-gokulam/additional/e50fcd65-bdf3-4fb4-a09a-bb3fb0aa201b.avif"
    ],
    "imageCategories": [
      {
        "name": "Bedroom",
        "images": [
          "/properties/studio-room-gokulam/bedroom/a6c1153a-e42e-4c34-836d-6fc89c1d5505.avif",
          "/properties/studio-room-gokulam/bedroom/b333c725-e7dc-4788-965a-010c53610b86.avif",
          "/properties/studio-room-gokulam/bedroom/d6dcf13c-62ac-4829-b56c-e8fdbb5d2ff9.avif"
        ]
      },
      {
        "name": "Bathroom",
        "images": [
          "/properties/studio-room-gokulam/bathroom/d1234ea9-c217-45eb-a03f-1a354e64b393.avif"
        ]
      },
      {
        "name": "Additional",
        "images": [
          "/properties/studio-room-gokulam/additional/14415c00-f110-4cbb-8091-3dc5374cc76f.avif",
          "/properties/studio-room-gokulam/additional/530cbfb0-e305-4433-8f6a-7c4eb4038946.avif",
          "/properties/studio-room-gokulam/additional/568df941-f467-45e3-af99-a187ebd29da2.avif",
          "/properties/studio-room-gokulam/additional/8d06a6ec-bde3-4c52-8649-c4456b489d2e.avif",
          "/properties/studio-room-gokulam/additional/b128e284-5db1-4d7b-8eb3-7eb851d93b29.avif",
          "/properties/studio-room-gokulam/additional/e50fcd65-bdf3-4fb4-a09a-bb3fb0aa201b.avif"
        ]
      }
    ],
    "nearbyPlaces": [
      {
        "name": "Yoga Center (Gokulam Shalas)",
        "distance": "0.2 km - 0.8 km",
        "type": "yoga"
      },
      {
        "name": "Mysuru Railway Station",
        "distance": "2.5 km",
        "type": "railway"
      },
      {
        "name": "Mysuru Palace",
        "distance": "4.5 km",
        "type": "palace"
      },
      {
        "name": "Mysore Rail Museum",
        "distance": "2.8 km",
        "type": "museum"
      },
      {
        "name": "Chamundi Hills",
        "distance": "9.0 km",
        "type": "attraction"
      }
    ]
  },
  {
    "id": "natures-bliss-gokulam",
    "name": "Nature's Bliss - 2BR Homestay in Gokulam",
    "slug": "natures-bliss-gokulam",
    "description": "Make memories at this nature-friendly, light-filled home surrounded by positive vibes. Located in the heart of Gokulam, Mysore, it sits directly in front of a forest, allowing you to wake up to birds chirping and serene calmness. The property features 2 spacious bedrooms with queen beds, a dining table, power backup (inverter), 1 full bathroom, and 1 attached toilet (1.5 bathrooms). Enjoy outdoor spaces with a sit-out terrace and two balconies. Features mosquito-netted windows for comfort. It is within walkable distance to all major Gokulam yoga shalas (Yoga with Srinatha, Ashtanga Sadhana, Prana Vashya, Sachidananda Yoga Shala) and close to the Railway Station, Palace, GRS Fantasy Park, and cafes. Couples are allowed. Includes 2 car parking spaces.",
    "shortDescription": "Nature-friendly 2BR home facing a forest, walkable to all yoga shalas in Gokulam.",
    "location": "Gokulam, Mysuru",
    "coordinates": {
      "lat": 12.3317,
      "lng": 76.624
    },
    "bedrooms": 2,
    "beds": 2,
    "bathrooms": 1.5,
    "maxGuests": 5,
    "rating": 4.92,
    "reviewCount": 34,
    "pricing": {
      "basePrice": 2000,
      "weekendPrice": 2500,
      "seasonalPricing": [
        {
          "season": "Dasara Festival",
          "startMonth": 9,
          "endMonth": 10,
          "price": 3500
        },
        {
          "season": "Winter Season",
          "startMonth": 12,
          "endMonth": 2,
          "price": 2800
        }
      ]
    },
    "specifications": {
      "propertyType": "Entire home (2 BHK)",
      "bedArrangements": [
        "2 Queen Beds"
      ],
      "bathDetails": "1.5 Bathrooms (1 Full Bathroom, 1 Guest Toilet)",
      "guestCapacity": "Up to 5 guests"
    },
    "amenities": [
      "Wifi",
      "Kitchen",
      "Hot water",
      "Inverter backup",
      "Balcony",
      "Terrace sit out",
      "Dining table",
      "Mosquito nets",
      "Free parking",
      "Washing machine",
      "Refrigerator",
      "Couples allowed"
    ],
    "houseRules": [
      "Check-in after 1:00 PM",
      "Check-out before 11:00 AM",
      "Keep balcony doors shut in evening for bugs",
      "Quiet hours after 10:00 PM",
      "No smoking inside"
    ],
    "bookingInformation": {
      "checkIn": "1:00 PM",
      "checkOut": "11:00 AM",
      "selfCheckIn": true,
      "cancellationPolicy": "Flexible"
    },
    "images": [
      "/properties/natures-bliss-gokulam/bedroom 1/42766792-c81e-4650-85d2-6e478ed01407.avif",
      "/properties/natures-bliss-gokulam/bedroom 1/8501bccc-79c9-45b9-9d3a-0c5932ff3548.avif",
      "/properties/natures-bliss-gokulam/bedroom 1/86525d3a-bf79-4812-8f74-26dc8dc252da.avif",
      "/properties/natures-bliss-gokulam/bedroom 1/b595763d-b814-4e99-ab76-898e29cb28cb.avif",
      "/properties/natures-bliss-gokulam/bedroom 1/b84c15fe-c220-4362-8020-26a33c806c58.avif",
      "/properties/natures-bliss-gokulam/bedroom 1/ba7c82bb-42e5-4558-bcc4-1236cf603495.avif",
      "/properties/natures-bliss-gokulam/bedroom 2/021e1335-ef3b-4cc9-aa98-7b5e2d6c1ebf.avif",
      "/properties/natures-bliss-gokulam/bedroom 2/1d9fb0aa-c017-4528-a792-a4775f066c95.avif",
      "/properties/natures-bliss-gokulam/bathroom/0795247c-1607-45ad-b018-d0a0d247fa1a.avif",
      "/properties/natures-bliss-gokulam/bathroom/2bcf448b-ced1-4d27-bf81-bba1f9570feb.avif",
      "/properties/natures-bliss-gokulam/bathroom/b3059cab-395f-4ba5-a851-f610dab55dca.avif",
      "/properties/natures-bliss-gokulam/wc/4a8d9381-9fc3-4bb4-b25f-bcce0bfe40bb.avif",
      "/properties/natures-bliss-gokulam/living room/4e883b4b-9bcd-4ecd-9f7d-4e1bcc75ab30.avif",
      "/properties/natures-bliss-gokulam/living room/6a4a5841-8fb4-4440-b69d-a00499773b48.avif",
      "/properties/natures-bliss-gokulam/dining area/089211b3-7e6a-4a0a-962d-576b48b3cbef.avif",
      "/properties/natures-bliss-gokulam/dining area/104273b2-1fe8-4902-b967-32e110c12b6e.avif",
      "/properties/natures-bliss-gokulam/kitchen/79b82b13-97b7-46b2-bce4-0ce0f8c771d1.avif",
      "/properties/natures-bliss-gokulam/kitchen/bdc01bd2-0c41-495c-bbce-6cbe81ffa4be.avif",
      "/properties/natures-bliss-gokulam/kitchen/f7a24dba-2274-44de-848e-e783b520faeb.avif",
      "/properties/natures-bliss-gokulam/kitchen/f7a714e1-205f-44dd-83ac-65bbeeaf1322.avif",
      "/properties/natures-bliss-gokulam/kitchen/fca04042-10f6-4f10-9944-65af296eab5f.avif",
      "/properties/natures-bliss-gokulam/kitchenette/0b1d524a-94d4-478f-a615-db087b83ee0f.avif",
      "/properties/natures-bliss-gokulam/kitchenette/8c0136c9-f4b2-4b12-99d1-8951d5c05733.avif",
      "/properties/natures-bliss-gokulam/kitchenette/df9130ac-3f18-44d6-822c-6b91082e3f41.avif",
      "/properties/natures-bliss-gokulam/kitchenette/eb0793f1-395c-4714-a2e9-9919c3cc204c.avif",
      "/properties/natures-bliss-gokulam/exterior/230568ff-30fd-4e6a-ac1e-d8e4d41c5cf0.avif",
      "/properties/natures-bliss-gokulam/exterior/445c5386-d7f9-4ca9-a0b4-a3e019aef301.avif",
      "/properties/natures-bliss-gokulam/exterior/64c78889-4d97-452e-a5f8-e34aac575ed1.avif",
      "/properties/natures-bliss-gokulam/exterior/7206dee1-f86a-4ee7-b157-f5f06254d2f9.avif",
      "/properties/natures-bliss-gokulam/exterior/7ea74cb0-ce0a-4af3-9faa-4dc347b2ce18.avif",
      "/properties/natures-bliss-gokulam/exterior/b380f833-13ba-46cc-9185-6fe098dbddc6.avif",
      "/properties/natures-bliss-gokulam/additional/114e77f6-59fa-4b63-9a78-1c4bc8d185e7.avif",
      "/properties/natures-bliss-gokulam/additional/30d33b0a-c7c8-453c-9c78-8a402fd97001.avif",
      "/properties/natures-bliss-gokulam/additional/3b44c756-328f-484b-87a6-8bf52794f93f.avif",
      "/properties/natures-bliss-gokulam/additional/4d3afe8a-5e00-4489-92b2-52d3f1398b2b.avif",
      "/properties/natures-bliss-gokulam/additional/74c7981d-c553-40ac-942f-d69f756a1b0b.avif",
      "/properties/natures-bliss-gokulam/additional/aa69af80-996e-4d47-ae03-50acfe7990b4.avif",
      "/properties/natures-bliss-gokulam/additional/dd8a2ea5-0020-4889-b841-0a9e780a1663.avif",
      "/properties/natures-bliss-gokulam/additional/e98363e9-3e1e-4d1a-9f22-afff365e18ba.avif",
      "/properties/natures-bliss-gokulam/additional/ee198758-4106-4dc3-bb37-59e845eecd47.avif"
    ],
    "imageCategories": [
      {
        "name": "Bedroom 1",
        "images": [
          "/properties/natures-bliss-gokulam/bedroom 1/42766792-c81e-4650-85d2-6e478ed01407.avif",
          "/properties/natures-bliss-gokulam/bedroom 1/8501bccc-79c9-45b9-9d3a-0c5932ff3548.avif",
          "/properties/natures-bliss-gokulam/bedroom 1/86525d3a-bf79-4812-8f74-26dc8dc252da.avif",
          "/properties/natures-bliss-gokulam/bedroom 1/b595763d-b814-4e99-ab76-898e29cb28cb.avif",
          "/properties/natures-bliss-gokulam/bedroom 1/b84c15fe-c220-4362-8020-26a33c806c58.avif",
          "/properties/natures-bliss-gokulam/bedroom 1/ba7c82bb-42e5-4558-bcc4-1236cf603495.avif"
        ]
      },
      {
        "name": "Bedroom 2",
        "images": [
          "/properties/natures-bliss-gokulam/bedroom 2/021e1335-ef3b-4cc9-aa98-7b5e2d6c1ebf.avif",
          "/properties/natures-bliss-gokulam/bedroom 2/1d9fb0aa-c017-4528-a792-a4775f066c95.avif"
        ]
      },
      {
        "name": "Bathroom",
        "images": [
          "/properties/natures-bliss-gokulam/bathroom/0795247c-1607-45ad-b018-d0a0d247fa1a.avif",
          "/properties/natures-bliss-gokulam/bathroom/2bcf448b-ced1-4d27-bf81-bba1f9570feb.avif",
          "/properties/natures-bliss-gokulam/bathroom/b3059cab-395f-4ba5-a851-f610dab55dca.avif"
        ]
      },
      {
        "name": "Toilet",
        "images": [
          "/properties/natures-bliss-gokulam/wc/4a8d9381-9fc3-4bb4-b25f-bcce0bfe40bb.avif"
        ]
      },
      {
        "name": "Living Room",
        "images": [
          "/properties/natures-bliss-gokulam/living room/4e883b4b-9bcd-4ecd-9f7d-4e1bcc75ab30.avif",
          "/properties/natures-bliss-gokulam/living room/6a4a5841-8fb4-4440-b69d-a00499773b48.avif"
        ]
      },
      {
        "name": "Dining Area",
        "images": [
          "/properties/natures-bliss-gokulam/dining area/089211b3-7e6a-4a0a-962d-576b48b3cbef.avif",
          "/properties/natures-bliss-gokulam/dining area/104273b2-1fe8-4902-b967-32e110c12b6e.avif"
        ]
      },
      {
        "name": "Kitchen",
        "images": [
          "/properties/natures-bliss-gokulam/kitchen/79b82b13-97b7-46b2-bce4-0ce0f8c771d1.avif",
          "/properties/natures-bliss-gokulam/kitchen/bdc01bd2-0c41-495c-bbce-6cbe81ffa4be.avif",
          "/properties/natures-bliss-gokulam/kitchen/f7a24dba-2274-44de-848e-e783b520faeb.avif",
          "/properties/natures-bliss-gokulam/kitchen/f7a714e1-205f-44dd-83ac-65bbeeaf1322.avif",
          "/properties/natures-bliss-gokulam/kitchen/fca04042-10f6-4f10-9944-65af296eab5f.avif"
        ]
      },
      {
        "name": "Kitchenette",
        "images": [
          "/properties/natures-bliss-gokulam/kitchenette/0b1d524a-94d4-478f-a615-db087b83ee0f.avif",
          "/properties/natures-bliss-gokulam/kitchenette/8c0136c9-f4b2-4b12-99d1-8951d5c05733.avif",
          "/properties/natures-bliss-gokulam/kitchenette/df9130ac-3f18-44d6-822c-6b91082e3f41.avif",
          "/properties/natures-bliss-gokulam/kitchenette/eb0793f1-395c-4714-a2e9-9919c3cc204c.avif"
        ]
      },
      {
        "name": "Exterior",
        "images": [
          "/properties/natures-bliss-gokulam/exterior/230568ff-30fd-4e6a-ac1e-d8e4d41c5cf0.avif",
          "/properties/natures-bliss-gokulam/exterior/445c5386-d7f9-4ca9-a0b4-a3e019aef301.avif",
          "/properties/natures-bliss-gokulam/exterior/64c78889-4d97-452e-a5f8-e34aac575ed1.avif",
          "/properties/natures-bliss-gokulam/exterior/7206dee1-f86a-4ee7-b157-f5f06254d2f9.avif",
          "/properties/natures-bliss-gokulam/exterior/7ea74cb0-ce0a-4af3-9faa-4dc347b2ce18.avif",
          "/properties/natures-bliss-gokulam/exterior/b380f833-13ba-46cc-9185-6fe098dbddc6.avif"
        ]
      },
      {
        "name": "Additional",
        "images": [
          "/properties/natures-bliss-gokulam/additional/114e77f6-59fa-4b63-9a78-1c4bc8d185e7.avif",
          "/properties/natures-bliss-gokulam/additional/30d33b0a-c7c8-453c-9c78-8a402fd97001.avif",
          "/properties/natures-bliss-gokulam/additional/3b44c756-328f-484b-87a6-8bf52794f93f.avif",
          "/properties/natures-bliss-gokulam/additional/4d3afe8a-5e00-4489-92b2-52d3f1398b2b.avif",
          "/properties/natures-bliss-gokulam/additional/74c7981d-c553-40ac-942f-d69f756a1b0b.avif",
          "/properties/natures-bliss-gokulam/additional/aa69af80-996e-4d47-ae03-50acfe7990b4.avif",
          "/properties/natures-bliss-gokulam/additional/dd8a2ea5-0020-4889-b841-0a9e780a1663.avif",
          "/properties/natures-bliss-gokulam/additional/e98363e9-3e1e-4d1a-9f22-afff365e18ba.avif",
          "/properties/natures-bliss-gokulam/additional/ee198758-4106-4dc3-bb37-59e845eecd47.avif"
        ]
      }
    ],
    "nearbyPlaces": [
      {
        "name": "Yoga Center (Gokulam Shalas)",
        "distance": "0.2 km - 0.8 km",
        "type": "yoga"
      },
      {
        "name": "Mysuru Railway Station",
        "distance": "2.5 km",
        "type": "railway"
      },
      {
        "name": "Mysuru Palace",
        "distance": "4.5 km",
        "type": "palace"
      },
      {
        "name": "Mysore Rail Museum",
        "distance": "2.8 km",
        "type": "museum"
      },
      {
        "name": "Chamundi Hills",
        "distance": "9.0 km",
        "type": "attraction"
      }
    ]
  },
  {
    "id": "one-bedroom-house",
    "name": "one bedroom House",
    "slug": "one-bedroom-house",
    "description": "Relax with the whole family at this peaceful place to stay, close to all yoga shalas located at the heart of Gokulam, Mysore. Close to the railway station, palace, Chamundi Hill, and tourist places. Brand new one-bedroom kitchen house with two full bathrooms, WiFi, UPS or inverter backup, sofa, kitchen utensils, chair and table, cot and bed, stove, and terrace access at a very quiet location. Cafes, eateries, and parks are nearby.",
    "shortDescription": "Brand new one-bedroom house with two full bathrooms, WiFi, UPS backup, and terrace access.",
    "location": "Gokulam, Mysuru",
    "coordinates": {
      "lat": 12.3333,
      "lng": 76.6241
    },
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": 2,
    "maxGuests": 3,
    "rating": 4.85,
    "reviewCount": 41,
    "pricing": {
      "basePrice": 1500,
      "weekendPrice": 1800,
      "seasonalPricing": [
        {
          "season": "Dasara Festival",
          "startMonth": 9,
          "endMonth": 10,
          "price": 2500
        },
        {
          "season": "Winter Season",
          "startMonth": 12,
          "endMonth": 2,
          "price": 2000
        }
      ]
    },
    "specifications": {
      "propertyType": "Entire home (1 BHK House)",
      "bedArrangements": [
        "1 Double Bed"
      ],
      "bathDetails": "2 Full Bathrooms",
      "guestCapacity": "Up to 3 guests"
    },
    "amenities": [
      "Garden view",
      "Kitchen",
      "Wifi",
      "Dedicated workspace",
      "Free parking on premises",
      "UPS Power Backup",
      "Sofa",
      "Dining table",
      "Terrace",
      "Kitchen utensils",
      "Gas stove",
      "Couples allowed"
    ],
    "houseRules": [
      "Check-in: 12:00 PM - 9:00 PM",
      "Check-out before 11:00 AM",
      "Couples allowed",
      "3 guests maximum",
      "Keep terrace clean"
    ],
    "bookingInformation": {
      "checkIn": "12:00 PM - 9:00 PM",
      "checkOut": "11:00 AM",
      "selfCheckIn": true,
      "cancellationPolicy": "Flexible"
    },
    "images": [
      "/properties/one-bedroom-house/bedroom/6fbec0cb-3d6b-4aed-a407-59a035ccd15d.avif",
      "/properties/one-bedroom-house/bedroom/c677db64-065e-4fa2-a807-bf421b584214.avif",
      "/properties/one-bedroom-house/bedroom/efef6788-e728-4564-8e33-350abdc3a601.avif",
      "/properties/one-bedroom-house/bathroom 1/7f549af1-63fb-4df6-9426-37d7b190ccf2.avif",
      "/properties/one-bedroom-house/bathroom 2/3d3a9017-6047-4012-a60c-d3ce747da34d.avif",
      "/properties/one-bedroom-house/living room/10373eda-6991-4251-8c0e-0a22d4df1ec8.avif",
      "/properties/one-bedroom-house/living room/696b1564-73bd-4cd1-98a6-e9ab33243561.avif",
      "/properties/one-bedroom-house/living room/a5f34cc9-ed8e-4914-b4e6-7bf11797b99e.avif",
      "/properties/one-bedroom-house/kitchen/1c5623ea-2595-48eb-ba8b-dd0212324699.avif",
      "/properties/one-bedroom-house/kitchen/1f5a4874-8152-4220-9154-8fe4fb9e0628.avif",
      "/properties/one-bedroom-house/exterior/deab4c66-9eae-4d07-a0ee-5b532b231172.avif",
      "/properties/one-bedroom-house/exterior/fc73d1f7-ab53-4a26-8b63-a5614bc227fd.avif",
      "/properties/one-bedroom-house/additional/00b802f9-988b-4b8c-9e21-0e48fc005242.avif",
      "/properties/one-bedroom-house/additional/0d45829c-d979-4590-8c9a-e7ab98240e45.avif",
      "/properties/one-bedroom-house/additional/290108e0-d10a-4671-95d8-569ad392a790.avif",
      "/properties/one-bedroom-house/additional/77b9ca6d-6bd1-4b13-83d4-9d1a14627cbb.avif",
      "/properties/one-bedroom-house/additional/807d2a66-4d6d-417b-a2b0-41dd3dbcba38.avif",
      "/properties/one-bedroom-house/additional/abbd5f9e-1a88-4c4e-8fe8-f72b0ceaea40.avif",
      "/properties/one-bedroom-house/additional/c26ff1b4-2c13-49ee-8fed-0476e3a6c23d.avif",
      "/properties/one-bedroom-house/additional/cd3d0c90-0d90-4a3a-8b3d-ca092976a8e4.avif",
      "/properties/one-bedroom-house/additional/ee5e859b-5812-4af2-bf1f-d741d2dfcf62.avif"
    ],
    "imageCategories": [
      {
        "name": "Bedroom",
        "images": [
          "/properties/one-bedroom-house/bedroom/6fbec0cb-3d6b-4aed-a407-59a035ccd15d.avif",
          "/properties/one-bedroom-house/bedroom/c677db64-065e-4fa2-a807-bf421b584214.avif",
          "/properties/one-bedroom-house/bedroom/efef6788-e728-4564-8e33-350abdc3a601.avif"
        ]
      },
      {
        "name": "Bathroom 1",
        "images": [
          "/properties/one-bedroom-house/bathroom 1/7f549af1-63fb-4df6-9426-37d7b190ccf2.avif"
        ]
      },
      {
        "name": "Bathroom 2",
        "images": [
          "/properties/one-bedroom-house/bathroom 2/3d3a9017-6047-4012-a60c-d3ce747da34d.avif"
        ]
      },
      {
        "name": "Living Room",
        "images": [
          "/properties/one-bedroom-house/living room/10373eda-6991-4251-8c0e-0a22d4df1ec8.avif",
          "/properties/one-bedroom-house/living room/696b1564-73bd-4cd1-98a6-e9ab33243561.avif",
          "/properties/one-bedroom-house/living room/a5f34cc9-ed8e-4914-b4e6-7bf11797b99e.avif"
        ]
      },
      {
        "name": "Kitchen",
        "images": [
          "/properties/one-bedroom-house/kitchen/1c5623ea-2595-48eb-ba8b-dd0212324699.avif",
          "/properties/one-bedroom-house/kitchen/1f5a4874-8152-4220-9154-8fe4fb9e0628.avif"
        ]
      },
      {
        "name": "Exterior",
        "images": [
          "/properties/one-bedroom-house/exterior/deab4c66-9eae-4d07-a0ee-5b532b231172.avif",
          "/properties/one-bedroom-house/exterior/fc73d1f7-ab53-4a26-8b63-a5614bc227fd.avif"
        ]
      },
      {
        "name": "Additional",
        "images": [
          "/properties/one-bedroom-house/additional/00b802f9-988b-4b8c-9e21-0e48fc005242.avif",
          "/properties/one-bedroom-house/additional/0d45829c-d979-4590-8c9a-e7ab98240e45.avif",
          "/properties/one-bedroom-house/additional/290108e0-d10a-4671-95d8-569ad392a790.avif",
          "/properties/one-bedroom-house/additional/77b9ca6d-6bd1-4b13-83d4-9d1a14627cbb.avif",
          "/properties/one-bedroom-house/additional/807d2a66-4d6d-417b-a2b0-41dd3dbcba38.avif",
          "/properties/one-bedroom-house/additional/abbd5f9e-1a88-4c4e-8fe8-f72b0ceaea40.avif",
          "/properties/one-bedroom-house/additional/c26ff1b4-2c13-49ee-8fed-0476e3a6c23d.avif",
          "/properties/one-bedroom-house/additional/cd3d0c90-0d90-4a3a-8b3d-ca092976a8e4.avif",
          "/properties/one-bedroom-house/additional/ee5e859b-5812-4af2-bf1f-d741d2dfcf62.avif"
        ]
      }
    ],
    "nearbyPlaces": [
      {
        "name": "Yoga Center (Gokulam Shalas)",
        "distance": "0.2 km - 0.8 km",
        "type": "yoga"
      },
      {
        "name": "Mysuru Railway Station",
        "distance": "2.5 km",
        "type": "railway"
      },
      {
        "name": "Mysuru Palace",
        "distance": "4.5 km",
        "type": "palace"
      },
      {
        "name": "Mysore Rail Museum",
        "distance": "2.8 km",
        "type": "museum"
      },
      {
        "name": "Chamundi Hills",
        "distance": "9.0 km",
        "type": "attraction"
      }
    ]
  }
];

export const landmarks: Landmark[] = [
  { name: "Mysuru Railway Station", type: "railway", coordinates: { lat: 12.2958, lng: 76.6394 }, distance: "2.5 km" },
  { name: "Mysore Rail Museum", type: "museum", coordinates: { lat: 12.3050, lng: 76.6380 }, distance: "2.8 km" },
  { name: "Mysuru Palace", type: "palace", coordinates: { lat: 12.3052, lng: 76.6552 }, distance: "4.5 km" },
  { name: "Yoga Center (KPJAYI)", type: "yoga", coordinates: { lat: 12.3260, lng: 76.6400 }, distance: "0.5 km" },
  { name: "Chamundi Hills", type: "attraction", coordinates: { lat: 12.2724, lng: 76.6701 }, distance: "9.0 km" },
];

export const WHATSAPP_NUMBER = "919876543210"; // Actual WhatsApp Number

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getCurrentPrice(property: Property): number {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Check seasonal pricing first
  for (const seasonal of property.pricing.seasonalPricing) {
    if (seasonal.startMonth <= seasonal.endMonth) {
      if (currentMonth >= seasonal.startMonth && currentMonth <= seasonal.endMonth) {
        return seasonal.price;
      }
    } else {
      // Handle seasons that span year end (e.g., Dec to Feb)
      if (currentMonth >= seasonal.startMonth || currentMonth <= seasonal.endMonth) {
        return seasonal.price;
      }
    }
  }

  // Return weekend or base price
  return isWeekend ? property.pricing.weekendPrice : property.pricing.basePrice;
}

export function getPriceLabel(property: Property): string {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  for (const seasonal of property.pricing.seasonalPricing) {
    if (seasonal.startMonth <= seasonal.endMonth) {
      if (currentMonth >= seasonal.startMonth && currentMonth <= seasonal.endMonth) {
        return seasonal.season;
      }
    } else {
      if (currentMonth >= seasonal.startMonth || currentMonth <= seasonal.endMonth) {
        return seasonal.season;
      }
    }
  }

  return isWeekend ? "Weekend" : "Weekday";
}

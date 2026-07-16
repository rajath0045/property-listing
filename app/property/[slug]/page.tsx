import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Star, Bed, Bath, Users, MapPin, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import { PricingCard } from "@/components/pricing-card"
import { AmenitiesList } from "@/components/amenities-list"
import { PropertyMap } from "@/components/property-map"
import { GoogleReviews } from "@/components/google-reviews"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { properties, getPropertyBySlug } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"
import type { Metadata } from "next"

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

const siteUrl = "https://gokulamstays.com"

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  
  if (!property) {
    return {
      title: "Property Not Found | Gokulam Stays",
    }
  }

  return {
    title: `${property.name} | Gokulam Stays`,
    description: property.shortDescription,
    alternates: {
      canonical: `/property/${property.slug}`,
    },
    openGraph: {
      title: `${property.name} | Gokulam Stays`,
      description: property.shortDescription,
      url: `/property/${property.slug}`,
      siteName: "Gokulam Stays",
      images: [
        {
          url: property.images[0],
          alt: property.name,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name} | Gokulam Stays`,
      description: property.shortDescription,
      images: [property.images[0]],
    },
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const otherProperties = properties.filter((p) => p.id !== property.id).slice(0, 3)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.shortDescription,
    url: `${siteUrl}/property/${property.slug}`,
    image: property.images.map((image) => `${siteUrl}${image}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mysuru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: property.rating,
      reviewCount: property.reviewCount,
    },
    priceRange: `INR ${property.pricing.basePrice}-${property.pricing.weekendPrice}`,
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header variant="solid" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to properties</span>
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Property Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            {property.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{property.rating}</span>
              <span className="text-muted-foreground">({property.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-10">
          <ImageGallery 
            images={property.images} 
            imageCategories={property.imageCategories} 
            propertyName={property.name} 
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Users className="w-4 h-4" />
                {property.maxGuests} Guests
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Bed className="w-4 h-4" />
                {property.bedrooms} Bedrooms
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Bed className="w-4 h-4" />
                {property.beds} Beds
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Bath className="w-4 h-4" />
                {property.bathrooms} Bathrooms
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">About this space</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Sleeping Arrangements */}
            {property.specifications?.bedArrangements && (
              <div className="border-t border-border pt-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Sleeping arrangements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.specifications.bedArrangements.map((arrangement, idx) => (
                    <Card key={idx} className="border border-border bg-card/30">
                      <CardContent className="p-4 flex flex-col gap-3">
                        <div className="p-2 bg-secondary rounded-lg w-fit">
                          <Bed className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">Bedroom {idx + 1}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{arrangement}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            <div className="border-t border-border pt-8">
              <AmenitiesList amenities={property.amenities} />
            </div>

            {/* House Rules */}
            {property.houseRules && (
              <div className="border-t border-border pt-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">House rules</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-muted-foreground">
                  {property.houseRules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Location</h2>
              <PropertyMap highlightedPropertyId={property.id} showAllProperties />
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:col-span-1">
            <PricingCard property={property} />
          </div>
        </div>

        {/* Other Properties */}
        <section className="mt-16 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore more properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProperties.map((otherProperty) => (
              <PropertyCard key={otherProperty.id} property={otherProperty} />
            ))}
          </div>
        </section>
      </main>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

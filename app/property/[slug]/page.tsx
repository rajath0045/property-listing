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
import { properties, getPropertyBySlug } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"
import type { Metadata } from "next"

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

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
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const otherProperties = properties.filter((p) => p.id !== property.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
          <ImageGallery images={property.images} propertyName={property.name} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Bed className="w-4 h-4" />
                {property.bedrooms} Bedrooms
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Bath className="w-4 h-4" />
                {property.bathrooms} Bathrooms
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
                <Users className="w-4 h-4" />
                Up to {property.maxGuests} Guests
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <AmenitiesList amenities={property.amenities} />

            {/* Location Map */}
            <div>
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

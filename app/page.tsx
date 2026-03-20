import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { PropertyMap } from "@/components/property-map"
import { GoogleReviews } from "@/components/google-reviews"
import { InstagramFeed } from "@/components/instagram-feed"
import { ContactSection } from "@/components/contact-section"
import { properties } from "@/lib/properties"
import { Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-primary py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance">
            Find Your Perfect Getaway
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
            Discover handpicked luxury vacation rentals. From beachfront villas to mountain retreats, 
            your dream stay awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#properties"
              className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-semibold rounded-full hover:bg-card/90 transition-colors shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </a>
            <a 
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-full hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/30"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section id="properties" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Our Properties</h2>
              <p className="text-muted-foreground">
                {properties.length} stunning properties available for your next adventure
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Explore Locations</h2>
            <p className="text-muted-foreground">
              Discover our properties and nearby attractions on the map
            </p>
          </div>
          <PropertyMap showAllProperties />
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

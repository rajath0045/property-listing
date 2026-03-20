import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { PropertyMap } from "@/components/property-map"
import { GoogleReviews } from "@/components/google-reviews"
import { InstagramFeed } from "@/components/instagram-feed"
import { ContactSection } from "@/components/contact-section"
import { properties } from "@/lib/properties"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Properties Grid */}
      <section id="properties" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Our Collection</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-foreground mb-4 text-balance">
              Comfortable Homestays in Gokulam
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Each of our properties offers clean rooms, warm hospitality, and easy access 
              to yoga centers, local attractions, and authentic Mysuru experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Location</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-foreground mb-4">
              Explore Gokulam, Mysuru
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our homestays are centrally located with easy access to railway station, 
              Mysuru Palace, yoga centers, and other popular landmarks.
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

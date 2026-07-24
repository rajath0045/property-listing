import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { PropertyMap } from "@/components/property-map"
import { GoogleReviews } from "@/components/google-reviews"
import { InstagramProfile } from "@/components/instagram-profile"
import { ContactSection } from "@/components/contact-section"
import { TrackedSection } from "@/components/analytics/tracked-section"
import { properties } from "@/lib/properties"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <TrackedSection as="div" sectionId="hero" sectionName="Hero section" pageType="home">
        <Hero />
      </TrackedSection>

      {/* Properties Grid */}
      <TrackedSection
        id="properties"
        className="py-20 bg-background"
        sectionId="featured_properties"
        sectionName="Featured properties"
        pageType="home"
      >
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
      </TrackedSection>

      {/* Map Section */}
      <TrackedSection
        className="py-20 bg-secondary/30"
        sectionId="map"
        sectionName="Map"
        pageType="home"
      >
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
      </TrackedSection>

      {/* Google Reviews */}
      <TrackedSection as="div" sectionId="reviews" sectionName="Reviews" pageType="home">
        <GoogleReviews />
      </TrackedSection>

      {/* Contact Section */}
      <TrackedSection as="div" sectionId="contact" sectionName="Contact section" pageType="home">
        <ContactSection />
      </TrackedSection>

      {/* Instagram Profile Section */}
      <TrackedSection
        className="py-20 bg-secondary/30"
        sectionId="instagram_profile"
        sectionName="Instagram profile"
        pageType="home"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Social Media</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-foreground mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-balance">
              Follow @gokulamstays for our latest property updates, guest reviews, and local Mysuru travel tips!
            </p>
          </div>
          <InstagramProfile />
        </div>
      </TrackedSection>

      {/* Footer */}
      <TrackedSection as="div" sectionId="footer" sectionName="Footer" pageType="home">
        <Footer />
      </TrackedSection>
    </div>
  )
}

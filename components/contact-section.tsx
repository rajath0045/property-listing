import { Phone, Clock, CheckCircle, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { WHATSAPP_NUMBER } from "@/lib/properties"

export function ContactSection() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello! I'm interested in booking a homestay in Gokulam, Mysuru.`

  return (
    <section id="contact" className="py-20 bg-foreground text-card" data-analytics-surface="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-card/60 mb-3">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light mb-6 text-balance">
              Ready to experience Mysuru?
            </h2>
            <p className="text-card/80 text-lg mb-8 leading-relaxed">
              Contact us directly on WhatsApp for personalized assistance, instant responses, 
              and the best rates. We are happy to help you find the perfect homestay for your 
              Mysuru experience.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-card/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Quick response within minutes</span>
              </div>
              <div className="flex items-center gap-3 text-card/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Local recommendations and tips</span>
              </div>
              <div className="flex items-center gap-3 text-card/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Flexible check-in/check-out</span>
              </div>
              <div className="flex items-center gap-3 text-card/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Airport/station pickup available</span>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              data-analytics-event="contact_button_clicked"
              data-analytics-label="Contact section WhatsApp"
              data-analytics-surface="contact"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Content - Contact Card */}
          <Card className="bg-card text-card-foreground border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif mb-2">Contact Details</h3>
                <p className="text-muted-foreground text-sm">We would love to hear from you</p>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 transition-colors hover:bg-secondary"
                  data-analytics-event="phone_number_clicked"
                  data-analytics-label="Contact card phone"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone / WhatsApp</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                    <p className="font-medium">Gokulam, Mysuru, Karnataka</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Available</p>
                    <p className="font-medium">8 AM - 10 PM Daily</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-3">Follow us on Instagram</p>
                <a
                  href="https://instagram.com/gokulamstays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                  data-analytics-label="Contact Instagram"
                >
                  @gokulamstays
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

import { Phone, MessageCircle, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ContactSection() {
  const whatsappNumber = "1234567890"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in booking one of your properties.`

  return (
    <section id="contact" className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to Book Your Dream Stay?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Contact us directly on WhatsApp for personalized assistance, instant responses, 
              and the best rates. We're here to help you find the perfect property for your 
              next vacation.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Instant response within minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Best price guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>Flexible booking options</span>
              </div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Right Content - Contact Card */}
          <Card className="bg-card text-card-foreground border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[#25D366] mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                <p className="text-muted-foreground">We'd love to hear from you</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                    <p className="font-semibold">+1 (234) 567-890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="font-semibold">Within 30 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="font-semibold">9 AM - 9 PM Daily</p>
                  </div>
                </div>
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block mt-6">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
                  Send us a Message
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

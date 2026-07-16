import Link from "next/link"
import { Instagram, Phone, Mail, MapPin } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/properties"

export function Footer() {
  return (
    <footer className="bg-foreground text-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-light">Gokulam Stays</span>
            </Link>
            <p className="text-card/70 max-w-md leading-relaxed">
              Clean, comfortable homestays in the heart of Gokulam, Mysuru. 
              Perfect for yoga practitioners and travelers seeking authentic experiences 
              with warm Indian hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-card/70">
              <li>
                <Link href="/#properties" className="hover:text-card transition-colors">
                  Our Stays
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-card transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-card transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-card/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-card transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:hello@gokulamstays.com" className="min-w-0 break-all hover:text-card transition-colors">
                  hello@gokulamstays.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 shrink-0" />
                <a href="https://instagram.com/gokulamstays" target="_blank" rel="noopener noreferrer" className="hover:text-card transition-colors">
                  @gokulamstays
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Gokulam, Mysuru, Karnataka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card/20 mt-12 pt-8 text-center text-card/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Gokulam Stays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

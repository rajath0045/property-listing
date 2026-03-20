import Link from "next/link"
import { Home, Instagram, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">StayLux</span>
            </Link>
            <p className="text-background/70 max-w-md leading-relaxed">
              Discover extraordinary vacation rentals handpicked for unforgettable experiences. 
              From beachfront villas to mountain retreats, find your perfect escape with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link href="/" className="hover:text-background transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-background transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/1234567890" className="hover:text-background transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@staylux.com" className="hover:text-background transition-colors">
                  hello@staylux.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  @staylux
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>California, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60 text-sm">
          <p>&copy; {new Date().getFullYear()} StayLux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTrackEvent } from "@/hooks/use-track-event"
import { analyticsEvents } from "@/lib/analytics/config"
import { WHATSAPP_NUMBER } from "@/lib/properties"

interface HeaderProps {
  variant?: "transparent" | "solid"
}

export function Header({ variant = "transparent" }: HeaderProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const trackEvent = useTrackEvent()

  const headerBgClass = variant === "transparent" ? "absolute bg-transparent" : "sticky bg-background border-b shadow-sm"
  const titleClass = variant === "transparent" ? "text-card" : "text-foreground"
  const linkClass = variant === "transparent" ? "text-card/80 hover:text-card" : "text-muted-foreground hover:text-foreground"
  const buttonClass = variant === "transparent" ? "bg-card text-foreground hover:bg-card/90" : "bg-primary text-primary-foreground hover:bg-primary/90"

  const toggleMenu = () => {
    const nextIsOpen = !isMenuOpen

    setIsMenuOpen(nextIsOpen)

    if (nextIsOpen) {
      trackEvent(analyticsEvents.dropdownOpened, {
        dropdown_name: "mobile_navigation",
        surface: "header",
      })
    }
  }

  return (
    <header className={`${headerBgClass} top-0 left-0 right-0 z-50`} data-analytics-surface="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" data-analytics-label="Gokulam Stays logo">
            <span className={`text-2xl font-serif font-light tracking-wide ${titleClass}`}>
              Gokulam Stays
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#properties" className={`${linkClass} transition-colors text-sm tracking-wide`} data-analytics-label="Our Stays">
              Our Stays
            </Link>
            <Link href="/#reviews" className={`${linkClass} transition-colors text-sm tracking-wide`} data-analytics-label="Reviews">
              Reviews
            </Link>
            <Link href="/#contact" className={`${linkClass} transition-colors text-sm tracking-wide`} data-analytics-label="Contact">
              Contact
            </Link>
            <a
              href="https://instagram.com/gokulamstays"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} transition-colors`}
              aria-label="Instagram"
              data-analytics-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello! I'm interested in booking a homestay.`}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="contact_button_clicked"
              data-analytics-label="Header WhatsApp"
              data-analytics-surface="header"
            >
              <Button className={`${buttonClass} rounded-full px-6 transition-colors`}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${titleClass}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            data-analytics-label="Mobile menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-card/95 backdrop-blur-sm rounded-xl mt-2">
            <div className="flex flex-col gap-4 px-4">
              <Link
                href="/#properties"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
                data-analytics-label="Mobile Our Stays"
              >
                Our Stays
              </Link>
              <Link
                href="/#reviews"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
                data-analytics-label="Mobile Reviews"
              >
                Reviews
              </Link>
              <Link
                href="/#contact"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
                data-analytics-label="Mobile Contact"
              >
                Contact
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello! I'm interested in booking a homestay.`}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="contact_button_clicked"
                data-analytics-label="Mobile WhatsApp"
                data-analytics-surface="header"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

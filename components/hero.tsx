"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useTrackEvent } from "@/hooks/use-track-event"
import { analyticsEvents } from "@/lib/analytics/config"
import { WHATSAPP_NUMBER, properties } from "@/lib/properties"

export function Hero() {
  const trackEvent = useTrackEvent()

  const scrollToProperties = () => {
    trackEvent(analyticsEvents.ctaButtonClicked, {
      cta_label: "View Our Stays",
      cta_location: "hero",
      destination: "#properties",
    })
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Peaceful homestay in Mysuru"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline */}
        <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-card/80 mb-6 font-medium">
          Gokulam, Mysuru
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-card mb-6 leading-tight text-balance">
          Your peaceful home
          <br />
          <span className="italic">away from home</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-card/90 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          Clean, comfortable homestays in the heart of Mysuru&apos;s cultural hub. 
          Perfect for yoga enthusiasts and travelers seeking authentic experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToProperties}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground font-medium rounded-full hover:bg-card/90 transition-all shadow-lg hover:shadow-xl"
          >
            View Our Stays
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello! I'm interested in booking a homestay in Gokulam, Mysuru.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-card font-medium rounded-full border-2 border-card/50 hover:bg-card/10 hover:border-card transition-all"
            data-analytics-event="contact_button_clicked"
            data-analytics-label="Hero WhatsApp"
            data-analytics-surface="hero"
            onClick={() => {
              trackEvent(analyticsEvents.ctaButtonClicked, {
                cta_label: "WhatsApp Us",
                cta_location: "hero",
                destination: "wa.me",
              })
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-light text-card">{properties.length}</p>
            <p className="text-sm text-card/70 mt-1">Properties</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-light text-card">500+</p>
            <p className="text-sm text-card/70 mt-1">Happy Guests</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-light text-card">4.8</p>
            <p className="text-sm text-card/70 mt-1">Rating</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProperties}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-card/60 hover:text-card transition-colors animate-bounce"
        aria-label="Scroll to properties"
        data-analytics-label="Hero scroll indicator"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}

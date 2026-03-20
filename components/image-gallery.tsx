"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  propertyName: string
}

export function ImageGallery({ images, propertyName }: ImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto">
          <Image
            src={images[0]}
            alt={`${propertyName} - Main view`}
            fill
            className="object-cover cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => openLightbox(0)}
            priority
          />
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-card transition-colors"
          >
            <Expand className="w-4 h-4" />
            <span className="font-medium text-sm">View all photos</span>
          </button>
        </div>

        {/* Secondary Images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] hidden md:block"
          >
            <Image
              src={image}
              alt={`${propertyName} - View ${index + 2}`}
              fill
              className="object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openLightbox(index + 1)}
            />
            {index === 3 && images.length > 5 && (
              <button
                onClick={() => openLightbox(4)}
                className="absolute inset-0 bg-foreground/50 flex items-center justify-center text-background font-semibold text-lg hover:bg-foreground/60 transition-colors"
              >
                +{images.length - 5} more
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-background hover:text-background/80 transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-background hover:text-background/80 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 text-background hover:text-background/80 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Current Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-auto px-16">
            <Image
              src={images[currentIndex]}
              alt={`${propertyName} - View ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                  index === currentIndex ? "border-background" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-background font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

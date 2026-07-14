"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  imageCategories?: { name: string; images: string[] }[]
  propertyName: string
}

export function ImageGallery({ images, imageCategories, propertyName }: ImageGalleryProps) {
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

      {/* Lightbox / Photo Tour */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-4 flex items-center gap-4">
            <button
              onClick={closeLightbox}
              className="hover:bg-muted p-2 rounded-full transition-colors flex items-center justify-center"
              aria-label="Back to property"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <span className="font-semibold text-lg text-foreground">Photo tour</span>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Category Navigation (Horizontal scroll) */}
            {imageCategories && imageCategories.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
                {imageCategories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      document.getElementById(`category-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="flex flex-col gap-2 min-w-[100px] text-left group shrink-0"
                  >
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border">
                      <Image
                        src={cat.images[0]}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="font-medium text-sm text-foreground px-1">{cat.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Category Sections */}
            {imageCategories && imageCategories.length > 0 ? (
              <div className="space-y-10">
                {imageCategories.map((cat, idx) => (
                  <div key={cat.name} id={`category-${idx}`} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">{cat.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-muted">
                          <Image
                            src={img}
                            alt={`${cat.name} ${imgIdx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Fallback for flat images
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((img, imgIdx) => (
                  <div key={imgIdx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-muted">
                    <Image
                      src={img}
                      alt={`Photo ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

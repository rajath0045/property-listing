"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Grid, Expand, Layers } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

interface ImageGalleryProps {
  images: string[]
  imageCategories?: { name: string; images: string[] }[]
  propertyName: string
}

export function ImageGallery({ images, imageCategories, propertyName }: ImageGalleryProps) {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false)
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false)
  const [slideshowIndex, setSlideshowIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const isModalOpen = isPhotoTourOpen || isSlideshowOpen

  // Embla Carousel for mobile gallery view
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [mobileIndex, setMobileIndex] = useState(1)

  useEffect(() => {
    if (!emblaApi) return

    const handleSelect = () => {
      setMobileIndex(emblaApi.selectedScrollSnap() + 1)
    }

    handleSelect()
    emblaApi.on("select", handleSelect)

    return () => {
      emblaApi.off("select", handleSelect)
    }
  }, [emblaApi])

  // Keyboard navigation for slideshow
  useEffect(() => {
    if (!isSlideshowOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSlideshowIndex((prev) => (prev + 1) % images.length)
      } else if (e.key === "ArrowLeft") {
        setSlideshowIndex((prev) => (prev - 1 + images.length) % images.length)
      } else if (e.key === "Escape") {
        setIsSlideshowOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSlideshowOpen, images.length])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (!isModalOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isModalOpen])

  const openPhotoTour = () => setIsPhotoTourOpen(true)
  const closePhotoTour = () => setIsPhotoTourOpen(false)

  const openSlideshow = (index: number) => {
    setSlideshowIndex(index)
    setIsSlideshowOpen(true)
  }

  const closeSlideshow = () => setIsSlideshowOpen(false)

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSlideshowIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSlideshowIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <>
      {/* Mobile Swipeable Gallery (Visible only on mobile/tablet) */}
      <div className="block md:hidden relative overflow-hidden rounded-xl bg-muted group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div key={index} className="relative flex-[0_0_100%] aspect-[4/3] w-full cursor-pointer" onClick={() => openSlideshow(index)}>
                <Image
                  src={src}
                  alt={`${propertyName} - Photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Index Counter Badge */}
        <div className="absolute bottom-4 right-4 bg-foreground/80 text-background backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-md shadow-md pointer-events-none tracking-wider">
          {mobileIndex} / {images.length}
        </div>
        
        {/* Mobile View All Button */}
        <button 
          onClick={openPhotoTour} 
          className="absolute bottom-4 left-4 bg-background/95 text-foreground backdrop-blur-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-border shadow-xs hover:bg-background transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Show all</span>
        </button>
      </div>

      {/* Desktop Gallery Grid (1 Large Hero + 4 Thumbnails) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-xl overflow-hidden relative group">
        {/* Large Main Hero Image */}
        <div className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden bg-muted">
          <Image
            src={images[0]}
            alt={`${propertyName} - Hero view`}
            fill
            className="object-cover hover:scale-101 hover:brightness-95 transition-all duration-500 ease-out"
            onClick={() => openSlideshow(0)}
            sizes="(max-width: 1200px) 50vw, 600px"
            priority
          />
        </div>

        {/* Thumbnail Images */}
        {images.slice(1, 5).map((src, index) => (
          <div
            key={index}
            className="relative cursor-pointer overflow-hidden bg-muted"
            onClick={() => openSlideshow(index + 1)}
          >
            <Image
              src={src}
              alt={`${propertyName} - View ${index + 2}`}
              fill
              className="object-cover hover:scale-102 hover:brightness-95 transition-all duration-300 ease-out"
              sizes="(max-width: 1200px) 25vw, 300px"
            />
            
            {/* "Show more" overlay on the last thumbnail */}
            {index === 3 && images.length > 5 && (
              <div 
                onClick={(e) => {
                  e.stopPropagation()
                  openPhotoTour()
                }}
                className="absolute inset-0 bg-black/50 hover:bg-black/60 transition-colors flex flex-col items-center justify-center text-white gap-1 select-none"
              >
                <Grid className="w-5 h-5" />
                <span className="font-semibold text-sm">+{images.length - 5} photos</span>
              </div>
            )}
          </div>
        ))}

        {/* Desktop View All Photos Floating Button */}
        {images.length > 5 && (
          <button
            onClick={openPhotoTour}
            className="absolute bottom-6 right-6 bg-card/95 hover:bg-card border border-border text-foreground px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg hover:scale-102 active:scale-98 transition-all duration-200 select-none z-10"
          >
            <Grid className="w-4 h-4 text-foreground" />
            <span className="font-semibold text-xs tracking-wider">Show all photos</span>
          </button>
        )}
      </div>

      {/* Full-Screen "Photo Tour" Modal */}
      {isPhotoTourOpen && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-4 md:px-8 py-4 flex items-center justify-between">
            <button
              onClick={closePhotoTour}
              className="hover:bg-muted p-2 rounded-full transition-colors flex items-center justify-center text-foreground hover:rotate-90 duration-200"
              aria-label="Back to listing"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="font-semibold text-base md:text-lg text-foreground truncate max-w-xs md:max-w-md">
              Photo tour - {propertyName}
            </h2>
            <button
              onClick={closePhotoTour}
              className="hover:bg-muted p-2 rounded-full transition-colors flex items-center justify-center text-foreground"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Photo Tour Body */}
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            {/* Category Navigation (Horizontal scroll sticky tabs) */}
            {imageCategories && imageCategories.length > 0 && (
              <div className="sticky top-[68px] z-30 bg-background/90 backdrop-blur-xs flex gap-2 overflow-x-auto pb-3 mb-8 border-b scrollbar-none">
                {imageCategories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(idx)
                      document.getElementById(`pdp-category-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeCategory === idx 
                        ? "bg-primary text-primary-foreground shadow-xs" 
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {cat.name} ({cat.images.length})
                  </button>
                ))}
              </div>
            )}

            {/* Category Sections */}
            {imageCategories && imageCategories.length > 0 ? (
              <div className="space-y-12">
                {imageCategories.map((cat, idx) => (
                  <div key={cat.name} id={`pdp-category-${idx}`} className="scroll-mt-28">
                    <div className="border-b border-border pb-2 mb-6">
                      <h3 className="text-xl font-bold text-foreground">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground">{cat.images.length} {cat.images.length === 1 ? "photo" : "photos"}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.images.map((img, imgIdx) => {
                        // Find global index in images array
                        const globalIdx = images.indexOf(img)
                        return (
                          <div 
                            key={imgIdx} 
                            onClick={() => openSlideshow(globalIdx !== -1 ? globalIdx : 0)}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted group cursor-pointer"
                          >
                            <Image
                              src={img}
                              alt={`${cat.name} ${imgIdx + 1}`}
                              fill
                              className="object-cover group-hover:scale-101 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 400px"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Flat gallery fallback
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((img, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    onClick={() => openSlideshow(imgIdx)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted group cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`Photo ${imgIdx + 1}`}
                      fill
                      className="object-cover group-hover:scale-101 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 400px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide-Show Lightbox Overlay */}
      {isSlideshowOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/98 flex flex-col justify-between animate-in fade-in duration-200"
          onClick={closeSlideshow}
        >
          {/* Slideshow Header */}
          <div className="p-4 md:p-6 flex items-center justify-between text-white z-10 select-none">
            <button
              onClick={closeSlideshow}
              className="hover:bg-white/10 p-2.5 rounded-full transition-colors flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <span className="text-sm font-semibold tracking-wider bg-white/10 px-3 py-1 rounded-full">
              {slideshowIndex + 1} / {images.length}
            </span>
            <div className="w-10 h-10" /> {/* Spacer */}
          </div>

          {/* Slideshow Image Area */}
          <div className="relative flex-1 flex items-center justify-center px-4 md:px-12 select-none">
            {/* Previous Button */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 md:left-8 bg-black/45 hover:bg-black/75 hover:scale-105 active:scale-95 text-white p-3 rounded-full transition-all border border-white/10 flex items-center justify-center z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Slider View */}
            <div 
              className="relative w-full h-full max-w-5xl max-h-[75vh]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <Image
                src={images[slideshowIndex]}
                alt={`${propertyName} - Slideshow photo ${slideshowIndex + 1}`}
                fill
                className="object-contain animate-in zoom-in-95 duration-200"
                sizes="(max-width: 1200px) 100vw, 1024px"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextSlide}
              className="absolute right-4 md:right-8 bg-black/45 hover:bg-black/75 hover:scale-105 active:scale-95 text-white p-3 rounded-full transition-all border border-white/10 flex items-center justify-center z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slideshow Footer Text */}
          <div className="p-4 md:p-6 text-center text-white/60 text-xs md:text-sm select-none z-10 bg-gradient-to-t from-black/80 to-transparent">
            {propertyName} &mdash; Photos are for reference only.
          </div>
        </div>
      )}
    </>
  )
}

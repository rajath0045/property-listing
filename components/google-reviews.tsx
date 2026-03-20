"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "SM",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely stunning property! The villa exceeded all our expectations. The ocean views were breathtaking and the amenities were top-notch. Will definitely be booking again!",
    property: "Seaside Villa Retreat",
  },
  {
    id: 2,
    author: "James P.",
    avatar: "JP",
    rating: 5,
    date: "1 month ago",
    text: "Perfect mountain getaway. The chalet was immaculate and had everything we needed. The fireplace made our evenings so cozy. Highly recommend for ski trips!",
    property: "Mountain View Chalet",
  },
  {
    id: 3,
    author: "Emily R.",
    avatar: "ER",
    rating: 5,
    date: "3 weeks ago",
    text: "The penthouse was incredible! Amazing city views and the location couldn't be better. The staff was incredibly responsive via WhatsApp. A truly luxurious experience.",
    property: "Urban Luxury Penthouse",
  },
  {
    id: 4,
    author: "Michael L.",
    avatar: "ML",
    rating: 5,
    date: "1 week ago",
    text: "Our family had the best vacation ever at the tropical villa. The infinity pool was a hit with the kids, and the beach equipment provided was so convenient!",
    property: "Tropical Paradise Villa",
  },
]

export function GoogleReviews() {
  const averageRating = 4.9
  const totalReviews = 575

  return (
    <section id="reviews" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Google Branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h2 className="text-2xl font-bold text-foreground">Google Reviews</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-accent text-accent"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-lg text-foreground">{averageRating}</span>
              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </div>
          </div>
          <a
            href="https://g.page/r/your-google-business"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            See all reviews on Google
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "fill-accent text-accent"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-2">
                  {review.text}
                </p>
                <p className="text-xs text-primary font-medium">{review.property}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

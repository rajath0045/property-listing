"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    id: 1,
    author: "Priya S.",
    avatar: "PS",
    rating: 5,
    date: "2 weeks ago",
    text: "Wonderful homestay! The hosts were incredibly warm and the breakfast was delicious - authentic South Indian food. Perfect location for my yoga course at KPJAYI. Will definitely come back!",
    property: "Serene Garden Homestay",
  },
  {
    id: 2,
    author: "Thomas K.",
    avatar: "TK",
    rating: 5,
    date: "1 month ago",
    text: "Clean, peaceful, and exactly what I needed for my Mysuru trip. The garden is beautiful for morning meditation. Walking distance to yoga center and local restaurants. Highly recommend!",
    property: "Cozy Corner Homestay",
  },
  {
    id: 3,
    author: "Maria G.",
    avatar: "MG",
    rating: 5,
    date: "3 weeks ago",
    text: "The heritage house is stunning! Felt like stepping back in time with all the traditional architecture. The family made us feel so welcome. Amazing experience of authentic Mysuru hospitality.",
    property: "Heritage House Homestay",
  },
  {
    id: 4,
    author: "Ravi M.",
    avatar: "RM",
    rating: 5,
    date: "1 week ago",
    text: "Perfect place for a quiet getaway. The rooftop has amazing views of Chamundi Hills. Very clean rooms with all modern amenities. Easy to visit Mysuru Palace from here. Great value!",
    property: "Peaceful Nest Homestay",
  },
]

export function GoogleReviews() {
  const averageRating = 4.8
  const totalReviews = 465

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Google Branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h2 className="text-2xl font-serif font-light text-foreground">Google Reviews</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-amber-500 text-amber-500"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg text-foreground">{averageRating}</span>
              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </div>
          </div>
          <a
            href="https://g.page/r/gokulamstays"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium text-sm"
          >
            See all reviews on Google
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "fill-amber-500 text-amber-500"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-3">
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

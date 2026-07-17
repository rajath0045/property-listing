"use client"

import Image from "next/image"
import { Instagram, Heart, MessageCircle } from "lucide-react"

const instagramPosts = [
  {
    id: 1,
    image: "/instagram/post-1.jpg",
    likes: 234,
    comments: 18,
    alt: "Morning yoga in Gokulam",
  },
  {
    id: 2,
    image: "/instagram/post-2.jpg",
    likes: 189,
    comments: 12,
    alt: "Traditional South Indian breakfast",
  },
  {
    id: 3,
    image: "/instagram/post-3.jpg",
    likes: 312,
    comments: 27,
    alt: "Peaceful garden at homestay",
  },
  {
    id: 4,
    image: "/instagram/post-4.jpg",
    likes: 456,
    comments: 34,
    alt: "Mysuru Palace at sunset",
  },
  {
    id: 5,
    image: "/instagram/post-5.jpg",
    likes: 278,
    comments: 21,
    alt: "Chamundi Hills view",
  },
  {
    id: 6,
    image: "/instagram/post-6.jpg",
    likes: 367,
    comments: 29,
    alt: "Filter coffee morning",
  },
]

export function InstagramFeed() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-light text-foreground">@gokulamstays</h2>
              <p className="text-muted-foreground text-sm">Follow us for Mysuru moments</p>
            </div>
          </div>
          <a
            href="https://instagram.com/gokulamstays"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-foreground/20 rounded-full font-medium text-sm text-foreground hover:bg-foreground hover:text-background transition-colors"
            data-analytics-label="Follow on Instagram"
            data-analytics-surface="instagram_feed"
          >
            Follow on Instagram
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/gokulamstays"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
              data-analytics-label={`Instagram post ${post.id}`}
              data-analytics-surface="instagram_feed"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-card">
                  <Heart className="w-5 h-5 fill-card" />
                  <span className="font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-card">
                  <MessageCircle className="w-5 h-5 fill-card" />
                  <span className="font-medium">{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Script from "next/script"
import { Instagram, CheckCircle2 } from "lucide-react"
import { instagramProfileConfig } from "@/lib/instagram"

interface InstagramProfileProps {
  forceEmbed?: boolean
}

export function InstagramProfile({ forceEmbed = false }: InstagramProfileProps) {
  const [mounted, setMounted] = useState(false)
  const { username, fullName, avatarUrl, postsCount, followersCount, followingCount, posts } = instagramProfileConfig

  // Sort posts dynamically: views + likes descending
  const sortedPosts = [...posts].sort((a, b) => {
    const scoreA = (a.views || 0) + (a.likes || 0)
    const scoreB = (b.views || 0) + (b.likes || 0)
    return scoreB - scoreA
  })

  useEffect(() => {
    setMounted(true)
    // Check if instgrm script is already loaded and re-process embeds if any
    if (typeof window !== "undefined" && (window as any).instgrm) {
      try {
        (window as any).instgrm.Embeds.process()
      } catch (err) {
        console.warn("Instagram Embed processing failed:", err)
      }
    }
  }, [])

  if (!mounted) {
    // Return placeholder during SSR to avoid hydration mismatch
    return <div className="min-h-[400px] w-full animate-pulse bg-muted/20 rounded-2xl" />
  }

  const profileUrl = `https://instagram.com/${username}`

  return (
    <div className="w-full">
      {/* Instagram Embed Script (loaded only once using next/script) */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).instgrm) {
            try {
              (window as any).instgrm.Embeds.process()
            } catch (err) {
              console.warn("Instagram script onLoad process failed:", err)
            }
          }
        }}
      />

      {forceEmbed ? (
        /* Official Embed Iframe (attempt if explicitly requested) */
        <div className="w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm p-2 min-h-[480px]">
          <iframe
            src={`${profileUrl}/embed/`}
            className="w-full min-h-[500px] rounded-xl"
            allowTransparency
            allowFullScreen
            scrolling="no"
            title="Instagram Profile Embed"
          />
        </div>
      ) : (
        /* Custom Embedded Profile Card (Exactly like the Screenshot) */
        <div className="max-w-xl mx-auto bg-card border border-border/80 rounded-2xl overflow-hidden shadow-md">
          {/* Header Area */}
          <div className="p-6 flex items-center justify-between border-b border-border/40 bg-card">
            <div className="flex items-center gap-6">
              {/* Profile Avatar */}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-20 h-20 rounded-full border border-border/40 p-[2px] bg-background shrink-0 block"
              >
                <Image
                  src={avatarUrl}
                  alt={`${username} profile avatar`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-full h-full bg-muted"
                />
              </a>
              {/* Profile Stats Stack */}
              <div className="flex flex-col text-left">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-foreground text-lg tracking-wide hover:underline flex items-center gap-1.5"
                >
                  {username}
                  <CheckCircle2 className="w-4.5 h-4.5 text-blue-500 fill-blue-500 shrink-0" aria-label="Verified Profile" />
                </a>
                <span className="text-foreground text-sm font-medium mt-0.5">{fullName}</span>
                <div className="flex flex-col text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  <span>{postsCount} posts</span>
                </div>
              </div>
            </div>

            {/* Instagram Branding Glyph */}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ee2a7b] hover:text-[#6228d7] transition-colors p-2 shrink-0"
              aria-label="View profile on Instagram"
            >
              <Instagram className="w-7 h-7" />
            </a>
          </div>

          {/* Posts Grid (3-column grid matching the screenshot layout) */}
          <div className="grid grid-cols-3 gap-0.5 bg-border/20">
            {sortedPosts.map((post) => (
              <a
                key={post.id}
                href={`https://instagram.com/p/${post.shortcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-muted/20 block"
                data-analytics-label={`Instagram embed post ${post.id}`}
                data-analytics-surface="instagram_profile_embed"
              >
                <Image
                  src={post.fallbackImage}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 600px) 33vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <Instagram className="w-5 h-5 drop-shadow-sm" />
                </div>
              </a>
            ))}

            {/* Dynamic CTA Tile to fill the 3-column row if postsCount is exactly 2 */}
            {sortedPosts.length === 2 && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#f9ce34]/5 via-[#ee2a7b]/5 to-[#6228d7]/5 hover:from-[#f9ce34]/10 hover:via-[#ee2a7b]/10 hover:to-[#6228d7]/10 transition-all text-center group border-l border-border/10"
                data-analytics-label="Instagram embed CTA follow tile"
                data-analytics-surface="instagram_profile_embed"
              >
                <Instagram className="w-5 h-5 text-[#ee2a7b] mb-1.5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs font-semibold text-foreground tracking-wide">Follow Us</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">@{username}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

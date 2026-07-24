export interface InstagramPost {
  id: string
  shortcode: string       // Instagram post shortcode (e.g. "DbKjRIbE916")
  likes: number
  views: number
  comments: number
  fallbackImage: string   // Fallback preview image
  alt: string
  caption?: string
}

export interface InstagramProfileData {
  username: string
  fullName: string
  avatarUrl: string
  bio: string
  postsCount: number
  followersCount: number
  followingCount: number
  posts: InstagramPost[]
}

export const instagramProfileConfig: InstagramProfileData = {
  username: "gokulamstays",
  fullName: "Gokulam Stays",
  avatarUrl: "/instagram/actual-avatar.png",
  bio: "🌸 Cozy, peaceful homestays in Gokulam, Mysuru.\n🧘 Perfect for yoga practitioners, travelers & families.\n🏡 Walking distance to KPJAYI & popular yoga shalas.",
  postsCount: 2,       // EXACT live profile posts count
  followersCount: 0,   // EXACT live profile followers count
  followingCount: 0,   // EXACT live profile following count
  posts: [
    {
      id: "post_1",
      shortcode: "DbKjRIbE916", // Actual post shortcode 1
      likes: 120,
      views: 540,
      comments: 12,
      fallbackImage: "/instagram/actual-post-1.jpg",
      alt: "Morning yoga in Gokulam"
    },
    {
      id: "post_2",
      shortcode: "DbKi3VmE5-d", // Actual post shortcode 2
      likes: 95,
      views: 410,
      comments: 8,
      fallbackImage: "/instagram/actual-post-2.jpg",
      alt: "Traditional South Indian breakfast"
    }
  ]
};

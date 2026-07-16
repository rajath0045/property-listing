/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 90, 100],
    contentDispositionType: "inline",
  },
}

export default nextConfig

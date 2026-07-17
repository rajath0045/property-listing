import type { Metadata } from 'next'
import { AnalyticsProvider } from '@/providers/analytics-provider'
import { analyticsConfig } from '@/lib/analytics/config'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://gokulamstays.com'),
  title: 'Gokulam Stays | Homestays in Mysuru',
  description: 'Clean, comfortable homestays in Gokulam, Mysuru. Perfect for yoga enthusiasts and travelers seeking authentic experiences with warm Indian hospitality.',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gokulam Stays | Homestays in Mysuru',
    description: 'Clean, comfortable homestays in Gokulam, Mysuru with easy access to yoga shalas and local attractions.',
    url: '/',
    siteName: 'Gokulam Stays',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaMeasurementId = analyticsConfig.gaMeasurementId

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  )
}

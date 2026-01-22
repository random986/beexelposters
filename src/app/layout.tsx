import type { Metadata } from 'next'
import { Manrope, Poppins } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'
import { TokenProvider } from '@/context/TokenContext'

// Import Clash Display via Fontshare CDN in the head since local file is missing

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})


export const metadata: Metadata = {
  title: 'Beexel AI | AI Flyer & Poster Generator | Transform Sketches to Professional Designs',
  description: 'Create stunning professional flyers and posters in seconds with AI. Event flyers, business promotions, social media posts, and more. No design skills needed.',
  keywords: [
    'AI flyer generator',
    'AI poster maker',
    'instant flyer design',
    'event flyer creator',
    'social media post generator',
    'business poster maker',
    'AI graphic design',
    'Beexel AI',
    'M-PESA payment design',
    'marketing materials generator'
  ],
  authors: [{ name: 'Beexel AI' }],
  creator: 'Beexel AI',
  publisher: 'Beexel AI',
  metadataBase: new URL('https://beexel.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Beexel AI | #1 AI Flyer & Poster Generator in Kenya',
    description: 'Turn your ideas into agency-quality flyers and posters instantly. Perfect for events, business, and social media. Start for just KES 20.',
    url: 'https://beexel.ai',
    siteName: 'Beexel AI',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: 'https://i.ibb.co/0WSd0Kb/hero-after-new.jpg', // TODO: Update with flyer example
        width: 1200,
        height: 630,
        alt: 'Beexel AI Flyer Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beexel AI | Instant Flyer & Poster Generation',
    description: 'Professional AI-powered design tool. Create flyers and posters in seconds. Best in Nairobi. M-PESA accepted.',
    images: ['https://i.ibb.co/0WSd0Kb/hero-after-new.jpg'], // TODO: Update with flyer example
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token', // Placeholder
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Beexel AI',
    image: 'https://i.ibb.co/1JX2649B/Beexel-Ai-Logo.png',
    '@id': 'https://beexel.ai',
    url: 'https://beexel.ai',
    telephone: '+254700000000', // Placeholder
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nairobi',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.2921,
      longitude: 36.8219,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    description: 'Premium AI-powered architectural visualization and rendering studio in Nairobi, Kenya. We turn sketches into photorealistic images instantly.',
    priceRange: 'KES 20 - KES 2000',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://www.instagram.com/beexel_ai',
      'https://twitter.com/beexel_ai',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${poppins.className} ${manrope.variable} ${poppins.variable}`}>
        <TokenProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </TokenProvider>
      </body>
    </html>
  )
}


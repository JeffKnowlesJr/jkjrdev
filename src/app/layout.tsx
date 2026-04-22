import './globals.css'
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google'
import type { Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsentGate from '@/components/CookieConsentGate'
import { generateBaseMetadata } from '@/utils/metadata'
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateLocalBusinessSchema
} from '@/utils/schema'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit'
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains'
})

// Site-wide entities: Organization, Person, WebSite, LocalBusiness with stable @id anchors
const enrichedPerson = {
  ...generatePersonSchema(),
  description:
    'Full-stack web developer based in Northern Virginia who builds websites and web applications for businesses across the DC metro area.',
  areaServed: ['Northern Virginia', 'Washington DC Metro', 'Fairfax County VA', 'Arlington VA'],
  knowsAbout: [
    'Next.js', 'React', 'Webflow', 'WordPress', 'Google Analytics 4',
    'AWS', 'Firebase', 'Cloudflare', 'TypeScript', 'SEO'
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'VA',
    addressLocality: 'Northern Virginia',
    addressCountry: 'US'
  }
}

const siteJsonLd = [
  generateOrganizationSchema(),
  enrichedPerson,
  generateWebsiteSchema(),
  generateLocalBusinessSchema()
]

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  ...generateBaseMetadata(),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: { rel: 'icon', url: '/favicon.ico' }
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Plain <script> tag for JSON-LD — recommended for App Router inline structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body
        className="bg-midnight text-cloud font-body min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <CookieConsentGate />
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow w-full pt-nav">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

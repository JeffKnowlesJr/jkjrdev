import { Metadata } from 'next'
import Link from 'next/link'
import { generateBreadcrumbSchema, BREADCRUMBS, generateLocalBusinessSchema } from '@/utils/schema'
import FadeIn from '@/components/FadeIn'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'

export const metadata: Metadata = {
  title: 'Web Developer in Northern Virginia — JKJR Digital Development',
  description:
    'Freelance web developer based in Northern Virginia serving Fairfax, Arlington, Reston, McLean, Alexandria, and the DC metro area. Webflow, Next.js, WordPress, GA4 analytics, and cloud infrastructure.',
  keywords: [
    'web developer Northern Virginia',
    'web developer DC metro',
    'freelance web developer Northern Virginia',
    'Webflow developer Northern Virginia',
    'Next.js developer Northern Virginia',
    'web developer Fairfax VA',
    'small business web design Northern Virginia',
    'web developer near me',
    'hire web developer DC',
    'freelance developer NoVA'
  ],
  alternates: { canonical: `${BASE_URL}/web-developer-northern-virginia` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/web-developer-northern-virginia`,
    siteName: 'JKJR Digital Development',
    title: 'Web Developer in Northern Virginia — JKJR Digital Development',
    description:
      'Freelance web developer based in Northern Virginia. Webflow, Next.js, WordPress, GA4 analytics, and cloud infrastructure for small businesses and startups in the DC metro area.',
    images: [{ url: `${BASE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: 'JKJR Digital Development — Northern Virginia Web Developer' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Developer in Northern Virginia — JKJR Digital Development',
    description:
      'Freelance web developer in Northern Virginia — Webflow, Next.js, WordPress, and GA4 for small businesses across the DC metro area.',
    images: [`${BASE_URL}/images/og-default.jpg`]
  }
}

const services = [
  {
    title: 'Webflow Development',
    description: 'Custom Webflow builds and WordPress-to-Webflow migrations. Your team gets a site they can update without calling a developer.',
    href: '/services/webflow-development'
  },
  {
    title: 'Next.js Development',
    description: 'Custom web applications and CMS migrations built with Next.js and React — for startups and businesses that need something beyond a template.',
    href: '/services/nextjs-development'
  },
  {
    title: 'GA4 Analytics & SEO',
    description: 'Properly configured GA4 so you know where your leads come from, plus technical SEO to improve how Google finds and ranks your site.',
    href: '/services/ga4-analytics'
  },
  {
    title: 'Web Development',
    description: 'Full-stack websites and web applications for small businesses, professional firms, and startups — built to load fast and rank in search.',
    href: '/services/web-development'
  }
]

const areas = [
  'Fairfax', 'Arlington', 'Reston', 'McLean', 'Alexandria',
  'Vienna', 'Falls Church', 'Herndon', 'Tysons', 'Washington DC'
]

export default function NorthernVirginiaPage() {
  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS.location)

  return (
    <div className="min-h-screen pt-28 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema]) }}
      />

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl mb-14">
            <span className="tag tag-mint mb-4">Northern Virginia & DC Metro</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cloud mt-4 mb-6">
              Web Developer in Northern Virginia
            </h1>
            <p className="text-xl text-mist leading-relaxed mb-4">
              I&apos;m a freelance web developer based in Northern Virginia, serving small businesses,
              professional service firms, and startups across the DC metro area — Fairfax, Arlington,
              Reston, McLean, Alexandria, and Washington DC itself.
            </p>
            <p className="text-mist leading-relaxed">
              I&apos;ve been building for the web for a long time. My practice covers Webflow, Next.js,
              WordPress, Google Analytics 4, and cloud infrastructure. If you need a developer in
              Northern Virginia who works directly with clients — no account managers, no handoffs —
              that&apos;s what I do.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-cloud mb-8">Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="card p-6 group card-hover-electric flex flex-col"
                >
                  <h3 className="font-display text-xl font-bold text-cloud mb-3 group-hover:text-electric transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-mist text-sm leading-relaxed flex-grow">{service.description}</p>
                  <span className="mt-4 inline-flex items-center text-electric text-sm font-medium">
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="card p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-cloud mb-6">Why Work with a Local Developer</h2>
            <div className="space-y-4 text-mist leading-relaxed">
              <p>
                Most web development can be done remotely, and I work with clients outside Northern Virginia.
                But there are real advantages to working with a developer who&apos;s based in the region:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>In-person discovery meetings and reviews when that&apos;s useful</li>
                <li>Familiarity with the DC metro business landscape — government contractors, professional services firms, nonprofits, and local businesses</li>
                <li>EST timezone alignment — I&apos;m available during your business hours, not working around a 6-hour time difference</li>
                <li>A developer who&apos;s invested in the regional market, not a global marketplace profile</li>
              </ul>
              <p>
                That said, geography doesn&apos;t limit what we can build. If you&apos;re outside Northern Virginia
                and the work fits, I&apos;m interested.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="card p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-cloud mb-4">
              Areas Served
            </h2>
            <div className="flex flex-wrap gap-3">
              {areas.map((area) => (
                <span key={area} className="tag tag-mint">{area}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="card p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-cloud mb-6">Recent Local Projects</h2>
            <div className="space-y-6">
              <div>
                <Link href="/projects/nrvpc" className="font-semibold text-cloud hover:text-electric transition-colors">
                  NRVPC — Northern Virginia Managed IT Services
                </Link>
                <p className="text-mist text-sm mt-1">
                  Full Webflow development for a managed IT services company serving Northern Virginia and the DC metro.
                  Client-owned CMS, service pages, and consultation booking.
                </p>
              </div>
              <div>
                <Link href="/projects/devereaux" className="font-semibold text-cloud hover:text-electric transition-colors">
                  Devereaux Architecture — Northern Virginia Architecture Firm
                </Link>
                <p className="text-mist text-sm mt-1">
                  WordPress to Webflow migration with portfolio redesign for a residential and recreation architecture firm.
                </p>
              </div>
            </div>
            <Link href="/projects" className="inline-flex items-center mt-6 text-electric hover:text-volt text-sm font-medium">
              View all projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="card p-8 sm:p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-cloud mb-4">
              Ready to Start?
            </h2>
            <p className="text-xl text-mist mb-8 max-w-2xl mx-auto">
              Tell me what you&apos;re building or what&apos;s not working with your current site.
              I&apos;ll respond within one business day.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get in Touch
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

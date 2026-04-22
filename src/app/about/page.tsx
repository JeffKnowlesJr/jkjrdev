import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generateBreadcrumbSchema, BREADCRUMBS, generatePersonSchema } from '@/utils/schema'
import FadeIn from '@/components/FadeIn'
import { GridPatternBackground, RadialGlowBackground } from '@/components/backgrounds'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'

export const metadata: Metadata = {
  title: 'About Jeff Knowles Jr — Full-Stack Web Developer in Northern Virginia',
  description:
    'Jeff Knowles Jr is a full-stack web developer based in Northern Virginia who builds websites and web applications for businesses across the DC metro area.',
  keywords: [
    'Jeff Knowles Jr',
    'Jeff Knowles Jr developer',
    'JKJR Digital Development',
    'full stack web developer Northern Virginia',
    'web developer Northern Virginia',
    'freelance web developer DC',
    'Webflow developer Northern Virginia',
    'Next.js developer Northern Virginia'
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    type: 'profile',
    url: `${BASE_URL}/about`,
    siteName: 'JKJR Digital Development',
    title: 'About Jeff Knowles Jr — Full-Stack Web Developer in Northern Virginia',
    description:
      'Jeff Knowles Jr is a full-stack web developer based in Northern Virginia. React, Next.js, Webflow, WordPress, and cloud infrastructure for DC metro businesses.',
    images: [{ url: `${BASE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Jeff Knowles Jr' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Jeff Knowles Jr — Full-Stack Web Developer in Northern Virginia',
    description:
      'Full-stack web developer based in Northern Virginia. Building websites and web applications for clients across the DC metro area.',
    images: [`${BASE_URL}/images/og-default.jpg`]
  }
}

const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Webflow'] },
  { category: 'Backend', items: ['Node.js', 'Firebase', 'AWS Lambda', 'Cloudflare Workers'] },
  { category: 'CMS & Platforms', items: ['WordPress', 'Webflow CMS', 'Contentful'] },
  { category: 'Analytics & SEO', items: ['Google Analytics 4', 'Google Search Console', 'Schema.org'] },
  { category: 'Infrastructure', items: ['AWS', 'Cloudflare', 'Firebase', 'Vercel', 'GitHub Actions'] }
]


function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5 text-electric flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function AboutPage() {
  const personSchema = {
    ...generatePersonSchema(),
    jobTitle: 'Full-Stack Web Developer',
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

  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS.about)

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, breadcrumbSchema]) }}
      />

      {/* ── Hero intro ─────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center gap-10 lg:gap-16">
              {/* Text content — left on desktop */}
              <div className="flex-1 min-w-0 md:order-first">
                <span className="tag tag-mint mb-4">About</span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-cloud mt-4 mb-6">
                  Jeff Knowles Jr
                </h1>
                <p className="text-xl text-mist leading-relaxed mb-4">
                  Full-stack web developer based in <strong className="text-cloud">Northern Virginia</strong>.
                  Building websites and web applications for clients across the DC metro area and beyond.
                </p>
                <p className="text-mist leading-relaxed mb-8">
                  I run JKJR Digital Development as a one-person practice. That means you work directly with
                  the person who writes the code. No account managers, no handoffs, no guessing who actually
                  built your site.
                </p>

                {/* Social links */}
                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <a
                    href="https://github.com/jeffknowlesjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-mist hover:text-electric transition-colors text-sm font-medium"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jeffknowlesjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-mist hover:text-electric transition-colors text-sm font-medium"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 text-mist hover:text-electric transition-colors text-sm font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H7m12 0l-4-4m4 4l-4 4" />
                    </svg>
                    View Projects
                  </Link>
                </div>
              </div>

              {/* Profile image — right on desktop, top on mobile */}
              <div className="flex-shrink-0 flex justify-center md:justify-end md:order-last">
                <div className="relative w-48 h-56 md:w-64 md:h-80 rounded-2xl overflow-hidden ring-2 ring-steel/30 shadow-xl">
                  <Image
                    src="/images/jeff-profile.jpg"
                    alt="Jeff Knowles Jr"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── What I Do ─────────────────────────────────────────────────────── */}
      <section className="py-12 bg-slate/30 border-y border-steel/20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-cloud mb-5 pt-2 border-t border-steel/30">
              What I Do
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-mist leading-relaxed">
              <p>
                My practice covers four service areas: <strong className="text-cloud">web development</strong> (Webflow,
                Next.js, WordPress, and custom builds), <strong className="text-cloud">platform migrations</strong> (moving sites
                off legacy CMS platforms that have become a liability), <strong className="text-cloud">Google Analytics 4
                implementation</strong> (getting GA4 properly configured so the data is actually useful), and
                <strong className="text-cloud"> cloud infrastructure</strong> (AWS, Firebase, and Cloudflare for
                production web applications).
              </p>
              <p>
                Most of my clients are small businesses, professional service firms, and early-stage startups
                in Northern Virginia and the DC metro area. Some are outside the region — I work remotely
                comfortably, though I&apos;m available for in-person meetings with local clients when that&apos;s useful.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="border-l-4 border-electric pl-6 py-2">
              <h2 className="font-display text-2xl font-bold text-cloud mb-5">Experience</h2>
              <div className="grid md:grid-cols-3 gap-x-12 gap-y-4 text-mist leading-relaxed">
                <p>
                  I started building websites as a personal interest long before I started taking on client work.
                  Going from hobbyist to professional developer — eventually through a structured bootcamp — gave
                  me a different perspective than someone who went straight from school into an agency. I understand
                  how non-developers think about the web, and I&apos;ve seen what the hot new thing looks like after
                  a few years of real-world use.
                </p>
                <p>
                  My own products include <strong className="text-cloud">PII.link</strong>, a time-tracking
                  and invoicing tool built with Next.js and Firebase, and <strong className="text-cloud">Canticolo</strong>,
                  a chord chart and lead sheet app built with React. Building products, not just client work,
                  keeps me close to the problems developers and small teams actually face.
                </p>
                <p>
                  Client work spans architecture firms, IT managed services companies, organizational
                  consulting firms, and small business owners across a range of industries in Northern Virginia
                  and the broader DC area.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Technologies — full-width section ─────────────────────────────── */}
      <section className="py-12 bg-slate border-y border-steel/20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-cloud mb-8">Technologies</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {techStack.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold text-electric uppercase tracking-wider mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tag tag-electric">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Based in Northern Virginia ─────────────────────────────────────── */}
      <section className="py-12">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <MapPinIcon />
              <h2 className="font-display text-2xl font-bold text-cloud">Based in Northern Virginia</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-mist leading-relaxed">
              <p>
                I&apos;m based in the Northern Virginia / DC metro area and work primarily with clients in
                Fairfax, Arlington, Reston, McLean, Alexandria, and Washington DC. I understand the region&apos;s
                business landscape — the mix of government contractors, professional service firms, technology
                companies, and small businesses that make up the local economy.
              </p>
              <p>
                For local clients, I&apos;m happy to meet in person for discovery conversations and reviews.
                For remote clients, I work asynchronously during EST business hours with video calls as needed.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Full-width CTA ─────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-midnight via-deep to-slate/40">
        <GridPatternBackground opacity="opacity-40" />
        <RadialGlowBackground />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="tag tag-electric mb-4">Let&apos;s Talk</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cloud mb-6 mt-4">
              Have a project in{' '}
              <span className="gradient-text">mind</span>?
            </h2>
            <p className="text-xl text-mist mb-8 max-w-2xl mx-auto">
              The best first step is a short conversation. Tell me what you&apos;re trying to build and
              I&apos;ll tell you whether I&apos;m the right fit.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

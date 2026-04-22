import { Metadata } from 'next'
import Link from 'next/link'
import { getContentList, ServicePage } from '@/utils/content-loader'
import { generateServicesIndexMetadata } from '@/utils/metadata'
import { generateBreadcrumbSchema, BREADCRUMBS } from '@/utils/schema'
import FadeIn from '@/components/FadeIn'
import { GridPatternBackground, RadialGlowBackground } from '@/components/backgrounds'

export const metadata: Metadata = generateServicesIndexMetadata()

// ─── Per-service icon / accent / hover config ────────────────────────────────

type AccentColor = 'electric' | 'mint' | 'amber'

interface ServiceConfig {
  accent: AccentColor
  hoverClass: string
  icon: React.ReactNode
}

const serviceConfig: Record<string, ServiceConfig> = {
  'webflow-development': {
    accent: 'electric',
    hoverClass: 'card-hover-electric',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    )
  },
  'nextjs-development': {
    accent: 'mint',
    hoverClass: 'card-hover-mint',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    )
  },
  'ga4-analytics': {
    accent: 'amber',
    hoverClass: 'card-hover-amber',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    )
  },
  'web-development': {
    accent: 'electric',
    hoverClass: 'card-hover-electric',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    )
  },
  'cloud-infrastructure': {
    accent: 'mint',
    hoverClass: 'card-hover-mint',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
  }
}

function accentFrom(color: AccentColor): string {
  if (color === 'electric') return 'from-electric/20 to-volt/20'
  if (color === 'mint') return 'from-mint/20 to-electric/20'
  return 'from-amber-400/20 to-volt/20'
}

function iconColorFrom(color: AccentColor): string {
  if (color === 'electric') return 'text-electric'
  if (color === 'mint') return 'text-mint'
  return 'text-amber-400'
}

// ─── Process steps ────────────────────────────────────────────────────────────

const processSteps = [
  {
    num: '1',
    label: 'Discovery',
    description: 'A short call where you tell me what you have and what you need.'
  },
  {
    num: '2',
    label: 'Scope',
    description: 'Fixed-price proposal with a clear statement of deliverables and timeline.'
  },
  {
    num: '3',
    label: 'Build',
    description: 'Regular check-ins and previews. No surprises at the end.'
  },
  {
    num: '4',
    label: 'Launch',
    description: 'Deployment, DNS, analytics, and handoff documentation.'
  }
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServicesPage() {
  const services = await getContentList<ServicePage>('services')
  const sorted = [...services].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))

  const breadcrumbJsonLd = generateBreadcrumbSchema(BREADCRUMBS.services)

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero header ────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-slate/30 border-b border-steel/20 overflow-hidden">
        <GridPatternBackground opacity="opacity-20" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="tag tag-electric mb-4">What I Do</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-cloud mt-4 mb-6">
                Services
              </h1>
              <p className="text-xl text-mist leading-relaxed mb-0">
                Full-stack web development, Webflow, Next.js, GA4 analytics, and cloud infrastructure —
                for small businesses, startups, and professional firms in Northern Virginia and the DC metro area.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Service cards ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {sorted.map((service, i) => {
              const cfg = serviceConfig[service.slug] ?? {
                accent: 'electric' as AccentColor,
                hoverClass: 'card-hover-electric',
                icon: null
              }
              return (
                <FadeIn key={service.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`card card-no-blur p-6 sm:p-8 group flex flex-col h-full ${cfg.hoverClass}`}
                  >
                    <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${accentFrom(cfg.accent)} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <svg className={`w-7 h-7 ${iconColorFrom(cfg.accent)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {cfg.icon}
                      </svg>
                    </div>
                    <h2 className={`font-display text-2xl font-bold text-cloud mb-3 transition-colors ${
                      cfg.accent === 'electric' ? 'group-hover:text-electric' :
                      cfg.accent === 'mint' ? 'group-hover:text-mint' :
                      'group-hover:text-amber-400'
                    }`}>
                      {service.title}
                    </h2>
                    <p className="text-mist flex-grow mb-6">{service.excerpt}</p>
                    <span className={`inline-flex items-center font-medium text-sm ${iconColorFrom(cfg.accent)}`}>
                      Learn more
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How I Work process strip ────────────────────────────────────────── */}
      <section className="section bg-slate border-y border-steel/20 overflow-hidden">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="tag tag-mint mb-4">The Process</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cloud mt-4">
                How I Work
              </h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <FadeIn key={step.label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric/20 to-mint/20 border border-electric/30 flex items-center justify-center mb-4 flex-shrink-0">
                    <span className="font-display font-bold text-electric">{step.num}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-cloud mb-2">{step.label}</h3>
                  <p className="text-mist text-sm leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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
              Not sure what you{' '}
              <span className="gradient-text">need</span>?
            </h2>
            <p className="text-xl text-mist mb-8 max-w-2xl mx-auto">
              That&apos;s fine. Tell me what you&apos;re trying to accomplish and I&apos;ll tell you
              what makes sense — and what doesn&apos;t.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Start the Conversation
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

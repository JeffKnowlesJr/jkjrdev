import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ServicePage,
  Project,
  getContentBySlug,
  getContentList
} from '@/utils/content-loader'
import { generateServiceMetadata } from '@/utils/metadata'
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  serviceBreadcrumbs
} from '@/utils/schema'
import FadeIn from '@/components/FadeIn'
import { GridPatternBackground, RadialGlowBackground } from '@/components/backgrounds'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'

type Params = Promise<{ slug: string }>

// ─── Icon / accent config (same map as services index) ───────────────────────

type AccentColor = 'electric' | 'mint' | 'amber'

interface ServiceConfig {
  accent: AccentColor
  icon: React.ReactNode
}

const serviceConfig: Record<string, ServiceConfig> = {
  'webflow-development': {
    accent: 'electric',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    )
  },
  'nextjs-development': {
    accent: 'mint',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    )
  },
  'ga4-analytics': {
    accent: 'amber',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    )
  },
  'web-development': {
    accent: 'electric',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    )
  },
  'cloud-infrastructure': {
    accent: 'mint',
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
function tagClassFrom(color: AccentColor): string {
  if (color === 'electric') return 'tag-electric'
  if (color === 'mint') return 'tag-mint'
  return 'tag-amber'
}

// ─── Markdown section splitter ───────────────────────────────────────────────

interface ContentSection {
  heading: string
  body: string
  isProcess: boolean
  isProjects: boolean
  isGetStarted: boolean
}

function splitIntoSections(markdown: string): ContentSection[] {
  const lines = markdown.split('\n')
  const sections: ContentSection[] = []
  let current: ContentSection | null = null

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current)
      const heading = line.replace(/^## /, '').trim()
      current = {
        heading,
        body: '',
        isProcess: /process/i.test(heading),
        isProjects: /relevant project/i.test(heading),
        isGetStarted: /get started/i.test(heading)
      }
    } else if (current) {
      current.body += line + '\n'
    }
  }
  if (current) sections.push(current)
  return sections
}

// ─── Process timeline renderer ───────────────────────────────────────────────

interface ProcessStep {
  num: string
  label: string
  description: string
}

function parseProcessSteps(markdown: string): ProcessStep[] {
  const steps: ProcessStep[] = []
  const lines = markdown.split('\n')
  for (const line of lines) {
    const m = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*[—–-]\s*(.+)/)
    if (m) {
      steps.push({ num: String(steps.length + 1), label: m[1].trim(), description: m[2].trim() })
    }
  }
  return steps
}

// ─── ReactMarkdown shared component props type ───────────────────────────────

type ComponentProps = {
  children?: React.ReactNode
  [key: string]: unknown
}

const sharedComponents = {
  a: ({ href, children, ...props }: ComponentProps) => (
    <a
      href={href as string}
      className="text-electric hover:text-volt underline underline-offset-2"
      {...(String(href ?? '').startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  ),
  h2: ({ children, ...props }: ComponentProps) => (
    <h2 className="text-2xl font-bold text-cloud mt-10 mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: ComponentProps) => (
    <h3 className="text-xl font-bold text-cloud mt-6 mb-3" {...props}>{children}</h3>
  ),
  ul: ({ children, ordered: _o, ...props }: ComponentProps & { ordered?: boolean }) => (
    <ul className="list-disc pl-6 my-4 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ordered: _o, ...props }: ComponentProps & { ordered?: boolean }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>{children}</ol>
  ),
  strong: ({ children, ...props }: ComponentProps) => (
    <strong className="text-cloud font-semibold" {...props}>{children}</strong>
  ),
  blockquote: ({ children, ...props }: ComponentProps) => (
    <blockquote className="border-l-4 border-electric pl-4 italic my-4 text-mist" {...props}>{children}</blockquote>
  ),
  p: ({ children, ...props }: ComponentProps) => (
    <p className="text-mist leading-relaxed mb-4" {...props}>{children}</p>
  ),
  li: ({ children, ordered: _o, ...props }: ComponentProps & { ordered?: boolean }) => (
    <li className="text-mist leading-relaxed" {...props}>{children}</li>
  )
}

// ─── Mini project card ────────────────────────────────────────────────────────

function MiniProjectCard({ project, accent }: { project: Project; accent: AccentColor }) {
  const borderClass = accent === 'electric'
    ? 'border-electric/30 hover:border-electric/50'
    : accent === 'mint'
    ? 'border-mint/30 hover:border-mint/50'
    : 'border-amber-400/30 hover:border-amber-400/50'

  const hoverTextClass = accent === 'electric' ? 'group-hover:text-electric'
    : accent === 'mint' ? 'group-hover:text-mint'
    : 'group-hover:text-amber-400'

  const tagClass = tagClassFrom(accent)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`card group p-0 overflow-hidden flex h-full w-full min-h-0 flex-col ${borderClass}`}
    >
      <div className={`relative h-36 overflow-hidden ${
        accent === 'electric' ? 'bg-gradient-to-br from-slate to-electric/10'
        : accent === 'mint' ? 'bg-gradient-to-br from-slate to-mint/10'
        : 'bg-gradient-to-br from-slate to-amber-400/10'
      }`}>
        {project.featuredImage ? (
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className={`w-10 h-10 opacity-30 ${iconColorFrom(accent)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5 flex min-h-0 flex-1 flex-col">
        <h3 className={`font-display text-lg font-semibold text-cloud mb-2 transition-colors ${hoverTextClass}`}>
          {project.title}
        </h3>
        <p className="text-mist mb-3 min-h-0 flex-1 text-sm leading-relaxed">{project.excerpt}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {(project.techStack ?? project.tags ?? []).slice(0, 3).map((tech) => (
            <span key={tech} className={`tag ${tagClass}`}>{tech}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ─── Route handlers ───────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const services = await getContentList<ServicePage>('services')
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const service = await getContentBySlug<ServicePage>('services', slug)
  if (!service) {
    return { title: 'Service Not Found', description: 'The requested service page could not be found.' }
  }
  return generateServiceMetadata(service)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServicePageComponent({ params }: { params: Params }) {
  const { slug } = await params
  const service = await getContentBySlug<ServicePage>('services', slug)

  if (!service) notFound()

  // Load related projects from frontmatter slugs
  const allProjects = await getContentList<Project>('projects')
  const relatedProjects = (service.relatedProjects ?? [])
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p))

  const cfg = serviceConfig[service.slug] ?? { accent: 'electric' as AccentColor, icon: null }

  const serviceUrl = `${BASE_URL}/services/${service.slug}`
  const serviceSchema = generateServiceSchema(service, serviceUrl)
  const breadcrumbSchema = generateBreadcrumbSchema(serviceBreadcrumbs(service.title, service.slug))

  const sections = splitIntoSections(service.content)

  // Sections to suppress from markdown (handled custom)
  const suppressedSections = new Set<string>()
  sections.forEach((s) => {
    if (s.isProjects || s.isGetStarted) suppressedSections.add(s.heading)
  })

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 bg-slate/30 border-b border-steel/20 overflow-hidden">
        <GridPatternBackground opacity="opacity-20" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <Link
              href="/services"
              className="inline-flex items-center text-electric hover:text-volt transition-colors mb-8 text-sm"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accentFrom(cfg.accent)} flex items-center justify-center flex-shrink-0 mt-1`}>
                <svg className={`w-8 h-8 ${iconColorFrom(cfg.accent)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {cfg.icon}
                </svg>
              </div>
              <div>
                <span className="tag tag-electric mb-3">Service</span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-cloud mt-3 mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-mist leading-relaxed max-w-2xl">
                  {service.excerpt}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Content sections with alternating backgrounds ───────────────────── */}
      {sections
        .filter((s) => !suppressedSections.has(s.heading))
        .map((section, i) => {
          const isEven = i % 2 === 1
          const bgClass = isEven ? 'bg-slate/30 border-y border-steel/20' : ''
          const processSteps = section.isProcess ? parseProcessSteps(section.body) : []

          return (
            <section key={section.heading} className={`py-12 ${bgClass}`}>
              <div className="container-custom px-4 sm:px-6 lg:px-8">
                <FadeIn delay={0.05 * i}>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-cloud mb-6 max-w-3xl">
                      {section.heading}
                    </h2>

                    {section.isProcess && processSteps.length > 0 ? (
                      /* Visual process timeline */
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processSteps.map((step, si) => (
                          <FadeIn key={step.label} delay={0.08 * si}>
                            <div className="flex gap-4">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${accentFrom(cfg.accent)} border border-${cfg.accent === 'electric' ? 'electric' : cfg.accent === 'mint' ? 'mint' : 'amber-400'}/30 flex items-center justify-center flex-shrink-0`}>
                                <span className={`font-display font-bold text-sm ${iconColorFrom(cfg.accent)}`}>
                                  {step.num}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-display font-bold text-cloud mb-1">{step.label}</h3>
                                <p className="text-mist text-sm leading-relaxed">{step.description}</p>
                              </div>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    ) : (
                      /* Regular markdown */
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={sharedComponents}>
                          {section.body.trim()}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
            </section>
          )
        })}

      {/* ── Relevant Projects — mini cards ──────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="py-12 bg-slate/30 border-y border-steel/20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cloud mb-8">
                Relevant Projects
              </h2>
              <div className="grid items-stretch sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((project, i) => (
                  <FadeIn key={project.slug} className="h-full min-h-0" delay={i * 0.1}>
                    <MiniProjectCard project={project} accent={cfg.accent} />
                  </FadeIn>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/projects" className="inline-flex items-center text-electric hover:text-volt text-sm font-medium transition-colors">
                  View all projects
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Full-width CTA ─────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-midnight via-deep to-slate/40">
        <GridPatternBackground opacity="opacity-40" />
        <RadialGlowBackground />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="tag tag-electric mb-4">Let&apos;s Talk</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cloud mb-6 mt-4">
              {service.cta || 'Ready to get started?'}
            </h2>
            <p className="text-xl text-mist mb-8 max-w-2xl mx-auto">
              No sales pitch. Just a conversation about what you&apos;re building and whether I&apos;m the right fit.
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

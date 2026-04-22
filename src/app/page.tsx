import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getContentList, BlogPost, Project } from '@/utils/content-loader'
import { NodeMeshBackground } from '@/components/backgrounds'
import { GradientOrbsBackground } from '@/components/backgrounds'
import { GridPatternBackground } from '@/components/backgrounds'
import { RadialGlowBackground } from '@/components/backgrounds'
import FadeIn from '@/components/FadeIn'
import HeroBrowserMockup from '@/components/HeroBrowserMockup'
import { generateBreadcrumbSchema, BREADCRUMBS } from '@/utils/schema'

const breadcrumbJsonLd = generateBreadcrumbSchema(BREADCRUMBS.home)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`

export const metadata: Metadata = {
  title: 'JKJR Digital Development — Full-Stack Web Developer in Northern Virginia',
  description: 'Jeff Knowles Jr builds full-stack web apps, cloud infrastructure, and digital strategy. React, Next.js, WordPress, Webflow, AWS, and GA4 — serving clients across the DC metro area.',
  keywords: [
    'full-stack web developer',
    'Northern Virginia web developer',
    'React developer',
    'Next.js developer',
    'WordPress developer',
    'Webflow developer',
    'AWS cloud infrastructure',
    'Jeff Knowles Jr',
    'JKJR Digital Development',
    'web development Northern Virginia',
    'DC metro web developer'
  ],
  metadataBase: new URL(BASE_URL),
  authors: [{ name: 'Jeff Knowles Jr', url: BASE_URL }],
  creator: 'Jeff Knowles Jr',
  publisher: 'JKJR Digital Development',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'JKJR Digital Development',
    title: 'JKJR Digital Development — Full-Stack Web Developer in Northern Virginia',
    description: 'Jeff Knowles Jr builds full-stack web apps, cloud infrastructure, and digital strategy. React, Next.js, WordPress, Webflow, AWS, and GA4 — serving clients across the DC metro area.',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'JKJR Digital Development' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JKJR Digital Development — Full-Stack Web Developer',
    description: 'Jeff Knowles Jr builds full-stack web apps, cloud infrastructure, and digital strategy.',
    images: [DEFAULT_OG_IMAGE]
  }
}

async function getLatestBlogPosts() {
  try {
    const posts = await getContentList<BlogPost>('blog')
    const sorted = [...posts].sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.datePublished || a.publishDate || '').getTime()
      const dateB = new Date(b.publishedAt || b.datePublished || b.publishDate || '').getTime()
      return dateB - dateA
    })
    if (sorted.length > 0) {
      return sorted.slice(0, 2).map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.publishedAt || p.datePublished || p.publishDate || '',
        featuredImage: p.featuredImage || (p as { image?: string }).image || '',
        readingTime: p.readingTime || 5
      }))
    }
  } catch (e) {
    console.error('Error fetching latest blog posts:', e)
  }
  return [{
    slug: '',
    title: 'Latest from the Blog',
    excerpt: 'Read about development, architecture, and tools.',
    date: '',
    featuredImage: '',
    readingTime: 5
  }]
}

async function getFeaturedProjectsForHome() {
  const all = await getContentList<Project>('projects')
  const featured =
    all.filter((p) => ['nrvpc', 'pii-link'].includes(p.slug)).length >= 2
      ? all.filter((p) => ['nrvpc', 'pii-link'].includes(p.slug))
      : all.slice(0, 2)
  return featured.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.excerpt,
    image: p.featuredImage || p.thumbnailImage || '',
    technologies: Array.isArray(p.techStack) ? p.techStack : p.tags ?? []
  }))
}

const services = [
  {
    title: 'Web Development',
    description: 'Full-stack builds: JavaScript and TypeScript frontends (React, Next.js), backend services, plus WordPress and Webflow when they fit.',
    href: '/services/web-development',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    hoverClass: 'card-hover-electric'
  },
  {
    title: 'Cloud & Infrastructure',
    description: 'AWS, Firebase, Cloudflare — hosting, DNS, CDN, and deployment configured for performance and security.',
    href: '/services/cloud-infrastructure',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    hoverClass: 'card-hover-mint'
  },
  {
    title: 'Google Analytics 4 & SEO',
    description: 'GA4, data pipelines, search optimization — understand your traffic and grow your visibility.',
    href: '/services/ga4-analytics',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
    hoverClass: 'card-hover-amber'
  }
]

const platforms = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'AWS', 'Cloudflare', 'Google Analytics 4', 'SEO']

export default async function HomePage() {
  const latestPosts = await getLatestBlogPosts()
  const latestPost = latestPosts[0]
  const featuredProjects = await getFeaturedProjectsForHome()

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — 60% dominant (midnight), accent: electric/volt gradient */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <NodeMeshBackground highlightColor="244, 63, 94" />
        </div>
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
            <div className="space-y-8">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate/50 rounded-full border border-steel/40">
                  <span className="w-2 h-2 bg-mint rounded-full" />
                  <span className="text-sm font-mono text-mist">Northern Virginia Web Developer</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-cloud">Full Stack</span>
                  <br />
                  <span className="gradient-text">Web Apps</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-xl text-mist max-w-xl leading-relaxed">
                  Full-stack developer: JavaScript and TypeScript frontends, backend services, and cloud infrastructure.
                  React, Next.js, WordPress, Webflow, AWS, Cloudflare — building what fits your needs.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Start Your Project
                  </Link>
                  <Link href="/projects" className="btn btn-secondary btn-lg">
                    View My Work
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="pt-8 border-t border-steel/30">
                  <p className="text-sm text-steel mb-4 uppercase tracking-wider font-medium">Platforms & Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((name, i) => (
                      <span key={name} className="px-3 py-1 bg-slate/50 rounded-full text-sm text-mist border border-steel/30">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <HeroBrowserMockup projects={featuredProjects} latestPosts={latestPosts} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services — 30% secondary (slate surface), warm amber accent on heading, no blur */}
      <section className="section relative bg-slate border-y border-steel/20" style={{ overflowX: 'clip' }}>
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="mb-6"><span className="tag tag-electric">What I Do</span></div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cloud pb-2 border-b-2 border-amber/40 inline-block">
                Full-Stack Solutions
              </h2>
              <p className="text-xl text-mist max-w-2xl mx-auto mt-6">
                From WordPress to cloud infrastructure, I match the right technology to your specific needs.
              </p>
              <Link href="/services" className="inline-flex items-center mt-6 text-electric hover:text-volt text-sm font-medium transition-colors">
                View all services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1} className="h-full">
                <Link href={s.href} className={`card card-no-blur p-6 sm:p-8 group h-full flex flex-col min-h-[280px] ${s.hoverClass}`}>
                  <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <svg className="w-7 h-7 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-cloud mb-3">{s.title}</h3>
                  <p className="text-mist flex-grow">{s.description}</p>
                  <span className="mt-4 inline-flex items-center text-electric text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects — midnight, mint accent signature */}
      <section className="section bg-slate/40 relative border-b border-steel/30" style={{ overflowX: 'clip', contain: 'inline-size' }}>
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-12">
              <div>
                <span className="tag tag-mint mb-4">My Work</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-cloud">
                  Featured Projects
                </h2>
              </div>
              <Link href="/projects" className="btn btn-secondary self-start border-mint/50 text-mint hover:bg-mint/10 hover:border-mint">
                See All Projects
              </Link>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 items-stretch pb-2">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1} className="h-full min-w-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className={`card group p-0 overflow-hidden w-full min-w-0 h-full flex flex-col ${
                    i === 0
                      ? 'border-mint/30 hover:border-mint/50'
                      : 'border-electric/30 hover:border-electric/50'
                  }`}
                >
                  <div className={`relative overflow-hidden h-40 sm:h-48 md:h-auto md:aspect-[16/9] ${
                    i === 0 ? 'bg-gradient-to-br from-slate to-mint/10' : 'bg-gradient-to-br from-slate to-electric/10'
                  }`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${
                          i === 0 ? 'bg-mint/10' : 'bg-electric/10'
                        }`}>
                          <svg className={`w-10 h-10 ${i === 0 ? 'text-mint' : 'text-electric'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <h3 className={`font-display text-xl font-semibold text-cloud mb-2 transition-colors ${
                      i === 0 ? 'group-hover:text-mint' : 'group-hover:text-electric'
                    }`}>
                      {project.title}
                    </h3>
                    <p className="text-mist mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className={i === 0 ? 'tag tag-mint' : 'tag tag-electric'}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog — deep, volt accent on Read More */}
      {latestPost.slug && (
        <section className="section bg-deep relative overflow-hidden section-fade-from-deep">
          <GradientOrbsBackground orbs={[
            { color: 'bg-mint/8', size: 'w-[500px] h-[500px]', position: '-top-40 -right-40' }
          ]} />
          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-12">
                <div>
                  <span className="tag tag-electric mb-4">Blog</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-cloud">
                    Latest from the Blog
                  </h2>
                </div>
                <Link href="/blog" className="btn btn-secondary self-start">
                  View All Posts
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card flex flex-col md:flex-row gap-0 overflow-hidden p-0">
                {latestPost.featuredImage && (
                  <Link href={`/blog/${latestPost.slug}`} className="md:w-1/2 block relative aspect-video md:aspect-auto md:min-h-[280px]">
                    <Image
                      src={latestPost.featuredImage}
                      alt={latestPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                  <Link href={`/blog/${latestPost.slug}`}>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-cloud hover:text-volt transition-colors mb-4">
                      {latestPost.title}
                    </h3>
                  </Link>
                  <p className="text-mist mb-4 line-clamp-3">{latestPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-mist mb-6">
                    <span>
                      {latestPost.date
                        ? new Date(latestPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : ''}
                    </span>
                    <span>·</span>
                    <span>{latestPost.readingTime} min read</span>
                  </div>
                  <Link
                    href={`/blog/${latestPost.slug}`}
                    className="inline-flex items-center text-volt hover:text-electric font-medium"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA — gradient crescendo, full gradient button */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-midnight via-deep to-slate/40 section-fade-from-midnight">
        <GridPatternBackground opacity="opacity-40" />
        <RadialGlowBackground />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="tag tag-electric mb-4">Let&apos;s Talk</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cloud mb-6">
              Have a project
              <br />
              in <span className="gradient-text">mind</span>?
            </h2>
            <p className="text-xl text-mist mb-8 max-w-2xl mx-auto">
              No sales pitch. No pressure. Just a conversation about what you&apos;re trying to build and whether I&apos;m the right fit to help.
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

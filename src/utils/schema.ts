/**
 * JSON-LD Structured Data Utilities
 *
 * Implements 2026 best practices:
 * - Stable @id URIs for Organization, Person, and WebSite (anchored to domain)
 * - sameAs links connecting entities to social profiles
 * - BreadcrumbList generator for any page path
 * - CreativeWork type for client website projects (not SoftwareApplication)
 * - Markdown frontmatter as primary source of truth for descriptions/keywords
 */

import { BlogPost, Project, ServicePage } from './content-loader'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'

// Stable entity URIs — these never change and anchor the knowledge graph
const ORG_ID = `${BASE_URL}/#org`
const PERSON_ID = `${BASE_URL}/#person`
const WEBSITE_ID = `${BASE_URL}/#website`

// ─── Core entity schemas ──────────────────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'JKJR Digital Development',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/JKJR3.png`,
      width: 512,
      height: 512
    },
    sameAs: [
      'https://github.com/jeffknowlesjr',
      'https://www.linkedin.com/in/jeffknowlesjr'
    ],
    founder: { '@id': PERSON_ID },
    description:
      'Full-stack web development, cloud infrastructure, and digital strategy by Jeff Knowles Jr.'
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Jeff Knowles Jr',
    url: BASE_URL,
    jobTitle: 'Full-Stack Web Developer',
    worksFor: { '@id': ORG_ID },
    sameAs: [
      'https://github.com/jeffknowlesjr',
      'https://www.linkedin.com/in/jeffknowlesjr'
    ]
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'JKJR Digital Development',
    url: BASE_URL,
    description:
      'Portfolio and blog of JKJR Digital Development. Web development projects, technical articles, and digital strategy by Jeff Knowles Jr.',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Pre-built breadcrumbs for common paths
export const BREADCRUMBS = {
  home: [{ name: 'Home', url: BASE_URL }],
  blog: [
    { name: 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` }
  ],
  projects: [
    { name: 'Home', url: BASE_URL },
    { name: 'Projects', url: `${BASE_URL}/projects` }
  ],
  contact: [
    { name: 'Home', url: BASE_URL },
    { name: 'Contact', url: `${BASE_URL}/contact` }
  ],
  privacy: [
    { name: 'Home', url: BASE_URL },
    { name: 'Privacy', url: `${BASE_URL}/privacy` }
  ],
  services: [
    { name: 'Home', url: BASE_URL },
    { name: 'Services', url: `${BASE_URL}/services` }
  ],
  about: [
    { name: 'Home', url: BASE_URL },
    { name: 'About', url: `${BASE_URL}/about` }
  ],
  location: [
    { name: 'Home', url: BASE_URL },
    { name: 'Web Developer Northern Virginia', url: `${BASE_URL}/web-developer-northern-virginia` }
  ]
}

export function blogPostBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: title, url: `${BASE_URL}/blog/${slug}` }
  ]
}

export function projectBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: BASE_URL },
    { name: 'Projects', url: `${BASE_URL}/projects` },
    { name: title, url: `${BASE_URL}/projects/${slug}` }
  ]
}

// ─── BlogPosting ──────────────────────────────────────────────────────────────

export function generateBlogPostSchema(post: BlogPost, url: string) {
  const rawImage = post.ogImage || post.featuredImage || post.image || ''
  const imageUrl = rawImage
    ? rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`
    : `${BASE_URL}/images/og-default.jpg`

  const description = post.description || post.excerpt
  const keywords = post.keywords
    ? post.keywords.join(', ')
    : post.tags?.join(', ')

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: post.title,
    description,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    datePublished: post.datePublished || post.publishDate || post.publishedAt || '',
    dateModified: post.dateModified || post.datePublished || post.publishDate || post.publishedAt || '',
    image: imageUrl ? [imageUrl] : [],
    url,
    keywords,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    isPartOf: { '@id': WEBSITE_ID }
  }
}

// ─── CreativeWork (client websites / projects) ────────────────────────────────

export function generateProjectSchema(project: Project, url: string) {
  const rawImage =
    project.featuredImage || project.contentImage || project.thumbnailImage || ''
  const imageUrl = rawImage
    ? rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`
    : `${BASE_URL}/images/og-default.jpg`

  const description = project.description || project.excerpt
  const keywords = project.keywords
    ? project.keywords.join(', ')
    : project.tags?.join(', ')

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': url,
    name: project.title,
    description,
    creator: { '@id': PERSON_ID },
    producer: { '@id': ORG_ID },
    datePublished: project.publishedAt || '',
    dateModified: project.updatedAt || project.publishedAt || '',
    image: imageUrl ? [imageUrl] : [],
    url: project.liveUrl || url,
    keywords,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    isPartOf: { '@id': WEBSITE_ID }
  }
}

// ─── LocalBusiness ────────────────────────────────────────────────────────────

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'JKJR Digital Development',
    description:
      'Full-stack web development, Webflow, Next.js, GA4 analytics, and cloud infrastructure for small businesses and startups in Northern Virginia and the DC metro area.',
    url: BASE_URL,
    telephone: '',
    email: 'jeff@jkjrdev.com',
    founder: { '@id': PERSON_ID },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'VA',
      addressLocality: 'Northern Virginia',
      addressCountry: 'US'
    },
    areaServed: [
      { '@type': 'Place', name: 'Northern Virginia' },
      { '@type': 'Place', name: 'Washington DC Metro' },
      { '@type': 'Place', name: 'Fairfax County, VA' },
      { '@type': 'Place', name: 'Arlington, VA' }
    ],
    sameAs: [
      'https://github.com/jeffknowlesjr',
      'https://www.linkedin.com/in/jeffknowlesjr'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Next.js Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GA4 Analytics Implementation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Infrastructure' } }
      ]
    }
  }
}

// ─── Service Page ─────────────────────────────────────────────────────────────

export function generateServiceSchema(service: ServicePage, url: string) {
  const description = service.description || service.excerpt
  const keywords = service.keywords ? service.keywords.join(', ') : ''

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url,
    name: service.title,
    description,
    provider: { '@id': ORG_ID },
    url,
    keywords,
    areaServed: [
      { '@type': 'Place', name: 'Northern Virginia' },
      { '@type': 'Place', name: 'Washington DC Metro' }
    ],
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    isPartOf: { '@id': WEBSITE_ID }
  }
}

// ─── Breadcrumbs for new routes ───────────────────────────────────────────────

export function serviceBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: BASE_URL },
    { name: 'Services', url: `${BASE_URL}/services` },
    { name: title, url: `${BASE_URL}/services/${slug}` }
  ]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Serialize one or more schemas into a JSON-LD script tag string */
export function toJsonLd(schema: object | object[]): string {
  return JSON.stringify(Array.isArray(schema) ? schema : [schema])
}

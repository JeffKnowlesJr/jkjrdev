import { Metadata } from 'next'
import { BlogPost, Project, ServicePage } from './content-loader'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'

// Default OG image -- the logo works at any size and always exists
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`

export function generateBaseMetadata(): Metadata {
  return {
    title: {
      template: '%s | JKJR Digital Development',
      default: 'JKJR Digital Development — Full-Stack Web Development'
    },
    description:
      'Full-stack web development, cloud infrastructure, and digital strategy by Jeff Knowles Jr. React, Next.js, Webflow, WordPress, AWS, Cloudflare, and Google Analytics 4.',
    keywords: [
      'web development',
      'full-stack developer',
      'frontend',
      'backend',
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'AWS',
      'Cloudflare',
      'Google Analytics 4',
      'Jeff Knowles Jr',
      'JKJR Digital Development'
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
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    alternates: {
      canonical: BASE_URL
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: BASE_URL,
      siteName: 'JKJR Digital Development',
      title: 'JKJR Digital Development — Full-Stack Web Development',
      description:
        'Full-stack web development, cloud infrastructure, and digital strategy by Jeff Knowles Jr.',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'JKJR Digital Development' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'JKJR Digital Development — Full-Stack Web Development',
      description:
        'Full-stack web development, cloud infrastructure, and digital strategy by Jeff Knowles Jr.',
      images: [DEFAULT_OG_IMAGE]
    }
  }
}

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const postUrl = `${BASE_URL}/blog/${post.slug}`

  // Prefer explicit SEO overrides from frontmatter, fall back gracefully
  const metaDescription = post.description || post.excerpt
  const ogTitle = post.ogTitle || post.title
  const ogDescription = post.ogDescription || metaDescription
  const twitterCardType = (post.twitterCard as 'summary_large_image' | 'summary') || 'summary_large_image'

  const rawImage = post.ogImage || post.featuredImage || post.image || ''
  const imageUrl = rawImage
    ? (rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`)
    : DEFAULT_OG_IMAGE

  return {
    title: post.title,
    description: metaDescription,
    keywords: Array.isArray(post.keywords)
      ? post.keywords
      : post.tags,
    alternates: { canonical: postUrl },
    openGraph: {
      type: 'article',
      url: postUrl,
      siteName: 'JKJR Digital Development',
      title: ogTitle,
      description: ogDescription,
      publishedTime: post.datePublished || post.publishDate,
      modifiedTime: post.dateModified || post.datePublished || post.publishDate,
      authors: [typeof post.author === 'string' ? post.author : 'Jeff Knowles Jr'],
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
    },
    twitter: {
      card: twitterCardType,
      title: ogTitle,
      description: ogDescription,
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
  }
}

export function generateBlogIndexMetadata(): Metadata {
  const url = `${BASE_URL}/blog`
  return {
    title: 'Blog',
    description:
      'Read articles on React, Next.js, cloud architecture, Obsidian, and developer workflows by Jeff Knowles Jr. Practical insights from real-world projects.',
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'JKJR Digital Development',
      title: 'Blog | JKJR Digital Development',
      description:
        'Read articles on React, Next.js, cloud architecture, Obsidian, and developer workflows by Jeff Knowles Jr. Practical insights from real-world projects.',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'JKJR Digital Development Blog' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | JKJR Digital Development',
      description: 'Read articles on React, Next.js, cloud architecture, Obsidian, and developer workflows by Jeff Knowles Jr.',
      images: [DEFAULT_OG_IMAGE]
    }
  }
}

export function generateProjectMetadata(project: Project): Metadata {
  const url = `${BASE_URL}/projects/${project.slug}`
  const metaDescription = project.description || project.excerpt

  const rawImage =
    project.featuredImage || project.contentImage || project.thumbnailImage || ''
  const imageUrl = rawImage
    ? (rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`)
    : DEFAULT_OG_IMAGE

  return {
    title: project.title,
    description: metaDescription,
    keywords: project.keywords || project.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: 'JKJR Digital Development',
      title: project.title,
      description: metaDescription,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: metaDescription,
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
  }
}

export function generateProjectsIndexMetadata(): Metadata {
  const url = `${BASE_URL}/projects`
  return {
    title: 'Projects',
    description:
      'Explore web development projects by Jeff Knowles Jr — from SaaS products and Webflow builds to Next.js migrations and WordPress sites for clients across industries.',
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'JKJR Digital Development',
      title: 'Projects | JKJR Digital Development',
      description:
        'Explore web development projects by Jeff Knowles Jr — from SaaS products and Webflow builds to Next.js migrations and WordPress sites for clients across industries.',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'JKJR Digital Development Projects' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Projects | JKJR Digital Development',
      description:
        'Explore web development projects by Jeff Knowles Jr — from SaaS products and Webflow builds to Next.js migrations and WordPress sites for clients across industries.',
      images: [DEFAULT_OG_IMAGE]
    }
  }
}

export function generatePrivacyMetadata(): Metadata {
  const url = `${BASE_URL}/privacy`
  return {
    title: 'Privacy & cookies',
    description:
      'How JKJR Digital Development handles privacy, cookies, and Google Analytics on this website.',
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'JKJR Digital Development',
      title: 'Privacy & cookies | JKJR Digital Development',
      description:
        'Privacy policy and cookie information for jkjrdev.com, including optional Google Analytics.',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'JKJR Digital Development' }]
    },
    twitter: {
      card: 'summary',
      title: 'Privacy & cookies | JKJR Digital Development',
      description:
        'Privacy policy and cookie information for jkjrdev.com, including optional Google Analytics.'
    }
  }
}

export function generateServiceMetadata(service: ServicePage): Metadata {
  const url = `${BASE_URL}/services/${service.slug}`
  const metaDescription = service.description || service.excerpt
  const rawImage = service.ogImage || ''
  const imageUrl = rawImage
    ? (rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`)
    : DEFAULT_OG_IMAGE

  return {
    title: service.title,
    description: metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'JKJR Digital Development',
      title: `${service.title} | JKJR Digital Development`,
      description: metaDescription,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: service.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | JKJR Digital Development`,
      description: metaDescription,
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
  }
}

export function generateServicesIndexMetadata(): Metadata {
  const url = `${BASE_URL}/services`
  return {
    title: 'Services',
    description:
      'Web development services by Jeff Knowles Jr — Webflow, Next.js, WordPress, GA4 analytics, and cloud infrastructure for small businesses and startups in Northern Virginia and the DC metro area.',
    keywords: [
      'web development services',
      'Webflow developer Northern Virginia',
      'Next.js developer DC metro',
      'GA4 implementation',
      'freelance web developer Northern Virginia',
      'cloud infrastructure consultant'
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'JKJR Digital Development',
      title: 'Services | JKJR Digital Development',
      description:
        'Web development services by Jeff Knowles Jr — Webflow, Next.js, WordPress, GA4 analytics, and cloud infrastructure for small businesses and startups in Northern Virginia and the DC metro area.',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'JKJR Digital Development Services' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Services | JKJR Digital Development',
      description:
        'Web development services by Jeff Knowles Jr — Webflow, Next.js, WordPress, GA4 analytics, and cloud infrastructure for small businesses and startups in Northern Virginia.',
      images: [DEFAULT_OG_IMAGE]
    }
  }
}

export function generateContactMetadata(): Metadata {
  const url = `${BASE_URL}/contact`
  return {
    title: 'Contact',
    description:
      'Get in touch with Jeff Knowles Jr for web development, technical consulting, or SEO services. No sales pitch — just a direct conversation about your project.',
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'JKJR Digital Development',
      title: 'Contact | JKJR Digital Development',
      description: 'Get in touch with Jeff Knowles Jr for web development, technical consulting, or SEO services.',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Contact JKJR Digital Development' }]
    },
    twitter: {
      card: 'summary',
      title: 'Contact | JKJR Digital Development',
      description: 'Get in touch with Jeff Knowles Jr for web development, technical consulting, or SEO services.'
    }
  }
}

import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sitemap.xml'],
      disallow: [
        '/api/',
        '/admin/',
        '/unauthorized',
        '/_next/',
        '/*.json$',
        '/*.xml$',
        '/404'
      ]
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'}/sitemap.xml`
  }
}

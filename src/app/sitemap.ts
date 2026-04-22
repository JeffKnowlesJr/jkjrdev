import { MetadataRoute } from 'next'
import { getSitemapUrlRows, pathnameToAbsoluteUrl, HUB_PATHNAMES } from '@/utils/sitemap-urls'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await getSitemapUrlRows()

  const sitemapWithStyle = rows.map((row) => ({
    url: pathnameToAbsoluteUrl(row.pathname),
    lastModified: row.lastModified,
    changeFrequency: (HUB_PATHNAMES.has(row.pathname) ? 'weekly' : 'monthly') as const,
    priority: row.priority,
    // Add style sheet reference for XML viewing
    _attributes: {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
      'xmlns:xsl': 'http://www.w3.org/1999/XSL/Transform',
      'xsl:version': '2.0',
    },
  }))

  return sitemapWithStyle
}

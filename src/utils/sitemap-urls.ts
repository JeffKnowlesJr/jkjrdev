import 'server-only'

import { getContentList, BlogPost, Project, ServicePage } from '@/utils/content-loader'

/** Single source of truth for URLs in sitemap.xml and the human /site-map page. */
export interface SitemapUrlRow {
  pathname: string
  lastModified: Date
  priority: number
  label: string
}

const STATIC: { path: string; priority: number; label: string }[] = [
  { path: '/', priority: 1.0, label: 'Home' },
  { path: '/blog', priority: 0.8, label: 'Blog' },
  { path: '/projects', priority: 0.8, label: 'Projects' },
  { path: '/services', priority: 0.8, label: 'Services' },
  { path: '/about', priority: 0.8, label: 'About' },
  { path: '/web-developer-northern-virginia', priority: 0.9, label: 'Northern Virginia' },
  { path: '/contact', priority: 0.8, label: 'Contact' },
  { path: '/privacy', priority: 0.4, label: 'Privacy & cookies' },
  { path: '/blog/search', priority: 0.5, label: 'Blog search' },
]

/** Hub pathnames — same as STATIC paths; used for sitemap changeFrequency and human page grouping. */
export const HUB_PATHNAMES: ReadonlySet<string> = new Set(STATIC.map((s) => s.path))

/** Hubs listed under “Main pages” on /site-map (excludes /services so hub + /services/* stay together). */
const MAIN_PAGE_HUBS: ReadonlySet<string> = new Set(
  [...HUB_PATHNAMES].filter((p) => p !== '/services')
)

function blogLastModified(post: BlogPost): Date {
  return new Date(
    post.dateModified ||
      post.datePublished ||
      post.publishedAt ||
      post.publishDate ||
      new Date()
  )
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'
}

export function pathnameToAbsoluteUrl(pathname: string): string {
  const base = getBaseUrl().replace(/\/$/, '')
  if (pathname === '/') return `${base}/`
  return `${base}${pathname}`
}

/** All URLs that appear in sitemap.xml — this is the single source of truth. */
export async function getSitemapUrlRows(): Promise<SitemapUrlRow[]> {
  const [blogPosts, projects, services] = await Promise.all([
    getContentList<BlogPost>('blog'),
    getContentList<Project>('projects'),
    getContentList<ServicePage>('services'),
  ])

  const rows: SitemapUrlRow[] = STATIC.map(({ path, priority, label }) => ({
    pathname: path,
    lastModified: new Date(),
    priority,
    label,
  }))

  for (const post of blogPosts) {
    rows.push({
      pathname: `/blog/${post.slug}`,
      lastModified: blogLastModified(post),
      priority: 0.7,
      label: post.title,
    })
  }

  for (const p of projects) {
    rows.push({
      pathname: `/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt),
      priority: 0.7,
      label: p.title,
    })
  }

  for (const s of services) {
    rows.push({
      pathname: `/services/${s.slug}`,
      lastModified: new Date(s.updatedAt || s.publishedAt),
      priority: 0.8,
      label: s.title,
    })
  }

  return rows
}

export function sectionForPathname(pathname: string): string {
  if (pathname === '/services' || pathname.startsWith('/services/')) return 'Services'
  if (MAIN_PAGE_HUBS.has(pathname)) return 'Main pages'
  if (pathname.startsWith('/blog/')) return 'Blog posts'
  if (pathname.startsWith('/projects/')) return 'Projects'
  return 'Other'
}

const SECTION_ORDER = ['Main pages', 'Services', 'Projects', 'Blog posts', 'Other']

export function sortRowsForHumanPage(rows: SitemapUrlRow[]): SitemapUrlRow[] {
  return [...rows].sort((a, b) => {
    const sa = sectionForPathname(a.pathname)
    const sb = sectionForPathname(b.pathname)
    const ia = SECTION_ORDER.indexOf(sa)
    const ib = SECTION_ORDER.indexOf(sb)
    if (ia !== ib) return ia - ib
    return a.label.localeCompare(b.label, 'en')
  })
}

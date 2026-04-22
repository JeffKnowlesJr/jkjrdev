import Link from 'next/link'
import { Metadata } from 'next'
import {
  getSitemapUrlRows,
  sortRowsForHumanPage,
  sectionForPathname,
  type SitemapUrlRow,
} from '@/utils/sitemap-urls'

export const metadata: Metadata = {
  title: 'Site Map | JKJR Digital Development',
  description:
    'Browse the complete site map for JKJR Digital Development — same URLs as sitemap.xml, updated at every build.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jkjrdev.com'}/site-map`,
  },
}

const SECTION_ORDER = ['Main pages', 'Services', 'Projects', 'Blog posts', 'Other'] as const

function groupBySection(rows: SitemapUrlRow[]): Map<string, SitemapUrlRow[]> {
  const m = new Map<string, SitemapUrlRow[]>()
  for (const r of rows) {
    const sec = sectionForPathname(r.pathname)
    if (!m.has(sec)) m.set(sec, [])
    m.get(sec)!.push(r)
  }
  return m
}

function SectionIcon({ title }: { title: string }) {
  if (title === 'Main pages') {
    return (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
      </svg>
    )
  }
  if (title === 'Blog posts') {
    return (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    )
  }
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  )
}

export default async function SitemapPage() {
  const rows = sortRowsForHumanPage(await getSitemapUrlRows())
  const bySection = groupBySection(rows)

  return (
    <main className="section bg-midnight">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-cloud mb-4">
            Site Map
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            Every public URL on this site, grouped for browsing. The list is built from the same data as{' '}
            <Link href="/sitemap.xml" className="text-electric hover:text-volt underline underline-offset-2">
              sitemap.xml
            </Link>{' '}
            at build time, so they stay in sync.
          </p>
        </div>

        <div className="space-y-10">
          {SECTION_ORDER.map((title) => {
            const links = bySection.get(title)
            if (!links?.length) return null
            return (
              <section key={title} className="card p-6 sm:p-8">
                <div className="flex items-center mb-6 pb-4 border-b border-steel/20">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-electric/20 text-electric mr-4">
                    <SectionIcon title={title} />
                  </div>
                  <h2 className="text-2xl font-bold text-cloud">{title}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {links.map((link) => (
                    <Link
                      key={link.pathname}
                      href={link.pathname}
                      className="flex flex-col p-4 bg-slate/40 border border-steel/20 rounded-lg hover:border-electric/40 transition-colors"
                    >
                      <h3 className="text-base font-semibold text-cloud mb-1">{link.label}</h3>
                      <p className="text-sm text-mist font-mono truncate" title={link.pathname}>
                        {link.pathname}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-steel/20 text-center space-y-3">
          <p className="text-mist">
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link
              href="/contact"
              className="text-electric hover:text-volt font-medium transition-colors"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

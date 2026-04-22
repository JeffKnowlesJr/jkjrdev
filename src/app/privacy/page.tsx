import { Metadata } from 'next'
import Link from 'next/link'
import { generatePrivacyMetadata } from '@/utils/metadata'
import { generateBreadcrumbSchema, BREADCRUMBS } from '@/utils/schema'
import CookiePreferencesReset from '@/components/CookiePreferencesReset'

export const metadata: Metadata = generatePrivacyMetadata()

const breadcrumbJsonLd = generateBreadcrumbSchema(BREADCRUMBS.privacy)

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 bg-midnight">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cloud mb-4">
          Privacy &amp; cookies
        </h1>
        <p className="text-mist text-lg mb-10">
          Last updated April 7, 2026. This page describes how this site handles data for visitors to{' '}
          <span className="text-cloud">jkjrdev.com</span>.
        </p>

        <div className="prose prose-invert prose-headings:font-display prose-a:text-electric max-w-none">
          <h2>Who operates this site</h2>
          <p>
            This website is operated by Jeff Knowles Jr (JKJR Digital Development) as a portfolio and
            blog. For questions about this policy, use the{' '}
            <Link href="/contact">contact form</Link>.
          </p>

          <h2>Essential cookies &amp; storage</h2>
          <p>
            Your browser may store a small preference when you choose cookie settings on this site
            (for example, whether analytics is allowed). That value is kept in your browser only
            (local storage) and is used to remember your choice; it is not sent to analytics
            providers when you choose &quot;Essential only.&quot;
          </p>

          <h2>Google Analytics (optional)</h2>
          <p>
            If you click <strong>Accept analytics</strong> on the cookie banner, the site loads
            Google Analytics 4 (GA4) via Google Tag Manager infrastructure. GA4 may collect
            information such as pages viewed, approximate location, device type, and how you arrived
            at the site. Google&apos;s privacy policy applies to how Google processes that data.
          </p>
          <p>
            If you choose <strong>Essential only</strong>, GA4 scripts are not loaded and no
            analytics cookies from this implementation are set by this site.
          </p>

          <h2>Contact form</h2>
          <p>
            Messages you send through the contact page are handled according to whatever processor
            or endpoint is configured for that form (for example, a third-party form service).
            Do not include sensitive personal data unless necessary.
          </p>

          <h2>Your choices</h2>
          <p>
            You can change your mind by clearing the saved choice below; the cookie banner will
            appear again on the next page load.
          </p>
          <CookiePreferencesReset />

          <h2>Changes</h2>
          <p>
            This policy may be updated occasionally. Material changes will be reflected on this page
            with an updated date.
          </p>
        </div>
      </div>
    </div>
  )
}

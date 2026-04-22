import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Northern Virginia', href: '/web-developer-northern-virginia' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Sitemap', href: '/site-map' }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 bg-deep border-t border-steel/20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <Link href="/" className="flex items-center gap-4 no-underline group">
            <div className="relative h-8 w-[74px] flex-shrink-0">
              <Image
                src="/JKJR3.png"
                alt=""
                width={101.9}
                height={40}
                className="w-auto h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div>
              <span className="font-display font-semibold text-cloud block">
                JKJR Digital Development
              </span>
              <p className="text-sm text-mist">Led by Jeff Knowles Jr.</p>
            </div>
          </Link>

          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-mist hover:text-electric transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-sm text-mist">
          &copy; {year} JKJR Digital Development. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

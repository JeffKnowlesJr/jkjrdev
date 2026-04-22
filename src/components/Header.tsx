'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' }
]

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function CogsIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  useEffect(() => {
    const mql = window.matchMedia('(orientation: landscape) and (max-height: 500px)')
    const handler = () => { if (mql.matches) setMobileMenuOpen(false) }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top bar - tagline + social */}
      <div className="bg-midnight/90 backdrop-blur-sm border-b border-steel/20 h-11 w-full flex items-center">
        <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="https://www.jkjrdev.com"
            className="flex items-center gap-2 text-mist hover:text-electric transition-colors"
          >
            <CogsIcon />
            <span className="font-body font-medium text-sm sm:text-base truncate">
              Jeff Knowles Jr Digital Development
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://github.com/jeffknowlesjr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 text-mist hover:text-electric transition-colors rounded-lg"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/jeffknowlesjr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 text-mist hover:text-electric transition-colors rounded-lg"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation - logo + links */}
      <nav className="bg-midnight/80 backdrop-blur-xl border-b border-steel/20">
        <div className="flex justify-between items-center h-14 sm:h-16 max-h-[64px] w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center flex-shrink-0 no-underline">
            {!logoError ? (
              <div className="relative h-9 w-[92px] flex items-center">
                <Image
                  src="/JKJR3.png"
                  alt="JKJR logo, home"
                  width={101.9}
                  height={40}
                  className="w-auto h-full object-contain"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-electric to-mint flex items-center justify-center font-display font-bold text-midnight text-xs">
                  JKJR
                </div>
                <span className="font-display font-semibold text-lg text-cloud hidden sm:inline">
                  JKJR Digital Development
                </span>
              </div>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-mist hover:text-electric transition-colors font-medium after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-electric after:transition-all after:duration-300 ${isActive ? 'text-electric after:w-full' : 'after:w-0 hover:after:w-full'}`}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg font-display font-semibold text-midnight bg-gradient-to-r from-electric to-volt hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 text-cloud"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-deep border-t border-steel/20 ${mobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-mist hover:text-electric transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-lg font-display font-semibold text-midnight bg-gradient-to-r from-electric to-volt"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
          <div className="flex gap-4 pt-4 mt-4 border-t border-steel/20">
            <a href="https://github.com/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-electric" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com/in/jeffknowlesjr" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-electric" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

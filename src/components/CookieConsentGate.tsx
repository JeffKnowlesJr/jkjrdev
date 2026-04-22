'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import {
  COOKIE_CONSENT_STORAGE_KEY,
  formatStoredConsent,
  parseStoredConsent,
  type CookieConsentChoice
} from '@/lib/cookie-consent'

type Phase = 'loading' | 'need-choice' | 'done'

export default function CookieConsentGate() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null)

  useEffect(() => {
    try {
      const stored = parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
      if (stored) {
        setChoice(stored.choice)
        setPhase('done')
      } else {
        setPhase('need-choice')
      }
    } catch {
      setPhase('need-choice')
    }
  }, [])

  useEffect(() => {
    if (phase !== 'need-choice') return
    const prev = document.body.style.paddingBottom
    document.body.style.paddingBottom = 'clamp(5.5rem, 18vw, 8rem)'
    return () => {
      document.body.style.paddingBottom = prev
    }
  }, [phase])

  const persist = useCallback((next: CookieConsentChoice) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, formatStoredConsent(next))
    } catch {
      /* private mode / quota */
    }
    setChoice(next)
    setPhase('done')
  }, [])

  return (
    <>
      {choice === 'analytics' && <GoogleAnalytics />}

      {phase === 'need-choice' && (
        <aside
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-steel/30 bg-deep/95 backdrop-blur-md shadow-[0_-8px_32px_rgba(0,0,0,0.35)]"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="container-custom px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-3xl">
                <h2 className="font-display text-sm font-semibold text-cloud sm:text-base">
                  Cookies &amp; analytics
                </h2>
                <p className="mt-1 text-sm text-mist leading-relaxed">
                  This site uses cookies for essential operation and, if you allow it, Google Analytics 4
                  to understand traffic. See the{' '}
                  <Link href="/privacy" className="text-electric underline-offset-2 hover:underline">
                    privacy policy
                  </Link>{' '}
                  for details.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end sm:items-center">
                <button
                  type="button"
                  onClick={() => persist('essential')}
                  className="rounded-lg border border-steel/50 px-4 py-2.5 text-sm font-medium text-mist transition-colors hover:border-mist/50 hover:text-cloud focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
                >
                  Essential only
                </button>
                <button
                  type="button"
                  onClick={() => persist('analytics')}
                  className="rounded-lg bg-gradient-to-r from-electric to-volt px-4 py-2.5 text-sm font-semibold text-midnight shadow-sm transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
                >
                  Accept analytics
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}

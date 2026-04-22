'use client'

import { COOKIE_CONSENT_STORAGE_KEY } from '@/lib/cookie-consent'

export default function CookiePreferencesReset() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
        } catch {
          /* ignore */
        }
        window.location.reload()
      }}
      className="mt-4 rounded-lg border border-steel/50 px-4 py-2 text-sm font-medium text-mist transition-colors hover:border-electric/40 hover:text-electric focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
    >
      Clear saved cookie choice
    </button>
  )
}

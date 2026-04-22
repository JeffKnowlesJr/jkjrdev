/** Bump when cookie / analytics policy changes so users see the banner again. */
export const COOKIE_CONSENT_VERSION = '1'

export const COOKIE_CONSENT_STORAGE_KEY = 'jkjrdev.cookie-consent'

export type CookieConsentChoice = 'analytics' | 'essential'

export type StoredCookieConsent = {
  v: string
  choice: CookieConsentChoice
}

export function parseStoredConsent(raw: string | null): StoredCookieConsent | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as StoredCookieConsent
    if (parsed.v !== COOKIE_CONSENT_VERSION) return null
    if (parsed.choice !== 'analytics' && parsed.choice !== 'essential') return null
    return parsed
  } catch {
    return null
  }
}

export function formatStoredConsent(choice: CookieConsentChoice): string {
  return JSON.stringify({ v: COOKIE_CONSENT_VERSION, choice })
}

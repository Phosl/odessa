export const siteAccessCookie = 'odessa_site_access_v1'
export const siteAccessPath = '/access'

const tokenPrefix = 'odessa-private-site-v1:'

export const privateResponseHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
} as const

export function getSitePassword() {
  return process.env.ODESSA_SITE_PASSWORD?.trim() ?? ''
}

export async function createSiteAccessToken(password: string) {
  const bytes = new TextEncoder().encode(`${tokenPrefix}${password}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function accessTokensMatch(actual: string, expected: string) {
  if (actual.length !== expected.length) return false
  let difference = 0
  for (let index = 0; index < actual.length; index += 1) {
    difference |= actual.charCodeAt(index) ^ expected.charCodeAt(index)
  }
  return difference === 0
}

export function safeReturnPath(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith(siteAccessPath)) {
    return '/it'
  }
  return value
}

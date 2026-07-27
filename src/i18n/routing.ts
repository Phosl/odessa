import {defineRouting} from 'next-intl/routing'

export const locales = ['it', 'en', 'uk'] as const
export type Locale = (typeof locales)[number]

const routeTable = {
  home: {internal: '/', paths: {it: '/', en: '/', uk: '/'}},
  project: {internal: '/project', paths: {it: '/progetto', en: '/project', uk: '/project'}},
  activities: {internal: '/activities', paths: {it: '/attivita', en: '/activities', uk: '/activities'}},
  partners: {internal: '/partners', paths: {it: '/partner', en: '/partners', uk: '/partners'}},
  results: {internal: '/results', paths: {it: '/risultati', en: '/results', uk: '/results'}},
  media: {internal: '/media', paths: {it: '/media', en: '/media', uk: '/media'}},
  materials: {internal: '/materials', paths: {it: '/materiali', en: '/materials', uk: '/materials'}},
  contact: {internal: '/contact', paths: {it: '/contatti', en: '/contact', uk: '/contact'}},
  privacy: {internal: '/privacy', paths: {it: '/privacy', en: '/privacy', uk: '/privacy'}},
  cookie: {internal: '/cookie-policy', paths: {it: '/cookie-policy', en: '/cookie-policy', uk: '/cookie-policy'}},
} as const

export type RouteKey = keyof typeof routeTable

const pathnames = Object.fromEntries(
  Object.values(routeTable).map(({internal, paths}) => [internal, paths]),
)

export const routing = defineRouting({
  locales,
  defaultLocale: 'it',
  localeDetection: false,
  localePrefix: 'always',
  pathnames,
})

export const routeKeys = Object.keys(routeTable) as RouteKey[]

export function getInternalPath(route: RouteKey) {
  return routeTable[route].internal
}

export function getRouteHref(route: RouteKey, locale: Locale) {
  const path = routeTable[route].paths[locale]
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export function getRouteKeyFromPathname(pathname: string): RouteKey | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  for (const route of routeKeys) {
    for (const locale of locales) {
      const internal = getInternalPath(route)
      const localizedInternal = internal === '/' ? `/${locale}` : `/${locale}${internal}`
      if (getRouteHref(route, locale) === normalized || localizedInternal === normalized) return route
    }
  }
  return null
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

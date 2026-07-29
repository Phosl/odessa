import {defineRouting} from 'next-intl/routing'

export const locales = ['it', 'en', 'uk'] as const
export type Locale = (typeof locales)[number]

export const videoPillSlugs = {
  intro: {it: 'odessa-in-due-minuti', en: 'odessa-in-two-minutes', uk: 'odessa-za-dvi-khvylyny'},
  care: {it: 'perche-prendersi-cura', en: 'why-care-matters', uk: 'navishcho-pikluvatysia'},
  voices: {it: 'voci-dai-territori', en: 'voices-from-the-territories', uk: 'holosy-terytorii'},
  workshop: {it: 'dentro-il-laboratorio', en: 'inside-the-workshop', uk: 'useredyni-maisterni'},
  words: {it: 'parole-condivise', en: 'shared-words', uk: 'spilni-slova'},
  outcomes: {it: 'quello-che-resta', en: 'what-remains', uk: 'shcho-zalyshaietsia'},
} as const

const routeTable = {
  home: {internal: '/', paths: {it: '/', en: '/', uk: '/'}},
  project: {internal: '/project', paths: {it: '/progetto', en: '/project', uk: '/project'}},
  activities: {internal: '/activities', paths: {it: '/attivita', en: '/activities', uk: '/activities'}},
  partners: {internal: '/partners', paths: {it: '/partner', en: '/partners', uk: '/partners'}},
  results: {internal: '/results', paths: {it: '/risultati', en: '/results', uk: '/results'}},
  media: {internal: '/media', paths: {it: '/media', en: '/media', uk: '/media'}},
  videoPills: {internal: '/video-pills', paths: {it: '/pillole-video', en: '/video-pills', uk: '/video-pills'}},
  materials: {internal: '/materials', paths: {it: '/materiali', en: '/materials', uk: '/materials'}},
  contact: {internal: '/contact', paths: {it: '/contatti', en: '/contact', uk: '/contact'}},
  privacy: {internal: '/privacy', paths: {it: '/privacy', en: '/privacy', uk: '/privacy'}},
  cookie: {internal: '/cookie-policy', paths: {it: '/cookie-policy', en: '/cookie-policy', uk: '/cookie-policy'}},
} as const

export type RouteKey = keyof typeof routeTable

const videoPillDetailPaths = {it: '/pillole-video/[slug]', en: '/video-pills/[slug]', uk: '/video-pills/[slug]'} as const

const pathnames = {
  ...Object.fromEntries(Object.values(routeTable).map(({internal, paths}) => [internal, paths])),
  '/video-pills/[slug]': videoPillDetailPaths,
}

export const routing = defineRouting({
  locales,
  defaultLocale: 'it',
  localeDetection: false,
  localePrefix: 'always',
  alternateLinks: false,
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

export function getVideoPillHref(locale: Locale, slug: string) {
  const slugs = Object.values(videoPillSlugs)
  const translatedSlug = slugs.find((entry) => Object.values(entry).some((value) => value === slug))?.[locale] ?? slug
  return `${getRouteHref('videoPills', locale)}/${encodeURIComponent(translatedSlug)}`
}

export function getVideoPillSlugFromPathname(pathname: string) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  for (const locale of locales) {
    const routeBases = [
      getRouteHref('videoPills', locale),
      `/${locale}${getInternalPath('videoPills')}`,
    ]
    for (const base of routeBases) {
      if (!normalized.startsWith(`${base}/`)) continue
      const slug = normalized.slice(base.length + 1).split('/')[0]
      return slug ? decodeURIComponent(slug) : null
    }
  }
  return null
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
  if (getVideoPillSlugFromPathname(normalized)) return 'videoPills'
  return null
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

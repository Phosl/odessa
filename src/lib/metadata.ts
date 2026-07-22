import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getRouteHref, locales, type Locale, type RouteKey} from '@/i18n/routing'

export async function createPageMetadata(locale: Locale, route: RouteKey): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'metadata'})
  const title = t(`${route}.title`)
  const description = t(`${route}.description`)
  const canonical = getRouteHref(route, locale)
  const languages = Object.fromEntries(locales.map((item) => [item, getRouteHref(route, item)]))

  return {
    title,
    description,
    alternates: {canonical, languages: {...languages, 'x-default': getRouteHref(route, 'it')}},
    openGraph: {title, description, type: 'website', locale},
  }
}

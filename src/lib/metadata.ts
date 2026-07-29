import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getRouteHref, getVideoPillHref, locales, type Locale, type RouteKey} from '@/i18n/routing'
import type {VideoPill} from '@/lib/content/types'

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

export function createVideoPillMetadata(locale: Locale, pill: VideoPill): Metadata {
  const title = `${pill.title} — Odessa`
  const canonical = getVideoPillHref(locale, pill.slug)
  const languages = Object.fromEntries(locales.map((item) => [item, getVideoPillHref(item, pill.slug)]))

  return {
    title,
    description: pill.summary,
    alternates: {canonical, languages: {...languages, 'x-default': getVideoPillHref('it', pill.slug)}},
    openGraph: {title, description: pill.summary, type: 'article', locale},
  }
}

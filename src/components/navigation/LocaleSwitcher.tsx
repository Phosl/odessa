'use client'

import {usePathname} from 'next/navigation'
import {type MouseEvent, useSyncExternalStore} from 'react'
import {getRouteHref, getRouteKeyFromPathname, type Locale} from '@/i18n/routing'
import {TransitionLink} from '@/components/transitions/TransitionLink'

type Language = {locale: Locale; short: string; label: string}

function subscribeToLocation(callback: () => void) {
  window.addEventListener('hashchange', callback)
  window.addEventListener('popstate', callback)

  return () => {
    window.removeEventListener('hashchange', callback)
    window.removeEventListener('popstate', callback)
  }
}

function getLocationDetails() {
  return `${window.location.search}${window.location.hash}`
}

export function LocaleSwitcher({currentLocale, languages, className}: {currentLocale: Locale; languages: Language[]; className?: string}) {
  const pathname = usePathname()
  const route = getRouteKeyFromPathname(pathname) ?? 'home'
  const locationDetails = useSyncExternalStore(subscribeToLocation, getLocationDetails, () => '')

  function preserveCurrentLocation(event: MouseEvent<HTMLAnchorElement>) {
    const destination = new URL(event.currentTarget.href)
    destination.search = window.location.search
    destination.hash = window.location.hash
    event.currentTarget.href = destination.href
  }

  return (
    <ul className={className}>
      {languages.map((language) => {
        const href = `${getRouteHref(route, language.locale)}${locationDetails}`
        return (
          <li key={language.locale}>
            <TransitionLink
              aria-current={language.locale === currentLocale ? 'page' : undefined}
              aria-label={language.label}
              destinationLabel={language.label}
              href={href}
              hrefLang={language.locale}
              onClick={preserveCurrentLocation}
              replace>
              {language.short}
            </TransitionLink>
          </li>
        )
      })}
    </ul>
  )
}

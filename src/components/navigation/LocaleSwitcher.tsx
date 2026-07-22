'use client'

import {usePathname} from 'next/navigation'
import type {MouseEvent} from 'react'
import {getRouteHref, getRouteKeyFromPathname, type Locale} from '@/i18n/routing'
import {TransitionLink} from '@/components/transitions/TransitionLink'

type Language = {locale: Locale; short: string; label: string}

export function LocaleSwitcher({currentLocale, languages, className}: {currentLocale: Locale; languages: Language[]; className?: string}) {
  const pathname = usePathname()
  const route = getRouteKeyFromPathname(pathname) ?? 'home'

  function preserveLocationDetails(event: MouseEvent<HTMLAnchorElement>) {
    const suffix = `${window.location.search}${window.location.hash}`
    if (suffix) event.currentTarget.href += suffix
  }

  return (
    <ul className={className}>
      {languages.map((language) => {
        const base = getRouteHref(route, language.locale)
        return (
          <li key={language.locale}>
            <TransitionLink
              aria-current={language.locale === currentLocale ? 'page' : undefined}
              aria-label={language.label}
              destinationLabel={language.label}
              href={base}
              hrefLang={language.locale}
              onClick={preserveLocationDetails}
              replace>
              {language.short}
            </TransitionLink>
          </li>
        )
      })}
    </ul>
  )
}

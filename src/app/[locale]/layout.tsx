import type {Metadata} from 'next'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {getMessages, setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import type {ReactNode} from 'react'
import {routing} from '@/i18n/routing'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://odessa.example'),
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({children, params}: {children: ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html className="reveal-pending" lang={locale}>
      <head>
        <noscript>
          <style>{'.reveal-pending [data-reveal] { opacity: 1 !important; transform: none !important; }'}</style>
        </noscript>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

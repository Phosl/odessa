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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

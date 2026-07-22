import 'server-only'

import type {Locale} from '@/i18n/routing'
import type {SiteContent} from './types'

const loaders: Record<Locale, () => Promise<{default: SiteContent}>> = {
  it: () => import('./fixtures/it'),
  en: () => import('./fixtures/en'),
  uk: () => import('./fixtures/uk'),
}

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  const content = await loaders[locale]()
  return content.default
}

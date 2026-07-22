import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {PartnerCard} from '@/components/sections/Cards'
import {Cta, CtaSection, EditorialSection, PageIntro, PageMain} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'partners')
}

export default async function PartnersPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.partners
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="03 / 08" /></div></section>
      <section className="section"><div className="container"><div className="grid-3">{page.items.map((partner, index) => <PartnerCard key={partner.id} logoDescription={t('common.logoDescription', {number: String(index + 1).padStart(2, '0')})} logoText={t('common.logoPlaceholder', {number: String(index + 1).padStart(2, '0')})} partner={partner} />)}</div></div></section>
      <EditorialSection content={page.collaboration} />
      <CtaSection text={content.contact.lead.intro} title={content.contact.lead.title}><Cta destinationLabel={t('navigation.contact')} href={getRouteHref('contact', locale)} label={t('actions.contactUs')} /></CtaSection>
    </PageMain>
  )
}

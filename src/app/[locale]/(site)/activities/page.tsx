import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {ActivityCard} from '@/components/sections/Cards'
import {Cta, CtaSection, PageIntro, PageMain, SectionHeading, Timeline} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'activities')
}

export default async function ActivitiesPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.activities
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="02 / 08" /></div></section>
      <section className="section"><div className="container"><div className="grid-3">{page.items.map((activity, index) => <ActivityCard activity={activity} key={activity.id} priority={index === 0} />)}</div></div></section>
      <section className="section"><div className="container"><SectionHeading intro={page.calendar.paragraphs[0]} title={page.calendar.title} /><Timeline items={page.timeline} /></div></section>
      <CtaSection text={content.contact.lead.intro} title={content.contact.lead.title}><Cta destinationLabel={t('navigation.contact')} href={getRouteHref('contact', locale)} label={t('actions.contactUs')} /></CtaSection>
    </PageMain>
  )
}

import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {Cta, CtaSection, EditorialGallery, EditorialSection, PageIntro, PageMain, SectionHeading, Timeline} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'project')
}

export default async function ProjectPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.project
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="01 / 09" /></div></section>
      <EditorialSection content={page.context} />
      <EditorialSection content={page.objectives} />
      <EditorialSection content={page.methodology} />
      <EditorialSection content={page.audiences} />
      <section className="section"><div className="container"><SectionHeading title={page.timelineTitle} /><Timeline items={page.timeline} /></div></section>
      <section className="section"><div className="container"><EditorialGallery images={page.images} /></div></section>
      <CtaSection text={content.activities.lead.intro} title={content.activities.lead.title}><Cta destinationLabel={t('navigation.activities')} href={getRouteHref('activities', locale)} label={t('actions.viewActivities')} /></CtaSection>
    </PageMain>
  )
}

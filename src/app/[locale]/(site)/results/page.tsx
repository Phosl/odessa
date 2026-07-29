import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {ResourceCard} from '@/components/sections/Cards'
import {ResultsCharts} from '@/components/sections/ResultsCharts'
import {Cta, CtaSection, EditorialGallery, EditorialSection, PageIntro, PageMain, SectionHeading} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'results')
}

export default async function ResultsPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.results
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="04 / 09" /></div></section>
      <ResultsCharts intro={page.indicators.intro} stats={page.stats} timeline={page.timeline} title={page.indicators.title} />
      <EditorialSection content={page.deliverables} />
      <section className="section">
        <div className="container">
          <SectionHeading intro={page.resourcesIntro} title={page.resourcesTitle} />
          <div className="grid-3">{page.resources.map((resource) => <ResourceCard action={t('actions.downloadDemo')} key={resource.id} resource={resource} unavailable={t('actions.unavailable')} />)}</div>
        </div>
      </section>
      <section className="section"><div className="container"><SectionHeading intro={page.media.paragraphs[0]} title={page.media.title} /><EditorialGallery images={page.media.images} /></div></section>
      <CtaSection text={content.media.lead.intro} title={content.media.lead.title}><Cta destinationLabel={t('navigation.media')} href={getRouteHref('media', locale)} label={t('actions.viewMedia')} /></CtaSection>
    </PageMain>
  )
}

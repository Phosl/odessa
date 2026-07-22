import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {ResourceCard, ResultStat} from '@/components/sections/Cards'
import {Cta, CtaSection, EditorialSection, ImagePlaceholder, PageIntro, PageMain, SectionHeading} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'results')
}

export default async function ResultsPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.results
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="04 / 08" /></div></section>
      <section className="section"><div className="container"><div className="grid-4">{page.stats.map((stat) => <ResultStat key={stat.label} stat={stat} />)}</div></div></section>
      <EditorialSection content={page.deliverables} />
      <section className="section">
        <div className="container">
          <SectionHeading intro={page.resourcesIntro} title={page.resourcesTitle} />
          <div className="grid-3">{page.resources.map((resource) => <ResourceCard action={t('actions.downloadDemo')} key={resource.id} resource={resource} unavailable={t('actions.unavailable')} />)}</div>
        </div>
      </section>
      <section className="section"><div className="container"><SectionHeading intro={page.media.paragraphs[0]} title={page.media.title} /><div data-reveal><ImagePlaceholder description={page.media.mediaLabel} label={t('common.imagePlaceholder', {number: '01'})} /></div></div></section>
      <CtaSection text={content.media.lead.intro} title={content.media.lead.title}><Cta destinationLabel={t('navigation.media')} href={getRouteHref('media', locale)} label={t('actions.viewMedia')} /></CtaSection>
    </PageMain>
  )
}

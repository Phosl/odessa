import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {ActivityCard, ResultStat} from '@/components/sections/Cards'
import {Cta, CtaSection, ImagePlaceholder, PageIntro, PageMain, SectionHeading, VideoPlaceholder} from '@/components/wireframe/Wireframe'
import styles from '@/styles/Pages.module.css'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'home')
}

export default async function HomePage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const home = content.home

  return (
    <PageMain>
      <section className="section--hero">
        <div className={`container ${styles.hero}`}>
          <PageIntro {...home.lead} index="00 / 08" />
          <div className={styles.heroMedia} data-reveal>
            <VideoPlaceholder description={home.videoLabel} label={t('common.videoPlaceholder', {number: '01'})} />
          </div>
          <div data-reveal><Cta destinationLabel={t('navigation.project')} href={getRouteHref('project', locale)} label={t('actions.discoverProject')} /></div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div data-reveal><ImagePlaceholder description={home.project.imageLabel} label={t('common.imagePlaceholder', {number: '01'})} /></div>
          <div className={styles.previewCopy} data-reveal>
            <span className="meta">01 / 06</span>
            <h2>{home.project.title}</h2>
            <p className="body-copy">{home.project.paragraphs[0]}</p>
            <div><Cta destinationLabel={t('navigation.project')} href={getRouteHref('project', locale)} label={t('actions.discoverProject')} /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading intro={home.activities.paragraphs[0]} title={home.activities.title} />
          <div className="grid-3">
            {content.activities.items.slice(0, 3).map((activity, index) => <ActivityCard activity={activity} imageText={t('common.imagePlaceholder', {number: String(index + 2).padStart(2, '0')})} key={activity.id} />)}
          </div>
          <div className="section--compact" data-reveal><Cta destinationLabel={t('navigation.activities')} href={getRouteHref('activities', locale)} label={t('actions.viewActivities')} /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading intro={home.results.paragraphs[0]} title={home.results.title} />
          <div className="grid-3">{content.results.stats.slice(0, 3).map((stat) => <ResultStat key={stat.label} stat={stat} />)}</div>
          <div className="section--compact" data-reveal><Cta destinationLabel={t('navigation.results')} href={getRouteHref('results', locale)} label={t('actions.viewResults')} /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading intro={home.partners.paragraphs[0]} title={home.partners.title} />
          <div className={styles.logoRail}>
            {content.partners.items.map((partner, index) => <div aria-label={`${t('common.logoDescription', {number: String(index + 1).padStart(2, '0')})}: ${partner.name}`} className={styles.logo} data-reveal key={partner.id} role="img">{t('common.logoPlaceholder', {number: String(index + 1).padStart(2, '0')})}</div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.previewCopy} data-reveal>
            <span className="meta">05 / 06</span>
            <h2>{home.media.title}</h2>
            <p className="body-copy">{home.media.paragraphs[0]}</p>
            <div><Cta destinationLabel={t('navigation.media')} href={getRouteHref('media', locale)} label={t('actions.viewMedia')} /></div>
          </div>
          <div data-reveal><ImagePlaceholder description={home.media.imageLabel} label={t('common.imagePlaceholder', {number: '05'})} /></div>
        </div>
      </section>

      <CtaSection text={home.contact.paragraphs[0]} title={home.contact.title}>
        <Cta destinationLabel={t('navigation.contact')} href={getRouteHref('contact', locale)} label={t('actions.contactUs')} />
      </CtaSection>
    </PageMain>
  )
}

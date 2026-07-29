import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import {getPageLocale} from '@/i18n/locale'
import {getRouteHref, locales} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createVideoPillMetadata} from '@/lib/metadata'
import {Cta, CtaSection, EditorialSection, PageIntro, PageMain, SectionHeading, VideoPlaceholder} from '@/components/wireframe/Wireframe'
import styles from './VideoPillDetail.module.css'

type VideoPillParams = Promise<{locale: string; slug: string}>

export const dynamicParams = false

export async function generateStaticParams() {
  const params = await Promise.all(locales.map(async (locale) => {
    const content = await getSiteContent(locale)
    return content.videoPills.items.map((item) => ({locale, slug: item.slug}))
  }))
  return params.flat()
}

export async function generateMetadata({params}: {params: VideoPillParams}): Promise<Metadata> {
  const locale = await getPageLocale(params)
  const {slug} = await params
  const content = await getSiteContent(locale)
  const pill = content.videoPills.items.find((item) => item.slug === slug)
  if (!pill) notFound()
  return createVideoPillMetadata(locale, pill)
}

export default async function VideoPillDetailPage({params}: {params: VideoPillParams}) {
  const locale = await getPageLocale(params)
  const {slug} = await params
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.videoPills
  const pill = page.items.find((item) => item.slug === slug)
  if (!pill) notFound()

  const category = page.categories.find((item) => item.id === pill.category)?.label ?? pill.category
  const videoLabel = t('common.videoPlaceholder', {number: pill.number})

  return (
    <PageMain>
      <section className="section--hero">
        <div className="container">
          <PageIntro
            eyebrow={category}
            index={`${pill.number} / ${String(page.items.length).padStart(2, '0')}`}
            intro={pill.summary}
            title={pill.title}
          />
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.videoLayout}`}>
          <div className={styles.player} data-reveal>
            {pill.video.embedUrl ? (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src={pill.video.embedUrl}
                title={pill.title}
              />
            ) : (
              <VideoPlaceholder
                description={`${pill.title}. ${pill.summary}`}
                label={`${videoLabel} · ${pill.duration}`}
              />
            )}
          </div>
          <div className={styles.videoInfo} data-reveal>
            <p className="meta">{category} · {pill.duration}</p>
            <h2>{page.platformLabel}</h2>
            {pill.video.externalUrl ? (
              <a
                className="button-link"
                href={pill.video.externalUrl}
                rel="noreferrer"
                target="_blank"
              >
                {t('videoPills.watchExternal')}
              </a>
            ) : (
              <p className={styles.pending}>{t('videoPills.videoPending')}</p>
            )}
          </div>
        </div>
      </section>

      <EditorialSection content={{title: t('videoPills.storyTitle'), paragraphs: pill.body}} />

      <section className="section">
        <div className="container">
          <SectionHeading
            intro={t('videoPills.attachmentsIntro')}
            title={t('videoPills.attachmentsTitle')}
          />
          <ul className={`${styles.attachments} plain-list`} data-reveal>
            {pill.attachments.map((attachment) => (
              <li className={styles.attachment} key={attachment.id}>
                {attachment.href ? (
                  <a className={styles.attachmentLink} href={attachment.href} rel="noreferrer" target="_blank">
                    <strong>{attachment.title}</strong>
                    <span className={styles.attachmentMeta}>{attachment.format} · {attachment.meta} ↗</span>
                  </a>
                ) : (
                  <div className={styles.attachmentPending}>
                    <strong>{attachment.title}</strong>
                    <span className={styles.attachmentMeta}>{attachment.format} · {t('videoPills.attachmentPending')}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection text={page.seriesIntro} title={page.seriesTitle}>
        <Cta
          destinationLabel={t('navigation.videoPills')}
          href={getRouteHref('videoPills', locale)}
          label={t('videoPills.back')}
        />
      </CtaSection>
    </PageMain>
  )
}

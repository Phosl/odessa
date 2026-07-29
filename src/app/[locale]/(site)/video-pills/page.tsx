import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {VideoPillsExplorer} from '@/components/media/VideoPillsExplorer'
import {Cta, CtaSection, PageIntro, PageMain, SectionHeading} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'videoPills')
}

export default async function VideoPillsPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.videoPills

  return (
    <PageMain>
      <section className="section--hero">
        <div className="container">
          <PageIntro {...page.lead} index="06 / 09" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading intro={page.seriesIntro} title={page.seriesTitle} />
          <VideoPillsExplorer
            categories={page.categories}
            items={page.items}
            labels={{
              filter: t('videoPills.filter'),
              all: t('videoPills.all'),
              read: t('videoPills.read'),
              videoTemplate: t.raw('common.videoPlaceholder'),
            }}
            locale={locale}
          />
        </div>
      </section>
      <CtaSection text={content.media.lead.intro} title={content.media.lead.title}>
        <Cta
          destinationLabel={t('navigation.media')}
          href={getRouteHref('media', locale)}
          label={t('actions.viewMedia')}
        />
      </CtaSection>
    </PageMain>
  )
}

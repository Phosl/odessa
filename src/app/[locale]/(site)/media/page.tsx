import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getRouteHref} from '@/i18n/routing'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {MediaArchive} from '@/components/media/MediaArchive'
import {Cta, CtaSection, PageIntro, PageMain, SectionHeading} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'media')
}

export default async function MediaPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const [content, t] = await Promise.all([getSiteContent(locale), getTranslations()])
  const page = content.media
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="05 / 09" /></div></section>
      <section className="section">
        <div className="container">
          <SectionHeading intro={page.archiveIntro} title={page.archiveTitle} />
          <MediaArchive
            featured={{title: page.featured.title, intro: page.featured.paragraphs[0], videoText: t('common.videoPlaceholder', {number: '01'}), videoDescription: page.featured.videoLabel}}
            gallery={page.gallery}
            labels={{filter: t('filters.label'), all: t('filters.all'), news: t('filters.news'), photo: t('filters.photo'), video: t('filters.video'), empty: t('filters.empty'), imageTemplate: t.raw('common.imagePlaceholder'), imageDescriptionTemplate: t.raw('common.imageDescription')}}
            news={page.news}
          />
        </div>
      </section>
      <CtaSection text={content.videoPills.lead.intro} title={content.videoPills.lead.title}>
        <Cta
          destinationLabel={t('navigation.videoPills')}
          href={getRouteHref('videoPills', locale)}
          label={t('actions.viewVideoPills')}
        />
      </CtaSection>
    </PageMain>
  )
}

import type {Metadata} from 'next'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {EditorialSection, PageIntro, PageMain} from '@/components/wireframe/Wireframe'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'cookie')
}

export default async function CookiePage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const page = (await getSiteContent(locale)).cookie
  return (
    <PageMain>
      <section className="section--hero"><div className="container"><PageIntro {...page.lead} index="10 / 10" /><p className="legal-notice" data-reveal>{page.notice}</p></div></section>
      {page.sections.map((section) => <EditorialSection content={section} key={section.title} />)}
    </PageMain>
  )
}

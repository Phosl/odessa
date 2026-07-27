import type {Metadata} from 'next'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {PageIntro, PageMain, SectionHeading} from '@/components/wireframe/Wireframe'
import {MaterialsTabs} from './MaterialsTabs'
import styles from './Materials.module.css'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'materials')
}

export default async function MaterialsPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const {materials} = await getSiteContent(locale)

  return (
    <PageMain>
      <section className="section--hero">
        <div className={`container ${styles.hero}`}>
          <PageIntro {...materials.lead} index="06 / 09" />
          <div className={styles.heroFooter} data-reveal>
            <aside className={styles.source}>
              <span className="meta">{materials.source.meta}</span>
              <p>{materials.source.note}</p>
              <a className="button-link" href="/assets/materials/odessa-identita-proposte.pdf" rel="noreferrer" target="_blank">
                {materials.source.label}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className={`section ${styles.sectionAnchor}`} id="proposals">
        <div className="container">
          <SectionHeading intro={materials.logos.intro} title={materials.logos.title} />
          <MaterialsTabs materials={materials} />
        </div>
      </section>

      <section className={`section ${styles.sectionAnchor}`} id="voice-principles">
        <div className="container">
          <SectionHeading intro={materials.voice.intro} title={materials.voice.principlesTitle} />
          <ol className={`${styles.principles} plain-list`} data-reveal>
            {materials.voice.principles.map((principle, index) => (
              <li key={principle}>
                <span className="meta">{String(index + 1).padStart(2, '0')}</span>
                <p>{principle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageMain>
  )
}

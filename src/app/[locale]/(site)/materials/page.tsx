import type {CSSProperties} from 'react'
import type {Metadata} from 'next'
import Image from 'next/image'
import {getPageLocale, type LocaleParams} from '@/i18n/locale'
import {getSiteContent} from '@/lib/content/repository'
import {createPageMetadata} from '@/lib/metadata'
import {PageIntro, PageMain, SectionHeading} from '@/components/wireframe/Wireframe'
import styles from './Materials.module.css'

export async function generateMetadata({params}: {params: LocaleParams}): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'materials')
}

export default async function MaterialsPage({params}: {params: LocaleParams}) {
  const locale = await getPageLocale(params)
  const {materials} = await getSiteContent(locale)
  const sections = [
    {id: 'logo-concepts', title: materials.logos.title},
    {id: 'colour-palettes', title: materials.colors.title},
    {id: 'graphic-elements', title: materials.elements.title},
    {id: 'claims-and-voice', title: materials.voice.title},
  ]

  return (
    <PageMain>
      <section className="section--hero">
        <div className={`container ${styles.hero}`}>
          <PageIntro {...materials.lead} index="06 / 09" />
          <div className={styles.heroFooter} data-reveal>
            <nav aria-label={materials.indexLabel} className={styles.sectionIndex}>
              {sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span className="meta">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{section.title}</strong>
                </a>
              ))}
            </nav>
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

      <section className={`section ${styles.sectionAnchor}`} id="logo-concepts">
        <div className="container">
          <SectionHeading intro={materials.logos.intro} title={materials.logos.title} />
          <div className={styles.conceptGrid}>
            {materials.concepts.map((concept) => (
              <article className={styles.conceptCard} data-reveal key={concept.id}>
                <header className={styles.cardHeader}>
                  <span className="meta">{concept.number}</span>
                  <h3>{concept.title}</h3>
                </header>
                <figure className={styles.artwork}>
                  <Image
                    alt={concept.image.alt}
                    height={concept.image.height}
                    loading="eager"
                    sizes="(min-width: 64rem) 46vw, 100vw"
                    src={concept.image.src}
                    width={concept.image.width}
                  />
                </figure>
                <p className="body-copy">{concept.description}</p>
                <div className={styles.typography}>
                  <span className="meta">{materials.typographyLabel}</span>
                  <ul className="plain-list">
                    {concept.typography.map((typeface) => <li key={typeface}>{typeface}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.sectionAnchor}`} id="colour-palettes">
        <div className="container">
          <SectionHeading intro={materials.colors.intro} title={materials.colors.title} />
          <div className={styles.paletteGrid}>
            {materials.concepts.map((concept) => (
              <article className={styles.paletteCard} data-reveal key={concept.id}>
                <header className={styles.cardHeader}>
                  <span className="meta">{concept.number}</span>
                  <h3>{concept.title}</h3>
                </header>
                <ul className={`${styles.swatches} plain-list`}>
                  {concept.palette.map((color) => (
                    <li key={color.hex}>
                      <span className={styles.swatch} style={{'--swatch': color.hex} as CSSProperties} />
                      <span>{color.name}</span>
                      <code>{color.hex}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.note} data-reveal>{materials.colors.note}</p>
        </div>
      </section>

      <section className={`section ${styles.sectionAnchor}`} id="graphic-elements">
        <div className="container">
          <SectionHeading intro={materials.elements.intro} title={materials.elements.title} />
          <div className={styles.elementGrid}>
            {materials.concepts.map((concept) => (
              <article className={styles.elementCard} data-reveal key={concept.id}>
                <div className={styles.mark}>
                  <Image alt={concept.mark.alt} height={concept.mark.height} loading="eager" src={concept.mark.src} width={concept.mark.width} />
                </div>
                <div className={styles.elementCopy}>
                  <span className="meta">{concept.number}</span>
                  <h3>{concept.title}</h3>
                  <p className="body-copy">{concept.elementDescription}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.sectionAnchor}`} id="claims-and-voice">
        <div className="container">
          <SectionHeading intro={materials.voice.intro} title={materials.voice.title} />
          <div className={styles.voiceLayout}>
            <div className={styles.principles} data-reveal>
              <h3>{materials.voice.principlesTitle}</h3>
              <ol className="plain-list">
                {materials.voice.principles.map((principle, index) => (
                  <li key={principle}>
                    <span className="meta">{String(index + 1).padStart(2, '0')}</span>
                    <p>{principle}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.claimGroups}>
              {materials.concepts.map((concept) => (
                <article data-reveal key={concept.id}>
                  <header className={styles.cardHeader}>
                    <span className="meta">{concept.number}</span>
                    <h3>{concept.title}</h3>
                  </header>
                  <ul className="plain-list">
                    {concept.claims.map((claim) => <li key={claim}>{claim}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageMain>
  )
}

import type {ReactNode} from 'react'
import type {TimelineItem as TimelineItemData, TextSection} from '@/lib/content/types'
import {TransitionLink} from '@/components/transitions/TransitionLink'
import styles from './Wireframe.module.css'

export function PageIntro({eyebrow, title, intro, index}: {eyebrow: string; title: string; intro: string; index: string}) {
  return (
    <header className={styles.pageIntro} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className={styles.introBottom}>
        <p className="lede">{intro}</p>
        <span className={`${styles.introIndex} meta`} aria-hidden="true">{index}</span>
      </div>
    </header>
  )
}

export function PageMain({children}: {children: ReactNode}) {
  return <main id="main-content" tabIndex={-1}>{children}</main>
}

export function SectionHeading({title, intro}: {title: string; intro?: string}) {
  return (
    <div className={styles.sectionHeading} data-reveal>
      <h2>{title}</h2>
      {intro ? <p className="body-copy">{intro}</p> : null}
    </div>
  )
}

export function EditorialSection({content}: {content: TextSection}) {
  return (
    <section className="section" data-reveal>
      <div className="container">
        <div className={styles.editorial}>
          <h2>{content.title}</h2>
          <div className={styles.editorialBody}>
            {content.paragraphs.map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
            {content.items ? (
              <ol className={`${styles.editorialList} plain-list`}>
                {content.items.map((item) => <li key={item}>{item}</li>)}
              </ol>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ImagePlaceholder({label, description, ratio = 'landscape'}: {label: string; description: string; ratio?: 'landscape' | 'portrait' | 'square'}) {
  return (
    <div className={`${styles.placeholder} ${styles[ratio]}`} role="img" aria-label={description}>
      <span className={styles.placeholderLabel} aria-hidden="true">{label}</span>
    </div>
  )
}

export function VideoPlaceholder({label, description}: {label: string; description: string}) {
  return (
    <div className={`${styles.placeholder} ${styles.landscape}`} role="img" aria-label={description}>
      <span className={styles.placeholderLabel} aria-hidden="true">{label}</span>
      <span className={styles.play} aria-hidden="true">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z" fill="currentColor" /></svg>
      </span>
    </div>
  )
}

export function Timeline({items}: {items: TimelineItemData[]}) {
  return (
    <ol className={`${styles.timeline} plain-list`}>
      {items.map((item) => (
        <li className={styles.timelineItem} data-reveal key={`${item.marker}-${item.title}`}>
          <span className="meta">{item.marker}</span>
          <h3>{item.title}</h3>
          <p className="body-copy">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Cta({href, label, destinationLabel}: {href: string; label: string; destinationLabel: string}) {
  return <TransitionLink className="button-link" destinationLabel={destinationLabel} href={href}>{label}</TransitionLink>
}

export function CtaSection({title, text, children}: {title: string; text: string; children: ReactNode}) {
  return (
    <section className="section" data-reveal>
      <div className={`container ${styles.ctaRow}`}>
        <div className="stack--small">
          <h2>{title}</h2>
          <p className="body-copy">{text}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

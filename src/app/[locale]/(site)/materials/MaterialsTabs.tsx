'use client'

import {useRef, useState, type CSSProperties, type KeyboardEvent} from 'react'
import Image from 'next/image'
import type {MaterialsContent} from '@/lib/content/types'
import styles from './Materials.module.css'

export function MaterialsTabs({materials}: {materials: MaterialsContent}) {
  const [activeId, setActiveId] = useState(materials.concepts[0]?.id ?? '')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeConcept = materials.concepts.find((concept) => concept.id === activeId)

  function selectTab(index: number) {
    const nextIndex = (index + materials.concepts.length) % materials.concepts.length
    const nextConcept = materials.concepts[nextIndex]
    if (!nextConcept) return
    setActiveId(nextConcept.id)
    tabRefs.current[nextIndex]?.focus()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectTab(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectTab(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectTab(materials.concepts.length - 1)
    }
  }

  if (!activeConcept) return null

  const tabId = `material-tab-${activeConcept.id}`
  const panelId = 'material-proposal-panel'

  return (
    <div>
      <div aria-label={materials.tabsLabel} className={styles.tabs} role="tablist">
        {materials.concepts.map((concept, index) => {
          const selected = concept.id === activeConcept.id
          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={styles.tab}
              id={`material-tab-${concept.id}`}
              key={concept.id}
              onClick={() => setActiveId(concept.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => { tabRefs.current[index] = element }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              <span className="meta">{concept.number}</span>
              <strong>{concept.title}</strong>
            </button>
          )
        })}
      </div>

      <article
        aria-labelledby={tabId}
        className={styles.panel}
        id={panelId}
        key={activeConcept.id}
        role="tabpanel"
        tabIndex={0}
      >
        <header className={styles.panelHeader}>
          <span className="meta">{activeConcept.number} / {String(materials.concepts.length).padStart(2, '0')}</span>
          <h3>{activeConcept.title}</h3>
        </header>

        <div className={styles.proposalOverview}>
          <figure className={styles.artwork}>
            <Image
              alt={activeConcept.image.alt}
              height={activeConcept.image.height}
              loading="eager"
              sizes="(min-width: 64rem) 62vw, 100vw"
              src={activeConcept.image.src}
              width={activeConcept.image.width}
            />
          </figure>
          <div className={styles.proposalCopy}>
            <p className="body-copy">{activeConcept.description}</p>
            <div className={styles.typography}>
              <span className="meta">{materials.typographyLabel}</span>
              <ul className="plain-list">
                {activeConcept.typography.map((typeface) => <li key={typeface}>{typeface}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.materialDetails}>
          <section className={styles.detail}>
            <h4>{materials.colors.title}</h4>
            <p>{materials.colors.intro}</p>
            <ul className={`${styles.swatches} plain-list`}>
              {activeConcept.palette.map((color) => (
                <li key={color.hex}>
                  <span className={styles.swatch} style={{'--swatch': color.hex} as CSSProperties} />
                  <span>{color.name}</span>
                  <code>{color.hex}</code>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.detail}>
            <h4>{materials.elements.title}</h4>
            <p>{materials.elements.intro}</p>
            <div className={styles.mark}>
              <Image alt={activeConcept.mark.alt} height={activeConcept.mark.height} loading="eager" src={activeConcept.mark.src} width={activeConcept.mark.width} />
            </div>
            <p className="body-copy">{activeConcept.elementDescription}</p>
          </section>

          <section className={styles.detail}>
            <h4>{materials.voice.title}</h4>
            <p>{materials.voice.intro}</p>
            <ul className={`${styles.claims} plain-list`}>
              {activeConcept.claims.map((claim) => <li key={claim}>{claim}</li>)}
            </ul>
          </section>
        </div>

        <p className={styles.note}>{materials.colors.note}</p>
      </article>
    </div>
  )
}

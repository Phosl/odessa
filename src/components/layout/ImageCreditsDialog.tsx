'use client'

import {useEffect, useId, useRef} from 'react'
import type {EditorialImageCredits} from '@/lib/content/editorial-images'
import styles from './Layout.module.css'

export type ImageCreditsLabels = {
  button: string
  title: string
  intro: string
  author: string
  source: string
  license: string
  generated: string
  close: string
}

export function ImageCreditsDialog({credits, labels}: {
  credits: EditorialImageCredits
  labels: ImageCreditsLabels
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const introId = useId()

  function openDialog() {
    const dialog = dialogRef.current
    if (!dialog?.open) dialog?.showModal()
    document.documentElement.style.overflow = 'hidden'
  }

  function closeDialog() {
    dialogRef.current?.close()
  }

  function restorePage() {
    document.documentElement.style.removeProperty('overflow')
    triggerRef.current?.focus()
  }

  useEffect(() => () => {
    document.documentElement.style.removeProperty('overflow')
    dialogRef.current?.close()
  }, [])

  if (credits.licensed.length === 0 && !credits.hasGenerated) return null

  return (
    <>
      <button className={styles.footerCreditsButton} onClick={openDialog} ref={triggerRef} type="button">
        {labels.button}
      </button>
      <dialog
        aria-describedby={introId}
        aria-labelledby={titleId}
        className={styles.creditsDialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
        onClose={restorePage}
        ref={dialogRef}
      >
        <div className={styles.creditsDialogInner}>
          <div className={styles.creditsDialogHeader}>
            <h2 id={titleId}>{labels.title}</h2>
            <button className={styles.creditsCloseButton} onClick={closeDialog} type="button">{labels.close}</button>
          </div>
          <p className={styles.creditsIntro} id={introId}>{labels.intro}</p>
          <ol className={styles.creditsList}>
            {credits.licensed.map((credit) => (
              <li className={styles.creditsItem} key={credit.src}>
                <p className={styles.creditsItemTitle}>{credit.caption}</p>
                <dl className={styles.creditsMeta}>
                  <div>
                    <dt>{labels.author}</dt>
                    <dd>{credit.author}</dd>
                  </div>
                  <div>
                    <dt>{labels.source}</dt>
                    <dd><a href={credit.sourceUrl} rel="noreferrer" target="_blank">{labels.source}</a></dd>
                  </div>
                  <div>
                    <dt>{labels.license}</dt>
                    <dd><a href={credit.licenseUrl} rel="noreferrer" target="_blank">{credit.license}</a></dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
          {credits.hasGenerated ? <p className={styles.creditsGenerated}>{labels.generated}</p> : null}
        </div>
      </dialog>
    </>
  )
}

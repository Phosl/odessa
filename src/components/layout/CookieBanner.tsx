'use client'

import {useSyncExternalStore} from 'react'
import styles from './Layout.module.css'

const STORAGE_KEY = 'odessa-consent-v1'
const CONSENT_EVENT = 'odessa:consent-change'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(CONSENT_EVENT, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(CONSENT_EVENT, callback)
  }
}

function getSnapshot() {
  return !window.localStorage.getItem(STORAGE_KEY)
}

export function CookieBanner({title, text, necessary, accept, regionLabel}: {title: string; text: string; necessary: string; accept: string; regionLabel: string}) {
  const visible = useSyncExternalStore(subscribe, getSnapshot, () => false)

  function choose(value: 'necessary' | 'all') {
    window.localStorage.setItem(STORAGE_KEY, value)
    window.dispatchEvent(new Event(CONSENT_EVENT))
  }

  if (!visible) return null
  return (
    <aside aria-label={regionLabel} className={styles.cookie} data-testid="cookie-banner">
      <h2>{title}</h2>
      <p className="body-copy">{text}</p>
      <div className={styles.cookieActions}>
        <button className="button-control" onClick={() => choose('necessary')} type="button">{necessary}</button>
        <button className="button-control" onClick={() => choose('all')} type="button">{accept}</button>
      </div>
    </aside>
  )
}

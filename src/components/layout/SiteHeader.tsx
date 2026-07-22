'use client'

import {useCallback, useEffect, useRef, useState, type SyntheticEvent} from 'react'
import {usePathname} from 'next/navigation'
import gsap from 'gsap'
import type {Locale, RouteKey} from '@/i18n/routing'
import {getRouteKeyFromPathname} from '@/i18n/routing'
import {TransitionLink} from '@/components/transitions/TransitionLink'
import {LocaleSwitcher} from '@/components/navigation/LocaleSwitcher'
import {BrandLogo} from '@/components/brand/BrandLogo'
import styles from './Layout.module.css'

type NavItem = {route: RouteKey; href: string; label: string}
type Language = {locale: Locale; short: string; label: string}

export function SiteHeader({brand, locale, navigation, languages, labels}: {
  brand: string
  locale: Locale
  navigation: NavItem[]
  languages: Language[]
  labels: {primary: string; mobile: string; language: string; open: string; close: string}
}) {
  const pathname = usePathname()
  const currentRoute = getRouteKeyFromPathname(pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closingRef = useRef(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const items = dialog.querySelectorAll<HTMLElement>('[data-menu-item]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.killTweensOf([dialog, ...items])

    if (menuOpen) {
      closingRef.current = false
      if (!dialog.open) dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
      if (reduced) {
        gsap.set(dialog, {clipPath: 'inset(0% 0% 0% 0%)'})
        gsap.set(items, {opacity: 1, y: 0})
        closeButtonRef.current?.focus()
      } else {
        gsap.fromTo(dialog, {clipPath: 'inset(0% 0% 100% 0%)'}, {clipPath: 'inset(0% 0% 0% 0%)', duration: 0.58, ease: 'power4.inOut'})
        gsap.fromTo(items, {opacity: 0, y: 28}, {opacity: 1, y: 0, duration: 0.45, stagger: 0.045, delay: 0.18, ease: 'power3.out', onComplete: () => closeButtonRef.current?.focus()})
      }
      return
    }

    document.documentElement.style.removeProperty('overflow')
    if (!dialog.open || closingRef.current) return
    closingRef.current = true
    const finish = () => {
      if (dialog.open) dialog.close()
      closingRef.current = false
    }
    if (reduced) finish()
    else gsap.to(dialog, {clipPath: 'inset(0% 0% 100% 0%)', duration: 0.36, ease: 'power3.inOut', onComplete: finish})
  }, [menuOpen])

  useEffect(() => {
    window.addEventListener('odessa:page-exit', closeMenu)
    return () => window.removeEventListener('odessa:page-exit', closeMenu)
  }, [closeMenu])

  useEffect(() => () => {
    document.documentElement.style.removeProperty('overflow')
    dialogRef.current?.close()
  }, [])

  function cancelDialog(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    closeMenu()
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <TransitionLink aria-label={brand} className={styles.brand} destinationLabel={navigation[0].label} href={navigation[0].href}>
          <BrandLogo alt="" className={styles.headerLogo} priority />
        </TransitionLink>
        <nav className={styles.desktopNav} aria-label={labels.primary}>
          {navigation.slice(1).map((item) => (
            <TransitionLink aria-current={currentRoute === item.route ? 'page' : undefined} destinationLabel={item.label} href={item.href} key={item.route}>{item.label}</TransitionLink>
          ))}
        </nav>
        <nav className={styles.desktopLocales} aria-label={labels.language}>
          <LocaleSwitcher className={styles.localeList} currentLocale={locale} languages={languages} />
        </nav>
        <button aria-expanded={menuOpen} aria-haspopup="dialog" className={styles.menuButton} onClick={() => setMenuOpen(true)} ref={openButtonRef} type="button">{labels.open}</button>
      </div>

      <dialog aria-label={labels.mobile} className={styles.dialog} onCancel={cancelDialog} onClose={() => openButtonRef.current?.focus()} ref={dialogRef}>
        <div className={styles.dialogInner}>
          <div className={styles.dialogTop} data-menu-item>
            <BrandLogo alt={brand} className={styles.dialogLogo} />
            <button className={styles.closeButton} onClick={closeMenu} ref={closeButtonRef} type="button">{labels.close}</button>
          </div>
          <nav className={styles.dialogNav} aria-label={labels.mobile}>
            {navigation.map((item, index) => (
              <TransitionLink aria-current={currentRoute === item.route ? 'page' : undefined} data-menu-item destinationLabel={item.label} href={item.href} key={item.route} onClick={closeMenu}>
                <span className="meta">{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong>
              </TransitionLink>
            ))}
          </nav>
          <nav aria-label={labels.language} data-menu-item>
            <LocaleSwitcher className={styles.dialogLocales} currentLocale={locale} languages={languages} />
          </nav>
        </div>
      </dialog>
    </header>
  )
}

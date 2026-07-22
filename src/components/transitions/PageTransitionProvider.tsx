'use client'

import {usePathname, useRouter} from 'next/navigation'
import {createContext, type ReactNode, useCallback, useContext, useEffect, useRef} from 'react'
import gsap from 'gsap'
import styles from './Transitions.module.css'

type NavigateOptions = {
  href: string
  label: string
  replace?: boolean
}

type PageTransitionContextValue = {
  navigate: (options: NavigateOptions) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function usePageTransition() {
  const value = useContext(PageTransitionContext)
  if (!value) throw new Error('usePageTransition must be used inside PageTransitionProvider')
  return value
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const LINE_COUNT = 6

export function PageTransitionProvider({children, openingAnnouncement, announcement}: {children: ReactNode; openingAnnouncement: string; announcement: string}) {
  const pathname = usePathname()
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const diamondRef = useRef<HTMLSpanElement>(null)
  const sunRef = useRef<HTMLSpanElement>(null)
  const liveRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const fallbackRef = useRef<number | null>(null)
  const pendingPathRef = useRef<string | null>(null)
  const transitioningRef = useRef(false)
  const mountedRef = useRef(false)
  const revealCleanupRef = useRef<(() => void) | null>(null)

  const clearFallback = useCallback(() => {
    if (fallbackRef.current !== null) window.clearTimeout(fallbackRef.current)
    fallbackRef.current = null
  }, [])

  const prepareReveals = useCallback(() => {
    revealCleanupRef.current?.()
    const main = document.getElementById('main-content')
    if (!main) return
    const elements = Array.from(main.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!elements.length || prefersReducedMotion()) {
      gsap.set(elements, {clearProps: 'opacity,transform'})
      return
    }

    const context = gsap.context(() => {
      gsap.set(elements, {opacity: 0, y: 24})
    }, main)
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        gsap.to(entry.target, {opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'opacity,transform'})
      }
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08})
    elements.forEach((element) => observer.observe(element))
    revealCleanupRef.current = () => {
      observer.disconnect()
      context.revert()
    }
  }, [])

  const focusAndAnnounce = useCallback(() => {
    const main = document.getElementById('main-content')
    main?.focus({preventScroll: true})
    const title = main?.querySelector('h1')?.textContent?.trim() || document.title
    if (liveRef.current) liveRef.current.textContent = announcement.replace('{page}', title)
  }, [announcement])

  const finishTransition = useCallback(() => {
    clearFallback()
    transitioningRef.current = false
    pendingPathRef.current = null
    timelineRef.current = null
    document.documentElement.classList.remove('is-transitioning')
    const main = document.getElementById('main-content')
    if (main) gsap.set(main, {clearProps: 'opacity,transform'})
    if (overlayRef.current) {
      const lines = overlayRef.current.querySelectorAll<HTMLElement>('[data-transition-line]')
      gsap.set(lines, {scaleX: 0})
      gsap.set(overlayRef.current, {display: 'none'})
      overlayRef.current.dataset.transitionState = 'idle'
    }
    if (diamondRef.current) gsap.set(diamondRef.current, {opacity: 0, rotation: 45, scale: 0})
    if (sunRef.current) gsap.set(sunRef.current, {opacity: 0, scale: 0})
    prepareReveals()
    focusAndAnnounce()
  }, [clearFallback, focusAndAnnounce, prepareReveals])

  const navigate = useCallback(({href, label, replace = false}: NavigateOptions) => {
    if (transitioningRef.current) return
    const destination = new URL(href, window.location.href)
    if (destination.origin !== window.location.origin) {
      window.location.assign(destination.href)
      return
    }

    transitioningRef.current = true
    pendingPathRef.current = destination.pathname.replace(/\/$/, '') || '/'
    document.documentElement.classList.add('is-transitioning')
    window.dispatchEvent(new CustomEvent('odessa:page-exit'))
    if (liveRef.current) liveRef.current.textContent = openingAnnouncement.replace('{page}', label)

    const commit = () => {
      window.scrollTo({top: 0, left: 0, behavior: 'auto'})
      const target = `${destination.pathname}${destination.search}${destination.hash}`
      if (replace) router.replace(target, {scroll: false})
      else router.push(target, {scroll: false})
      fallbackRef.current = window.setTimeout(() => window.location.assign(destination.href), 8000)
    }

    const main = document.getElementById('main-content')
    const overlay = overlayRef.current
    const diamond = diamondRef.current
    const sun = sunRef.current
    const lines = overlay?.querySelectorAll<HTMLElement>('[data-transition-line]')
    if (prefersReducedMotion() || !main || !overlay || !diamond || !sun || !lines?.length) {
      commit()
      return
    }

    timelineRef.current?.kill()
    overlay.dataset.transitionState = 'building'
    gsap.set(overlay, {display: 'grid'})
    gsap.set(lines, {scaleX: 0})
    gsap.set(diamond, {opacity: 0, rotation: 45, scale: 0.55})
    gsap.set(sun, {opacity: 0, scale: 0})
    const sunCoverScale = (Math.hypot(window.innerWidth, window.innerHeight) / sun.offsetWidth) * 1.05

    timelineRef.current = gsap.timeline({onComplete: commit})
      .to(main, {opacity: 0.28, duration: 0.64, ease: 'power3.inOut'}, 0)
      .to(lines, {scaleX: 1, duration: 0.38, stagger: 0.055, ease: 'power4.inOut'}, 0)
      .to(diamond, {opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.3)'}, 0.38)
      .to(sun, {opacity: 1, scale: 1, duration: 0.28, ease: 'back.out(1.5)'}, 0.43)
      .call(() => { overlay.dataset.transitionState = 'assembled' }, undefined, 0.68)
      .call(() => { overlay.dataset.transitionState = 'exiting' }, undefined, 0.8)
      .to(lines, {scaleX: 0, duration: 0.34, stagger: {each: 0.03, from: 'end'}, ease: 'power3.inOut'}, 0.8)
      .to(diamond, {opacity: 0, scale: 0.7, duration: 0.25, ease: 'power2.in'}, 0.9)
      .call(() => { overlay.dataset.transitionState = 'covering' }, undefined, 0.98)
      .to(sun, {scale: sunCoverScale, duration: 0.45, ease: 'power4.inOut'}, 0.98)
      .call(() => { overlay.dataset.transitionState = 'covered' }, undefined, 1.43)
  }, [openingAnnouncement, router])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      prepareReveals()
      return
    }

    clearFallback()
    window.scrollTo({top: 0, left: 0, behavior: 'auto'})
    timelineRef.current?.kill()
    const main = document.getElementById('main-content')
    const overlay = overlayRef.current
    const sun = sunRef.current
    const normalizedPath = pathname.replace(/\/$/, '') || '/'
    const expected = transitioningRef.current && pendingPathRef.current === normalizedPath

    if (!main || prefersReducedMotion()) {
      finishTransition()
      return
    }

    if (expected && overlay && sun) {
      overlay.dataset.transitionState = 'revealing'
      gsap.set(main, {opacity: 0, y: 18})
      timelineRef.current = gsap.timeline({onComplete: finishTransition})
        .to(sun, {opacity: 0, duration: 0.37, ease: 'power2.out'}, 0)
        .to(main, {opacity: 1, y: 0, duration: 0.37, ease: 'power3.out'}, 0)
      return
    }

    gsap.fromTo(main, {opacity: 0, y: 18}, {opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', onComplete: finishTransition})
  }, [clearFallback, finishTransition, pathname, prepareReveals])

  useEffect(() => () => {
    timelineRef.current?.kill()
    clearFallback()
    revealCleanupRef.current?.()
    document.documentElement.classList.remove('is-transitioning')
  }, [clearFallback])

  return (
    <PageTransitionContext.Provider value={{navigate}}>
      <div className={styles.root}>
        {children}
        <p className="sr-only" aria-live="polite" aria-atomic="true" ref={liveRef} />
        <div aria-hidden="true" className={styles.overlay} data-testid="transition-overlay" data-transition-state="idle" ref={overlayRef}>
          <div className={styles.lines}>
            {Array.from({length: LINE_COUNT}, (_, index) => (
              <span className={styles.line} data-direction={index % 2 === 0 ? 'ltr' : 'rtl'} data-transition-line key={index}>
                <span className={styles.stripe} data-transition-stripe />
              </span>
            ))}
          </div>
          <span className={styles.diamond} data-testid="transition-diamond" ref={diamondRef} />
          <span className={styles.sun} data-testid="transition-sun" ref={sunRef} />
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}

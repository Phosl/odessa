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
  const veilRef = useRef<HTMLSpanElement>(null)
  const diamondRef = useRef<HTMLSpanElement>(null)
  const sunRef = useRef<HTMLSpanElement>(null)
  const liveRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const entryTweenRef = useRef<gsap.core.Tween | null>(null)
  const fallbackRef = useRef<number | null>(null)
  const pendingPathRef = useRef<string | null>(null)
  const transitioningRef = useRef(false)
  const flowFinishedRef = useRef(false)
  const entryFinishedRef = useRef(false)
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
    entryTweenRef.current = null
    flowFinishedRef.current = false
    entryFinishedRef.current = false
    document.documentElement.classList.remove('is-transitioning')
    const main = document.getElementById('main-content')
    if (main) gsap.set(main, {clearProps: 'opacity,transform'})
    if (overlayRef.current) {
      const lines = overlayRef.current.querySelectorAll<HTMLElement>('[data-transition-line]')
      gsap.set(lines, {scaleX: 0})
      gsap.set(overlayRef.current, {display: 'none'})
      overlayRef.current.dataset.transitionState = 'idle'
    }
    if (veilRef.current) gsap.set(veilRef.current, {opacity: 0})
    if (diamondRef.current) gsap.set(diamondRef.current, {opacity: 0, rotation: 45, scale: 0})
    if (sunRef.current) gsap.set(sunRef.current, {opacity: 0, scale: 0})
    prepareReveals()
    focusAndAnnounce()
  }, [clearFallback, focusAndAnnounce, prepareReveals])

  const finishWhenReady = useCallback(() => {
    if (flowFinishedRef.current && entryFinishedRef.current) finishTransition()
  }, [finishTransition])

  const navigate = useCallback(({href, label, replace = false}: NavigateOptions) => {
    if (transitioningRef.current) return
    const destination = new URL(href, window.location.href)
    if (destination.origin !== window.location.origin) {
      window.location.assign(destination.href)
      return
    }

    transitioningRef.current = true
    flowFinishedRef.current = false
    entryFinishedRef.current = false
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
    const veil = veilRef.current
    const diamond = diamondRef.current
    const sun = sunRef.current
    const lines = overlay?.querySelectorAll<HTMLElement>('[data-transition-line]')
    if (prefersReducedMotion() || !main || !overlay || !veil || !diamond || !sun || !lines?.length) {
      commit()
      return
    }

    timelineRef.current?.kill()
    overlay.dataset.transitionState = 'building'
    gsap.set(overlay, {display: 'grid'})
    gsap.set(veil, {opacity: 0})
    gsap.set(lines, {scaleX: 0})
    gsap.set(diamond, {opacity: 0, rotation: 45, scale: 0.82})
    gsap.set(sun, {opacity: 0, scale: 0})

    const timeline = gsap.timeline({
      onComplete: () => {
        flowFinishedRef.current = true
        overlay.dataset.transitionState = 'flow-complete'
        finishWhenReady()
      },
    })
      .to(main, {opacity: 0.08, y: -6, duration: 0.62, ease: 'power4.inOut'}, 0)
      .to(veil, {opacity: 0.96, duration: 0.54, ease: 'power3.inOut'}, 0)
      .to(diamond, {opacity: 1, scale: 1, duration: 0.38, ease: 'power3.out'}, 0.24)
      .to(sun, {opacity: 1, scale: 1, duration: 0.32, ease: 'back.out(1.25)'}, 0.3)
      .call(() => { overlay.dataset.transitionState = 'flowing' }, undefined, 0.5)
      .call(() => {
        overlay.dataset.transitionState = 'navigating'
        commit()
      }, undefined, 0.68)
      .to([diamond, sun], {opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.inOut'}, 0.74)
      .to(veil, {opacity: 0, duration: 0.56, ease: 'power3.inOut'}, 0.78)

    lines.forEach((line, index) => {
      timeline
        .to(line, {scaleX: 1, duration: 0.5, ease: 'power4.inOut'}, index * 0.055)
        .to(line, {scaleX: 0, duration: 0.52, ease: 'power4.inOut'}, 0.62 + (index * 0.055))
    })
    timelineRef.current = timeline
  }, [finishWhenReady, openingAnnouncement, router])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      prepareReveals()
      return
    }

    clearFallback()
    window.scrollTo({top: 0, left: 0, behavior: 'auto'})
    const main = document.getElementById('main-content')
    const overlay = overlayRef.current
    const normalizedPath = pathname.replace(/\/$/, '') || '/'
    const expected = transitioningRef.current && pendingPathRef.current === normalizedPath

    if (!expected) {
      timelineRef.current?.kill()
      entryTweenRef.current?.kill()
    }

    if (!main || prefersReducedMotion()) {
      finishTransition()
      return
    }

    if (expected && overlay) {
      overlay.dataset.transitionState = 'revealing'
      gsap.set(main, {opacity: 0, y: 14})
      entryTweenRef.current?.kill()
      entryTweenRef.current = gsap.to(main, {
        opacity: 1,
        y: 0,
        duration: 0.42,
        ease: 'power3.out',
        onComplete: () => {
          entryFinishedRef.current = true
          finishWhenReady()
        },
      })
      return
    }

    gsap.fromTo(main, {opacity: 0, y: 18}, {opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', onComplete: finishTransition})
  }, [clearFallback, finishTransition, finishWhenReady, pathname, prepareReveals])

  useEffect(() => () => {
    timelineRef.current?.kill()
    entryTweenRef.current?.kill()
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
          <span className={styles.veil} data-transition-veil ref={veilRef} />
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

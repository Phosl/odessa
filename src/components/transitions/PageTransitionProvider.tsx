'use client'

import {usePathname, useRouter} from 'next/navigation'
import {createContext, type ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useRef} from 'react'
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
const PENDING_FOCUS_KEY = 'odessa-pending-focus'
const FULL_LINE_CLIP = 'inset(0 0% 0 0)'
const LINE_FLOW = {
  ltr: {
    enterClip: 'inset(0 100% 0 0)',
    exitClip: 'inset(0 0 0 100%)',
  },
  rtl: {
    enterClip: 'inset(0 0 0 100%)',
    exitClip: 'inset(0 100% 0 0)',
  },
} as const

function getLineFlow(line: HTMLElement) {
  return LINE_FLOW[line.dataset.direction === 'rtl' ? 'rtl' : 'ltr']
}

function resetLineFlow(lines: NodeListOf<HTMLElement>) {
  lines.forEach((line) => gsap.set(line, {clipPath: getLineFlow(line).enterClip}))
}

function shuffle<T>(items: T[]) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[items[index], items[target]] = [items[target], items[index]]
  }
  return items
}

function randomizeLineFlow(lines: NodeListOf<HTMLElement>) {
  const directions = shuffle(Array.from(
    {length: lines.length},
    (_, index) => index < Math.ceil(lines.length / 2) ? 'ltr' : 'rtl',
  ))
  lines.forEach((line, index) => {
    line.dataset.direction = directions[index]
  })
}

function groupLinesFromCenter(lines: NodeListOf<HTMLElement>) {
  const items = Array.from(lines)
  const groups: HTMLElement[][] = []
  const upperCenter = Math.floor((items.length - 1) / 2)
  const lowerCenter = Math.ceil((items.length - 1) / 2)

  for (let offset = 0; offset < items.length; offset += 1) {
    const upper = upperCenter - offset
    const lower = lowerCenter + offset
    const group: HTMLElement[] = []
    if (upper >= 0) group.push(items[upper])
    if (lower !== upper && lower < items.length) group.push(items[lower])
    if (!group.length) break
    groups.push(group)
  }

  return groups
}

export function PageTransitionProvider({children, openingAnnouncement, announcement}: {children: ReactNode; openingAnnouncement: string; announcement: string}) {
  const pathname = usePathname()
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const fallbackRef = useRef<number | null>(null)
  const cleanupTimerRef = useRef<number | null>(null)
  const pendingPathRef = useRef<string | null>(null)
  const transitioningRef = useRef(false)
  const flowFinishedRef = useRef(false)
  const entryFinishedRef = useRef(false)
  const renderedPathRef = useRef<string | null>(null)
  const revealStartRef = useRef<(() => void) | null>(null)
  const revealCleanupRef = useRef<(() => void) | null>(null)
  const revealedElementsRef = useRef(new WeakSet<HTMLElement>())

  const clearFallback = useCallback(() => {
    if (fallbackRef.current !== null) window.clearTimeout(fallbackRef.current)
    fallbackRef.current = null
  }, [])

  const prepareReveals = useCallback((defer = false) => {
    revealCleanupRef.current?.()
    revealCleanupRef.current = null
    revealStartRef.current = null
    const main = document.getElementById('main-content')
    if (!main) {
      document.documentElement.classList.remove('reveal-pending')
      return
    }
    const elements = Array.from(main.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!elements.length) {
      document.documentElement.classList.remove('reveal-pending')
      return
    }
    gsap.killTweensOf(elements)
    if (prefersReducedMotion()) {
      gsap.set(elements, {clearProps: 'opacity,transform'})
      document.documentElement.classList.remove('reveal-pending')
      return
    }

    const pendingElements = elements.filter((element) => !revealedElementsRef.current.has(element))
    const revealedElements = elements.filter((element) => revealedElementsRef.current.has(element))
    if (revealedElements.length) gsap.set(revealedElements, {clearProps: 'opacity,transform'})
    if (!pendingElements.length) {
      document.documentElement.classList.remove('reveal-pending')
      return
    }

    const context = gsap.context(() => {
      gsap.set(pendingElements, {opacity: 0, y: 24})
    }, main)
    document.documentElement.classList.remove('reveal-pending')
    let observer: IntersectionObserver | null = null
    const start = () => {
      if (observer) return
      const nextObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          nextObserver.unobserve(entry.target)
          revealedElementsRef.current.add(entry.target as HTMLElement)
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'opacity,transform',
          })
        }
      }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08})
      observer = nextObserver
      pendingElements.forEach((element) => observer?.observe(element))
    }
    revealStartRef.current = start
    revealCleanupRef.current = () => {
      observer?.disconnect()
      gsap.killTweensOf(pendingElements)
      context.revert()
      if (revealStartRef.current === start) revealStartRef.current = null
    }
    if (!defer) {
      revealStartRef.current = null
      start()
    }
  }, [])

  const startPreparedReveals = useCallback(() => {
    const start = revealStartRef.current
    revealStartRef.current = null
    start?.()
  }, [])

  const focusAndAnnounce = useCallback(() => {
    const main = document.getElementById('main-content')
    main?.focus({preventScroll: true})
    window.requestAnimationFrame(() => main?.focus({preventScroll: true}))
    const title = main?.querySelector('h1')?.textContent?.trim() || document.title
    if (liveRef.current) liveRef.current.textContent = announcement.replace('{page}', title)
    window.sessionStorage.removeItem(PENDING_FOCUS_KEY)
  }, [announcement])

  const finishTransition = useCallback(() => {
    clearFallback()
    transitioningRef.current = false
    pendingPathRef.current = null
    timelineRef.current = null
    flowFinishedRef.current = false
    entryFinishedRef.current = false
    document.documentElement.classList.remove('is-transitioning')
    const main = document.getElementById('main-content')
    if (main) gsap.set(main, {clearProps: 'opacity,transform'})
    if (overlayRef.current) {
      const lines = overlayRef.current.querySelectorAll<HTMLElement>('[data-transition-line]')
      resetLineFlow(lines)
      gsap.set(overlayRef.current, {display: 'none'})
      overlayRef.current.dataset.transitionState = 'idle'
    }
    startPreparedReveals()
    focusAndAnnounce()
  }, [clearFallback, focusAndAnnounce, startPreparedReveals])

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
      window.sessionStorage.setItem(PENDING_FOCUS_KEY, 'true')
      const target = `${destination.pathname}${destination.search}${destination.hash}`
      if (replace) router.replace(target, {scroll: false})
      else router.push(target, {scroll: false})
      fallbackRef.current = window.setTimeout(() => window.location.assign(destination.href), 8000)
    }

    const main = document.getElementById('main-content')
    const overlay = overlayRef.current
    const lines = overlay?.querySelectorAll<HTMLElement>('[data-transition-line]')
    if (prefersReducedMotion() || !main || !overlay || !lines?.length) {
      commit()
      return
    }

    timelineRef.current?.kill()
    overlay.dataset.transitionState = 'building'
    gsap.set(overlay, {display: 'block'})
    randomizeLineFlow(lines)
    resetLineFlow(lines)
    const lineGroups = groupLinesFromCenter(lines)

    const timeline = gsap.timeline({
      onComplete: () => {
        flowFinishedRef.current = true
        overlay.dataset.transitionState = 'flow-complete'
        finishWhenReady()
      },
    })
      .call(() => { overlay.dataset.transitionState = 'flowing' }, undefined, 0)
      .call(() => {
        overlay.dataset.transitionState = 'navigating'
        commit()
      }, undefined, 0.62)

    lineGroups.forEach((group, groupIndex) => {
      const entranceStart = groupIndex * 0.09
      const exitStart = 0.72 + (groupIndex * 0.07)
      group.forEach((line) => {
        const flow = getLineFlow(line)
        line.dataset.transitionWave = String(groupIndex)
        timeline
          .to(line, {clipPath: FULL_LINE_CLIP, duration: 0.38, ease: 'power3.inOut'}, entranceStart)
          .to(line, {clipPath: flow.exitClip, duration: 0.42, ease: 'power3.inOut'}, exitStart)
      })
    })
    timelineRef.current = timeline
  }, [finishWhenReady, openingAnnouncement, router])

  useLayoutEffect(() => {
    if (cleanupTimerRef.current !== null) {
      window.clearTimeout(cleanupTimerRef.current)
      cleanupTimerRef.current = null
    }

    const normalizedPath = pathname.replace(/\/$/, '') || '/'

    if (renderedPathRef.current === null) {
      renderedPathRef.current = normalizedPath
      prepareReveals()
      if (window.sessionStorage.getItem(PENDING_FOCUS_KEY) === 'true') {
        window.requestAnimationFrame(focusAndAnnounce)
      }
      return
    }

    if (renderedPathRef.current === normalizedPath) {
      // React Strict Mode tears effects down and runs them again in development.
      // Recreate the observer only when that teardown removed it; do not start a
      // second page-entry animation for the same pathname.
      if (!revealCleanupRef.current && !prefersReducedMotion()) prepareReveals()
      return
    }

    renderedPathRef.current = normalizedPath
    clearFallback()
    window.scrollTo({top: 0, left: 0, behavior: 'auto'})
    const main = document.getElementById('main-content')
    const overlay = overlayRef.current
    const expected = transitioningRef.current && pendingPathRef.current === normalizedPath

    if (!expected) {
      timelineRef.current?.kill()
    }

    if (main) gsap.set(main, {clearProps: 'opacity,transform'})
    prepareReveals(true)

    if (!main || prefersReducedMotion()) {
      finishTransition()
      return
    }

    if (expected && overlay) {
      overlay.dataset.transitionState = 'revealing'
      startPreparedReveals()
      entryFinishedRef.current = true
      finishWhenReady()
      return
    }

    finishTransition()
  }, [clearFallback, finishTransition, finishWhenReady, focusAndAnnounce, pathname, prepareReveals, startPreparedReveals])

  useEffect(() => () => {
    // Strict Mode performs a teardown immediately followed by a setup in
    // development. Defer disposal by one task so that setup can cancel it and
    // preserve the in-flight reveal instead of restarting visible content.
    cleanupTimerRef.current = window.setTimeout(() => {
      timelineRef.current?.kill()
      clearFallback()
      revealCleanupRef.current?.()
      revealCleanupRef.current = null
      revealStartRef.current = null
      document.documentElement.classList.remove('is-transitioning')
      cleanupTimerRef.current = null
    }, 0)
  }, [clearFallback])

  return (
    <PageTransitionContext.Provider value={{navigate}}>
      <div className={styles.root}>
        {children}
        <p className="sr-only" aria-live="polite" aria-atomic="true" ref={liveRef} />
        <div aria-hidden="true" className={styles.overlay} data-testid="transition-overlay" data-transition-state="idle" ref={overlayRef}>
          <div className={styles.lines}>
            {Array.from({length: LINE_COUNT}, (_, index) => (
              <span className={styles.line} data-direction={index % 2 === 0 ? 'ltr' : 'rtl'} data-transition-line key={index} />
            ))}
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}

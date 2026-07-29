import {expect, test, type Locator, type Page} from '@playwright/test'

const routes = {
  it: ['/it', '/it/progetto', '/it/attivita', '/it/partner', '/it/risultati', '/it/media', '/it/pillole-video', '/it/materiali', '/it/contatti', '/it/privacy', '/it/cookie-policy'],
  en: ['/en', '/en/project', '/en/activities', '/en/partners', '/en/results', '/en/media', '/en/video-pills', '/en/materials', '/en/contact', '/en/privacy', '/en/cookie-policy'],
  uk: ['/uk', '/uk/project', '/uk/activities', '/uk/partners', '/uk/results', '/uk/media', '/uk/video-pills', '/uk/materials', '/uk/contact', '/uk/privacy', '/uk/cookie-policy'],
} as const

async function findMediaOutsideContainer(page: Page) {
  return page.locator('main img, main video, main [role="img"]').evaluateAll((media) => media.flatMap((element) => {
    const container = element.closest('.container')
    if (!container) return []
    const mediaRect = element.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const outside = mediaRect.left < containerRect.left - 1 || mediaRect.right > containerRect.right + 1
    return outside ? [{
      element: `${element.tagName.toLowerCase()}.${element.className}`,
      media: {left: mediaRect.left, right: mediaRect.right, width: mediaRect.width},
      container: {left: containerRect.left, right: containerRect.right, width: containerRect.width},
    }] : []
  }))
}

async function waitForLoadedImages(images: Locator) {
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    const alt = await image.getAttribute('alt')
    await expect.poll(
      () => image.evaluate((node: HTMLImageElement) => node.complete ? node.naturalWidth : 0),
      {message: alt ?? 'Editorial image', timeout: 15_000},
    ).toBeGreaterThan(0)
  }
}

test.beforeEach(async ({page}, testInfo) => {
  if (!testInfo.title.includes('stores and restores cookie')) {
    await page.addInitScript(() => window.localStorage.setItem('odessa-consent-v1', 'necessary'))
  }
})

test('renders all 33 localized routes without console errors or horizontal overflow', async ({page}) => {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  for (const [locale, paths] of Object.entries(routes)) {
    for (const path of paths) {
      const response = await page.goto(path)
      expect(response?.ok(), path).toBeTruthy()
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      await expect(page.locator('main h1')).toBeVisible()
      await expect(page).toHaveTitle(/Odessa/)
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
      expect(overflows, `horizontal overflow at ${path}`).toBeFalsy()
    }
  }
  expect(consoleErrors).toEqual([])
})

test('stays overflow-free and captures the target viewports', async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'One browser project covers the exact viewport matrix')
  await page.emulateMedia({reducedMotion: 'reduce'})
  const viewports = [
    {width: 360, height: 800},
    {width: 768, height: 1024},
    {width: 1440, height: 1000},
  ]
  const densePages = ['/it', '/en/project', '/en/activities', '/en/results', '/en/media', '/en/video-pills', '/en/video-pills/why-care-matters', '/en/materials', '/en/contact']

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    for (const path of densePages) {
      await page.goto(path)
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
      expect(overflows, `horizontal overflow at ${path} / ${viewport.width}px`).toBeFalsy()
      expect(await findMediaOutsideContainer(page), `media outside container at ${path} / ${viewport.width}px`).toEqual([])
    }
    await page.goto('/it')
    await waitForLoadedImages(page.locator('main img'))
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({fullPage: true, path: `test-results/odessa-home-${viewport.width}.png`})
    await page.goto('/en/activities')
    await waitForLoadedImages(page.locator('article img'))
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({fullPage: true, path: `test-results/odessa-activities-${viewport.width}.png`})
    await page.goto('/en/project')
    await waitForLoadedImages(page.locator('main img'))
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({fullPage: true, path: `test-results/odessa-project-${viewport.width}.png`})
    await page.goto('/en/results')
    await waitForLoadedImages(page.locator('main img'))
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({fullPage: true, path: `test-results/odessa-results-${viewport.width}.png`})
    await page.goto('/en/media')
    await page.getByRole('button', {name: 'Photos'}).click()
    const galleryImages = page.locator('[data-gallery-item] img')
    await expect(galleryImages).toHaveCount(8)
    await waitForLoadedImages(galleryImages)
    await expect(page.locator('[role="img"]').filter({hasText: /IMAGE/})).toHaveCount(0)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({fullPage: true, path: `test-results/odessa-media-${viewport.width}.png`})
    await page.goto('/en/video-pills/why-care-matters')
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({fullPage: true, path: `test-results/odessa-video-pill-${viewport.width}.png`})
    await page.goto('/en/materials')
    await page.screenshot({fullPage: true, path: `test-results/odessa-materials-${viewport.width}.png`})
  }
})

test('renders licensed contextual photography and keeps editorial titles on the left', async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop grid placement is covered once')
  await page.setViewportSize({width: 1440, height: 1000})
  await page.goto('/it')

  const hero = page.getByAltText('Il Teatro Nazionale dell’Opera e del Balletto di Odessa visto dalla piazza')
  await expect(hero).toBeVisible()
  await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy()

  const heroFigure = hero.locator('xpath=ancestor::figure')
  await expect(heroFigure.locator('figcaption')).toHaveCount(0)
  await expect(heroFigure.locator('a')).toHaveCount(0)

  const title = page.getByRole('heading', {name: 'Attività che collegano persone e competenze'})
  const intro = page.getByText('Sei azioni coordinate accompagnano il progetto dalla ricerca iniziale alla condivisione pubblica dei risultati.')
  await title.scrollIntoViewIfNeeded()
  const [titleBox, introBox] = await Promise.all([title.boundingBox(), intro.boundingBox()])
  expect(titleBox).not.toBeNull()
  expect(introBox).not.toBeNull()
  expect(titleBox!.x).toBeLessThan(introBox!.x)
})

test('does not restart the initial hero reveal after it becomes visible', async ({page}) => {
  await page.addInitScript(() => {
    const probe = {
      previousOpacity: null as number | null,
      resets: 0,
      samples: 0,
    }
    ;(window as typeof window & {__heroRevealProbe: typeof probe}).__heroRevealProbe = probe

    function sampleHeroReveal() {
      const hero = document.querySelector<HTMLElement>('main [data-reveal]')
      if (hero) {
        const opacity = Number.parseFloat(window.getComputedStyle(hero).opacity)
        if (probe.previousOpacity !== null && probe.previousOpacity > 0.8 && opacity < 0.4) {
          probe.resets += 1
        }
        probe.previousOpacity = opacity
        probe.samples += 1
      }
      window.requestAnimationFrame(sampleHeroReveal)
    }

    window.requestAnimationFrame(sampleHeroReveal)
  })

  await page.goto('/en')
  await expect(page.getByRole('heading', {name: 'Different distances, common ground.'})).toBeVisible()
  await page.waitForTimeout(1_200)

  const probe = await page.evaluate(() => (
    window as typeof window & {__heroRevealProbe: {resets: number; samples: number}}
  ).__heroRevealProbe)
  expect(probe.samples).toBeGreaterThan(5)
  expect(probe.resets).toBe(0)
})

test('shows localized art and restoration imagery with honest provenance', async ({page}, testInfo) => {
  const remoteImageRequests: string[] = []
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (request.resourceType() === 'image' && !['127.0.0.1', 'localhost'].includes(url.hostname)) {
      remoteImageRequests.push(request.url())
    }
  })

  const localizedSections = [
    {path: '/it', title: 'Arte, cura e rigenerazione'},
    {path: '/en', title: 'Art, care and regeneration'},
    {path: '/uk', title: 'Мистецтво, турбота та відновлення'},
  ]

  for (const locale of localizedSections) {
    await page.goto(locale.path)
    const section = page.getByTestId('culture-section')
    await expect(section.getByRole('heading', {name: locale.title})).toBeVisible()
    await expect(section.locator('img')).toHaveCount(3)
    await expect(section.locator('[data-editorial-provenance="licensed"]')).toHaveCount(3)
    await waitForLoadedImages(section.locator('img'))
    expect(await findMediaOutsideContainer(page), `media outside container at ${locale.path}`).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBeFalsy()
  }

  await page.goto('/en/activities')
  await expect(page.locator('article img')).toHaveCount(6)
  const generatedFigures = page.locator('[data-editorial-provenance="generated"]')
  await expect(generatedFigures).toHaveCount(2)
  await expect(generatedFigures.locator('figcaption')).toHaveCount(0)
  await expect(generatedFigures.locator('a')).toHaveCount(0)
  expect(await findMediaOutsideContainer(page), 'activity media outside container').toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBeFalsy()

  await page.goto('/en/project')
  await expect(page.locator('main img')).toHaveCount(2)
  await waitForLoadedImages(page.locator('main img'))
  await page.goto('/en/results')
  await expect(page.locator('main img')).toHaveCount(2)
  await waitForLoadedImages(page.locator('main img'))
  await page.goto('/en/media')
  await page.getByRole('button', {name: 'Photos'}).click()
  await expect(page.locator('[data-gallery-item] img')).toHaveCount(8)
  await waitForLoadedImages(page.locator('[data-gallery-item] img'))
  await expect(page.locator('[role="img"]').filter({hasText: /IMAGE/})).toHaveCount(0)
  expect(remoteImageRequests).toEqual([])

  await page.setViewportSize(testInfo.project.name === 'desktop'
    ? {width: 1440, height: 1000}
    : {width: 360, height: 800})
  const creditsButton = page.getByRole('button', {name: 'Image credits'})
  await creditsButton.click()
  const creditsDialog = page.getByRole('dialog', {name: 'Image credits'})
  await expect(creditsDialog).toBeVisible()
  await expect(creditsDialog.locator('li')).toHaveCount(8)
  await expect(creditsDialog.locator('a[href*="commons.wikimedia.org"]')).toHaveCount(8)
  await expect(creditsDialog.locator('a[href*="creativecommons.org"]')).toHaveCount(8)
  await expect(creditsDialog.getByText(/generated with OpenAI/)).toBeVisible()
  await page.screenshot({path: `test-results/odessa-image-credits-${testInfo.project.name}.png`})
  await page.keyboard.press('Escape')
  await expect(creditsDialog).not.toBeVisible()
  await expect(creditsButton).toBeFocused()
})

test('redirects the root path to Italian', async ({page}) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/it$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'it')
})

test('switches locale while preserving route, query and hash', async ({page}, testInfo) => {
  await page.goto('/it/materiali?source=e2e#main-content')
  if (testInfo.project.name === 'mobile') await page.getByRole('button', {name: 'Apri menu'}).click()
  await page.getByRole('link', {name: 'Inglese'}).first().click()
  await expect(page).toHaveURL(/\/en\/materials\?source=e2e#main-content$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('main')).toBeFocused()
})

test('publishes localized canonical and alternate metadata', async ({page}) => {
  await page.goto('/it/progetto')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://odessa.example/it/progetto')
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://odessa.example/en/project')
  await expect(page.locator('link[rel="alternate"][hreflang="uk"]')).toHaveAttribute('href', 'https://odessa.example/uk/project')
})

test('filters local media content', async ({page}) => {
  await page.goto('/en/media')
  await page.getByRole('button', {name: 'Photos'}).click()
  await expect(page.locator('[data-gallery-item]')).toHaveCount(8)
  await expect(page.locator('[data-gallery-item] img')).toHaveCount(8)
  await waitForLoadedImages(page.locator('[data-gallery-item] img'))
  await expect(page.locator('[role="img"]').filter({hasText: /IMAGE/})).toHaveCount(0)
  expect(await findMediaOutsideContainer(page), 'media archive images outside container').toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBeFalsy()
  await expect(page.getByText('The Odessa journey begins')).toHaveCount(0)
  await page.getByRole('button', {name: 'Video'}).click()
  await expect(page.getByText('VIDEO 01')).toBeVisible()
  await expect(page.locator('[data-gallery-item]')).toHaveCount(0)
})

test('links the home preview to the localized video pills page', async ({page}) => {
  await page.goto('/it')
  const preview = page.getByTestId('video-pills-preview')
  await expect(preview.getByRole('heading', {name: 'Storie brevi dal progetto'})).toBeVisible()
  await expect(preview.locator('article')).toHaveCount(3)
  await preview.getByRole('link', {name: 'Scopri tutte le pillole'}).click()

  await expect(page).toHaveURL(/\/it\/pillole-video$/)
  await expect(page.getByRole('heading', {name: 'Il progetto, una storia alla volta.'})).toBeVisible()
  await expect(page.locator('main article')).toHaveCount(6)
  await expect(page.getByText('Odessa in due minuti')).toBeVisible()
  await expect(page.getByText('Parole condivise')).toBeVisible()
  expect(await findMediaOutsideContainer(page), 'video pills outside container').toEqual([])
})

test('filters video pills and opens a localized editorial detail page', async ({page}, testInfo) => {
  await page.goto('/it/pillole-video')
  const grid = page.getByTestId('video-pills-grid')
  await expect(grid.locator('article')).toHaveCount(6)

  await page.getByRole('button', {name: 'Didattica'}).click()
  await expect(grid.locator('article')).toHaveCount(2)
  await expect(grid.getByRole('heading', {name: 'Perché prendersi cura'})).toBeVisible()
  await expect(grid.getByRole('heading', {name: 'Parole condivise'})).toBeVisible()

  await grid.getByRole('link', {name: /Perché prendersi cura/}).click()
  await expect(page).toHaveURL(/\/it\/pillole-video\/perche-prendersi-cura$/)
  await expect(page.getByRole('heading', {name: 'Perché prendersi cura', level: 1})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'La storia'})).toBeVisible()
  await expect(page.getByText('Il video sarà pubblicato sulla piattaforma del progetto.')).toBeVisible()
  await expect(page.getByRole('link', {name: 'Guarda sulla piattaforma'})).toHaveCount(0)
  await expect(page.getByText('Scheda didattica: cura e conservazione')).toBeVisible()
  await expect(page.getByText('PDF · In arrivo')).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://odessa.example/it/pillole-video/perche-prendersi-cura',
  )
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    'https://odessa.example/en/video-pills/why-care-matters',
  )
  await expect(page.locator('link[rel="alternate"][hreflang="uk"]')).toHaveAttribute(
    'href',
    'https://odessa.example/uk/video-pills/navishcho-pikluvatysia',
  )

  if (testInfo.project.name === 'mobile') await page.getByRole('button', {name: 'Apri menu'}).click()
  await page.getByRole('link', {name: 'Inglese'}).first().click()
  await expect(page).toHaveURL(/\/en\/video-pills\/why-care-matters$/)
  await expect(page.getByRole('heading', {name: 'Why care matters', level: 1})).toBeVisible()
})

test('organizes each identity proposal in an accessible tab', async ({page}) => {
  await page.goto('/it/materiali')
  const tabs = page.getByRole('tab')
  const panel = page.getByRole('tabpanel')
  await expect(tabs).toHaveCount(4)
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
  await expect(panel.getByRole('heading', {name: 'Stratigrafie e colori ucraini'})).toBeVisible()
  await expect(panel.getByRole('heading', {name: 'Palette e ipotesi di colore'})).toBeVisible()
  await expect(panel.getByRole('heading', {name: 'Elementi grafici e icone'})).toBeVisible()
  await expect(panel.getByRole('heading', {name: 'Claim e linee di tono'})).toBeVisible()
  await expect(panel.locator('img')).toHaveCount(2)

  const secondTab = page.getByRole('tab', {name: /La O come arco/})
  await secondTab.click()
  await expect(secondTab).toHaveAttribute('aria-selected', 'true')
  await expect(panel.getByRole('heading', {name: 'La O come arco, il mare come contesto'})).toBeVisible()
  await secondTab.press('ArrowRight')
  await expect(page.getByRole('tab', {name: /La O come percorso/})).toBeFocused()
  await expect(page.getByRole('tab', {name: /La O come percorso/})).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('a[href$="odessa-identita-proposte.pdf"]')).toHaveAttribute('target', '_blank')
})

test('validates and completes the simulated contact form', async ({page}) => {
  await page.goto('/en/contact')
  await page.getByRole('button', {name: 'Send message'}).click()
  await expect(page.getByText('Please review the highlighted fields.')).toBeVisible()
  await expect(page.getByLabel('Name')).toBeFocused()

  await page.getByLabel('Name').fill('Ada Lovelace')
  await page.getByLabel('Email').fill('ada@example.com')
  await page.getByLabel('Message').fill('I would like to learn more about this project.')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', {name: 'Send message'}).click()
  await expect(page.getByTestId('form-success')).toBeVisible()
  await expect(page.getByTestId('form-success')).toContainText('no data has been transmitted')
})

test('stores and restores cookie preference', async ({page}) => {
  await page.goto('/en')
  await expect(page.getByTestId('cookie-banner')).toBeVisible()
  await page.getByRole('button', {name: 'Necessary only'}).click()
  await expect(page.getByTestId('cookie-banner')).toHaveCount(0)
  expect(await page.evaluate(() => window.localStorage.getItem('odessa-consent-v1'))).toBe('necessary')
  await page.reload()
  await expect(page.getByTestId('cookie-banner')).toHaveCount(0)
})

test('mobile menu traps focus, closes with Escape and restores focus', async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only interaction')
  await page.goto('/en')
  const opener = page.getByRole('button', {name: 'Open menu'})
  await opener.click()
  const dialog = page.getByRole('dialog', {name: 'Mobile navigation'})
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', {name: 'Close menu'})).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
})

test('reduced motion navigation reaches and focuses the destination', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'})
  await page.goto('/en')
  await page.getByRole('link', {name: 'The project'}).first().click()
  await expect(page).toHaveURL(/\/en\/project$/)
  await expect(page.locator('main')).toBeFocused()
})

test('does not run a second entry tween on the page content', async ({page}) => {
  await page.goto('/en')
  await page.evaluate(() => {
    const samples: number[] = []
    let frame = 0
    const sample = () => {
      const title = document.querySelector('main h1')
      if (title?.textContent?.includes('Cooperation means designing together')) {
        const reveal = title.closest<HTMLElement>('[data-reveal]')
        const main = document.getElementById('main-content')
        if (reveal && main) {
          samples.push(
            Number.parseFloat(getComputedStyle(main).opacity)
            * Number.parseFloat(getComputedStyle(reveal).opacity),
          )
        }
      }
      if (frame < 420) {
        frame += 1
        window.requestAnimationFrame(sample)
      }
    }
    ;(window as typeof window & {__incomingRevealSamples?: number[]}).__incomingRevealSamples = samples
    window.requestAnimationFrame(sample)
  })

  await page.getByRole('link', {name: 'The project'}).first().click()
  await expect(page).toHaveURL(/\/en\/project$/)

  const overlay = page.getByTestId('transition-overlay')
  expect(await page.locator('main').evaluate((main) => ({
    opacity: main.style.opacity,
    transform: main.style.transform,
  }))).toEqual({opacity: '', transform: ''})

  await expect(overlay).toHaveAttribute('data-transition-state', 'idle')
  await expect(page.getByRole('heading', {name: 'Cooperation means designing together.'})).toBeVisible()

  await expect.poll(() => page.evaluate(
    () => Math.max(
      ...(window as typeof window & {__incomingRevealSamples?: number[]}).__incomingRevealSamples ?? [0],
    ),
  )).toBeGreaterThan(0.98)
  await page.waitForTimeout(300)
  const samples = await page.evaluate(
    () => (window as typeof window & {__incomingRevealSamples?: number[]}).__incomingRevealSamples ?? [],
  )
  const hasVisibleReset = samples.some((sample, index) => (
    index > 0 && samples[index - 1] > 0.2 && sample < samples[index - 1] - 0.2
  ))
  expect(samples.length).toBeGreaterThan(0)
  expect(Math.max(...samples)).toBeGreaterThan(0.95)
  expect(hasVisibleReset).toBeFalsy()
})

test('flows fullscreen blue lines from the center into the destination', async ({page}, testInfo) => {
  if (testInfo.project.name === 'desktop') await page.setViewportSize({width: 1440, height: 1000})
  await page.goto('/en')
  const overlay = page.getByTestId('transition-overlay')
  const lines = overlay.locator('[data-transition-line]')
  await expect(lines).toHaveCount(6)
  await expect(lines.nth(0)).toHaveCSS('clip-path', 'inset(0px 100% 0px 0px)')
  await expect(lines.nth(1)).toHaveCSS('clip-path', 'inset(0px 0px 0px 100%)')
  await expect(lines.nth(0)).toHaveCSS('background-color', 'rgb(37, 156, 211)')
  await expect(overlay.locator('[data-transition-stripe]')).toHaveCount(0)
  await expect(page.getByTestId('transition-diamond')).toHaveCount(0)
  await expect(page.getByTestId('transition-sun')).toHaveCount(0)

  await page.getByRole('link', {name: 'The project'}).first().click()
  await expect(overlay).toBeVisible()
  await expect(overlay).toHaveAttribute('data-transition-state', /building|flowing|navigating/)
  const coverage = await lines.evaluateAll((items) => {
    const rects = items.map((item) => item.getBoundingClientRect())
    return {
      top: rects[0]?.top ?? -1,
      bottom: rects.at(-1)?.bottom ?? -1,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      widths: rects.map((rect) => rect.width),
      gaps: rects.slice(1).map((rect, index) => rect.top - rects[index].bottom),
    }
  })
  expect(Math.abs(coverage.top)).toBeLessThan(1)
  expect(Math.abs(coverage.bottom - coverage.viewportHeight)).toBeLessThan(1)
  expect(coverage.widths.every((width) => Math.abs(width - coverage.viewportWidth) < 1)).toBeTruthy()
  expect(coverage.gaps.every((gap) => Math.abs(gap) < 1)).toBeTruthy()
  const directions = await lines.evaluateAll((items) => items.map((item) => item.getAttribute('data-direction')))
  expect(directions.filter((direction) => direction === 'ltr')).toHaveLength(3)
  expect(directions.filter((direction) => direction === 'rtl')).toHaveLength(3)
  await expect.poll(() => lines.evaluateAll(
    (items) => items.map((item) => item.getAttribute('data-transition-wave')),
  )).toEqual(['2', '1', '0', '0', '1', '2'])
  await expect(page).toHaveURL(/\/en$/)
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Opening page: The project')
  if (testInfo.project.name === 'desktop') {
    await page.waitForTimeout(800)
    await page.screenshot({path: 'test-results/odessa-transition-1440.png'})
  }
  await expect(page).toHaveURL(/\/en\/project$/)
  await expect(page.locator('main')).toBeFocused()
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Page opened: Cooperation means designing together.')
  await expect(overlay).toHaveAttribute('data-transition-state', 'idle')
  const introStyle = await page.locator('main [data-reveal]').first().getAttribute('style')
  expect(introStyle ?? '').not.toMatch(/opacity:\s*0(?:;|$)|translate(?:3d)?\(0px,\s*(?:14|18)px/)
})

test('reveals destination content once without resetting its opacity', async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The full-motion timeline only needs one regression check')
  await page.goto('/en')
  await page.evaluate(() => {
    const state = {samples: [] as number[]}
    ;(window as typeof window & {__odessaRevealSample?: typeof state}).__odessaRevealSample = state
    const end = performance.now() + 5000
    const sample = () => {
      if (window.location.pathname === '/en/project') {
        const main = document.getElementById('main-content')
        const reveal = main?.querySelector<HTMLElement>('[data-reveal]')
        if (main && reveal) {
          const mainOpacity = Number.parseFloat(window.getComputedStyle(main).opacity)
          const revealOpacity = Number.parseFloat(window.getComputedStyle(reveal).opacity)
          state.samples.push(mainOpacity * revealOpacity)
        }
      }
      if (performance.now() < end) window.requestAnimationFrame(sample)
    }
    window.requestAnimationFrame(sample)
  })

  await page.getByRole('link', {name: 'The project'}).first().click()
  await page.waitForTimeout(3500)
  const samples = await page.evaluate(
    () => (window as typeof window & {__odessaRevealSample?: {samples: number[]}}).__odessaRevealSample?.samples ?? [],
  )

  expect(samples.length).toBeGreaterThan(20)
  let peak = 0
  const opacityResets: Array<{peak: number; value: number}> = []
  for (const value of samples) {
    if (value < peak - 0.18) opacityResets.push({peak, value})
    peak = Math.max(peak, value)
  }
  expect(opacityResets).toEqual([])
  expect(samples.at(-1)).toBeGreaterThan(0.98)
})

test('browser back and forward keep focus management intact', async ({page}) => {
  await page.goto('/en')
  await page.getByRole('link', {name: 'Results'}).first().click()
  await expect(page).toHaveURL(/\/en\/results$/)
  await expect(page.locator('main')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL(/\/en$/)
  await expect(page.locator('main')).toBeFocused()
  await page.goForward()
  await expect(page).toHaveURL(/\/en\/results$/)
  await expect(page.locator('main')).toBeFocused()
})

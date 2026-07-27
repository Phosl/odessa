import {expect, test} from '@playwright/test'

const routes = {
  it: ['/it', '/it/progetto', '/it/attivita', '/it/partner', '/it/risultati', '/it/media', '/it/materiali', '/it/contatti', '/it/privacy', '/it/cookie-policy'],
  en: ['/en', '/en/project', '/en/activities', '/en/partners', '/en/results', '/en/media', '/en/materials', '/en/contact', '/en/privacy', '/en/cookie-policy'],
  uk: ['/uk', '/uk/project', '/uk/activities', '/uk/partners', '/uk/results', '/uk/media', '/uk/materials', '/uk/contact', '/uk/privacy', '/uk/cookie-policy'],
} as const

async function findMediaOutsideContainer(page: import('@playwright/test').Page) {
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

test.beforeEach(async ({page}, testInfo) => {
  if (!testInfo.title.includes('stores and restores cookie')) {
    await page.addInitScript(() => window.localStorage.setItem('odessa-consent-v1', 'necessary'))
  }
})

test('renders all 30 localized routes without console errors or horizontal overflow', async ({page}) => {
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
  const densePages = ['/it', '/it/attivita', '/it/media', '/it/materiali', '/it/contatti']

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    for (const path of densePages) {
      await page.goto(path)
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
      expect(overflows, `horizontal overflow at ${path} / ${viewport.width}px`).toBeFalsy()
      expect(await findMediaOutsideContainer(page), `media outside container at ${path} / ${viewport.width}px`).toEqual([])
    }
    await page.goto('/it')
    await page.screenshot({fullPage: true, path: `test-results/odessa-home-${viewport.width}.png`})
    await page.goto('/it/materiali')
    await page.screenshot({fullPage: true, path: `test-results/odessa-materials-${viewport.width}.png`})
  }
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
  await expect(page.locator('[role="img"]').filter({hasText: /IMAGE/})).toHaveCount(8)
  await expect(page.getByText('The Odessa journey begins')).toHaveCount(0)
  await page.getByRole('button', {name: 'Video'}).click()
  await expect(page.getByText('VIDEO 01')).toBeVisible()
  await expect(page.locator('[role="img"]').filter({hasText: /IMAGE/})).toHaveCount(0)
})

test('organizes identity materials into four distinct sections', async ({page}) => {
  await page.goto('/it/materiali')
  await expect(page.getByRole('heading', {name: 'Ipotesi di logo'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Palette e ipotesi di colore'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Elementi grafici e icone'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Claim e linee di tono'})).toBeVisible()
  await expect(page.locator('#logo-concepts img')).toHaveCount(4)
  await expect(page.locator('#graphic-elements img')).toHaveCount(4)
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

test('flows the Odessa lines continuously into the destination', async ({page}, testInfo) => {
  if (testInfo.project.name === 'desktop') await page.setViewportSize({width: 1440, height: 1000})
  await page.goto('/en')
  const overlay = page.getByTestId('transition-overlay')
  const lines = overlay.locator('[data-transition-line]')
  const stripes = overlay.locator('[data-transition-stripe]')
  await expect(lines).toHaveCount(6)
  await expect(lines.nth(0)).toHaveAttribute('data-direction', 'ltr')
  await expect(lines.nth(1)).toHaveAttribute('data-direction', 'rtl')
  await expect(lines.nth(0)).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(stripes.nth(0)).toHaveCSS('background-color', 'rgb(37, 156, 211)')
  await expect(page.getByTestId('transition-diamond')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(page.getByTestId('transition-sun')).toHaveCSS('background-color', 'rgb(248, 233, 20)')

  await page.getByRole('link', {name: 'The project'}).first().click()
  await expect(overlay).toBeVisible()
  await expect(overlay).toHaveAttribute('data-transition-state', 'building')
  await expect(page).toHaveURL(/\/en$/)
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Opening page: The project')
  if (testInfo.project.name === 'desktop') {
    await page.waitForTimeout(470)
    await page.screenshot({path: 'test-results/odessa-transition-1440.png'})
  }
  await expect(page).toHaveURL(/\/en\/project$/)
  await expect(page.locator('main')).toBeFocused()
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Page opened: Cooperation means designing together.')
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

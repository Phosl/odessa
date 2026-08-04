import {expect, test} from '@playwright/test'

const password = process.env.ODESSA_SITE_PASSWORD

test.describe('temporary site access', () => {
  test.skip(!password, 'The access gate is disabled without ODESSA_SITE_PASSWORD')

  test('protects pages and assets, rejects invalid passwords and creates an HTTP-only session', async ({context, page}) => {
    await page.setViewportSize({width: 360, height: 800})

    const protectedAsset = await context.request.get('/icon.svg', {maxRedirects: 0})
    expect(protectedAsset.status()).toBe(307)
    expect(protectedAsset.headers().location).toContain('/access?next=%2Ficon.svg')

    await page.goto('/en/project')
    await expect(page).toHaveURL(/\/access\?next=%2Fen%2Fproject$/)
    await expect(page.getByRole('heading', {name: 'Work in progress.'})).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBeFalsy()

    await page.getByLabel('Password').fill('incorrect-password')
    await page.getByRole('button', {name: 'Enter / Entra'}).click()
    await expect(page.getByRole('alert')).toHaveText('Password not recognized. Try again.')

    await page.getByLabel('Password').fill(password!)
    await page.getByRole('button', {name: 'Enter / Entra'}).click()
    await expect(page).toHaveURL(/\/en\/project$/)
    await expect(page.locator('main h1')).toBeVisible()

    const accessCookie = (await context.cookies()).find(({name}) => name === 'odessa_site_access_v1')
    expect(accessCookie).toMatchObject({httpOnly: true, sameSite: 'Lax'})

    const authorizedAsset = await context.request.get('/icon.svg', {maxRedirects: 0})
    expect(authorizedAsset.status()).toBe(200)
    expect(authorizedAsset.headers()['x-robots-tag']).toContain('noindex')
  })
})

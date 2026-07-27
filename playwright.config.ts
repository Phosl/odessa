import {defineConfig, devices} from '@playwright/test'

const testPort = process.env.ODESSA_TEST_PORT ?? '3000'
const testBaseUrl = `http://127.0.0.1:${testPort}`
const testServerCommand = process.env.ODESSA_TEST_PRODUCTION === '1'
  ? `npm run start -- --port ${testPort}`
  : `npm run dev -- --port ${testPort}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  workers: 2,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: testBaseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {name: 'desktop', use: {...devices['Desktop Chrome'], channel: 'chrome'}},
    {name: 'mobile', use: {...devices['Pixel 7'], channel: 'chrome'}},
  ],
  webServer: {
    command: testServerCommand,
    url: `${testBaseUrl}/it`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})

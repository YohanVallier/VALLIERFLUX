import { defineConfig } from '@playwright/test';

const browsers = ['chromium', 'firefox', 'webkit'] as const;
const widths = [320, 390, 768, 1024, 1440];
const baseURL = 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL,
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: browsers.flatMap((browserName) =>
    widths.map((width) => ({
      name: `${browserName}-${width}`,
      use: { browserName, viewport: { width, height: 900 } },
    })),
  ),
  webServer: {
    command: 'npm run preview',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});

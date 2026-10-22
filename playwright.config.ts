import {
  defineConfig,
  devices,
} from "@playwright/test";

/**
 * End-to-end test configuration for Doodles R Us.
 *
 * Tests run against Astro's production preview server
 * to verify the same static output used for deployment.
 *
 * We cover:
 * - Desktop Chromium
 * - Desktop Firefox
 * - Mobile Chromium
 *
 * Additional browsers can be added as needed.
 */
export default defineConfig({
  testDir: "./tests/e2e",

  // Limit accidental infinite test execution.
  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  // Prevent test-only modifiers from being committed.
  forbidOnly: Boolean(process.env.CI),

  // CI environments may occasionally need one retry.
  retries: process.env.CI ? 1 : 0,

  // Keep CI resource usage manageable.
  workers: process.env.CI ? 2 : undefined,

  reporter: process.env.CI
      ? [["list"], ["html", { open: "never" }]]
      : "list",

  use: {
    baseURL: "http://127.0.0.1:4321",

    // Collect diagnostic information on failures.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox-desktop",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 7"],
      },
    },
  ],

  /**
   * Start the built Astro website automatically.
   *
   * The production build must be generated before
   * running Playwright.
   *
   * Locally, an existing preview server can be reused.
   * CI starts a fresh server for reproducible results.
   */
  webServer: {
    command:
        "npm run preview -- --host 127.0.0.1 --port 4321",

    url: "http://127.0.0.1:4321/fr/",

    reuseExistingServer: !process.env.CI,

    timeout: 30_000,
  },
});
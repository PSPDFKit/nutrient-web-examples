import { defineConfig, devices } from "@playwright/test";

const isolated = ["examples/gatsbyjs", "examples/react"].includes(
  process.env.SERVER_DIR || "",
);
const port = isolated ? process.env.PLAYWRIGHT_PORT || "3000" : "3000";
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.test.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
    command: `cd ${process.env.SERVER_DIR} && npm run start:e2e`,
    // The examples are npm projects, but Corepack applies the root pnpm pin to
    // them and rejects npm when its strict npm shim is enabled.
    env: {
      COREPACK_ENABLE_STRICT: "0",
      ...(isolated ? { PORT: port, BROWSER: "none", CI: "true" } : {}),
    },
    url: baseURL,
    reuseExistingServer: !isolated,
    timeout: isolated ? 180000 : 60000,
  },
});

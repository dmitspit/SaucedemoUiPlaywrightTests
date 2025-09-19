import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 10000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    //baseURL: "https://www.saucedemo.com",
    headless: false,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "qa-chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://www.saucedemo.com",
      },
    },
    {
      name: "prod-chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "",
      },
    },
  ],
});

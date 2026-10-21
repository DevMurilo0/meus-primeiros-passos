import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const cached =
  "/home/murilo/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 2,
  timeout: 40000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    reducedMotion: "reduce",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        (existsSync(cached) ? cached : undefined),
    },
  },
  webServer: {
    command: "npm run dev -- --port 5173",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});

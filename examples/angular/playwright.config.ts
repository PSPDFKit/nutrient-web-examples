import { defineConfig } from "@playwright/test";
import { baseConfig } from "../../playwright-shared";

export default defineConfig({
  ...baseConfig,
  webServer: {
    command: "npm run start",
    url: "http://localhost:4200",
    reuseExistingServer: !process.env.CI,
  },
});

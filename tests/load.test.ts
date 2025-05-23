import { expect, test } from "@playwright/test";

test.describe("Nutrient Web SDK", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should load the viewer", async ({ page }) => {
    await expect(
      page.locator(".PSPDFKit-Root .PSPDFKit-Container"),
    ).toBeVisible();
  });

  test("should not show any errors", async ({ page }) => {
    await expect(page.locator(".PSPDFKit-Error")).not.toBeVisible();
  });
});

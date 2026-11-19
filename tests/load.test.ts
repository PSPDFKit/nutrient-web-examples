import { expect, test } from "@playwright/test";

test.describe("Nutrient Web SDK", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      process.env.SERVER_DIR === "examples/gatsbyjs" ? "/example1/" : "/",
    );
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

test("React serves its bundle without magic HTML", async ({ request }) => {
  test.skip(
    process.env.SERVER_DIR !== "examples/react",
    "React-only development server behavior",
  );
  const bundle = await request.get("/static/js/bundle.js");
  expect(bundle.status()).toBe(200);
  expect(await bundle.text()).toContain("webpack");
  for (const accept of ["application/json", "text/html"]) {
    const response = await request.get("/static/js/bundle", {
      headers: { Accept: accept },
    });
    expect(await response.text()).not.toContain(
      '<script type="text/javascript" charset="utf-8" src="/static/js/bundle.js"></script>',
    );
    if (accept === "text/html")
      expect(await response.text()).toContain('<div id="root"></div>');
    else expect(response.status()).toBe(404);
  }
});

import { expect, test } from "@playwright/test";

test("marca real da escola aparece na homepage, no portal e no favicon", async ({ page, request }) => {
  const asset = await request.get("/assets/brand/logo-mpp.png");
  expect(asset.ok()).toBeTruthy();
  expect(asset.headers()["content-type"]).toContain("image/png");

  await page.goto("/");
  const top = page.locator(".site-header .brand-logo");
  const bottom = page.locator(".site-footer .brand-logo");
  for (const logo of [top, bottom]) {
    await expect(logo).toBeVisible();
    expect(await logo.evaluate(async (el) => {
      const img = el as HTMLImageElement;
      await img.decode();
      return img.naturalWidth > 0 && img.naturalHeight > 0;
    })).toBe(true);
  }

  await page.goto("/portal");
  await expect(page.locator(".entry-art .brand-logo")).toBeVisible();
  await page.goto("/portal/painel");
  await expect(page.locator(".sidebar .brand-logo")).toBeVisible();
  await expect(page.locator("link[rel='icon']")).toHaveAttribute("href", "/assets/brand/logo-mpp.png");
});

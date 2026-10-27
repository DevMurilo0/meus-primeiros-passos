import { test, expect } from '@playwright/test';

test('metadados Open Graph são disponibilizados no HTML servido, sem depender do React', async ({ page, request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBe(true);
  const raw = await response.text();
  const origin = 'https://meus-primeiros-passos.vercel.app/';
  const picture = origin + 'og-meus-primeiros-passos-2026.jpg';
  expect(raw).toContain('<meta property="og:title"');
  expect(raw).toContain('<meta property="og:description"');
  expect(raw).toContain(`<meta property="og:image" content="${picture}"`);
  expect(raw).toContain(`<meta property="og:url" content="${origin}"`);
  await page.goto('/');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', origin);
});

test('a miniatura compartilhada é JPEG real, pública e leve', async ({ page, request }) => {
  const image = await request.get('/og-meus-primeiros-passos-2026.jpg');
  expect(image.ok()).toBe(true);
  expect(image.headers()['content-type']).toContain('image/jpeg');
  expect((await image.body()).byteLength).toBeLessThan(350_000);
  await page.goto('/');
  const dimensions = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/og-meus-primeiros-passos-2026.jpg';
    await img.decode();
    return { width: img.naturalWidth, height: img.naturalHeight };
  });
  expect(dimensions).toEqual({ width: 1200, height: 630 });
});

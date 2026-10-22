import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';

test('capturas da proposta em desktop e mobile', async ({ browser }) => {
  mkdirSync('docs/apresentacao/atualizadas', { recursive: true });
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    await page.goto('http://localhost:5173/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.locator('img').evaluateAll(async els => {
      await Promise.all((els as HTMLImageElement[]).map(async img => { img.loading = 'eager'; await img.decode(); }));
    });
    await page.screenshot({ path: `docs/apresentacao/atualizadas/hero-${width}.png` });
    await page.screenshot({ path: `docs/apresentacao/atualizadas/home-${width}.png`, fullPage: true });
    await page.goto('http://localhost:5173/portal/painel');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.screenshot({ path: `docs/apresentacao/atualizadas/painel-${width}.png`, fullPage: true });
    await page.goto('http://localhost:5173/portal/notas');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.screenshot({ path: `docs/apresentacao/atualizadas/notas-${width}.png`, fullPage: true });
    await page.close();
  }
});

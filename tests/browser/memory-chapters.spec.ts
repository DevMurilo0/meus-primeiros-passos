import { expect, test } from '@playwright/test';

test('álbum de capítulos navega entre duas publicações reais', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#capitulos');
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole('heading', { name: /A infância não cabe/ })).toBeVisible();
  await expect(section.getByRole('heading', { name: /Tem caminho que fica mais bonito/ })).toBeVisible();
  const tabs = section.getByRole('group', { name: 'Escolher capítulo do álbum' });
  await expect(tabs.getByRole('button', { name: /01 Corrida do Dia dos Pais/ })).toHaveAttribute('aria-pressed','true');
  await expect(section.getByRole('link', { name: /Ver publicação original/ })).toHaveAttribute('href','https://www.instagram.com/p/DcHT8nZCUxI/');
  await section.getByRole('button', { name: 'Próximo capítulo' }).click();
  await expect(section.getByRole('heading', { name: /Quando a imaginação chega/ })).toBeVisible();
  await expect(tabs.getByRole('button', { name: /02 Semana Maluca/ })).toHaveAttribute('aria-pressed','true');
  await expect(section.getByRole('link', { name: /Ver publicação original/ })).toHaveAttribute('href','https://www.instagram.com/p/DeeZjW_IN4A/');
  await section.getByRole('button', { name: 'Capítulo anterior' }).click();
  await expect(section.getByRole('heading', { name: /Tem caminho que fica mais bonito/ })).toBeVisible();
  await expect(section.locator('.memory-brand-stamp img')).toHaveAttribute('src','/assets/brand/logo-mpp.png');
  const photos = section.locator('figure img');
  expect(await photos.count()).toBe(2);
  expect(await photos.evaluateAll(async imgs => {
    return (await Promise.all((imgs as HTMLImageElement[]).map(async img => {
      await img.decode();
      return img.naturalWidth > 0;
    }))).every(Boolean);
  })).toBe(true);
});

test('álbum mantém interação acessível com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  const section = page.locator('#capitulos');
  await section.scrollIntoViewIfNeeded();
  await section.getByRole('button', { name: /02 Semana Maluca/ }).click();
  await expect(section.getByRole('heading', { name: /Quando a imaginação chega/ })).toBeVisible();
  expect(await section.locator('.memory-story').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(horizontalOverflow).toBeLessThanOrEqual(1);
});

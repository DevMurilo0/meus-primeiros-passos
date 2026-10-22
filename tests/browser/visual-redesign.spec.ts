import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('galeria filtra, navega por teclado e devolve o foco', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Semana Maluca', exact: true }).click();
  await expect(page.locator('.photo-print')).toHaveCount(3);
  const opener = page.getByRole('button', { name: 'Ampliar: A imaginação ganhou vida' });
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#photo-title')).toHaveText('Criar é uma aventura');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#photo-title')).toHaveText('A imaginação ganhou vida');
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
  await page.getByRole('button', { name: 'Todos os momentos' }).click();
  await expect(page.locator('.photo-print')).toHaveCount(6);
});

test('fotografias locais carregam e movimento pode ser interrompido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Pausar movimento' }).click();
  await expect(page.getByRole('button', { name: 'Retomar movimento' })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('.hero-word').first().evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  await page.locator('img').evaluateAll(async images => {
    const photos = images as HTMLImageElement[];
    for (const image of photos) image.loading = 'eager';
    await Promise.all(photos.map(image => image.decode()));
  });
  // A identidade institucional possui uma imagem própria em /assets/brand/.
  // Validar as fotografias da escola separadamente, sem exigir o mesmo caminho da logo.
  expect(await page.locator('img').evaluateAll(images => {
    const photos = (images as HTMLImageElement[])
      .filter(img => img.currentSrc.includes('/assets/school/'));
    return photos.length > 0 && photos.every(img => img.naturalWidth > 0);
  })).toBe(true);
  await page.getByRole('button', { name: 'Retomar movimento' }).click();
  await page.waitForTimeout(1100);
  expect(await page.evaluate(() => document.getAnimations().some(a => a.playState === 'running'))).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0);
  expect(errors).toEqual([]);
});


test('entrada editorial de fotos ocorre uma vez e preserva movimentos reduzidos', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const story = page.locator('.story-visual');
  const community = page.locator('.community-photo');
  const gallery = page.locator('.photo-print').first();
  const discovery = page.locator('.discovery-picture');
  const explore = page.locator('.explore-card');

  await expect(story).toHaveAttribute('data-photo-motion', 'bloom');
  await expect(community).toHaveAttribute('data-photo-motion', 'swing');
  await expect(gallery).toHaveAttribute('data-photo-motion', 'cascade');
  await expect(discovery).toHaveAttribute('data-photo-motion', 'rise');
  await expect(explore).toHaveAttribute('data-photo-motion', 'lift');

  await story.scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute('data-photo-seen', 'true');
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery).toHaveAttribute('data-photo-seen', 'true');
  await page.getByRole('button', { name: 'Pausar movimento' }).click();
  await expect(page.locator('.motion-paused')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Retomar movimento' }).click();
  await page.waitForTimeout(100);
  expect(await story.evaluate(el => getComputedStyle(el.querySelector('img')!).opacity)).toBe('1');
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0);
});

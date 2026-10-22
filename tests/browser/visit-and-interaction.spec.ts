import { expect, test } from '@playwright/test';

test('rodapé informa autoria, localização, mapa e rota real', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  const developer = footer.getByRole('link', { name: /Desenvolvido por Murilo Gabriel/i });
  await expect(developer).toBeVisible();
  await expect(developer).toHaveAttribute('href', 'https://murilogabriel.com.br');
  await expect(footer.getByText(/Rua São Sebastião, 59/)).toBeVisible();
  const route = footer.getByRole('link', { name: 'Ver localização no Google Maps' });
  await expect(route).toHaveAttribute('href', /google.com\/maps\/search/);
  await expect(footer.getByText('Ilustração de localização · sem escala')).toBeVisible();
  await footer.getByRole('button', { name: 'Explorar mapa interativo' }).click();
  await expect(footer.getByTitle(/Mapa interativo da Escola/)).toHaveAttribute('src', /maps.google.com\/maps/);
  await expect(footer.getByRole('link', { name: /Abrir no Google Maps/ })).toHaveAttribute('href', /google.com\/maps\/search/);
  await expect(page.getByRole('link', { name: 'Onde estamos' })).toBeVisible();
});

test('seletor muda conteúdo e destino, permitindo explorar o portal', async ({ page }) => {
  await page.goto('/');
  const options = page.getByRole('group', { name: 'Escolher caminho para explorar' });
  await expect(options.getByRole('button', { name: 'Conhecer a escola' })).toHaveAttribute('aria-pressed', 'true');
  await options.getByRole('button', { name: 'Ver momentos reais' }).click();
  await expect(page.getByRole('heading', { name: 'Memórias que merecem ser vistas.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Abrir o álbum' })).toHaveAttribute('href', '#momentos');
  await options.getByRole('button', { name: 'Explorar o portal' }).click();
  await expect(page.getByRole('heading', { name: 'Um olhar atento a cada passo.' })).toBeVisible();
  await page.getByRole('link', { name: 'Experimentar o portal' }).click();
  await expect(page.getByRole('heading', { name: 'Portal do Professor' })).toBeVisible();
});

test('menu principal mantém destinos e hover visível', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  const link = nav.getByRole('link', { name: 'Nossa escola' });
  await link.hover();
  await expect(link).toHaveCSS('text-decoration-line', 'none');
  await expect(nav.getByRole('link', { name: 'Onde estamos' })).toHaveAttribute('href', '#localizacao');
});

test('novo rodapé colorido remove o texto antigo e mantém destinos reais', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).not.toContainText('Proposta de experiência digital');
  await expect(footer.getByText(/Todo grande sonho/)).toBeVisible();
  await expect(footer.getByRole('navigation', { name: 'Links do rodapé' }).getByRole('link')).toHaveCount(5);
  await expect(footer.getByRole('link', { name: /Nos acompanhe no Instagram/ })).toHaveAttribute('href', /instagram.com\/escola_meus_primeiros_passos/);
  await expect(footer.locator('.footer-core')).toHaveCSS('background-color','rgb(36, 49, 61)');
});

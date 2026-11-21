import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const ids = ['inicio', 'sobre', 'habilidades', 'projetos', 'servicos', 'experiencia', 'contato'];
const desktopBreakpoint = 72 * 16;

test('página e seções não apresentam violações das regras WCAG selecionadas', async ({ page }) => {
  await page.goto('/');
  const pageResults = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(pageResults.violations).toEqual([]);

  for (const id of ids) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page }).include(`#${id}`).withTags(tags).analyze();
    expect(results.violations, `Violações na seção ${id}`).toEqual([]);
  }
});

test.describe('menu mobile', () => {
  // Header.module.css usa 72rem; a configuração padrão de navegador usa 16px por rem.
  test.skip(
    ({ viewport }) => viewport !== null && viewport.width >= desktopBreakpoint,
    'O disclosure mobile não se aplica ao layout desktop de 72rem ou mais.',
  );

  test('menu aberto não apresenta violações das regras WCAG selecionadas', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('header button[aria-expanded]');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const results = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(results.violations).toEqual([]);
  });
});

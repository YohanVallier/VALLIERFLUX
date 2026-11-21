import { expect, test } from '@playwright/test';

const sections = [
  ['inicio', 'Início'],
  ['sobre', 'Sobre'],
  ['habilidades', 'Habilidades'],
  ['projetos', 'Projetos'],
  ['servicos', 'Serviços'],
  ['experiencia', 'Experiência'],
  ['contato', 'Contato'],
] as const;
const desktopBreakpoint = 72 * 16;

test('navega pelas sete seções sem overflow horizontal', async ({ page }) => {
  const runtimeErrors: string[] = [];
  const hydrationErrors: string[] = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydrat|server rendered|did not match/i.test(message.text())) {
      hydrationErrors.push(message.text());
    }
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Transformando ideias em soluções digitais inteligentes.',
  );

  for (const [id, name] of sections) {
    const toggle = page.locator('header button[aria-expanded]');
    if (await toggle.isVisible()) {
      if ((await toggle.getAttribute('aria-expanded')) === 'false') {
        await toggle.click();
      }
    }
    const link = page.locator(`header nav a[href="#${id}"]`);
    await expect(link).toHaveText(name);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(overflow).toBe(false);
  expect(runtimeErrors).toEqual([]);
  expect(hydrationErrors).toEqual([]);
});

test.describe('menu mobile', () => {
  test.skip(
    ({ viewport }) => viewport !== null && viewport.width >= desktopBreakpoint,
    'O disclosure mobile não se aplica ao layout desktop de 72rem ou mais.',
  );

  test('fecha com Escape e devolve o foco', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('header button[aria-expanded]');
    const nav = page.locator('#primary-navigation');
    await expect(toggle).toBeVisible();
    await expect(nav).toHaveAttribute('inert', '');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(nav).not.toHaveAttribute('inert');
    await page.keyboard.press('Tab');
    await expect(nav.locator('a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await expect(nav).toHaveAttribute('inert', '');
    await page.keyboard.press('Tab');
    expect(await nav.evaluate((element) => element.contains(document.activeElement))).toBe(false);
  });
});

test('conteúdo continua disponível com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const [id] of sections) {
    const section = page.locator(`section#${id}`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section.getByRole('heading').first()).toBeVisible();
  }
});

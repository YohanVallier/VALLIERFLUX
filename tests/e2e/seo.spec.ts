import { expect, test } from '@playwright/test';

// O processo Playwright deve receber a mesma configuração pública usada no build.
function configuredSiteUrl(): string | null {
  const raw = process.env.VITE_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
      throw new Error('invalid_site_url');
    }
    return url.href;
  } catch {
    throw new Error('VITE_SITE_URL de teste deve estar vazio ou conter a URL HTTPS usada no build.');
  }
}

const siteUrl = configuredSiteUrl();

test('HTML distribuído contém conteúdo antes da execução de JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL ?? 'http://127.0.0.1:4173'}/`);
    await expect(page).toHaveTitle(/VALLIER FLUX/);
    await expect(page.locator('html')).toHaveAttribute('lang', /^pt(?:-BR)?$/i);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Transformando ideias em soluções digitais inteligentes.',
    );
    await expect(page.getByRole('banner')).toContainText('VALLIER.FLUX');
    await expect(page.getByRole('contentinfo')).toContainText('VALLIER.FLUX');
    await expect(page.getByRole('contentinfo')).toContainText('CODE. DATA. AUTOMATION.');
    await expect(page.locator('main')).toHaveCount(1);
    for (const id of ['inicio', 'sobre', 'habilidades', 'projetos', 'servicos', 'experiencia', 'contato']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
    for (const name of ['DataForge', 'AutomatedDataPipeline']) {
      await expect(page.locator(`a[href="https://github.com/YohanVallier/${name}"]`).first()).toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test('metadados básicos e favicon estão presentes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /VALLIER/i);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /\S/);
  await expect(page.locator('link[rel~="icon"]').first()).toHaveAttribute('href', /favicon\.svg/);
});

test('preview sem domínio não publica canonical fictício', async ({ page }) => {
  test.skip(siteUrl !== null, 'Cenário exclusivo de build sem domínio configurado.');
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
});

test('build com domínio publica canonical e og:url reais', async ({ page }) => {
  test.skip(siteUrl === null, 'Exige build com domínio HTTPS real configurado.');
  if (siteUrl === null) throw new Error('Domínio de teste ausente.');
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', siteUrl);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', siteUrl);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index/i);
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex/i);
});

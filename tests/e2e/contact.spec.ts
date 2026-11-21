import { expect, test } from '@playwright/test';

function isSubmission(method: string): boolean {
  return !['GET', 'HEAD', 'OPTIONS'].includes(method);
}

test('formulário pendente mantém campos editáveis e não envia mensagens', async ({ page }) => {
  const attemptedSubmissions: string[] = [];
  page.on('request', (request) => {
    if (isSubmission(request.method())) {
      attemptedSubmissions.push(`${request.method()} ${new URL(request.url()).origin}`);
    }
  });
  await page.route('**/*', async (route) => {
    if (isSubmission(route.request().method())) {
      await route.abort('blockedbyclient');
      return;
    }
    await route.continue();
  });
  await page.goto('/#contato');
  const contact = page.locator('section#contato');
  const form = contact.locator('form');
  await expect(contact.getByRole('heading', { name: 'Vamos construir algo interessante?' })).toBeVisible();
  await expect(contact).toContainText(/configura[çc][aã]o|n[aã]o configurado|pendente/i);
  await expect(form.getByRole('button', { name: /enviar/i })).toBeDisabled();

  const name = form.getByLabel(/nome/i);
  const email = form.getByLabel(/e-?mail/i);
  const message = form.getByLabel(/mensagem/i);
  await expect(name).toBeEditable();
  await expect(email).toBeEditable();
  await expect(message).toBeEditable();
  await name.fill('Pessoa de teste');
  await email.fill('teste@example.invalid');
  await message.fill('Mensagem sintética de teste. Não enviar.');
  await email.press('Enter');
  await expect(message).toHaveValue('Mensagem sintética de teste. Não enviar.');
  await expect(form.getByRole('button', { name: /enviar/i })).toBeDisabled();
  expect(attemptedSubmissions).toEqual([]);
});

test('canais diretos apontam para os endereços informados', async ({ page }) => {
  await page.goto('/#contato');
  const contact = page.locator('section#contato');
  const destinations = [
    'mailto:yohanvallier01@gmail.com',
    'https://github.com/YohanVallier',
    'https://www.linkedin.com/in/yohan-vallier-895a342b7/',
  ];
  for (const href of destinations) {
    const link = contact.locator(`a[href="${href}"]`).first();
    await expect(link).toBeVisible();
    if ((await link.getAttribute('target')) === '_blank') {
      const rel = (await link.getAttribute('rel'))?.split(/\s+/) ?? [];
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  }
});

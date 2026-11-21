import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from '../../src/components/layout/Header';

function mockViewport(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

beforeEach(() => {
  mockViewport(false);
});

describe('Header', () => {
  it('abre e fecha o menu mobile com Escape devolvendo o foco', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const nav = document.getElementById('primary-navigation');
    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    expect(nav).toHaveAttribute('inert');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(nav).not.toHaveAttribute('inert');
    await user.keyboard('{Escape}');
    const closed = screen.getByRole('button', { name: 'Abrir menu' });
    expect(closed).toHaveAttribute('aria-expanded', 'false');
    expect(closed).toHaveFocus();
    expect(nav).toHaveAttribute('inert');
  });

  it('renderiza links reais para todas as seções', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    const sections = [
      ['inicio', 'Início'],
      ['sobre', 'Sobre'],
      ['habilidades', 'Habilidades'],
      ['projetos', 'Projetos'],
      ['servicos', 'Serviços'],
      ['experiencia', 'Experiência'],
      ['contato', 'Contato'],
    ] as const;
    for (const [id, label] of sections) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', `#${id}`);
    }
  });

  it('transfere foco para a seção quando ela não tem heading', async () => {
    const user = userEvent.setup();
    render(<><Header /><section id="sobre" aria-label="Destino sem título" /></>);
    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    await user.click(screen.getByRole('link', { name: 'Sobre', exact: true }));
    expect(document.getElementById('sobre')).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('não torna a navegação desktop inerte', () => {
    mockViewport(true);
    render(<Header />);
    expect(document.getElementById('primary-navigation')).not.toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: 'Abrir menu' })).not.toHaveAttribute('aria-controls');
  });
});

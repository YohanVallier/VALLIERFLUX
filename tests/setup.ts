import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

/**
 * Barreira de segurança: fetch nunca acessa a rede real por padrão.
 * Testes de serviço devem usar vi.stubGlobal('fetch', mockFetch) dentro do
 * próprio teste ou beforeEach local, com respostas inteiramente simuladas.
 * Não reinstalar o fetch nativo para testar sucesso, erros ou timeout.
 * A limpeza abaixo remove os stubs após cada teste.
 */
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('Rede real bloqueada nos testes.'))),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

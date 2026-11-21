# Revisão técnica — T09

## Parecer

**Aprovação integral bloqueada; revisão parcial.**

A inspeção estática dos arquivos disponibilizados identificou lacunas na cobertura de acessibilidade, um conflito entre a auditoria SEO e a configuração de preview, além de dependências de revisão não fornecidas. Não há evidência suficiente para aprovar o portfólio, o envio real, a segurança do bundle ou a fidelidade de todo o conteúdo publicado.

Este parecer não afirma que arquivos ausentes do contexto estejam ausentes do repositório. O índice recebido é um inventário descritivo, não substitui acesso ao conteúdo nem comprova execução.

## Método e limites

Foram lidos integralmente: `package.json`, `.env.example`, `vitest.config.ts`, `playwright.config.ts`, `lighthouserc.json`, `tests/setup.ts`, os quatro arquivos `tests/e2e/*.spec.ts` fornecidos e `.github/workflows/ci.yml`. A arquitetura e os contratos recebidos foram usados como critérios.

Não houve acesso a terminal, navegador, checkout, rede, DOM renderizado, bundle ou relatórios de execução. Nenhum comando, teste, consulta GitHub ou envio Formspree foi executado nesta revisão. As reproduções abaixo são procedimentos para confirmação pelo executor, não resultados observados.

Somente `docs/review.md` é proposto nesta entrega. A implementação, os testes e os contratos dos demais agentes permanecem inalterados.

## Severidades

- **Bloqueador:** impede aprovação por falta de evidência essencial ou por violação crítica demonstrada.
- **Alta:** lacuna relevante em requisito obrigatório.
- **Média:** risco ou deficiência com impacto delimitado.

Não foi demonstrado vazamento de dados, envio simulado ou dependência sem uso. Esses itens permanecem sem aprovação porque os arquivos necessários não foram fornecidos.

## Achados

### REV-01 — Evidências insuficientes para auditar contato, publicação e conteúdo

**Severidade:** Bloqueador de aprovação, por indisponibilidade de insumos; não é diagnóstico de defeito nos arquivos não recebidos.

**Arquivos necessários:** `src/services/contact.ts`, `src/lib/contactValidation.ts`, `src/lib/contentValidation.ts`, `scripts/check-content.ts`, `src/components/contact/ContactForm.tsx`, `src/components/sections/Contact.tsx`, `scripts/prerender.ts`, `netlify.toml`, `src/content/*.ts`, componentes consumidores, `package-lock.json`, documentação de privacidade e relatórios de testes/build.

**Evidência:** os arquivos acima não foram disponibilizados integralmente em `related_files`. Parte deles também não aparece no índice recebido. O comando `build` referencia os scripts de validação e pré-renderização, mas seu conteúdo não está disponível para revisão.

**Impacto:** não é possível verificar confirmação positiva do Formspree, timeout de 15 segundos, validação do endpoint, preservação dos campos, ausência de logs pessoais, segurança de URLs, CSP, pré-renderização determinística, ausência de alegações inventadas ou instalação reproduzível. Também não se pode concluir que as dependências estejam utilizadas e livres de problemas conhecidos somente por sua declaração.

**Como confirmar:** fornecer checkout identificado por commit, conteúdo integral dos arquivos e relatórios reais de T03, T06, T07 e T08. Em ambiente apropriado, executar instalação limpa, validações, testes e build; inspecionar HTML, assets, cabeçalhos e tráfego sem enviar mensagens reais.

**Correção sugerida:** completar os insumos de revisão antes de promover T09 como aprovada. Não recriar nem substituir arquivos desconhecidos. Qualquer vazamento, envio fictício ou dependência efetivamente sem uso encontrado na reinspeção deve ser tratado como bloqueio, conforme o contrato.

### REV-02 — A auditoria de acessibilidade ignora violações WCAG de impacto moderate e minor

**Severidade:** Alta.

**Arquivo:** `tests/e2e/accessibility.spec.ts`.

**Evidência:** todas as asserções filtram `violations` para manter somente impactos `serious` e `critical`. Os tags incluem WCAG 2.2 AA, mas o filtro permite que violações retornadas com outros impactos passem sem reprovação.

**Impacto:** uma execução verde não comprova ausência de violações automatizáveis das regras WCAG selecionadas. O impacto atribuído pelo axe não equivale ao nível normativo A ou AA. A meta numérica do Lighthouse também não substitui essa verificação.

**Reprodução sugerida:** executar a suíte contra uma fixture controlada que produza uma violação WCAG selecionada com impacto `moderate`; conferir que ela aparece no resultado do axe e é descartada pela asserção atual.

**Correção sugerida:** submeter todas as violações dos tags selecionados à asserção ou manter exceções explícitas e justificadas por regra, com aprovação. Complementar com inspeção manual de teclado, foco, contraste e leitura por tecnologia assistiva. A alteração pertence ao responsável por QA ou ao corretor autorizado.

### REV-03 — Meta SEO conflita com preview obrigatoriamente noindex

**Severidade:** Média; provável falha de qualidade a confirmar por execução.

**Arquivos:** `.github/workflows/ci.yml`, `lighthouserc.json`, `tests/e2e/seo.spec.ts`.

**Evidência:** a CI força `VITE_SITE_URL` vazio. O teste SEO exige `meta[name="robots"]` com `noindex`, corretamente para preview. A auditoria Lighthouse usa esse mesmo tipo de build e exige SEO >= 0,95. O `noindex` é uma entrada negativa na auditoria de indexabilidade do Lighthouse.

**Impacto:** um preview corretamente protegido pode receber uma falha SEO esperada, comprometendo a interpretação ou a aprovação da meta. A pontuação final depende da versão e das demais auditorias e não foi medida nesta revisão.

**Reprodução sugerida:** executar o build com as variáveis da CI, rodar `npm run audit:lighthouse` e consultar a auditoria `is-crawlable` e a pontuação SEO no relatório JSON.

**Correção sugerida:** separar a validação de preview da auditoria de indexabilidade de produção. Documentar e aprovar eventual exceção restrita ao preview, ou auditar uma publicação com domínio real configurado. Não remover `noindex` do preview nem inventar canonical para elevar a nota. Ajustes de critérios exigem aprovação arquitetural.

### REV-04 — Evidência de testes do contato configurado não foi entregue

**Severidade:** Alta, como lacuna de cobertura demonstrável no material recebido.

**Arquivos:** `tests/e2e/contact.spec.ts`, `vitest.config.ts`, índice de arquivos recebido.

**Evidência:** os testes de contato fornecidos cobrem somente formulário não configurado e canais diretos. Não foram entregues testes unitários ou de componentes para validação e serviço. O Vitest procura `tests/unit/**/*.test.ts` e `tests/components/**/*.test.tsx`, com `passWithNoTests: false`; o índice não lista arquivos nesses caminhos.

**Impacto:** não há evidência fornecida para sucesso confirmado pelo provedor, resposta 2xx sem confirmação, 429, erro de validação, falha de rede, timeout, preservação dos campos ou bloqueio de duplicidade. Se os testes unitários e de componentes realmente não existirem no checkout, o comando Vitest também não aprovará uma suíte vazia.

**Como confirmar:** obter a árvore real de testes, executar `npm run test` e conferir os casos e seus resultados. A ausência no índice, isoladamente, não comprova ausência no disco.

**Correção sugerida:** QA deve fornecer ou implementar testes isolados, com rede simulada, para os estados e limites dos contratos. Sucesso deve exigir HTTP 2xx e confirmação positiva, sem prometer entrega final do e-mail. Nenhuma mensagem real deve ser enviada pelos testes automatizados.

## Observações positivas confirmadas por leitura

- A stack declarada segue React, TypeScript, Vite, CSS independente de frameworks e Lucide; não há dependência direta de backend, analytics ou animação pesada declarada.
- As versões diretas estão fixadas. Isso não substitui o lockfile nem uma análise das dependências transitivas.
- A configuração Playwright define Chromium, Firefox e WebKit em larguras de 320, 390, 768, 1024 e 1440 px, com servidor de preview.
- A suíte de navegação inclui verificações de overflow, erros de runtime, algumas mensagens de hidratação, Escape e foco do menu mobile e conteúdo com movimento reduzido.
- Os testes SEO contemplam HTML sem JavaScript e ausência de canonical fictício no preview.
- O teste de contato não configurado bloqueia métodos de rede diferentes de GET, HEAD e OPTIONS durante esse fluxo. O setup Vitest substitui o fetch global. Essas proteções não equivalem a uma auditoria de todos os canais de rede.
- A CI usa permissão de conteúdo somente leitura, variáveis públicas vazias e armazenamento de relatórios como artefatos, sem configuração explícita de envio de mensagens.
- `.env.example` alerta que variáveis VITE_ são públicas e não devem conter segredos.

## Fidelidade das afirmações e proveniência

Os nomes DataForge e AutomatedDataPipeline, os canais pessoais e os textos exigidos aparecem como expectativas nos testes. Isso não demonstra que o conteúdo renderizado obedeça integralmente às fontes.

Não foram recebidos os módulos de conteúdo, os cards completos ou resultados de consulta dos repositórios. Portanto, esta revisão **não aprova nem acusa** alegações profissionais ou técnicas específicas. A reinspeção deve comparar cada afirmação com o contexto do titular ou evidência real de repositório, preservar campos desconhecidos e rejeitar métricas, tecnologias, funcionalidades, datas ou certificações inferidas.

## Procedimento de reinspeção

Em checkout identificado e ambiente compatível com `.nvmrc`:

1. Conferir `package-lock.json` e executar `npm ci`.
2. Executar `npm run check:spec`, `npm run check:content`, `npm run lint` e `npm run typecheck`.
3. Executar `npm run test` e `npm run build`.
4. Instalar os navegadores de teste e executar `npm run test:e2e` contra o build.
5. Executar Lighthouse, distinguindo o efeito esperado de noindex no preview.
6. Inspecionar manualmente DOM, teclado, foco, zoom, menu e formulário, além de HTML sem JavaScript, hidratação e bundle.
7. Auditar fontes, URLs, cabeçalhos da hospedagem, payloads e ausência de dados pessoais nos logs e artefatos.
8. Registrar commit, ambiente, comandos, códigos de saída, relatórios e pendências. Homologação real do provedor exige autorização separada.

Todos esses passos estão pendentes nesta revisão; nenhum resultado foi presumido.

## Encaminhamento

- **Coordenação:** fornecer os arquivos e evidências de REV-01 antes de aprovação integral.
- **QA/corretor autorizado:** tratar REV-02 e comprovar a cobertura de REV-04.
- **Arquitetura e QA:** resolver e documentar a estratégia de auditoria de REV-03 sem enfraquecer a proteção de preview.
- **Revisor:** reinspecionar as correções e os módulos faltantes sem alterar unilateralmente contratos ou arquivos de outros agentes.

**Conclusão:** relatório parcial entregue; T09 não deve ser considerada integralmente concluída nem utilizada como evidência de validação final do projeto.

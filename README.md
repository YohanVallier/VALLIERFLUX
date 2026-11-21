# VALLIER.FLUX

**CODE. DATA. AUTOMATION.**

Portfólio profissional de **Yohan Vallier**, com foco em Ciência de Dados, Automação e Desenvolvimento Full Stack. A identidade utiliza preto e roxo, composição tecnológica e conteúdo profissional sem métricas ou qualificações presumidas.

## Estado desta documentação

Os comandos abaixo correspondem ao `package.json` fornecido para a tarefa T11. **Instalação, desenvolvimento, testes, build e preview não foram executados nesta etapa.** O resultado das correções de T10 não foi disponibilizado para inspeção.

O índice recebido também não apresenta todos os artefatos necessários à entrega completa, como `package-lock.json`, `scripts/check-content.ts`, `scripts/prerender.ts` e a implementação do contato. Isso não comprova que estejam ausentes do repositório integrado, mas impede confirmar seu funcionamento aqui.

Antes de considerar a entrega executável, o integrador deve conferir esses arquivos no checkout e executar o roteiro de validação deste documento. A configuração de domínio e formulário descrita abaixo é um contrato de publicação; sua implementação precisa ser conferida no código integrado.

## Stack

- React 19, TypeScript em modo estrito e Vite 7.
- CSS Modules e variáveis CSS para a identidade visual.
- Lucide React para ícones de interface.
- Conteúdo local tipado, sem banco de dados ou backend próprio.
- Pré-renderização da página inicial prevista no pipeline de build.
- Formspree como integração externa opcional de contato.
- Vitest, Testing Library, Playwright, axe e Lighthouse CI para verificações.

## Requisitos

- Node.js na versão indicada em `.nvmrc`. O `package.json` aceita `>=22.14.0 <23`.
- npm 10.9.2, indicado em `packageManager`; a faixa aceita é `>=10.9.2 <11`.
- Acesso à rede para instalar dependências e navegadores de teste.
- `package-lock.json` versionado e compatível com `package.json` para usar `npm ci`.

Com nvm instalado:

```sh
nvm install
nvm use
node --version
npm --version
```

Se o lockfile estiver ausente ou incompatível, interrompa a validação reproduzível. O responsável pela integração deve gerá-lo ou corrigi-lo em uma alteração revisada, instalar e validar as dependências e versionar o resultado. Não substitua silenciosamente `npm ci` por `npm install` como evidência de instalação limpa.

## Instalação e desenvolvimento

Na raiz de um checkout completo:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

No Windows, copie `.env.example` para `.env.local` pelo terminal ou gerenciador de arquivos. Mantenha inicialmente as duas variáveis vazias. Abra o endereço informado pelo Vite.

Não versione `.env.local`. Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente.

## Build e preview

```sh
npm run build
npm run preview
```

O comando de build declarado executa, nesta ordem:

1. `npm run typecheck`;
2. `npm run check:content`;
3. `vite build`;
4. `tsx scripts/prerender.ts`.

Qualquer falha precisa ser corrigida antes da publicação; não remova as verificações para produzir um bundle.

O preview está configurado em **http://127.0.0.1:4173**, com porta estrita. Se estiver ocupada, encerre o processo conflitante antes de repetir. Use `Ctrl+C` para parar o servidor.

O diretório de publicação previsto é `dist/`. O servidor de preview é uma ferramenta local de inspeção, não um servidor de produção. Sempre gere um novo build depois de alterar conteúdo ou configuração pública.

## Comandos disponíveis

Estes scripts estão declarados; a disponibilidade de seus arquivos e a execução bem-sucedida ainda devem ser verificadas no checkout integrado.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar desenvolvimento com Vite. |
| `npm run build` | Verificar tipagem e conteúdo, compilar e pré-renderizar. |
| `npm run preview` | Servir localmente o build de produção na porta 4173. |
| `npm run lint` | Executar ESLint sem tolerância a avisos. |
| `npm run typecheck` | Verificar TypeScript sem emitir arquivos. |
| `npm test` | Executar Vitest uma vez. |
| `npm run test:watch` | Executar Vitest em modo interativo. |
| `npm run test:e2e` | Executar a suíte Playwright. |
| `npm run test:a11y` | Executar os testes E2E de acessibilidade. |
| `npm run audit:lighthouse` | Executar Lighthouse CI conforme sua configuração. |
| `npm run check:content` | Verificar a integridade do conteúdo local. |
| `npm run verify:projects` | Consultar fontes GitHub para revisão de projetos. |
| `npm run check:spec` | Verificar se a especificação central contém JSON válido; não é uma auditoria arquitetural. |
| `npm run format:check` | Conferir formatação sem modificar arquivos. |
| `npm run format` | Reformatar arquivos; revisar o diff antes de versionar. |

## Variáveis de ambiente

Copie `.env.example` para `.env.local` no ambiente local. Na hospedagem, configure os mesmos nomes no ambiente de build.

| Variável | Valor permitido e comportamento esperado |
| --- | --- |
| `VITE_SITE_URL` | URL HTTPS pública definitiva. Vazia em previews sem domínio aprovado: devem permanecer `noindex`, sem canonical, `og:url` ou sitemap de produção. |
| `VITE_CONTACT_ENDPOINT` | Endpoint público no formato `https://formspree.io/f/{id}`. Vazio: formulário explicitamente pendente e sem requisições de envio. |

**Toda variável `VITE_` é pública e pode ser incorporada ao JavaScript e ao HTML distribuídos.** O endpoint identifica o formulário e não é um segredo. Não coloque senha, token GitHub, credencial SMTP, chave privada ou chave administrativa nele nem em qualquer outra variável `VITE_`.

Essas configurações são incorporadas durante desenvolvimento/build; alterar somente a configuração da hospedagem sem reconstruir o site não atualiza o bundle já publicado. Não adicione flags de ativação não previstas nos contratos.

## Personalização

Mantenha textos em português brasileiro e identificadores de código em inglês. Consulte os contratos em `src/types/content.ts` e a fonte central `docs/project-spec.json` antes de alterar a estrutura dos dados.

| Conteúdo | Local principal |
| --- | --- |
| Marca, slogan, textos principais, navegação, links e SEO | `src/content/site.ts` |
| Apresentação pessoal, experiência e formação | `src/content/profile.ts` |
| Categorias e tecnologias | `src/content/skills.ts` |
| Serviços | `src/content/services.ts` |
| Projetos e evidências | `src/content/projects.ts` |
| Paleta, tipografia, espaçamento e tokens | `src/styles/tokens.css` |
| Base visual, foco, âncoras e redução de movimento | `src/styles/global.css` |
| Aparência específica dos componentes | Arquivos `*.module.css` próximos aos componentes |
| Favicon VF | `public/favicon.svg` |

Edite os campos existentes nos módulos; esta documentação não pressupõe nomes de exports além dos arquivos fornecidos no índice.

### Perfil, experiência e formação

Use apenas informações confirmadas pelo titular. Não invente cargo, período, instituição, diploma, certificações ou resultados numéricos. A experiência na Farmoquímica e a formação atual em Ciência de Dados foram declaradas pelo usuário, sem verificação independente.

Itens sem datas não devem sugerir uma sequência cronológica comprovada. Preserve evidências e observações sobre a origem das informações.

### Links e navegação

Atualize e-mail, GitHub e LinkedIn no módulo central. Preserve `mailto:` para o e-mail e HTTPS nos canais externos. Links abertos em nova aba devem usar `rel="noopener noreferrer"`.

Os IDs compartilhados de seção são `inicio`, `sobre`, `habilidades`, `projetos`, `servicos`, `experiencia` e `contato`. Alterações devem manter correspondência entre os elementos, os links e os testes; não use `href="#"` como substituto de destino real.

### Projetos

Adicione projetos à coleção local seguindo o contrato `Project`. Não é necessário reconstruir a seção para cada novo item.

Cada item contém identificador único, nome, URL HTTPS do repositório, estado de verificação, resumo, problema, tecnologias, funcionalidades, diferencial técnico e evidências. Campos desconhecidos devem permanecer `null` ou listas vazias, conforme o contrato. Os estados permitidos são `pending`, `partial`, `verified` e `unavailable`.

Fontes iniciais:

- https://github.com/YohanVallier/DataForge
- https://github.com/YohanVallier/AutomatedDataPipeline

O nome do repositório não comprova stack, funcionalidades ou resultados. Até revisão efetiva, preserve os avisos públicos de detalhes técnicos em verificação.

Para apoiar uma atualização:

```sh
npm run verify:projects
```

Consulte `scripts/verify-projects.ts` e `docs/content-sources.md` para o comportamento e os artefatos da consulta. O script apoia revisão humana; não equivale à aprovação automática de alegações. Se necessário, forneça `GITHUB_TOKEN` somente ao ambiente do processo local ou ao secret do job autorizado, nunca como variável `VITE_` nem como conteúdo versionado.

Registre URL, commit consultado, arquivos que sustentam cada informação e momento real da consulta. Em erro de rede ou limite da API, não apague evidências válidas nem substitua lacunas por inferências.

### Serviços, habilidades e identidade

Mantenha os dez serviços solicitados, com descrições objetivas e sem garantias de resultado. Habilidades não devem ganhar percentuais arbitrários, rankings ou títulos de especialista. Desenvolvimento mobile permanece área de interesse e desenvolvimento, sem atribuição de stack não informada.

A marca tipográfica é **VALLIER.FLUX**, o símbolo é **VF** e o slogan é **CODE. DATA. AUTOMATION.** Ao mudar a identidade, revise também título, favicon, footer, imagem social e testes correspondentes.

Altere a paleta pelos tokens existentes, não por substituições indiscriminadas nos componentes. Depois, confira contraste, foco, estados desabilitados, telas pequenas e `prefers-reduced-motion`. Consulte `docs/design-system.md`. Novas fontes e imagens exigem otimização e licença compatível; não suponha que assets previstos na arquitetura já tenham sido entregues.

## Formulário e Formspree

### Sem configuração

Mantenha `VITE_CONTACT_ENDPOINT=` vazio enquanto a integração não estiver aprovada. O comportamento exigido é:

- aviso persistente de configuração pendente;
- campos ainda validáveis;
- botão de envio desabilitado e nenhuma chamada ao provedor;
- e-mail e redes sociais disponíveis como alternativas reais.

Não apresente um sucesso simulado, não trate `mailto:` como envio automático e não inclua um endpoint de demonstração no ambiente publicado.

### Ativação controlada

1. Obtenha aprovação do responsável pelo site para usar o Formspree.
2. Crie o formulário na conta correta e confirme o destinatário no provedor.
3. Configure os controles antispam, limites e notificações disponíveis no plano adotado. O bloqueio de cliques repetidos no navegador não substitui proteção no provedor.
4. Revise retenção, acesso e exclusão de mensagens, termos e política de privacidade do serviço. Se o provedor exigir CAPTCHA, scripts ou mudanças de CSP, submeta a integração à revisão antes de habilitar.
5. Disponibilize um aviso de privacidade acessível antes do envio. Ele deve informar que **nome, e-mail e mensagem serão processados pelo Formspree**, além da finalidade e do contato do responsável. Não afirme ausência de terceiros.
6. Confira no código integrado a validação do endpoint e os estados de envio. A existência de uma URL não comprova que a conta, o destinatário ou a privacidade estejam aprovados.
7. Em um ambiente restrito de homologação, configure o endpoint real e gere um build. O teste precisa ser autorizado e utilizar dados mínimos não sensíveis.
8. Confirme a resposta positiva do provedor, o processamento no painel e o recebimento no destinatário configurado. Registre apenas resultado técnico e autorização, sem copiar dados pessoais para logs ou relatórios.
9. Somente após a homologação, configure `VITE_CONTACT_ENDPOINT` no build de produção, reconstrua e publique.

Não há flag adicional de aprovação definida: a autorização para publicar o endpoint é um controle operacional do responsável pela implantação. Se a homologação falhar, mantenha a produção sem endpoint.

### Contrato a conferir na integração

- Nome após trim: de 2 a 100 caracteres.
- E-mail após trim: formato válido e até 254 caracteres.
- Mensagem após trim: de 10 a 5000 caracteres.
- POST JSON com `Accept: application/json` e `Content-Type: application/json`.
- Timeout de 15 segundos; sem repetição automática.
- Sucesso somente com HTTP 2xx **e confirmação positiva do provedor**.
- A mensagem de sucesso confirma recebimento para processamento, não entrega garantida à caixa postal.
- Erros de validação, rede, HTTP 429 e timeout devem ser legíveis, preservar os campos e oferecer o e-mail como alternativa.
- Mensagens de erro não devem reproduzir payload bruto nem registrar nome, e-mail ou mensagem.

Testes automatizados devem interceptar a rede e usar respostas simuladas. Uma suíte aprovada não substitui a homologação real autorizada.

## Validação em checkout limpo

Execute em uma cópia limpa com todos os arquivos integrados. Para os testes de preview não configurado, mantenha as duas variáveis vazias e verifique se o ambiente do terminal ou da hospedagem não injeta valores diferentes.

```sh
npm ci
cp .env.example .env.local
npm run check:spec
npm run check:content
npm run lint
npm run typecheck
npm run format:check
npm test
npm run build
npx playwright install --with-deps
npm run test:e2e
npm run test:a11y
npm run audit:lighthouse
```

A instalação de dependências de sistema dos navegadores pode exigir permissões adicionais. Confira as configurações de Playwright e Lighthouse antes de executar para saber se iniciam o preview automaticamente e evitar conflito na porta 4173.

Abra também o build manualmente:

```sh
npm run preview
```

Em `http://127.0.0.1:4173`, confira:

- seções, textos oficiais, links reais e navegação por âncoras;
- menu mobile, fechamento, recuperação de foco e teclado;
- layouts a partir de 320 px, sem rolagem horizontal;
- ausência de erros no console e de divergências de hidratação;
- estados de foco e redução de movimento;
- formulário pendente sem requisições e canais diretos disponíveis;
- conteúdo principal no HTML servido mesmo sem JavaScript;
- título, descrição, favicon e metadados de preview sem domínio fictício.

Metas arquiteturais: Lighthouse Performance >= 90; Accessibility, Best Practices e SEO >= 95; JavaScript de entrada <= 120 KiB gzip. Essas são metas, não resultados já obtidos. Audite também o deployment real: preview local não comprova HTTPS, cabeçalhos ou configuração do provedor de hospedagem.

Registre em `docs/validation-report.md`, pela etapa responsável, commit, sistema operacional, versões de Node/npm, comandos, códigos de saída, resultados, limitações e configuração pública aplicada. Não inclua segredos ou dados de mensagens. Não marque testes como aprovados apenas por inspeção de código.

## Publicação

A aplicação foi arquitetada para hospedagem estática HTTPS, com Netlify como referência. Não requer servidor de API próprio. Caso a configuração de hospedagem ainda não esteja integrada, ela deve ser criada e revisada na tarefa responsável; este README não substitui `netlify.toml` ou as regras da plataforma.

Configuração básica esperada:

- instalar dependências com lockfile, via `npm ci`;
- usar a versão de Node de `.nvmrc` e npm compatível;
- executar `npm run build`;
- publicar somente `dist/`;
- definir variáveis públicas no ambiente de build;
- não publicar `.env.local`, tokens ou relatórios contendo informações privadas.

### Checklist de publicação

- [ ] T10 integrado e achados aprovados resolvidos ou explicitamente aceitos.
- [ ] Lockfile e todos os arquivos usados pelos scripts presentes e versionados.
- [ ] Instalação limpa, lint, tipagem, testes, build e preview verificados.
- [ ] Todas as seções, serviços, marca e canais de contato conferidos.
- [ ] Projetos revisados contra fontes ou com pendências claramente visíveis.
- [ ] Informações profissionais sem cargo, datas, instituição ou métricas inventadas.
- [ ] Domínio HTTPS aprovado configurado em `VITE_SITE_URL` apenas para produção indexável.
- [ ] Previews sem domínio definitivo continuam `noindex`, sem canonical ou URLs sociais fictícias.
- [ ] HTML pré-renderizado, canonical, `og:url`, imagem social e sitemap, quando aplicáveis, conferidos no resultado efetivamente publicado.
- [ ] Favicon, fontes e demais assets presentes, licenciados e sem respostas 404.
- [ ] CSP revisada e testada, com conexões limitadas ao próprio domínio e ao Formspree quando necessário; `frame-ancestors 'none'` aplicado.
- [ ] `Referrer-Policy` e `X-Content-Type-Options` configurados; HSTS adotado somente após confirmar domínio e HTTPS.
- [ ] Menu, teclado, foco, contraste, redução de movimento e responsividade aprovados.
- [ ] Formulário permanece desabilitado ou possui aprovação, antispam, aviso de privacidade e homologação real registrados.
- [ ] Auditorias executadas no build de produção, com desvios documentados e aprovados.
- [ ] Nenhum segredo ou dado de formulário presente no bundle, repositório ou relatórios.

Para reverter uma publicação, use um artefato ou commit anteriormente validado. Se houver problema no formulário, remova o endpoint do ambiente de build, reconstrua e publique, preservando os canais diretos.

## Pendências e limites conhecidos

### Informações e aprovações externas

- Domínio público definitivo e hospedagem final ainda não informados no contexto recebido.
- Cargo formal e período da experiência na Farmoquímica não informados.
- Instituição, modalidade e período da formação em Ciência de Dados não informados.
- Cursos e certificações adicionais não fornecidos.
- Funcionalidades, tecnologias, problema resolvido e diferencial de DataForge e AutomatedDataPipeline dependem de consulta e revisão das fontes; não foram verificados nesta etapa.
- Aprovação do Formspree, conta, destinatário, endpoint, política de retenção e homologação não comprovados nesta etapa.

### Evidências técnicas ainda necessárias

- Resultado de T10 e conferência dos arquivos de integração ausentes do material desta tarefa.
- Correspondência efetiva entre leitura de ambiente, validação, serviço HTTP e pré-renderização.
- Instalação em checkout limpo, abertura do preview, resultados de testes e auditorias.
- Verificação dos assets e dos cabeçalhos na hospedagem real.

A ausência desses dados não autoriza inventar conteúdo nem afirmar que a publicação está pronta. Mantenha os avisos apropriados até a resolução.

## Referências internas

- `docs/project-spec.json`: arquitetura e contratos centrais.
- `docs/content-sources.md`: proveniência e atualização de conteúdo.
- `docs/design-system.md`: identidade e componentes visuais.
- `docs/review.md`: revisão e achados registrados.
- `docs/validation-report.md`: evidências finais, quando entregue pela etapa de validação.

Mudanças de stack, contratos ou responsabilidades exigem aprovação arquitetural antes da implementação.

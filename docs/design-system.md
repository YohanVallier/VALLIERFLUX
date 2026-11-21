# VALLIER.FLUX — sistema visual

## Estado da entrega T04

Implementação textual parcial. Não houve execução de comandos, instalação, navegador, rasterização, download de fonte, medição automatizada ou teste visual neste ambiente. A presença dos arquivos nesta resposta não é evidência de execução no repositório.

Pendências que impedem concluir T04:

- Adquirir Space Grotesk variável em WOFF2 latino e a licença OFL correspondente à distribuição efetivamente obtida.
- Criar e inspecionar `public/og-cover.png`, PNG real de 1200 × 630 px.
- Substituir a construção geométrica React por asset oficial ou Simple Icons com proveniência, conforme a arquitetura; completar o conjunto selecionado de ícones oficiais. O fallback genérico é deliberadamente identificável como genérico.
- Executar os testes e a inspeção de contraste nas combinações renderizadas.

Não foram criados arquivos binários fictícios, conteúdo base64 em caminhos WOFF2/PNG ou licença de fonte sem distribuição correspondente. A fonte de sistema mantém a interface utilizável até a aquisição. Nenhuma mudança arquitetural foi aplicada para tornar esse fallback definitivo.

## Identidade

Marca tipográfica: **VALLIER.FLUX**. Símbolo: **VF**. Slogan: **CODE. DATA. AUTOMATION.** Nome pessoal: Yohan Vallier.

O ponto da marca pode receber `--color-primary-light`; o restante deve usar `--color-text`. Não fragmentar o nome acessível da marca com ícones ou pontuação oculta. O favicon usa caminhos vetoriais, não texto dependente de fonte.

A capa social pendente deve usar fundo #08060D, marca em destaque, nome Yohan Vallier e slogan. Manter conteúdo dentro de uma margem segura mínima de 64 px; usar roxo como acento e não inserir métricas, senioridade ou resultados fictícios.

## Integração dos estilos

Importar `src/styles/global.css` uma única vez no ponto de entrada da aplicação; esse arquivo importa os tokens. Usar os mesmos estilos na geração de produção. Não importar globais em cada componente.

O trabalho de composição deverá inserir o favicon no HTML ou pipeline de metadados: `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`. O template não foi modificado porque não pertence aos arquivos autorizados desta tarefa.

Quando fonte e licença estiverem disponíveis, adicionar ao global:

```css
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
}
```

Confirmar antes que o arquivo adquirido realmente oferece esse intervalo de pesos e cobre os caracteres portugueses usados. Não fazer requisições a provedores de fontes no navegador.

## Tokens e composição

- Fundo #08060D; superfícies #100C18 e #1A1426.
- Primário #8B5CF6 para decoração; primário intenso #7C3AED para CTA com texto claro; primário claro #A78BFA para links.
- Texto #F5F3FF; texto secundário #A1A1AA.
- Borda decorativa #3C3150 não deve ser a única indicação de um controle. Controles usam #8B7B9E.
- Foco #C4B5FD, contorno de 3 px e afastamento de 4 px. Não remover outline.
- Erros #FDA4AF e sucesso #86EFAC sempre acompanhados de mensagem textual.
- Container máximo 75rem, equivalente a 1200 px na base padrão. Margens entre 1 e 2rem; espaçamento de seção entre 4 e 7rem.
- Títulos com fallback system-ui; corpo system-ui; rótulos técnicos ui-monospace.
- Alvos de interação de pelo menos 44 × 44 px por padrão.

Os módulos usam superfícies opacas para previsibilidade de contraste. Halos, grid e gradientes são tokens opcionais para as seções, não overlays globais. Não aplicar opacidade ao texto nem usar roxo principal como fundo de texto pequeno claro sem medição.

## APIs das primitivas

Todos os componentes possuem exports nomeados. Props nativas e refs são encaminhadas por Button, Container e IconLink usando o suporte de ref como prop do React 19.

### Button

- `variant`: primary, secondary ou ghost; padrão primary.
- Sem `href`: elemento button, `type="button"` por padrão; aceita disabled nativo.
- Com `href`: elemento a; não aceita disabled. Uma navegação indisponível deve ser omitida ou apresentada como texto explicativo, não como link falsamente desabilitado.
- Passar `type="submit"` explicitamente no formulário.
- Links com target _blank recebem rel noopener noreferrer.
- Conteúdo deve oferecer nome acessível; ícones inseridos pelo consumidor devem ser decorativos quando houver texto.
- Não há spinner contínuo nem estado de sucesso simulado. Feedback de rede pertence ao formulário.

Exemplos: `<Button href="#projetos">Explorar projetos</Button>` e `<Button type="submit" disabled={isSubmitting}>Enviar mensagem</Button>`.

### Container

Div de layout sem landmark, aceita atributos nativos e className. Envolver com section, main, header ou footer conforme a semântica. Não cria IDs nem esconde overflow horizontal para mascarar defeitos.

### SectionHeading

Props: id obrigatório para o h2, title, eyebrow opcional, description opcional, align start ou center e className. Usar `<section id="sobre" aria-labelledby="sobre-title">` e `<SectionHeading id="sobre-title" title="Sobre mim" />`. Não usar no Hero: o h1 pertence ao Hero. Não reutilizar IDs.

### IconLink

Props: href, label não vazio e icon do tipo LucideIcon; demais atributos nativos de link são encaminhados. label fornece aria-label e title. O ícone é decorativo. Não usar este componente para ações: usar Button.

Button e IconLink não substituem validação de conteúdo. O consumidor deve fornecer âncoras existentes, URLs HTTPS ou mailto revisados; nunca URLs arbitrárias recebidas de usuários, protocolos javascript ou links sem destino. Evitar abrir novas abas sem necessidade.

### TechIcon

Props: iconId string ou null, name textual obrigatório e className. Renderiza sempre o nome, portanto o consumidor não deve duplicá-lo fora do componente. `react` seleciona o SVG local; todos os demais identificadores, inclusive desconhecidos, usam Braces de Lucide. Esse fallback não representa um logotipo oficial e não indica domínio profissional.

Os conteúdos de skills e services não foram disponibilizados integralmente em related_files nesta tarefa; não foi presumida sua lista concreta de iconId. Antes de ampliar o mapa, conferir esses módulos. O caminho SVG é fixo, nunca construído a partir de entrada dinâmica.

## Estados e movimento

Hover é melhoria apenas para dispositivos com hover. Foco permanece visível independentemente de hover. Botões possuem active e disabled distintos; links não têm estado disabled artificial. Bordas permanecem no modo forced-colors.

Transições são breves e não ocultam conteúdo. A preferência reduced-motion elimina deslocamento active e reduz duração de transições e animações; navegação deixa de usar scroll suave. Não existe animação de entrada que deixe conteúdo invisível antes da hidratação.

## Assets e licenças

- favicon.svg: símbolo vetorial original do projeto, sem recursos externos ou dependência de fontes.
- react.svg: construção geométrica local identificável, não apresentada como download oficial. Código sob MIT em `src/assets/tech-icons/LICENSE.txt`; direitos de marca não são concedidos por essa licença.
- Lucide: dependência já declarada, distribuição sob ISC. Preservar avisos da distribuição instalada; não houve inspeção local do pacote nesta entrega.
- Space Grotesk: planejada sob SIL OFL; obter e preservar o texto exato junto do binário antes de distribuir. Não há OFL.txt nesta entrega porque a fonte ainda não foi adquirida.

## Verificações de aceitação pendentes

A seleção de cores é uma decisão de implementação, não uma certificação de contraste. Medir a versão renderizada usando luminância relativa sRGB e a razão `(LmaisClara + 0.05) / (LmaisEscura + 0.05)`.

Matriz mínima:

| Primeiro plano | Fundo | Critério |
| --- | --- | --- |
| text, muted, primary-light | background, surface, surface-raised | 4.5:1 para texto normal |
| text | primary-strong e hover #6D28D9 | 4.5:1 |
| control-border | surface e background | 3:1 quando necessário à identificação |
| focus | fundos reais adjacentes | 3:1 |
| danger, success | superfícies reais de mensagens | 4.5:1 |

Não afirmar aprovação com base apenas nos valores hexadecimais. Validar também sobreposições, estilos de seções, zoom e estados finais.

Checklist para deepseek_qa, proprietário dos testes:

1. Renderizar todas as variantes de Button como ação e navegação; verificar tag, type, disabled nativo, encaminhamento de ref e rel em nova aba.
2. Percorrer por Tab e Shift+Tab, confirmar outline não recortado; ativar links com Enter e botões com Enter/Espaço. Disabled não pode executar ação.
3. Verificar IconLink por nome acessível e TechIcon por nome textual, sem anúncio duplicado do desenho. Testar iconId null e desconhecido.
4. Inspecionar favicon em 16, 32 e 64 px e React SVG em 24 px; confirmar ausência de erros de carregamento e recursos externos.
5. Conferir 320, 375, 768 e 1440 px, texto longo, zoom 200% e ausência de rolagem horizontal.
6. Emular prefers-reduced-motion e forced-colors; verificar conteúdo disponível antes e depois da hidratação.
7. Medir contraste da matriz e rodar axe no build composto. Inspecionar skip-link com destino real no main e compensação do header.
8. Após aquisição dos assets, validar WOFF2, licença e PNG 1200 × 630; verificar ausência de 404 e mudanças de layout da fonte.

Comandos previstos após completar a composição e as configurações: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` e `npm run test:a11y`. Nenhum foi executado nesta entrega. Não foram criados testes em tests/** para preservar a propriedade de deepseek_qa.

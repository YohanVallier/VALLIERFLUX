# Conteúdo e fontes — VALLIER.FLUX

## Estado desta entrega — T02

Conteúdo local preparado a partir do contexto fornecido pelo titular e dos contratos de T01. Esta interação não disponibiliza ferramentas de terminal ou rede. Nenhum comando, consulta HTTP, teste automatizado, build ou verificação de links foi executado. A ausência de consulta não significa que os repositórios estejam inacessíveis.

Os dois projetos permanecem em `pending`. Nenhum timestamp ou commit foi inventado. Esta etapa está parcialmente concluída até a execução da coleta e das verificações exigidas.

## Mapa de proveniência

| Arquivo | Fonte | Conteúdo permitido | Lacunas |
| --- | --- | --- | --- |
| `src/content/site.ts` | Contexto do titular e marca final | VALLIER.FLUX, VF, slogan, nome, textos exatos, e-mail, GitHub e LinkedIn | Domínio, provedor homologado e endpoint não informados |
| `src/content/profile.ts` | Declaração do titular | Experiência administrativa e de produtividade na Farmoquímica; processos, dados, Python, Pandas, OpenPyXL, planilhas e indicadores; formação atual em Ciência de Dados | Cargo formal, períodos, instituição e modalidade ausentes |
| `src/content/skills.ts` | Contexto e agrupamento arquitetural | Seis categorias, competências solicitadas e interesse em mobile | Não há comprovação independente de proficiência ou certificações |
| `src/content/services.ts` | Lista solicitada pelo titular | Dez possibilidades de prestação de serviços | Não comprova histórico de entregas nem garante resultados |
| `src/content/projects.ts` | Nomes e URLs fornecidos | DataForge e AutomatedDataPipeline, links e estado pendente | Todo o conteúdo técnico aguarda revisão |

Informações pessoais são declarações do titular, não verificações independentes. `checkedAt: null` é intencional. Datas de implementação do portfólio não devem ser convertidas em datas de experiência profissional.

## Relatório inicial dos projetos

| Projeto | Fonte indicada | Consulta realizada | Estado local | Campos técnicos |
| --- | --- | --- | --- | --- |
| DataForge | https://github.com/YohanVallier/DataForge | Não | pending | Descrição, problema e diferencial: null; tecnologias e funcionalidades: arrays vazios |
| AutomatedDataPipeline | https://github.com/YohanVallier/AutomatedDataPipeline | Não | pending | Descrição, problema e diferencial: null; tecnologias e funcionalidades: arrays vazios |

Não foram consultados README, código, manifestos, commits ou árvores. Não é possível afirmar que os repositórios sejam públicos, acessíveis ou implementem alguma tecnologia. Os nomes não sustentam inferências sobre funcionalidades.

Os cards devem consumir `projectVerificationLabels` e manter os links reais. Não usar uma descrição genérica como se fosse informação confirmada do projeto. Não preencher listas vazias apenas para completar o layout.

## Consulta reproduzível

Após instalar as dependências de T01 no Node fixado em `.nvmrc`:

```sh
npm run verify:projects
```

Para preservar um relatório local sem misturar o cabeçalho do npm com o JSON:

```sh
mkdir -p .tmp
npm run --silent verify:projects > .tmp/project-source-report.json
```

Esses comandos são instruções, não evidências de execução nesta entrega. Mesmo com código de saída 1, o script normalmente produz relatório JSON de coleta incompleta. Não substituir evidências anteriores por esse artefato sem revisão. O script não grava nem altera arquivos de conteúdo ou documentação.

`GITHUB_TOKEN` é opcional e deve ser fornecido exclusivamente pelo ambiente do processo local ou por segredo de CI. Não usar prefixo `VITE_`, não passar token na linha de comando e não versioná-lo. O script não carrega arquivos `.env` automaticamente.

### Comportamento previsto do coletor

1. Restringe a coleta aos dois repositórios aprovados.
2. Consulta metadados e resolve a branch padrão para um commit.
3. Consulta README, árvore e até doze manifestos nessa revisão imutável.
4. Registra URL da API, momento de cada tentativa, status HTTP, commit, caminhos, blob SHA e conteúdo textual dos arquivos efetivamente coletados.
5. Limita resposta JSON a 2 MiB e cada arquivo textual a 128 KiB. Arquivos não coletados ou árvores truncadas ficam como pendências.
6. Não segue redirecionamentos autenticados. Repositório movido exige revisão manual da fonte.
7. Trata 404 sem concluir que o repositório não existe: pode estar privado ou inacessível para a credencial utilizada.
8. Trata 429 e 403 com cabeçalhos de limite como limitação de API. Qualquer 403 encerra novas consultas, inclusive possíveis limites secundários sem cabeçalhos. Registra os cabeçalhos de espera disponíveis e não faz tentativas automáticas.
9. Interrompe chamadas após 15 segundos por requisição e categoriza falhas sem emitir payload bruto de erro ou credenciais.
10. Emite JSON em stdout; não altera `projects.ts`. `collected_for_review` significa coleta, nunca aprovação editorial ou projeto verificado.

A saída inclui conteúdo remoto não confiável. Ler como texto; não executar scripts, instalar dependências dos repositórios nem renderizar README como HTML. Revisar dados sensíveis antes de compartilhar ou versionar trechos do relatório.

## Revisão humana antes da publicação

Para cada afirmação proposta, registrar no relatório editorial: campo de destino, afirmação, URL imutável, commit, caminho e trecho ou linhas que a sustentam. Distinguir documentação de implementação efetiva.

- Um manifesto comprova uma dependência declarada, não uma funcionalidade implementada.
- Um README pode descrever uma intenção; conferir código antes de atribuir recursos ao projeto.
- Problema e diferencial técnico só devem ser publicados quando sustentados pela fonte.
- Consultar manualmente os arquivos de implementação apontados pela árvore; o coletor automático limita-se ao README e manifestos.
- Converter a evidência aprovada em `Evidence` com `sourceType: repository`, URL imutável, commit e horário real da consulta correspondente.
- Manter campos desconhecidos vazios e estado `partial` quando a evidência for insuficiente.
- Usar `unavailable` somente após tentativa real de acesso, não por ausência de ferramenta nesta interação.
- Não apagar fatos previamente verificados por causa de uma falha transitória; registrar a falha e revisar a atualidade das afirmações.

## Integração com os demais agentes

- `siteConfig` contém a baseline com `siteUrl` e `contactEndpoint` nulos. A integração de configuração e pré-renderização deve aplicar valores públicos de ambiente somente após validação, de forma consistente entre build e hidratação. Este arquivo não duplica o validador de outro agente.
- Endpoint válido não comprova autorização, destinatário, privacidade revisada ou homologação. Manter o envio desabilitado até cumprir o contrato de ativação.
- Canonical, `og:url` e URLs sociais absolutas dependem do domínio real. Preview sem configuração continua noindex.
- Exportações principais: `siteConfig`, `brandIdentity`, `navigation`, `hero`, `socialLinks`, `contact`, `seo`, `profile`, `timeline`, `experienceContent`, `skillCategories`, `skillsContent`, `services`, `servicesContent`, `projects`, `projectsContent` e `projectVerificationLabels`.
- Os identificadores de serviços devem ser mapeados para ícones Lucide pela apresentação; não importar componentes no conteúdo.
- Os identificadores de tecnologias são chaves para assets locais futuros. Oferecer fallback genérico enquanto o asset não existir; manter o texto visível e não carregar SVG remoto.
- A ordem dos itens de experiência é editorial e não estabelece cronologia. Não transformar títulos descritivos em cargo formal.
- Não foram criadas instituições, certificações, percentuais de domínio ou métricas profissionais.

## Verificações e evidências

Revisão textual nesta resposta: os textos do Hero e contato foram preservados; os dez serviços e seis categorias foram incluídos; os projetos não contêm stack ou funcionalidades atribuídas; cargo, datas e instituição permanecem ausentes. Isso não substitui testes executáveis.

Pendente para QA, respeitando a propriedade de `tests/**`:

- Testar `requestGithub` com fetch injetado: 404, 429, 403 com limite zero, 403 com Retry-After, 403 sem cabeçalhos, 500, falha de rede, JSON inválido e resposta acima do limite.
- Testar `collectRepository`: fixação do mesmo commit no README/árvore/manifestos, README 404, árvore truncada, manifesto inválido, limite de arquivos e interrupção de chamadas após limitação.
- Confirmar que o runner não consulta o segundo repositório após 403/429 e que não há tentativas automáticas.
- Confirmar ausência de token no relatório e preservação dos arquivos publicados.
- Executar consulta real autorizada; registrar resultado e limitações sem provocar limites de API deliberadamente.
- Executar lint, typecheck, validação de conteúdo e testes quando os respectivos módulos estiverem integrados.

Nenhum teste automatizado foi criado fora do escopo autorizado de T02. Não há evidência de execução dos cenários acima.

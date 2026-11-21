import type { Evidence } from '../types/content';

/** Identificadores correspondem a ícones nomeados do Lucide, não a marcas. */
interface ServiceContent {
  id: string;
  title: string;
  description: string;
  iconId:
    | 'chart-no-axes-combined'
    | 'file-code'
    | 'workflow'
    | 'scan-search'
    | 'plug'
    | 'app-window'
    | 'panels-top-left'
    | 'wrench'
    | 'component'
    | 'list-checks';
}

export const servicesContent = {
  title: 'Soluções que podemos desenvolver',
  description:
    'Possibilidades de colaboração em dados, automação e desenvolvimento web. Cada projeto começa pela avaliação das necessidades e definição de um escopo compatível.',
};

export const services: ServiceContent[] = [
  {
    id: 'data-analysis',
    title: 'Análise e tratamento de dados',
    description:
      'Organização, limpeza e consolidação de dados para apoiar análises, planilhas e indicadores.',
    iconId: 'chart-no-axes-combined',
  },
  {
    id: 'python-automation',
    title: 'Automação de processos com Python',
    description:
      'Scripts para tarefas repetitivas e manipulação de arquivos e planilhas, conforme o processo definido.',
    iconId: 'file-code',
  },
  {
    id: 'n8n-workflows',
    title: 'Automação de workflows com n8n',
    description:
      'Fluxos para conectar etapas e ferramentas de trabalho a partir das integrações disponíveis.',
    iconId: 'workflow',
  },
  {
    id: 'web-scraping',
    title: 'Web Scraping',
    description:
      'Coleta e organização de informações públicas, respeitando permissões, termos e limites das fontes.',
    iconId: 'scan-search',
  },
  {
    id: 'api-integration',
    title: 'Integração de APIs',
    description:
      'Conexão entre aplicações e serviços para troca de dados conforme seus contratos e permissões.',
    iconId: 'plug',
  },
  {
    id: 'web-applications',
    title: 'Desenvolvimento de aplicações web',
    description:
      'Construção de funcionalidades e aplicações web com escopo definido em conjunto.',
    iconId: 'app-window',
  },
  {
    id: 'landing-pages',
    title: 'Criação de Landing Pages',
    description:
      'Páginas responsivas para apresentar uma marca, serviço ou projeto com clareza.',
    iconId: 'panels-top-left',
  },
  {
    id: 'wordpress',
    title: 'Desenvolvimento e ajustes WordPress',
    description:
      'Ajustes, manutenção e desenvolvimento de páginas em sites WordPress conforme a estrutura existente.',
    iconId: 'wrench',
  },
  {
    id: 'react-interfaces',
    title: 'Desenvolvimento de interfaces React',
    description:
      'Interfaces com componentes reutilizáveis, atenção à responsividade e integração com APIs.',
    iconId: 'component',
  },
  {
    id: 'software-qa',
    title: 'Testes e QA',
    description:
      'Verificação de funcionalidades, identificação de problemas e registro de cenários de teste.',
    iconId: 'list-checks',
  },
];

export const servicesEvidence: Evidence[] = [
  {
    sourceType: 'user_context',
    sourceUrl: null,
    commitSha: null,
    checkedAt: null,
    notes:
      'Os dez serviços foram solicitados pelo titular. Descrições delimitam possibilidades de trabalho, não comprovam projetos anteriores nem prometem resultados, prazos ou especialização.',
  },
];

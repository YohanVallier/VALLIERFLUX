import type { Evidence, SkillCategory } from '../types/content';

export const skillsContent = {
  title: 'Habilidades em construção contínua',
  description:
    'Tecnologias, ferramentas e áreas de atuação e aprendizado. A apresentação não representa níveis de domínio ou especialização.',
  additionalInterest: 'Desenvolvimento mobile como área de interesse e desenvolvimento.',
};

/**
 * iconId identifica um asset local a ser entregue pela camada visual.
 * null solicita ícone genérico. Sempre preservar o nome textual e oferecer
 * fallback para identificadores ainda sem asset; não buscar SVGs em runtime.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'data-science',
    title: 'Data Science',
    items: [
      { name: 'Python', iconId: 'python' },
      { name: 'Pandas', iconId: 'pandas' },
      { name: 'NumPy', iconId: 'numpy' },
      { name: 'Análise e tratamento de dados', iconId: null },
      { name: 'Power BI', iconId: null },
      { name: 'Excel', iconId: null },
      { name: 'Machine Learning em desenvolvimento', iconId: null },
    ],
  },
  {
    id: 'automation-integrations',
    title: 'Automação e Integrações',
    items: [
      { name: 'Automação de processos', iconId: null },
      { name: 'n8n', iconId: 'n8n' },
      { name: 'Web Scraping', iconId: null },
      { name: 'Integrações e APIs', iconId: null },
      { name: 'OpenPyXL', iconId: null },
    ],
  },
  {
    id: 'frontend',
    title: 'Front-end',
    items: [
      { name: 'HTML', iconId: 'html5' },
      { name: 'CSS', iconId: 'css' },
      { name: 'JavaScript', iconId: 'javascript' },
      { name: 'React', iconId: 'react' },
      { name: 'Landing Pages', iconId: null },
    ],
  },
  {
    id: 'backend',
    title: 'Back-end',
    items: [
      { name: 'Python', iconId: 'python' },
      { name: 'PHP', iconId: 'php' },
      { name: 'Desenvolvimento de aplicações web', iconId: null },
    ],
  },
  {
    id: 'databases',
    title: 'Banco de Dados',
    items: [
      { name: 'SQL', iconId: null },
      { name: 'Bancos de dados', iconId: null },
    ],
  },
  {
    id: 'tools-infrastructure',
    title: 'Ferramentas e Infraestrutura',
    items: [
      { name: 'Git', iconId: 'git' },
      { name: 'GitHub', iconId: 'github' },
      { name: 'WordPress', iconId: 'wordpress' },
      { name: 'Infraestrutura básica', iconId: null },
      { name: 'QA e testes de software', iconId: null },
    ],
  },
];

export const skillsEvidence: Evidence[] = [
  {
    sourceType: 'user_context',
    sourceUrl: null,
    commitSha: null,
    checkedAt: null,
    notes:
      'Competências e agrupamento fornecidos no contexto e na arquitetura. Não representam certificação, senioridade ou domínio avançado. Nenhuma tecnologia específica foi associada ao interesse em desenvolvimento mobile.',
  },
];

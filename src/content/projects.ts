import type { Project } from '../types/content';

export const projectsContent = {
  title: 'Projetos em destaque',
  description:
    'Repositórios indicados por Yohan Vallier. Os detalhes técnicos ainda aguardam consulta às fontes e revisão das evidências.',
  repositoryActionLabel: 'Acessar GitHub',
  unknownFieldLabel: 'Não informado nas fontes revisadas.',
};

export const projectVerificationLabels: Record<Project['verificationStatus'], string> = {
  pending: 'Detalhes técnicos em verificação. As fontes ainda não foram consultadas.',
  partial: 'Verificação parcial. Alguns detalhes técnicos ainda aguardam confirmação.',
  verified: 'Detalhes técnicos revisados com base nas fontes registradas.',
  unavailable: 'Fonte inacessível na última consulta. Detalhes técnicos não confirmados.',
};

/**
 * Não atualizar automaticamente com a saída do script de consulta.
 * Cada afirmação exige revisão humana e referência a arquivo/commit.
 */
export const projects: Project[] = [
  {
    id: 'dataforge',
    name: 'DataForge',
    repositoryUrl: 'https://github.com/YohanVallier/DataForge',
    verificationStatus: 'pending',
    summary: null,
    problem: null,
    technologies: [],
    features: [],
    technicalHighlight: null,
    evidence: [
      {
        sourceType: 'user_context',
        sourceUrl: 'https://github.com/YohanVallier/DataForge',
        commitSha: null,
        checkedAt: null,
        notes:
          'Nome e URL fornecidos pelo titular. Nenhuma consulta de rede foi realizada nesta entrega; existência pública, conteúdo, stack e funcionalidades ainda não foram confirmados.',
      },
    ],
  },
  {
    id: 'automated-data-pipeline',
    name: 'AutomatedDataPipeline',
    repositoryUrl: 'https://github.com/YohanVallier/AutomatedDataPipeline',
    verificationStatus: 'pending',
    summary: null,
    problem: null,
    technologies: [],
    features: [],
    technicalHighlight: null,
    evidence: [
      {
        sourceType: 'user_context',
        sourceUrl: 'https://github.com/YohanVallier/AutomatedDataPipeline',
        commitSha: null,
        checkedAt: null,
        notes:
          'Nome e URL fornecidos pelo titular. Nenhuma consulta de rede foi realizada nesta entrega; existência pública, conteúdo, stack e funcionalidades ainda não foram confirmados.',
      },
    ],
  },
];

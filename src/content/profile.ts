import type { Evidence, TimelineEntry } from '../types/content';

export const profileEvidence: Evidence[] = [
  {
    sourceType: 'user_context',
    sourceUrl: null,
    commitSha: null,
    checkedAt: null,
    notes:
      'Informações declaradas pelo titular: experiência na Farmoquímica em atividades administrativas e de produtividade, uso de Python, Pandas e OpenPyXL e formação atual em Ciência de Dados. Não foram informados cargo formal, períodos, instituição, modalidade ou certificações. Não houve verificação independente.',
  },
];

export const profile = {
  title: 'Tecnologia para resolver problemas reais.',
  paragraphs: [
    'Sou Yohan Vallier, um profissional em desenvolvimento com interesse em Ciência de Dados, automação e desenvolvimento de software. Busco conectar análise, código e aplicações para resolver problemas reais.',
    'Na Farmoquímica, minha experiência na área administrativa e de produtividade envolve organização e automatização de processos, manipulação e consolidação de dados, desenvolvimento de scripts com Python e utilização de Pandas e OpenPyXL, além da criação e atualização de planilhas e indicadores.',
    'Minha formação atual em Ciência de Dados acompanha o interesse por análise de dados, integrações e desenvolvimento de aplicações. Desenvolvimento mobile também é uma área de interesse e aprendizado.',
  ],
  evidence: profileEvidence,
};

/** A ordem editorial não representa uma sequência cronológica. */
export const timeline: TimelineEntry[] = [
  {
    id: 'farmoquimica',
    kind: 'work',
    title: 'Experiência na área administrativa e de produtividade',
    organization: 'Farmoquímica',
    dateLabel: null,
    description:
      'Organização e automatização de processos; manipulação e consolidação de dados; scripts com Python; uso de Pandas e OpenPyXL; criação e atualização de planilhas e indicadores.',
    evidence: profileEvidence,
  },
  {
    id: 'data-science-education',
    kind: 'education',
    title: 'Formação atual em Ciência de Dados',
    organization: null,
    dateLabel: null,
    description:
      'Formação em andamento em Ciência de Dados, conforme informação do titular. Instituição, modalidade e período não informados.',
    evidence: profileEvidence,
  },
];

export const experienceContent = {
  title: 'Experiência e formação',
  description:
    'Vivências profissionais e formação em desenvolvimento. Os itens são apresentados sem ordem cronológica, pois os períodos não foram informados.',
};

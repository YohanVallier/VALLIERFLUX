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
  title: 'Sobre Mim',
  paragraphs: [
    'Sou estudante de Ciência de Dados e desenvolvedor interessado em tecnologia, inovação e desenvolvimento de soluções digitais. Tenho experiência prática com Python, análise e tratamento de dados, automação de processos e integração de ferramentas, buscando transformar tarefas complexas e repetitivas em soluções mais eficientes.',
    'Também atuo na área de desenvolvimento Full Stack, trabalhando com tecnologias como JavaScript, HTML, CSS, React e PHP, além de explorar o desenvolvimento mobile, criação de Landing Pages e personalização e manutenção de sites WordPress.',
    'Tenho interesse também em infraestrutura básica, configuração de ambientes, controle de versão e QA (Quality Assurance), incluindo testes, identificação de falhas e validação de funcionalidades.',
    'Gosto de aprender novas tecnologias, desenvolver projetos práticos e explorar diferentes abordagens para resolver problemas. Busco constantemente aprimorar minhas habilidades técnicas, aplicando boas práticas de programação, organização de código e documentação.',
    'Meu objetivo é desenvolver soluções completas, unindo desenvolvimento de software, ciência de dados e automação para atender às necessidades de empresas e profissionais.',
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
    description: [
      'Atuei na Farmoquímica como Jovem Aprendiz, entre 2022 e 2024, na área de Produtividade, prestando suporte a atividades administrativas e operacionais. Durante esse período, trabalhei com organização, atualização, padronização e consolidação de planilhas no Excel, envolvendo informações de pagamentos, processos demissionais, transferências de setor, movimentações internas e controle de estoque e quantidades de medicamentos.',
      'Também tive contato com automação e análise de dados, utilizando Python, Pandas e OpenPyXL para desenvolver scripts que facilitavam a limpeza, o cruzamento e o processamento de informações, reduzindo tarefas manuais e contribuindo para a organização dos dados e dos indicadores internos.',
      'Essa experiência me permitiu desenvolver habilidades em análise de dados, automação de processos, Excel, Python e resolução de problemas, além de proporcionar uma visão prática de como a tecnologia pode otimizar rotinas administrativas e melhorar a eficiência operacional de uma empresa.',
    ].join('\n\n'),
    evidence: profileEvidence,
  },
  {
    id: 'data-science-education',
    kind: 'education',
    title: 'Formação atual em Ciência de Dados',
    organization: null,
    dateLabel: null,
    description: [
      'Atualmente, estou cursando Ciência de Dados na UNINTER, desenvolvendo conhecimentos voltados à análise, processamento e interpretação de dados, estatística e utilização de tecnologias para transformar informações em insights relevantes.',
      'A formação está alinhada ao meu interesse por programação, análise de dados, automação e desenvolvimento de soluções tecnológicas. Busco ampliar minha capacidade de trabalhar com grandes volumes de informações, identificar padrões, construir análises e utilizar dados como suporte à tomada de decisões.',
    ].join('\n\n'),
    evidence: profileEvidence,
  },
];

export const experienceContent = {
  title: 'Experiência e formação',
  description:
    'Vivências profissionais e formação em desenvolvimento. Os itens são apresentados sem ordem cronológica, pois os períodos não foram informados.',
};

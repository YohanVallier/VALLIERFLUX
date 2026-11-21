import type { Evidence, SectionId, SiteConfig } from '../types/content';

/**
 * Baseline pública e determinística, compartilhável com a pré-renderização.
 * URLs de ambiente devem ser validadas pela camada de configuração antes
 * de substituir os valores null. Não habilitar envio apenas por haver URL.
 */
export const siteConfig: SiteConfig = {
  brand: 'VALLIER.FLUX',
  owner: 'Yohan Vallier',
  slogan: 'CODE. DATA. AUTOMATION.',
  email: 'yohanvallier01@gmail.com',
  github: 'https://github.com/YohanVallier',
  linkedin: 'https://www.linkedin.com/in/yohan-vallier-895a342b7/',
  siteUrl: null,
  contactEndpoint: null,
};

export const brandIdentity = {
  officialName: 'VALLIER FLUX',
  wordmark: siteConfig.brand,
  symbol: 'VF',
  slogan: siteConfig.slogan,
};

export const navigation: Array<{ id: SectionId; label: string }> = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'contato', label: 'Contato' },
];

export const hero = {
  owner: siteConfig.owner,
  professionalIdentity: 'Ciência de Dados · Automação · Desenvolvimento Full Stack',
  title: 'Transformando ideias em soluções digitais inteligentes.',
  subtitle:
    'Desenvolvedor com foco em Ciência de Dados, Automação e Full Stack. Construindo aplicações, otimizando processos e transformando dados em soluções.',
  primaryAction: { label: 'Explorar projetos', href: '#projetos' },
  secondaryAction: { label: 'Entrar em contato', href: '#contato' },
};

export const socialLinks = [
  { id: 'github', label: 'GitHub de Yohan Vallier', href: siteConfig.github },
  { id: 'linkedin', label: 'LinkedIn de Yohan Vallier', href: siteConfig.linkedin },
];

export const contact = {
  title: 'Vamos construir algo interessante?',
  description:
    'Estou aberto a oportunidades, projetos freelance e colaborações envolvendo tecnologia, desenvolvimento e automação.',
  emailAction: {
    label: 'Enviar e-mail',
    href: `mailto:${siteConfig.email}`,
  },
  unconfiguredNotice:
    'O envio pelo formulário ainda depende de configuração. Nenhuma mensagem será enviada por ele enquanto essa integração estiver pendente. Você pode entrar em contato por e-mail, GitHub ou LinkedIn.',
  providerNotice:
    'Quando o envio estiver habilitado, seu nome, e-mail e mensagem serão processados pelo Formspree, um provedor externo, para atender ao seu contato. Consulte o aviso de privacidade antes de enviar.',
  successNotice:
    'O provedor confirmou o recebimento da mensagem para processamento. Isso não garante a entrega na caixa de e-mail.',
};

export const seo = {
  title: 'VALLIER FLUX | Yohan Vallier',
  description:
    'VALLIER.FLUX — portfólio de Yohan Vallier. Ciência de Dados, Automação e Desenvolvimento Full Stack. CODE. DATA. AUTOMATION.',
  socialDescription:
    'Ciência de Dados, Automação e Desenvolvimento Full Stack. CODE. DATA. AUTOMATION.',
  language: 'pt-BR',
  locale: 'pt_BR',
  themeColor: '#08060D',
  socialImagePath: '/og-cover.png',
  socialImageAlt: 'VALLIER.FLUX — Yohan Vallier — CODE. DATA. AUTOMATION.',
};

export const siteEvidence: Evidence[] = [
  {
    sourceType: 'user_context',
    sourceUrl: null,
    commitSha: null,
    checkedAt: null,
    notes:
      'Marca final, identidade pessoal, textos do Hero e contato e URLs fornecidos pelo titular no contexto do projeto. Domínio e endpoint de formulário não fornecidos. Sem verificação independente dos canais.',
  },
];

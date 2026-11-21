export interface ContentValidationInput {
  siteConfig: {
    brand: string;
    owner: string;
    slogan: string;
    email: string;
    github: string;
    linkedin: string;
    siteUrl: string | null;
    contactEndpoint: string | null;
  };
  navigation: readonly { id: string; label: string }[];
  socialLinks: readonly { id: string; href: string; label: string }[];
  profile: {
    title: string;
    paragraphs: readonly string[];
  };
  timeline: readonly {
    id: string;
    kind: 'work' | 'education';
    title: string;
    organization: string | null;
    dateLabel: string | null;
    description: string;
  }[];
  skillCategories: readonly {
    id: string;
    title: string;
    items: readonly { name: string; iconId: string | null }[];
  }[];
  services: readonly {
    id: string;
    iconId: string;
    title: string;
    description: string;
  }[];
  projects: readonly {
    id: string;
    name: string;
    repositoryUrl: string;
    verificationStatus: 'pending' | 'partial' | 'verified' | 'unavailable';
    summary: string | null;
    problem: string | null;
    technologies: readonly string[];
    features: readonly string[];
    technicalHighlight: string | null;
  }[];
}

const REQUIRED_SECTIONS = [
  'inicio',
  'sobre',
  'habilidades',
  'projetos',
  'servicos',
  'experiencia',
  'contato',
] as const;

const REQUIRED_SKILL_CATEGORIES = [
  'Data Science',
  'Automação e Integrações',
  'Front-end',
  'Back-end',
  'Banco de Dados',
  'Ferramentas e Infraestrutura',
] as const;

const ALLOWED_SERVICE_ICONS = new Set([
  'chart-no-axes-combined',
  'file-code',
  'workflow',
  'scan-search',
  'plug',
  'app-window',
  'panels-top-left',
  'wrench',
  'component',
  'list-checks',
]);

function isHttpsUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:'\;
  } catch {
    return false;
  }
}

export function validateSiteContent(input: ContentValidationInput): string[] {
  const errors: string[] = [];
  const {
    siteConfig,
    navigation,
    socialLinks,
    profile,
    timeline,
    skillCategories,
    services,
    projects,
  } = input;

  if (siteConfig.brand !== 'VALLIER.FLUX') {
    errors.push('siteConfig.brand deve ser VALLIER.FLUX.');
  }
  if (siteConfig.slogan !== 'CODE. DATA. AUTOMATION.') {
    errors.push('siteConfig.slogan deve ser CODE. DATA. AUTOMATION.');
  }
  if (!siteConfig.owner.trim()) {
    errors.push('siteConfig.owner não pode ser vazio.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email)) {
    errors.push('siteConfig.email inválido.');
  }
  if (!isHttpsUrl(siteConfig.github) || !isHttpsUrl(siteConfig.linkedin)) {
    errors.push('siteConfig.github e siteConfig.linkedin devem usar HTTPS.');
  }
  if (siteConfig.siteUrl !== null && !isHttpsUrl(siteConfig.siteUrl)) {
    errors.push('siteConfig.siteUrl deve ser null ou URL HTTPS válida.');
  }
  if (
    siteConfig.contactEndpoint !== null &&
    !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9_-]+$/.test(siteConfig.contactEndpoint)
  ) {
    errors.push('siteConfig.contactEndpoint deve ser null ou endpoint Formspree HTTPS.');
  }

  const navIds = navigation.map((item) => item.id);
  for (const requiredId of REQUIRED_SECTIONS) {
    if (!navIds.includes(requiredId)) {
      errors.push(`Seção obrigatória ausente na navegação: ${requiredId}.`);
    }
  }
  if (new Set(navIds).size !== navIds.length) {
    errors.push('IDs duplicados em navigation.');
  }

  for (const link of socialLinks) {
    if (!isHttpsUrl(link.href)) {
      errors.push(`Link social inválido (exige HTTPS): ${link.id}.`);
    }
  }

  if (!profile.title.trim() || profile.paragraphs.length === 0) {
    errors.push('profile deve conter título e ao menos um parágrafo.');
  }

  for (const entry of timeline) {
    if (!entry.title.trim() || !entry.description.trim()) {
      errors.push(`Entrada incompleta na timeline: ${entry.id}.`);
    }
  }

  const categoryTitles = skillCategories.map((cat) => cat.title);
  for (const requiredCategory of REQUIRED_SKILL_CATEGORIES) {
    if (!categoryTitles.includes(requiredCategory)) {
      errors.push(`Categoria de habilidade obrigatória ausente: ${requiredCategory}.`);
    }
  }
  for (const category of skillCategories) {
    if (category.items.length === 0) {
      errors.push(`Categoria sem itens: ${category.title}.`);
    }
  }

  if (services.length !== 10) {
    errors.push(`services deve conter exatamente 10 itens (encontrados: ${services.length}).`);
  }
  const serviceIds = new Set<string>();
  for (const service of services) {
    if (serviceIds.has(service.id)) {
      errors.push(`ID de serviço duplicado: ${service.id}.`);
    }
    serviceIds.add(service.id);
    if (!ALLOWED_SERVICE_ICONS.has(service.iconId)) {
      errors.push(`iconId inválido em serviço ${service.id}: ${service.iconId}.`);
    }
  }

  const projectIds = new Set<string>();
  for (const project of projects) {
    if (projectIds.has(project.id)) {
      errors.push(`ID de projeto duplicado: ${project.id}.`);
    }
    projectIds.add(project.id);
    if (!isHttpsUrl(project.repositoryUrl)) {
      errors.push(`URL de repositório inválida em ${project.id}.`);
    }
    if (project.verificationStatus === 'pending') {
      if (
        project.summary !== null ||
        project.problem !== null ||
        project.technicalHighlight !== null ||
        project.technologies.length > 0 ||
        project.features.length > 0
      ) {
        errors.push(`Projeto pending não pode conter campos técnicos preenchidos: ${project.id}.`);
      }
    }
  }

  return errors;
}

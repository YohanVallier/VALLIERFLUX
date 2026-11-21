/**
 * Contratos compartilhados definidos em docs/project-spec.json.
 * Alterações de campos ou semântica exigem aprovação arquitetural.
 */

export type SectionId =
  | 'inicio'
  | 'sobre'
  | 'habilidades'
  | 'projetos'
  | 'servicos'
  | 'experiencia'
  | 'contato';

/**
 * Informações pessoais recebidas são declarações do titular.
 * checkedAt só pode registrar uma consulta efetivamente realizada.
 * URLs, timestamps e commits devem ser validados em runtime.
 */
export interface Evidence {
  sourceType: 'user_context' | 'repository';
  sourceUrl: string | null;
  commitSha: string | null;
  checkedAt: string | null;
  notes: string;
}

/**
 * Campos desconhecidos permanecem null ou arrays vazios.
 * A presença de um repositório não comprova stack ou funcionalidades.
 * repositoryUrl deve ser HTTPS; id deve ser único no conjunto de projetos.
 */
export interface Project {
  id: string;
  name: string;
  repositoryUrl: string;
  verificationStatus: 'pending' | 'partial' | 'verified' | 'unavailable';
  summary: string | null;
  problem: string | null;
  technologies: string[];
  features: string[];
  technicalHighlight: string | null;
  evidence: Evidence[];
}

/** Sem percentuais, rankings ou senioridade presumida. */
export interface SkillCategory {
  id: string;
  title:
    | 'Data Science'
    | 'Automação e Integrações'
    | 'Front-end'
    | 'Back-end'
    | 'Banco de Dados'
    | 'Ferramentas e Infraestrutura';
  items: Array<{
    name: string;
    iconId: string | null;
  }>;
}

/**
 * A ausência de datas não autoriza inferir ordem cronológica.
 * Instituição, cargo e período não informados devem continuar ausentes.
 */
export interface TimelineEntry {
  id: string;
  kind: 'work' | 'education';
  title: string;
  organization: string | null;
  dateLabel: string | null;
  description: string;
  evidence: Evidence[];
}

/**
 * Configuração pública; nunca incluir segredos.
 * siteUrl exige URL HTTPS pública validada, ou null para previews noindex.
 * contactEndpoint exige https://formspree.io/f/{id} validado, ou null.
 * Endpoint válido, isoladamente, não comprova homologação ou autorização.
 */
export interface SiteConfig {
  brand: 'VALLIER.FLUX';
  owner: string;
  slogan: 'CODE. DATA. AUTOMATION.';
  email: string;
  github: string;
  linkedin: string;
  siteUrl: string | null;
  contactEndpoint: string | null;
}

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
    verificationStatus: 'verified',
    summary:
      'Framework modular em Python (DataScienceProfessionalPortfolio, v0.1.0) para construção de projetos de Ciência de Dados, reunindo blocos reutilizáveis para manipulação tabular, pipelines ETL, modelagem de machine learning, visualização de dados e CLI.',
    problem:
      'Elimina a repetição de código estrutural (boilerplate) e a fragmentação comum em notebooks monolíticos de Ciência de Dados, oferecendo uma base padronizada, testável e pronta para produção com separação de responsabilidades, configuração centralizada e logs estruturados.',
    technologies: [
      'Python 3.10+',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'XGBoost',
      'SQLAlchemy',
      'PyArrow (Parquet)',
      'OpenPyXL',
      'Matplotlib',
      'Seaborn',
      'Plotly',
      'Streamlit',
      'Requests',
      'BeautifulSoup4',
      'Pytest',
      'GitHub Actions',
    ],
    features: [
      'Leitura, escrita e limpeza não destrutiva de dados em CSV e Parquet com normalização de colunas, remoção de duplicatas e 6 estratégias para valores ausentes',
      'Treinamento e avaliação de modelos de classificação e regressão (regressão linear/logística, árvore de decisão, random forest e gradient boosting) com validação cruzada k-fold',
      'Pipelines ETL encadeáveis (extract, transform, load) entre CSV, Parquet e bancos SQL via SQLAlchemy com suporte a etapas customizadas e métricas de execução',
      'Geração de gráficos estáticos (Matplotlib/Seaborn) e interativos (Plotly) para distribuições, matrizes de correlação, categorias agregadas e séries temporais',
      'Interface de linha de comando (data-science-portfolio info e etl) e configuração imutável via variáveis de ambiente sem credenciais hardcoded',
    ],
    technicalHighlight:
      'Arquitetura modular desacoplada (core, services, visualization, utils e config) em layout src/ (PEP 621), com tipagem estática, configuração imutável via dataclass(frozen=True), logging estruturado sem print e CI no GitHub Actions testando Python 3.10, 3.11 e 3.12.',
    evidence: [
      {
        sourceType: 'repository',
        sourceUrl: 'https://github.com/YohanVallier/DataForge',
        commitSha: null,
        checkedAt: '2026-11-21T09:46:00Z',
        notes:
          'Informações verificadas diretamente a partir do código-fonte, pyproject.toml, README.md, config/settings.py e workflows CI do repositório.',
      },
    ],
  },
  {
    id: 'automated-data-pipeline',
    name: 'AutomatedDataPipeline',
    repositoryUrl: 'https://github.com/YohanVallier/AutomatedDataPipeline',
    verificationStatus: 'verified',
    summary:
      'Pipeline local de automação via CLI em Python que varre diretórios de entrada, normaliza colunas, datas e valores monetários de arquivos Excel (.xlsx) e CSV (.csv) de múltiplas filiais, trata valores ausentes e exporta um relatório Excel consolidado com múltiplas abas e log de auditoria.',
    problem:
      'Elimina cerca de 8 horas semanais gastas na consolidação manual de planilhas de vendas e estoque de diferentes filiais, resolvendo problemas de formatação inconsistente, nomes de colunas divergentes, valores ausentes e tipos de dados incorretos (datas como texto e moedas com símbolos).',
    technologies: [
      'Python 3.10+',
      'Pandas',
      'OpenPyXL',
      'python-dotenv',
      'Pytest',
      'Ruff',
      'Mypy',
      'GitHub Actions',
    ],
    features: [
      'Varredura automática de arquivos .xlsx e .csv com detecção de delimitador e fallback entre múltiplos encodings (UTF-8, UTF-8-SIG e Latin-1)',
      'Normalização de colunas para snake_case sem acentos e mapeamento de sinônimos entre filiais, além de conversão vetorizada de datas e valores monetários',
      'Tratamento configurável de valores ausentes com descarte de registros sem campos críticos e preenchimento padrão para colunas numéricas e textuais',
      'Consolidação vetorizada sem iterrows() e exportação de relatório Excel multi-abas (Consolidated, SalesByBranch e CriticalStock) com ajuste automático de colunas',
      'Execução tolerante a falhas por arquivo (CONTINUE_ON_ERROR) com auditoria completa em console e arquivo de log rotativo (logs/execution.log)',
    ],
    technicalHighlight:
      'Processamento 100% vetorizado em Pandas sem iterrows(), pipeline tolerante a falhas com logging rotativo (RotatingFileHandler) e configuração imutável via @dataclass(frozen=True) e .env, respaldado por tipagem estática estrita (mypy), linting (ruff) e testes automatizados (pytest) no GitHub Actions.',
    evidence: [
      {
        sourceType: 'repository',
        sourceUrl: 'https://github.com/YohanVallier/AutomatedDataPipeline',
        commitSha: null,
        checkedAt: '2026-11-21T09:50:00Z',
        notes:
          'Informações verificadas diretamente a partir do código-fonte, pyproject.toml, README.md, config/settings.py e workflows CI do repositório.',
      },
    ],
  },
  {
    id: 'beacon-ops',
    name: 'BeaconOps',
    repositoryUrl: 'https://github.com/YohanVallier/BeaconOps',
    verificationStatus: 'verified',
    summary:
      'Plataforma autogerenciada de observabilidade e monitoramento de disponibilidade e desempenho de APIs e serviços HTTP, construída com FastAPI, SQLAlchemy e APScheduler, que realiza verificações periódicas assíncronas, identifica incidentes por falhas consecutivas, calcula indicadores operacionais e dispara alertas via Webhook com proteção contra SSRF.',
    problem:
      'Centraliza o monitoramento de APIs internas e externas sem depender de serviços comerciais externos, detectando indisponibilidade, códigos HTTP inesperados, aumento de latência e respostas fora do contrato antes que falhas silenciosas afetem os usuários finais.',
    technologies: [
      'Python 3.11+',
      'FastAPI',
      'Uvicorn',
      'Pydantic',
      'HTTPX',
      'SQLAlchemy',
      'APScheduler',
      'Pytest',
      'Ruff',
      'MyPy',
      'Docker',
      'GitHub Actions',
    ],
    features: [
      'API REST completa para gerenciamento de monitores (CRUD) com validação de status HTTP, limiar de latência, conteúdo esperado no corpo da resposta e execução manual de verificações',
      'Agendamento periódico desacoplado via APScheduler com controle de concorrência assíncrona por semáforo e isolamento de falhas entre monitores',
      'Máquina de estados para ciclo de vida de incidentes com abertura e fechamento automáticos baseados em limiares configuráveis de falhas e recuperações consecutivas',
      'Notificações assíncronas via HTTP Webhook com janela de deduplicação por hash SHA-256, registro de falhas de entrega e proteção contra vazamento de credenciais',
      'Histórico paginado de verificações e cálculo de métricas operacionais (uptime, downtime, latência média/máxima e incidentes ativos) a partir de dados persistidos',
      'Proteção contra SSRF com resolução DNS e bloqueio de IPs privados/loopback, revalidação de redirecionamentos, restrição de portas e autenticação administrativa via X-API-Key',
    ],
    technicalHighlight:
      'Arquitetura modular desacoplada da camada HTTP com mitigação contra SSRF em profundidade (validação de IPs resolvidos via DNS e revalidação de redirecionamentos), controle de concorrência assíncrona no APScheduler, máquina de estados persistida para incidentes e imagem Docker multi-stage sem privilégios de root, validada por MyPy estrito, Ruff e Pytest no GitHub Actions.',
    evidence: [
      {
        sourceType: 'repository',
        sourceUrl: 'https://github.com/YohanVallier/BeaconOps',
        commitSha: null,
        checkedAt: '2026-11-21T09:52:00Z',
        notes:
          'Informações verificadas diretamente a partir do código-fonte (src/beaconops), pyproject.toml, Dockerfile, docker-compose.yml, README.md e workflows CI do repositório.',
      },
    ],
  },
  {
    id: 'vallier-flux',
    name: 'VALLIERFLUX',
    repositoryUrl: 'https://github.com/YohanVallier/VALLIERFLUX',
    verificationStatus: 'pending',
    summary: null,
    problem: null,
    technologies: [],
    features: [],
    technicalHighlight: null,
    evidence: [
      {
        sourceType: 'user_context',
        sourceUrl: 'https://github.com/YohanVallier/VALLIERFLUX',
        commitSha: null,
        checkedAt: null,
        notes:
          'Nome e URL do repositório informados pelo titular; detalhes técnicos aguardam consulta e revisão.',
      },
    ],
  },
];

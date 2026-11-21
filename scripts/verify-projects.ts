import { pathToFileURL } from 'node:url';
import { projects } from '../src/content/projects';

const API_ORIGIN = 'https://api.github.com';
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
const MAX_FILE_BYTES = 128 * 1024;
const MAX_MANIFESTS = 12;

type FailureKind =
  | 'not_found'
  | 'rate_limit'
  | 'http_error'
  | 'network_error'
  | 'invalid_response'
  | 'response_too_large';

interface RequestRecord {
  url: string;
  checkedAt: string;
  status: number | null;
  result: 'ok' | FailureKind;
  retryAfter: string | null;
  rateLimitReset: string | null;
}

export type GithubResult =
  | { ok: true; data: unknown; request: RequestRecord }
  | { ok: false; kind: FailureKind; request: RequestRecord };

interface SourceFile {
  path: string;
  sourceUrl: string;
  blobSha: string;
  content: string;
}

interface RepositoryReport {
  projectId: string;
  repositoryUrl: string;
  outcome: 'collected_for_review' | 'partial' | 'unavailable' | 'failed';
  commitSha: string | null;
  requests: RequestRecord[];
  files: SourceFile[];
  observations: string[];
  pending: string[];
  humanReviewRequired: true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSha(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{40}$/i.test(value);
}

async function readBoundedJson(response: Response): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('invalid_response');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error('response_too_large');
      }
      chunks.push(chunk.value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
}

/** Injectable fetch permits deterministic 404/403/429 tests without GitHub traffic. */
export async function requestGithub(
  path: string,
  token: string | undefined,
  fetcher: typeof fetch = fetch,
): Promise<GithubResult> {
  if (!path.startsWith('/repos/') || path.includes('?access_token=')) {
    throw new Error('invalid_api_path');
  }
  const url = new URL(path, API_ORIGIN);
  if (url.origin !== API_ORIGIN) throw new Error('invalid_api_origin');
  const request: RequestRecord = {
    url: url.href,
    checkedAt: new Date().toISOString(),
    status: null,
    result: 'network_error',
    retryAfter: null,
    rateLimitReset: null,
  };
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'vallier-flux-source-review',
  };
  if (token?.trim()) headers.Authorization = `Bearer ${token.trim()}`;
  try {
    const response = await fetcher(url, {
      headers,
      redirect: 'error',
      signal: AbortSignal.timeout(15_000),
    });
    request.status = response.status;
    request.retryAfter = response.headers.get('retry-after');
    request.rateLimitReset = response.headers.get('x-ratelimit-reset');
    if (!response.ok) {
      const limited =
        response.status === 429 ||
        (response.status === 403 &&
          (response.headers.get('x-ratelimit-remaining') === '0' ||
            response.headers.has('retry-after')));
      const kind: FailureKind = limited
        ? 'rate_limit'
        : response.status === 404
          ? 'not_found'
          : 'http_error';
      await response.body?.cancel();
      request.result = kind;
      return { ok: false, kind, request };
    }
    const data = await readBoundedJson(response);
    request.result = 'ok';
    return { ok: true, data, request };
  } catch (error: unknown) {
    const kind: FailureKind =
      error instanceof SyntaxError
        ? 'invalid_response'
        : error instanceof Error && error.message === 'response_too_large'
          ? 'response_too_large'
          : error instanceof Error && error.message === 'invalid_response'
            ? 'invalid_response'
            : 'network_error';
    request.result = kind;
    return { ok: false, kind, request };
  }
}

function isManifest(path: string): boolean {
  if (/(^|\/)(node_modules|vendor|dist|\.git|\.venv|venv)(\/|$)/.test(path)) {
    return false;
  }
  const name = path.split('/').at(-1) ?? '';
  return /^(package\.json|pyproject\.toml|requirements[^/]*\.txt|Pipfile|environment\.ya?ml|composer\.json|pom\.xml|build\.gradle(?:\.kts)?|Cargo\.toml|go\.mod)$/i.test(
    name,
  );
}

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}

function readSource(data: unknown, repositoryUrl: string, commit: string): SourceFile | null {
  if (
    !isRecord(data) ||
    typeof data.path !== 'string' ||
    typeof data.content !== 'string' ||
    data.encoding !== 'base64' ||
    !isSha(data.sha) ||
    typeof data.size !== 'number' ||
    data.size < 0 ||
    data.size > MAX_FILE_BYTES
  ) {
    return null;
  }
  const bytes = Buffer.from(data.content, 'base64');
  if (bytes.byteLength > MAX_FILE_BYTES || bytes.byteLength !== data.size) return null;
  return {
    path: data.path,
    sourceUrl: `${repositoryUrl}/blob/${commit}/${encodePath(data.path)}`,
    blobSha: data.sha,
    content: bytes.toString('utf8'),
  };
}

export async function collectRepository(
  project: (typeof projects)[number],
  token: string | undefined,
  fetcher: typeof fetch = fetch,
): Promise<RepositoryReport> {
  const repository = new URL(project.repositoryUrl);
  if (
    repository.protocol !== 'https:' ||
    repository.hostname !== 'github.com' ||
    repository.username ||
    repository.password ||
    !/^\/YohanVallier\/(DataForge|AutomatedDataPipeline|BeaconOps|VALLIERFLUX)$/.test(
      repository.pathname,
    )
  ) {
    throw new Error('repository_not_allowed');
  }
  const base = `/repos${repository.pathname}`;
  const report: RepositoryReport = {
    projectId: project.id,
    repositoryUrl: project.repositoryUrl,
    outcome: 'partial',
    commitSha: null,
    requests: [],
    files: [],
    observations: [],
    pending: [],
    humanReviewRequired: true,
  };
  let stopped = false;
  async function query(path: string): Promise<unknown | null> {
    if (stopped) return null;
    const result = await requestGithub(path, token, fetcher);
    report.requests.push(result.request);
    if (result.ok) return result.data;
    report.pending.push(`${result.kind}: ${result.request.url}`);
    // Any 403 stops this collection, including secondary limits without headers.
    if (result.kind === 'rate_limit' || result.request.status === 403) stopped = true;
    return null;
  }

  const metadata = await query(base);
  if (!isRecord(metadata) || typeof metadata.default_branch !== 'string') {
    report.outcome = report.requests[0]?.status === 404 ? 'unavailable' : 'failed';
    report.pending.push('Metadados indisponíveis ou inválidos; não inferir conteúdo.');
    return report;
  }
  report.observations.push('Metadados do repositório retornados pela API.');
  const revision = await query(`${base}/commits/${encodeURIComponent(metadata.default_branch)}`);
  if (!isRecord(revision) || !isSha(revision.sha)) {
    report.pending.push('Não foi possível fixar um commit; coleta de arquivos interrompida.');
    return report;
  }
  const commit = revision.sha;
  report.commitSha = commit;
  report.observations.push(`Revisão fixada em ${commit}; nenhum recurso funcional foi inferido.`);

  const readmeData = await query(`${base}/readme?ref=${commit}`);
  const readme = readSource(readmeData, project.repositoryUrl, commit);
  if (readme) report.files.push(readme);
  else report.pending.push('README ausente, inválido ou acima do limite de tamanho.');

  const tree = await query(`${base}/git/trees/${commit}?recursive=1`);
  if (!isRecord(tree) || !Array.isArray(tree.tree)) {
    report.pending.push('Árvore indisponível ou inválida; manifestos não consultados.');
    return report;
  }
  if (tree.truncated !== false) {
    report.pending.push('Árvore truncada ou sem confirmação de completude.');
  }
  const entries: unknown[] = tree.tree;
  const paths: string[] = [];
  for (const entry of entries) {
    if (isRecord(entry) && entry.type === 'blob' && typeof entry.path === 'string') {
      if (isManifest(entry.path)) paths.push(entry.path);
    }
  }
  paths.sort(
    (left, right) => left.split('/').length - right.split('/').length || left.localeCompare(right),
  );
  if (paths.length > MAX_MANIFESTS) {
    report.pending.push(
      `Coleta limitada a ${MAX_MANIFESTS} manifestos; revisar os demais manualmente.`,
    );
  }
  for (const path of paths.slice(0, MAX_MANIFESTS)) {
    if (stopped) break;
    const data = await query(`${base}/contents/${encodePath(path)}?ref=${commit}`);
    const source = readSource(data, project.repositoryUrl, commit);
    if (source && source.path === path) report.files.push(source);
    else report.pending.push(`Arquivo não coletado ou inválido: ${path}`);
  }
  report.observations.push(`Coletados ${report.files.length} arquivos para leitura humana.`);
  report.pending.push(
    'Revisar o código de implementação antes de afirmar funcionalidades ou diferenciais.',
  );
  report.outcome = report.pending.length === 1 ? 'collected_for_review' : 'partial';
  return report;
}

export async function main(): Promise<void> {
  const repositories: RepositoryReport[] = [];
  const skipped: string[] = [];
  let stopped = false;
  for (const project of projects) {
    if (stopped) {
      skipped.push(project.id);
      continue;
    }
    const report = await collectRepository(project, process.env.GITHUB_TOKEN);
    repositories.push(report);
    stopped = report.requests.some(
      (request) => request.result === 'rate_limit' || request.status === 403,
    );
  }
  const incomplete =
    skipped.length > 0 ||
    repositories.some((repository) => repository.outcome !== 'collected_for_review');
  process.stdout.write(
    `${JSON.stringify(
      {
        event: 'github_source_collection',
        schemaVersion: 1,
        result: incomplete ? 'incomplete' : 'collected_for_review',
        generatedAt: new Date().toISOString(),
        humanReviewRequired: true,
        publishedContentModified: false,
        warning:
          'Conteúdo remoto não confiável. Não executar nem renderizar como HTML. Presença de dependência não comprova funcionalidade.',
        repositories,
        skipped,
      },
      null,
      2,
    )}\n`,
  );
  if (incomplete) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => {
    console.error(
      JSON.stringify({
        event: 'github_source_collection',
        level: 'error',
        result: 'failed',
        reason: 'unexpected_collection_failure',
      }),
    );
    process.exitCode = 1;
  });
}

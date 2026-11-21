import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function resolveValidSiteUrl(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;
    return parsed.origin;
  } catch {
    return null;
  }
}

async function prerender(): Promise<void> {
  const rootDir = process.cwd();
  const distDir = resolve(rootDir, 'dist');
  const templatePath = resolve(distDir, 'index.html');
  const serverEntryPath = resolve(rootDir, 'dist-ssr', 'entry-server.js');

  if (!existsSync(templatePath)) {
    throw new Error('dist/index.html não encontrado. Execute vite build antes do prerender.');
  }
  if (!existsSync(serverEntryPath)) {
    throw new Error(
      'dist-ssr/entry-server.js não encontrado. Execute vite build --ssr antes do prerender.',
    );
  }

  // O bundle SSR já foi compilado pelo Vite (CSS Modules viram objetos JS),
  // então o Node consegue importá-lo sem tentar ler arquivos .css.
  const { render } = (await import(pathToFileURL(serverEntryPath).href)) as {
    render: () => string;
  };

  const appHtml = render();
  if (!appHtml.trim()) {
    throw new Error('Renderização SSR retornou HTML vazio.');
  }

  let html = readFileSync(templatePath, 'utf8');
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const siteUrl = resolveValidSiteUrl(process.env.VITE_SITE_URL);
  const hasOgCover = existsSync(resolve(rootDir, 'public/og-cover.png'));
  const imagePath = hasOgCover ? '/og-cover.png' : '/favicon.svg';
  const imageUrl = siteUrl ? `${siteUrl}${imagePath}` : imagePath;

  html = html.replace(
    /<meta property="og:image" content="[^"]*" data-prerender="og-image" \/>/,
    `<meta property="og:image" content="${imageUrl}" data-prerender="og-image" />`,
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*" data-prerender="twitter-image" \/>/,
    `<meta name="twitter:image" content="${imageUrl}" data-prerender="twitter-image" />`,
  );

  if (siteUrl) {
    html = html.replace(
      /<meta name="robots" content="[^"]*" data-prerender="robots" \/>/,
      '<meta name="robots" content="index, follow" data-prerender="robots" />',
    );
    const canonicalTags = `    <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />\n  </head>`;
    html = html.replace('  </head>', canonicalTags);

    writeFileSync(
      resolve(distDir, 'robots.txt'),
      `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
      'utf8',
    );
    writeFileSync(
      resolve(distDir, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
      'utf8',
    );
  }

  writeFileSync(templatePath, html, 'utf8');
  console.log(
    JSON.stringify({
      event: 'prerender',
      level: 'info',
      result: 'success',
      indexable: Boolean(siteUrl),
      ogImageFallback: !hasOgCover,
    }),
  );
}

prerender().catch((error: unknown) => {
  console.error(
    JSON.stringify({
      event: 'prerender',
      level: 'error',
      result: 'failed',
      message: error instanceof Error ? error.message : 'prerender_error',
    }),
  );
  process.exitCode = 1;
});

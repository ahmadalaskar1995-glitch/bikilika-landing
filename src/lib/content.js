import matter from 'gray-matter';

/** @typedef {Record<string, string | undefined>} RuntimeEnv */

/**
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
function resolveContentEnv(runtimeEnv = undefined) {
  const env = runtimeEnv || process.env;

  return {
    repoOwner: env.CONTENT_REPO_OWNER,
    repoName: env.CONTENT_REPO_NAME,
    repoBranch: env.CONTENT_REPO_BRANCH || 'main',
    githubToken: env.GITHUB_TOKEN,
  };
}

/**
 * @param {{ repoOwner?: string, repoName?: string }} contentEnv
 */
function isGitHubEnabled(contentEnv) {
  return Boolean(contentEnv.repoOwner && contentEnv.repoName);
}

/**
 * @param {{ githubToken?: string }} contentEnv
 */
function githubHeaders(contentEnv) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (contentEnv.githubToken) {
    headers.Authorization = `Bearer ${contentEnv.githubToken}`;
  }
  return headers;
}

/**
 * @param {string} pathname
 * @param {{ repoOwner?: string, repoName?: string, repoBranch: string, githubToken?: string }} contentEnv
 */
async function githubApi(pathname, contentEnv) {
  const url = `https://api.github.com/repos/${contentEnv.repoOwner}/${contentEnv.repoName}/contents/${pathname}?ref=${contentEnv.repoBranch}`;
  const res = await fetch(url, { headers: githubHeaders(contentEnv) });
  if (!res.ok) {
    throw new Error(`GitHub API failed ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * @param {string} pathname
 * @param {{ repoOwner?: string, repoName?: string, repoBranch: string, githubToken?: string }} contentEnv
 */
async function githubRaw(pathname, contentEnv) {
  const url = `https://raw.githubusercontent.com/${contentEnv.repoOwner}/${contentEnv.repoName}/${contentEnv.repoBranch}/${pathname}`;
  const res = await fetch(url, { headers: githubHeaders(contentEnv) });
  if (!res.ok) {
    throw new Error(`GitHub raw fetch failed ${res.status}: ${res.statusText}`);
  }
  return res.text();
}

/**
 * @param {string} filePath
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
async function readTextFile(filePath, runtimeEnv = undefined) {
  const contentEnv = resolveContentEnv(runtimeEnv);

  if (isGitHubEnabled(contentEnv)) {
    try {
      return await githubRaw(filePath, contentEnv);
    } catch (error) {
      const apiData = await githubApi(filePath, contentEnv);
      if (apiData && typeof apiData.content === 'string') {
        return Buffer.from(apiData.content, 'base64').toString('utf-8');
      }
      throw error;
    }
  }

  // في بيئة Cloudflare يجب دائماً استخدام GitHub
  if (runtimeEnv) {
    throw new Error(
      'Cloudflare runtime requires CONTENT_REPO_OWNER and CONTENT_REPO_NAME to load dynamic content.'
    );
  }

  // تحذير: هذا الكود سيعمل فقط في بيئة Node.js المحلية أثناء التطوير
  // سنقوم باستيراد fs ديناميكياً لتجنب مشاكل Build في Cloudflare
  const fs = await import('node:fs');
  const path = await import('node:path');
  return fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
}

/**
 * @param {string} dirPath
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
async function listDirectoryFiles(dirPath, runtimeEnv = undefined) {
  const contentEnv = resolveContentEnv(runtimeEnv);

  if (isGitHubEnabled(contentEnv)) {
    const entries = await githubApi(dirPath, contentEnv);
    if (!Array.isArray(entries)) {
      throw new Error(`GitHub directory listing did not return an array for ${dirPath}`);
    }
    return entries.filter((entry) => entry.type === 'file' && entry.name.endsWith('.md'));
  }

  if (runtimeEnv) {
    throw new Error('Cloudflare runtime requires GitHub config for directory listing.');
  }

  const fs = await import('node:fs');
  const path = await import('node:path');
  const dir = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({
      name,
      path: path.join(dirPath, name),
      download_url: null,
    }));
}
// ... existing code ...

function getSlugFromFileName(name) {
  return name.replace(/\.md$/, '');
}

/**
 * @param {{ name: string, path: string, download_url?: string | null }} file
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
async function loadMarkdownItemWithEnv(file, runtimeEnv = undefined) {
  const contentEnv = resolveContentEnv(runtimeEnv);
  const content = isGitHubEnabled(contentEnv) && file.download_url
    ? await fetch(file.download_url).then((res) => res.text())
    : await readTextFile(file.path, runtimeEnv);
  const { data, content: body } = matter(content);
  return {
    slug: getSlugFromFileName(file.name),
    data,
    body,
  };
}

/**
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
export async function getSiteConfig(runtimeEnv = undefined) {
  const configText = await readTextFile('src/content/config.json', runtimeEnv);
  return JSON.parse(configText);
}

/**
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
export async function listFooterPages(runtimeEnv = undefined) {
  const files = await listDirectoryFiles('src/content/pages', runtimeEnv);
  const pages = [];
  for (const file of files) {
    const markdown = await loadMarkdownItemWithEnv(file, runtimeEnv);
    pages.push({ slug: markdown.slug, title: markdown.data.title || markdown.slug });
  }
  return pages;
}

/**
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
export async function listProducts(runtimeEnv = undefined) {
  const files = await listDirectoryFiles('src/content/products', runtimeEnv);
  const products = [];
  for (const file of files) {
    const markdown = await loadMarkdownItemWithEnv(file, runtimeEnv);
    products.push({ slug: markdown.slug, data: markdown.data });
  }
  return products;
}

/**
 * @param {string} slug
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
export async function getPageBySlug(slug, runtimeEnv = undefined) {
  const files = await listDirectoryFiles('src/content/pages', runtimeEnv);
  for (const file of files) {
    if (getSlugFromFileName(file.name) === slug) {
      return await loadMarkdownItemWithEnv(file, runtimeEnv);
    }
  }
  return null;
}

/**
 * @param {string} slug
 * @param {RuntimeEnv | undefined} runtimeEnv
 */
export async function getProductBySlug(slug, runtimeEnv = undefined) {
  const files = await listDirectoryFiles('src/content/products', runtimeEnv);
  for (const file of files) {
    if (getSlugFromFileName(file.name) === slug) {
      return await loadMarkdownItemWithEnv(file, runtimeEnv);
    }
  }
  return null;
}

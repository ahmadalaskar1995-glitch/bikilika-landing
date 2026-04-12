import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const repoOwner = process.env.CONTENT_REPO_OWNER;
const repoName = process.env.CONTENT_REPO_NAME;
const repoBranch = process.env.CONTENT_REPO_BRANCH || 'main';
const githubToken = process.env.GITHUB_TOKEN;
const useGitHub = Boolean(repoOwner && repoName);
const localRoot = process.cwd();

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }
  return headers;
}

async function githubApi(pathname) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathname}?ref=${repoBranch}`;
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub API failed ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

async function githubRaw(pathname) {
  const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${repoBranch}/${pathname}`;
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub raw fetch failed ${res.status}: ${res.statusText}`);
  }
  return res.text();
}

function localPath(...segments) {
  return path.join(localRoot, ...segments);
}

function readLocalText(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

async function readTextFile(filePath) {
  if (useGitHub) {
    try {
      return await githubRaw(filePath);
    } catch (error) {
      const apiData = await githubApi(filePath);
      if (apiData && typeof apiData.content === 'string') {
        return Buffer.from(apiData.content, 'base64').toString('utf-8');
      }
      throw error;
    }
  }
  return readLocalText(localPath(filePath));
}

async function listDirectoryFiles(dirPath) {
  if (useGitHub) {
    const entries = await githubApi(dirPath);
    if (!Array.isArray(entries)) {
      throw new Error(`GitHub directory listing did not return an array for ${dirPath}`);
    }
    return entries.filter((entry) => entry.type === 'file' && entry.name.endsWith('.md'));
  }

  const dir = localPath(dirPath);
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

function getSlugFromFileName(name) {
  return name.replace(/\.md$/, '');
}

async function loadMarkdownItem(file) {
  const filePath = file.path || file.download_url;
  const content = useGitHub && file.download_url ? await fetch(file.download_url).then((res) => res.text()) : await readTextFile(file.path);
  const { data, content: body } = matter(content);
  return {
    slug: getSlugFromFileName(file.name),
    data,
    body,
  };
}

export async function getSiteConfig() {
  const configText = await readTextFile('src/content/config.json');
  return JSON.parse(configText);
}

export async function listFooterPages() {
  const files = await listDirectoryFiles('src/content/pages');
  const pages = [];
  for (const file of files) {
    const markdown = await loadMarkdownItem(file);
    pages.push({ slug: markdown.slug, title: markdown.data.title || markdown.slug });
  }
  return pages;
}

export async function listProducts() {
  const files = await listDirectoryFiles('src/content/products');
  const products = [];
  for (const file of files) {
    const markdown = await loadMarkdownItem(file);
    products.push({ slug: markdown.slug, data: markdown.data });
  }
  return products;
}

export async function getPageBySlug(slug) {
  const files = await listDirectoryFiles('src/content/pages');
  for (const file of files) {
    if (getSlugFromFileName(file.name) === slug) {
      return await loadMarkdownItem(file);
    }
  }
  return null;
}

export async function getProductBySlug(slug) {
  const files = await listDirectoryFiles('src/content/products');
  for (const file of files) {
    if (getSlugFromFileName(file.name) === slug) {
      return await loadMarkdownItem(file);
    }
  }
  return null;
}

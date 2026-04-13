import type { APIContext } from 'astro';

function yamlLine(key: string, value: string, indent = 0) {
  const space = '  '.repeat(indent);
  return `${space}${key}: "${String(value).replace(/"/g, '\\"')}"`;
}

function pickRuntimeEnv(locals: App.Locals | undefined) {
  // الوصول الآمن لمتغيرات البيئة حسب المنصة
  if (locals?.runtime?.env) {
    return locals.runtime.env;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env;
  }
  return {};
}

export function GET({ locals, url }: APIContext) {
  const env = pickRuntimeEnv(locals);
  const repo = (env.CMS_GITHUB_REPO as string) || (
    env.CONTENT_REPO_OWNER && env.CONTENT_REPO_NAME
      ? `${env.CONTENT_REPO_OWNER}/${env.CONTENT_REPO_NAME}`
      : ''
  );
  const branch = (env.CMS_BRANCH as string) || (env.CONTENT_REPO_BRANCH as string) || 'main';
  const oauthBaseUrl = (env.CMS_OAUTH_BASE_URL as string) || '';
  const authEndpoint = (env.CMS_AUTH_ENDPOINT as string) || 'auth';
  const siteUrl = (env.PUBLIC_SITE_URL as string) || url.origin;
  const siteDomain = (env.CMS_SITE_DOMAIN as string) || new URL(siteUrl).host;

  const lines = [
    'local_backend: false',
    'media_folder: "public/images/uploads"',
    'public_folder: "/images/uploads"',
    '',
    'backend:',
    yamlLine('name', 'github', 1),
    yamlLine('branch', branch, 1),
  ];

  if (repo) {
    lines.push(yamlLine('repo', repo, 1));
  }

  if (oauthBaseUrl) {
    lines.push(yamlLine('base_url', oauthBaseUrl, 1));
    lines.push(yamlLine('auth_endpoint', authEndpoint, 1));
    lines.push(yamlLine('site_domain', siteDomain, 1));
  }

  lines.push(
    '',
    'collections:',
    '  - name: "settings"',
    '    label: "إعدادات الموقع"',
    '    files:',
    '      - file: "src/content/config.json"',
    '        label: "الهوية والتواصل"',
    '        name: "config"',
    '        fields:',
    '          - {label: "اسم الموقع", name: "siteTitle", widget: "string", default: "متجر منتجاتي"}',
    '          - {label: "لوجو الموقع", name: "logo", widget: "image", required: false}',
    '          - {label: "وصف الموقع", name: "description", widget: "text", required: false}',
    '          - {label: "رقم الواتساب (مع مفتاح الدولة)", name: "whatsapp", widget: "string", required: false}',
    '          - {label: "البريد الإلكتروني", name: "email", widget: "string", required: false}',
    '',
    '  - name: "products"',
    '    label: "المنتجات"',
    '    folder: "src/content/products"',
    '    create: true',
    '    slug: "{{slug}}"',
    '    fields:',
    '      - {label: "اسم المنتج", name: "title", widget: "string"}',
    '      - {label: "رابط شراء المنتج", name: "bikilikaLink", widget: "string"}',
    '      - {label: "السعر", name: "price", widget: "string"}',
    '      - label: "صور المنتج (سلايدر)"',
    '        name: "images"',
    '        widget: "list"',
    '        field: {label: "صورة", name: "image", widget: "image"}',
    '        required: false',
    '      - {label: "وصف مختصر", name: "description", widget: "text", required: false}',
    '      - {label: "وصف تفصيلي", name: "body", widget: "markdown", required: false}',
    '',
    '  - name: "pages"',
    '    label: "الصفحات"',
    '    folder: "src/content/pages"',
    '    create: true',
    '    slug: "{{slug}}"',
    '    fields:',
    '      - {label: "عنوان الصفحة", name: "title", widget: "string"}',
    '      - {label: "الرابط (Slug)", name: "slug", widget: "string", pattern: ["^[a-z0-9-]+$", "أحرف إنجليزية صغيرة وأرقام وشرطات فقط"]}',
    '      - {label: "وصف الصفحة", name: "description", widget: "text", required: false}',
    '      - {label: "المحتوى", name: "body", widget: "markdown"}'
  );

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/yaml; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
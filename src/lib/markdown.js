import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

function sanitizeHtml(html) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<(iframe|object|embed|meta|link)[^>]*?>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')
    .replace(/(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '$1="#"');
}

function interpolateMarkdown(markdown, replacements = {}) {
  return Object.entries(replacements).reduce((content, [key, value]) => {
    const normalizedValue = value == null ? '' : String(value);
    return content
      .replaceAll(`{{${key}}}`, normalizedValue)
      .replaceAll(`{${key}}`, normalizedValue);
  }, markdown);
}

export async function renderMarkdown(markdown, replacements = {}) {
  if (!markdown?.trim()) {
    return '';
  }

  const resolvedMarkdown = interpolateMarkdown(markdown, replacements);

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(resolvedMarkdown)
  );

  return sanitizeHtml(html);
}
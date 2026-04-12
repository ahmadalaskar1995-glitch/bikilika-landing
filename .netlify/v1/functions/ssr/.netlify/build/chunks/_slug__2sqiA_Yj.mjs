import { c as createComponent } from './astro-component_Dw7bP_S6.mjs';
import 'piccolore';
import { d as addAttribute, f as renderHead, r as renderTemplate, u as unescapeHTML } from './ssr-function_Cox_dP0c.mjs';
import 'clsx';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { g as getSiteConfig, a as getPageBySlug } from './content_vP4Nbg4K.mjs';

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const config = await getSiteConfig();
  const { slug } = Astro2.params;
  const pageEntry = await getPageBySlug(slug);
  if (!pageEntry) {
    throw Astro2.redirect("/404");
  }
  const pageData = pageEntry.data;
  const pageContent = pageEntry.body || "";
  const pageHtml = pageContent ? String(
    await unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).process(pageContent)
  ) : "";
  return renderTemplate`<html dir="rtl" lang="ar" data-astro-cid-sdneth7u> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageData.title} | ${config.siteTitle}</title><meta name="description"${addAttribute(pageData.description || config.description, "content")}>${renderHead()}</head> <body data-astro-cid-sdneth7u> <div class="container" data-astro-cid-sdneth7u> <header class="site-header" data-astro-cid-sdneth7u> <div class="logo-area" data-astro-cid-sdneth7u> ${config.logo ? renderTemplate`<img${addAttribute(config.logo, "src")}${addAttribute(config.siteTitle, "alt")} class="logo-img" data-astro-cid-sdneth7u>` : renderTemplate`<div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:20px;display:flex;align-items:center;justify-content:center;color:white;font-size:32px;backdrop-filter:blur(6px);" data-astro-cid-sdneth7u>✨</div>`} <h1 class="site-title" data-astro-cid-sdneth7u>${config.siteTitle}</h1> </div> ${config.description && renderTemplate`<div class="site-description" data-astro-cid-sdneth7u>${config.description}</div>`} </header> <main data-astro-cid-sdneth7u> <a href="/" class="back-link" data-astro-cid-sdneth7u>← العودة للرئيسية</a> <article class="page-content" data-astro-cid-sdneth7u> <h1 data-astro-cid-sdneth7u>${pageData.title}</h1> ${pageHtml && renderTemplate`<div data-astro-cid-sdneth7u>${unescapeHTML(pageHtml)}</div>`} </article> </main> <footer data-astro-cid-sdneth7u> <p data-astro-cid-sdneth7u>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${config.siteTitle}. جميع الحقوق محفوظة.</p> </footer> </div> ${(config.whatsapp || config.email) && renderTemplate`<div class="contact-float" data-astro-cid-sdneth7u> ${config.whatsapp && renderTemplate`<a${addAttribute(`https://wa.me/${config.whatsapp}`, "href")} class="contact-button whatsapp" target="_blank" rel="noopener" aria-label="تواصل معنا عبر واتساب" data-astro-cid-sdneth7u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" data-astro-cid-sdneth7u><path d="M12 0C5.373 0 0 5.373 0 12c0 2.165.582 4.2 1.593 5.947L.22 23.78l6.053-1.587A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.943 0-3.764-.522-5.333-1.426l-3.715.974.99-3.618A10.45 10.45 0 0 1 1.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z" data-astro-cid-sdneth7u></path><path d="M17.5 14.5c-.3 0-.6-.1-.8-.3l-2.5-1.7c-.5-.3-.6-.9-.3-1.4l.2-.3c.1-.1.2-.2.3-.3.1-.1.2-.1.3-.1h.2c.2 0 .4.1.6.2l2.5 1.7c.5.3.6.9.3 1.4l-.1.1c-.3.4-.5.7-.7.7z" data-astro-cid-sdneth7u></path><path d="M6.5 14.5c-.2 0-.4-.1-.5-.2l-.2-.2c-.3-.5-.3-1.1 0-1.6l.2-.2c.1-.1.2-.2.3-.3l.3-.2c.1 0 .2-.1.3-.1.2 0 .4.1.6.2l2.5 1.7c.5.3.6.9.3 1.4l-.1.1c-.2.4-.5.6-.7.7-.2 0-.4.1-.6 0z" data-astro-cid-sdneth7u></path></svg> <span data-astro-cid-sdneth7u>WhatsApp</span> </a>`} ${config.email && renderTemplate`<a${addAttribute(`mailto:${config.email}`, "href")} class="contact-button email" aria-label="إرسال بريد إلكتروني" data-astro-cid-sdneth7u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" data-astro-cid-sdneth7u><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.99l-8 4.99-8-4.99V6l8 4.99L20 6v2.99z" data-astro-cid-sdneth7u></path></svg> <span data-astro-cid-sdneth7u>Gmail</span> </a>`} </div>`} </body></html>`;
}, "C:/Users/lenovo/Desktop/bikilika-landing/src/pages/pages/[slug].astro", void 0);

const $$file = "C:/Users/lenovo/Desktop/bikilika-landing/src/pages/pages/[slug].astro";
const $$url = "/pages/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

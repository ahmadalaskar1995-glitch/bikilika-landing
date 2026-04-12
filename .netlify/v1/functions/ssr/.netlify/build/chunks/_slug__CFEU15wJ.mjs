import { c as createComponent } from './astro-component_Dw7bP_S6.mjs';
import 'piccolore';
import { g as createRenderInstruction, r as renderTemplate, d as addAttribute, h as renderComponent, i as Fragment, f as renderHead } from './ssr-function_Cox_dP0c.mjs';
import { b as getProductBySlug, g as getSiteConfig } from './content_vP4Nbg4K.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const productEntry = await getProductBySlug(slug);
  if (!productEntry) {
    throw Astro2.redirect("/404");
  }
  const product = productEntry.data;
  const config = await getSiteConfig();
  const siteConfig = config;
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  ({
    "name": product.title,
    "description": product.description,
    "image": images.length > 0 ? images[0] : void 0,
    "offers": {
      "price": product.price.replace(/[^0-9.]/g, ""),
      "url": product.bikilikaLink
    }
  });
  return renderTemplate(_a || (_a = __template(['<html dir="rtl" lang="ar" data-astro-cid-o422f4lv> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', " | ", '</title><meta name="description"', '><!-- Litlyx Analytics --><script defer data-workspace="YOUR_WORKSPACE_ID" src="https://cdn.jsdelivr.net/npm/litlyx-js@latest/browser/litlyx.js"><\/script><!-- SEO Schema --><script type="application/ld+json">\n    {JSON.stringify(productSchema)}\n  <\/script>', '</head> <body data-astro-cid-o422f4lv> <div class="container" data-astro-cid-o422f4lv> <header class="site-header" data-astro-cid-o422f4lv> <div class="logo-area" data-astro-cid-o422f4lv> ', ' <h1 class="site-title" data-astro-cid-o422f4lv>', "</h1> </div> ", ' </header> <main data-astro-cid-o422f4lv> <a href="/" class="back-link" data-astro-cid-o422f4lv>← العودة للمتجر</a> ', " </main> <footer data-astro-cid-o422f4lv> <p data-astro-cid-o422f4lv>© ", " ", ". جميع الحقوق محفوظة.</p> </footer> </div> <!-- أزرار التواصل العائمة --> ", " <!-- سكريبت السلايدر --> ", " <!-- تتبع النقرات --> ", " </body> </html>"])), product?.title || "منتج", siteConfig.siteTitle, addAttribute(product?.description || siteConfig.description, "content"), renderHead(), siteConfig.logo ? renderTemplate`<img${addAttribute(siteConfig.logo, "src")}${addAttribute(siteConfig.siteTitle, "alt")} class="logo-img" data-astro-cid-o422f4lv>` : renderTemplate`<div style="width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:20px;display:flex;align-items:center;justify-content:center;color:white;font-size:28px;backdrop-filter:blur(6px);" data-astro-cid-o422f4lv>✨</div>`, siteConfig.siteTitle, siteConfig.description && renderTemplate`<div class="site-description" data-astro-cid-o422f4lv>${siteConfig.description}</div>`, product ? renderTemplate`<div class="product-detail" data-astro-cid-o422f4lv> ${images.length > 0 ? renderTemplate`<div class="slider-container" id="product-slider" data-astro-cid-o422f4lv> <div class="slider-wrapper" id="slider-wrapper" data-astro-cid-o422f4lv> ${images.map((img, index) => renderTemplate`<div class="slider-slide" data-astro-cid-o422f4lv> <img${addAttribute(img, "src")}${addAttribute(`${product.title} - صورة ${index + 1}`, "alt")} class="slider-image" data-astro-cid-o422f4lv> </div>`)} </div> ${images.length > 1 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-o422f4lv": true }, { "default": async ($$result2) => renderTemplate` <button class="slider-btn prev" id="prevBtn" data-astro-cid-o422f4lv>❮</button> <button class="slider-btn next" id="nextBtn" data-astro-cid-o422f4lv>❯</button> <div class="slider-dots" id="slider-dots" data-astro-cid-o422f4lv> ${images.map((_, idx) => renderTemplate`<span${addAttribute(`dot ${idx === 0 ? "active" : ""}`, "class")}${addAttribute(idx, "data-index")} data-astro-cid-o422f4lv></span>`)} </div> ` })}`} </div>` : renderTemplate`<div class="no-images-placeholder" data-astro-cid-o422f4lv>🖼️ لا توجد صور للمنتج</div>`} <h2 class="product-title" data-astro-cid-o422f4lv>${product.title}</h2> <div class="product-price" data-astro-cid-o422f4lv>${product.price}</div> <div class="product-description" data-astro-cid-o422f4lv>${product.description || ""}</div> <a${addAttribute(product.bikilikaLink, "href")} class="buy-button" target="_blank" rel="noopener"${addAttribute(product.title, "data-product")} data-astro-cid-o422f4lv>
🛒 اشتر الآن
</a> </div>` : renderTemplate`<p data-astro-cid-o422f4lv>عذراً، المنتج غير موجود.</p>`, (/* @__PURE__ */ new Date()).getFullYear(), siteConfig.siteTitle, (siteConfig.whatsapp || siteConfig.email) && renderTemplate`<div class="contact-float" data-astro-cid-o422f4lv> ${siteConfig.whatsapp && renderTemplate`<a${addAttribute(`https://wa.me/${siteConfig.whatsapp}`, "href")} class="contact-button whatsapp" target="_blank" rel="noopener" aria-label="تواصل معنا عبر واتساب" data-astro-cid-o422f4lv> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" data-astro-cid-o422f4lv><path d="M12 0C5.373 0 0 5.373 0 12c0 2.165.582 4.2 1.593 5.947L.22 23.78l6.053-1.587A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.943 0-3.764-.522-5.333-1.426l-3.715.974.99-3.618A10.45 10.45 0 0 1 1.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z" data-astro-cid-o422f4lv></path><path d="M17.5 14.5c-.3 0-.6-.1-.8-.3l-2.5-1.7c-.5-.3-.6-.9-.3-1.4l.2-.3c.1-.1.2-.2.3-.3.1-.1.2-.1.3-.1h.2c.2 0 .4.1.6.2l2.5 1.7c.5.3.6.9.3 1.4l-.1.1c-.3.4-.5.7-.7.7z" data-astro-cid-o422f4lv></path><path d="M6.5 14.5c-.2 0-.4-.1-.5-.2l-.2-.2c-.3-.5-.3-1.1 0-1.6l.2-.2c.1-.1.2-.2.3-.3l.3-.2c.1 0 .2-.1.3-.1.2 0 .4.1.6.2l2.5 1.7c.5.3.6.9.3 1.4l-.1.1c-.2.4-.5.6-.7.7-.2 0-.4.1-.6 0z" data-astro-cid-o422f4lv></path></svg> <span data-astro-cid-o422f4lv>WhatsApp</span> </a>`} ${siteConfig.email && renderTemplate`<a${addAttribute(`mailto:${siteConfig.email}`, "href")} class="contact-button email" aria-label="إرسال بريد إلكتروني" data-astro-cid-o422f4lv> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" data-astro-cid-o422f4lv><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.99l-8 4.99-8-4.99V6l8 4.99L20 6v2.99z" data-astro-cid-o422f4lv></path></svg> <span data-astro-cid-o422f4lv>Gmail</span> </a>`} </div>`, renderScript($$result, "C:/Users/lenovo/Desktop/bikilika-landing/src/pages/products/[slug].astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "C:/Users/lenovo/Desktop/bikilika-landing/src/pages/products/[slug].astro?astro&type=script&index=1&lang.ts"));
}, "C:/Users/lenovo/Desktop/bikilika-landing/src/pages/products/[slug].astro", void 0);

const $$file = "C:/Users/lenovo/Desktop/bikilika-landing/src/pages/products/[slug].astro";
const $$url = "/products/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

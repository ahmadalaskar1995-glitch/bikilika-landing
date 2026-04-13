/// <reference types="astro/client" />

interface Window {
  Lit?: {
    event: (name: string, data: unknown) => void;
  };
}

declare namespace App {
  interface Locals {
    runtime?: {
      env: {
        CONTENT_REPO_OWNER?: string;
        CONTENT_REPO_NAME?: string;
        CONTENT_REPO_BRANCH?: string;
        GITHUB_TOKEN?: string;
        CMS_GITHUB_REPO?: string;
        CMS_BRANCH?: string;
        CMS_OAUTH_BASE_URL?: string;
        CMS_AUTH_ENDPOINT?: string;
        CMS_SITE_DOMAIN?: string;
        PUBLIC_SITE_URL?: string;
        PUBLIC_LITLYX_WORKSPACE_ID?: string;
        [key: string]: string | undefined;
      };
    };
  }
}

// تعريف أنواع Content Collections (إذا كانت مستخدمة)
declare module 'astro:content' {
  export interface RenderResult {
    Content: import('astro/runtime/server/index.js').AstroComponentFactory;
    headings: import('astro').MarkdownHeading[];
    remarkPluginFrontmatter: Record<string, any>;
  }
  interface Render {
    '.md': Promise<RenderResult>;
  }

  export interface RenderedContent {
    html: string;
    metadata?: {
      imagePaths: Array<string>;
      [key: string]: unknown;
    };
  }
}
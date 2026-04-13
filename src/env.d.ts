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
        [key: string]: string | undefined;
      };
    };
  }
}

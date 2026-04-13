// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: process.env.URL || 'http://localhost:4321',
  output: 'server',
  adapter: cloudflare(),
});

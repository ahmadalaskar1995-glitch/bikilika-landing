// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: process.env.URL || 'http://localhost:4321',
  output: 'static',
  adapter: netlify(),
});
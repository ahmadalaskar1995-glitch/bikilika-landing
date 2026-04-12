// @ts-check
/// <reference types="node" />
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: process.env.URL || 'http://localhost:4321',
  output: 'server', // يجعل جميع الصفحات SSR (تُبنى عند الطلب)
  adapter: node({
    mode: 'standalone',
  }),
});
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lark-mx.github.io',
  base: '/cashloan-market-daily',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});

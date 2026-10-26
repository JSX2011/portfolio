import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jsx2011.github.io',
  base: process.env.PAGES_BASE || '/',
  output: 'static',
  devToolbar: { enabled: false },
});

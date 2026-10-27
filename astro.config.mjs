import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sdtechsystems.github.io',
  base: process.env.PAGES_BASE || '/',
  output: 'static',
  devToolbar: { enabled: false },
});

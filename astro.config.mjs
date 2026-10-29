import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sdtechsystems.dev',
  base: process.env.PAGES_BASE || '/',
  output: 'static',
  devToolbar: { enabled: false },
});

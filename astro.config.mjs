import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config.ts';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // robots.txt es un endpoint: no va en el sitemap.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/robots.txt') })],
});

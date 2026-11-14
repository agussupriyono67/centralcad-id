import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://centralcad.id',
  redirects: {
    '/download': '/free-download',
    '/zwcad-download': '/free-download'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});

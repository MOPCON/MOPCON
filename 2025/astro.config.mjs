import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; 

export default defineConfig({
  integrations: [tailwind()],
  base: '/2025',
  trailingSlash: 'always',
});
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nestweavers.com',
  output: 'static',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  // Brand fonts: Montserrat is self-hosted at build time. Times New Roman is a system font (see --font-serif).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [300, 400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});

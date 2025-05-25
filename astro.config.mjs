// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';

import preact from "@astrojs/preact";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://munilogs.netlify.app/",
  integrations: [preact(), pagefind()],

  vite: {
    plugins: [tailwindcss()]
  }
});
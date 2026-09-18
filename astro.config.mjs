// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.rallypagulayan.com',
  // Built CSS/fonts land in /assets rather than Astro's default /_astro —
  // a leading underscore is treated as special by some hosts and preview tools.
  build: { assets: 'assets' },
  // Keep the old Google Sites URL working: /home now points at the homepage.
  redirects: {
    '/home': '/',
  },
});

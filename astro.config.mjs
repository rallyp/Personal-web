// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.rallypagulayan.com',
  // Keep the old Google Sites URL working: /home now points at the homepage.
  redirects: {
    '/home': '/',
  },
});

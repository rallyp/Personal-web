// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.rallypagulayan.com',
  // Built CSS/fonts land in /assets rather than Astro's default /_astro —
  // a leading underscore is treated as special by some hosts and preview tools.
  build: { assets: 'assets' },
  // Old URLs keep working. /home is from the Google Sites original; the rest
  // are from the Work/Other structure this site replaced.
  redirects: {
    '/home': '/',
    '/work': '/about',
    '/other': '/store',
    '/other/gh-comics': '/comics',
  },
});

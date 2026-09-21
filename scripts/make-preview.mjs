// Builds a copy of the site in /preview whose links are all relative, so it
// can be opened straight from Finder (file://) without a web server.
// Run it with: npm run preview
import { readdirSync, statSync, existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, relative, dirname, posix } from 'node:path';

const SRC = 'dist';
const OUT = 'preview';

rmSync(OUT, { recursive: true, force: true });
// cp -R rather than fs.cpSync: the latter trips over permissions on this mount.
execFileSync('cp', ['-R', SRC, OUT]);
rmSync(join(OUT, '.prerender'), { recursive: true, force: true });
rmSync(join(OUT, 'images', 'README.md'), { force: true });

// Every page of the site, and the route each clean URL resolves to.
const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    statSync(p).isDirectory() ? walk(p) : entry.endsWith('.html') && pages.push(p);
  }
})(OUT);

const routes = {
  '/': 'index.html',
  '/about': 'about/index.html',
  '/comics': 'comics/index.html',
  '/store': 'store/index.html',
};

const resolve = (abs) => {
  const clean = abs.replace(/\/$/, '') || '/';
  if (routes[clean]) return routes[clean];
  const asFile = abs.replace(/^\//, '');
  return existsSync(join(OUT, asFile)) ? asFile : null;
};

for (const page of pages) {
  const fromDir = dirname(relative(OUT, page));
  const rel = (t) => posix.relative(fromDir === '.' ? '' : fromDir, t) || 'index.html';
  let html = readFileSync(page, 'utf8');

  html = html.replace(/((?:href|src)=")(\/[^"#]*)(#[^"]*)?(")/g, (m, a, p, hash = '', z) => {
    const t = resolve(p);
    return t ? a + rel(t) + hash + z : m;
  });
  html = html.replace(/url\(\s*['"]?(\/[^)'"]+)['"]?\s*\)/g, (m, p) => {
    const t = resolve(p);
    return t ? `url('${rel(t)}')` : m;
  });

  writeFileSync(page, html);
}

// the built stylesheet points at the font files with absolute paths too
for (const file of readdirSync(join(OUT, 'assets')).filter((f) => f.endsWith('.css'))) {
  const p = join(OUT, 'assets', file);
  writeFileSync(p, readFileSync(p, 'utf8').replace(/url\(\s*(['"]?)\/assets\//g, 'url($1./'));
}

console.log(`preview ready — open ${OUT}/index.html`);

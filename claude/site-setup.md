# rallypagulayan.com — rebuild setup

Reference notes for the static-site rebuild. Current as of 13 Nov 2026.

## Where things live

| Thing | Value |
|---|---|
| Live (old) site | https://www.rallypagulayan.com — still Google Sites, untouched |
| New site (preview) | https://personal-web-25l.pages.dev |
| Code | https://github.com/rallyp/Personal-web |
| Local folder | `~/Projects/Personal-web` on both Macs, cloned from GitHub. Earlier copies lived in iCloud Drive and in `~/Projects/Personal web`, both retired |
| Notes | `CLAUDE.md` and `claude/site-setup.md`, inside the repo so they sync with the code |
| Branch | `main` |
| Domain registrar | Namecheap (DNS not yet changed) |

## Pages

| URL | Page | In nav | State |
|---|---|---|---|
| `/` | Home — full-height hero, Lima at the microphones | yes | done |
| `/about` | Bio, plus the four career blocks under "The work" | yes | rough |
| `/thoughts` | Pinned top-20 songs post, then recent posts pulled from the Substack feed | yes | working |
| `/songs` | Full top-20 list plus the working shortlist | no — linked from Thoughts | working |
| `/comics` | Greyhound photo comics, seven strips | yes | rough, images needed |
| `/store` | Threadless and Redbubble links, two collections | yes | rough, images needed |

Retired and redirected (in `astro.config.mjs`): `/work` → `/about`, `/other` → `/store`,
`/other/gh-comics` → `/comics`, `/home` → `/`.

## Stack

Astro 7 static site. No server, no database — the build turns `src/` into
plain HTML in `dist/`.

- `src/layouts/Base.astro` — head, nav, footer; takes a `heroAtTop` prop for
  pages that open with full-bleed imagery the transparent nav sits over
- `src/components/` — Nav, Footer, SocialRow, PageBanner, Placeholder, SongList
- `src/data/songs.ts` — the top-20 list and shortlist, shared by `/songs` and
  the preview on `/thoughts`. It's a hand-made copy of the Bear note of the same
  name, so re-sync it whenever the note changes
- `src/lib/substack.ts` — reads https://rallyp.substack.com/feed at build time.
  If the feed can't be reached, Thoughts falls back to placeholders rather than
  failing the build. New Substack posts only appear after a rebuild
- `src/styles/global.css` — all design tokens live at the top in `:root`
- `src/pages/` — one file per page; folder structure becomes the URL
- `public/images/` — published images; `src/images-source/` holds full-size
  originals that are NOT published

Commands: `npm run dev` (live server), `npm run build`, `npm run preview`
(builds and rewrites links so `preview/index.html` opens from Finder).

## Working on two Macs

- Both MacBook Pros (Apple Silicon) have their own clone at `~/Projects/Personal-web`.
  GitHub is the only sync. Keep the repo out of iCloud Drive, because iCloud and git
  syncing the same folder can corrupt `.git`.
- Routine: **Fetch origin → Pull** when sitting down; **Commit → Push** before
  switching Macs.
- `node_modules` is never synced. To run the site locally, install Node 22.12+ on
  that Mac, then run `npm install` once in the repo.
- Same model for other projects: one GitHub repo per project, cloned to
  `~/Projects/<name>` on each Mac, with its own `CLAUDE.md` and `claude/` notes.

## Cloudflare Pages settings

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- `.nvmrc` pins Node 22 — Astro 7 needs ≥22.12 and Cloudflare defaults lower
- Built assets go to `/assets`, not Astro's default `/_astro` (the underscore
  breaks some hosts and preview tooling)

## Deploy loop

Claude edits locally → Rally clicks **Push origin** in GitHub Desktop →
Cloudflare rebuilds automatically within a minute. Claude cannot push
(no credentials) and cannot reach the Cloudflare API from the session.

## Design

- Display face: **Instrument Sans**, self-hosted via `@fontsource-variable`,
  set as `--font-display` and used on hero, banners and section headings
- Body and navigation: Helvetica Neue
- Page background `#000`, warm dark bands `#14120f`, cream `#fffdf7`
- Section headings `#cfe2f3` on dark; yellow flag accent `#f5c400`
- Nav is fixed and transparent over the hero, gaining a solid blurred
  background once scrolled past 24px

## Open items

1. **Images** — most are still placeholders. They could not be copied from
   Google's servers (network policy blocks it). Google Takeout will export
   them. In place so far: `hero-lima.jpg`. Parked: `RBanner.png`, the yellow
   R flag, removed from the design but kept for later use.
2. **Real content** — About, Comics and Store are deliberately rough pending
   Rally's iteration.
3. **Meta description** in `Base.astro` still says "CEO of EchoUser… 30 years"
   and no longer matches the footer bio.
4. **LinkedIn icon** — the `simple-icons` package no longer ships LinkedIn,
   so it currently uses a generic link glyph.
5. **Substack refresh** — new posts need a rebuild to show up. A scheduled
   Cloudflare deploy hook would automate it.
6. **DNS cutover** — at Namecheap, when ready.
7. **Stray file** — `Claude outputs/favorite-songs-playlist.txt` is committed
   in the repo. It isn't part of the site, so decide whether to keep it there.

import { XMLParser } from 'fast-xml-parser';

export interface Post {
  title: string;
  url: string;
  date: Date | null;
  excerpt: string;
}

const FEED_URL = 'https://rallyp.substack.com/feed';
const TIMEOUT_MS = 8000;

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  rsquo: '\u2019',
  lsquo: '\u2018',
  ldquo: '\u201c',
  rdquo: '\u201d',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
};

/**
 * Decode HTML entities, including numeric ones. Substack uses numeric
 * escapes for anything outside ASCII — emoji especially — so a fixed list of
 * named entities is not enough.
 */
function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => safeCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match)
    // &amp; goes last, so "&amp;#39;" doesn't get decoded twice
    .replace(/&amp;/g, '&');
}

function safeCodePoint(code: number): string {
  try {
    return String.fromCodePoint(code);
  } catch {
    return '';
  }
}

/** Turn a chunk of post HTML into a plain-text excerpt. */
function toExcerpt(html: string, maxLength = 220): string {
  const text = decodeEntities(
    String(html ?? '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  // cut at the last whole word so we don't end mid-syllable
  return text.slice(0, text.lastIndexOf(' ', maxLength)).trimEnd() + '\u2026';
}

/**
 * Read the Substack feed at build time.
 *
 * Returns null rather than throwing when the feed can't be reached, so a
 * restricted network (or Substack having a bad day) degrades to the
 * placeholder state instead of failing the whole build.
 */
export async function getSubstackPosts(limit = 5): Promise<Post[] | null> {
  try {
    const response = await fetch(FEED_URL, {
      headers: { 'user-agent': 'rallypagulayan.com (site build)' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) throw new Error(`feed responded ${response.status}`);

    const parsed = new XMLParser({ ignoreAttributes: false }).parse(await response.text());
    const raw = parsed?.rss?.channel?.item ?? [];
    const items = Array.isArray(raw) ? raw : [raw];

    const posts = items
      .filter((item) => item && (item.title || item.link))
      .slice(0, limit)
      .map((item) => {
        const published = item.pubDate ? new Date(item.pubDate) : null;
        return {
          title: decodeEntities(String(item.title ?? 'Untitled')),
          url: String(item.link ?? FEED_URL),
          date: published && !Number.isNaN(published.valueOf()) ? published : null,
          excerpt: toExcerpt(item.description ?? item['content:encoded'] ?? ''),
        };
      });

    return posts.length ? posts : null;
  } catch (error) {
    console.warn(
      `[thoughts] Substack feed unavailable, falling back to placeholders — ${
        error instanceof Error ? error.message : error
      }`,
    );
    return null;
  }
}

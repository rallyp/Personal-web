import { XMLParser } from 'fast-xml-parser';

export interface Post {
  title: string;
  url: string;
  date: Date | null;
  excerpt: string;
}

const FEED_URL = 'https://rallyp.substack.com/feed';
const TIMEOUT_MS = 8000;

/** Turn a chunk of post HTML into a plain-text excerpt. */
function toExcerpt(html: string, maxLength = 220): string {
  const text = String(html ?? '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&#8217;/g, '’')
    .replace(/&ldquo;|&#8220;/g, '“')
    .replace(/&rdquo;|&#8221;/g, '”')
    .replace(/&mdash;|&#8212;/g, '—')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  // cut at the last whole word so we don't end mid-syllable
  return text.slice(0, text.lastIndexOf(' ', maxLength)).trimEnd() + '…';
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
          title: String(item.title ?? 'Untitled'),
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

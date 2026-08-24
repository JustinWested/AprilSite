import { useEffect, useState } from 'react';
import styles from './SubstackFeed.module.css';

const FEED_URL = 'https://substack-rss-proxy.justwested.workers.dev/';
const SUBSTACK_URL = 'https://ferretwithaknife.substack.com';

// localStorage key + how long a cached result stays "fresh". We use
// stale-while-revalidate: on load we paint the cached posts INSTANTLY
// (even if stale), then quietly refetch in the background so the next
// visit is up to date. Feed content changes rarely, so a wide-ish
// staleness budget is fine.
const CACHE_KEY = 'ferret-substack-feed-v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour "fresh"

// Rotating gradient fallbacks when a post has no image
const GRADIENTS = [
  'linear-gradient(135deg, #A1C3D1 0%, #B39BC8 50%, #E64398 100%)',
  'linear-gradient(135deg, #E64398 0%, #B39BC8 60%, #A1C3D1 100%)',
  'linear-gradient(135deg, #B39BC8 0%, #E64398 50%, #2a1f3d 100%)',
];

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function extractImage(item) {
  // media:content url="..."
  const mediaContent = item.getElementsByTagName('media:content')[0];
  if (mediaContent) {
    const url = mediaContent.getAttribute('url');
    if (url) return url;
  }
  // <enclosure url="..." type="image/...">
  const enclosure = item.getElementsByTagName('enclosure')[0];
  if (enclosure) {
    const type = enclosure.getAttribute('type') || '';
    const url = enclosure.getAttribute('url');
    if (url && type.startsWith('image/')) return url;
    if (url && !type) return url;
  }
  // itunes:image href="..."
  const itunesImg = item.getElementsByTagName('itunes:image')[0];
  if (itunesImg) {
    const href = itunesImg.getAttribute('href');
    if (href) return href;
  }
  // Last resort: first <img> tag inside content:encoded / description
  const contentEncoded =
    item.getElementsByTagName('content:encoded')[0] ||
    item.getElementsByTagName('description')[0];
  if (contentEncoded && contentEncoded.textContent) {
    const match = contentEncoded.textContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) return match[1];
  }
  return null;
}

function parseFeed(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  const parseErr = doc.getElementsByTagName('parsererror')[0];
  if (parseErr) throw new Error('RSS parse error');
  const items = Array.from(doc.getElementsByTagName('item')).slice(0, 3);
  return items.map((item) => {
    const get = (tag) => item.getElementsByTagName(tag)[0]?.textContent?.trim() || '';
    return {
      title: get('title'),
      link: get('link'),
      pubDate: get('pubDate'),
      image: extractImage(item),
    };
  });
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.posts)) return null;
    return parsed; // { posts, savedAt }
  } catch {
    return null;
  }
}

function writeCache(posts) {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ posts, savedAt: Date.now() })
    );
  } catch {
    /* localStorage may be full or unavailable — just skip. */
  }
}

export default function SubstackFeed({ count = 3 }) {
  // Prime state directly from localStorage on first render so a returning
  // visitor sees the last-known posts INSTANTLY — no skeleton flash.
  const [posts, setPosts] = useState(() => {
    if (typeof window === 'undefined') return null;
    const cached = readCache();
    return cached ? cached.posts.slice(0, count) : null;
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Skip the network entirely if the cache is still within its
    // freshness window. The stale-vs-fresh check runs against the same
    // cache we already primed state from, so this only saves a request —
    // it doesn't change what the user sees on load.
    const cached = readCache();
    const isFresh =
      cached && typeof cached.savedAt === 'number' &&
      Date.now() - cached.savedAt < CACHE_TTL_MS;
    if (isFresh) return () => { cancelled = true; };

    (async () => {
      try {
        const res = await fetch(FEED_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const xml = await res.text();
        const parsed = parseFeed(xml).slice(0, count);
        if (cancelled) return;
        setPosts(parsed);
        writeCache(parsed);
      } catch (e) {
        if (cancelled) return;
        // Only surface the error state when we have nothing at all to
        // show — otherwise let the stale cached posts stay on screen.
        if (posts === null) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // `posts` is intentionally omitted from deps — this effect fires
    // once on mount to refresh in the background.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // Error / fallback
  if (error) {
    return (
      <a
        href={SUBSTACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`frosted-card ${styles.card} ${styles.fallback}`}
      >
        <div
          className={styles.media}
          style={{ background: GRADIENTS[0] }}
        />
        <div className={styles.info}>
          <span className={styles.title}>Read my Substack</span>
          <span className={styles.date}>Ferret with a Knife &rarr;</span>
        </div>
      </a>
    );
  }

  // Loading
  if (posts === null) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`frosted-card ${styles.card} ${styles.skeleton}`}>
            <div className={`${styles.media} ${styles.shimmer}`} />
            <div className={styles.info}>
              <span className={`${styles.skelLine} ${styles.shimmer}`} />
              <span
                className={`${styles.skelLine} ${styles.skelLineShort} ${styles.shimmer}`}
              />
            </div>
          </div>
        ))}
      </>
    );
  }

  // Loaded
  return (
    <>
      {posts.map((post, i) => (
        <a
          key={post.link || i}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`frosted-card ${styles.card}`}
        >
          {post.image ? (
            <img src={post.image} alt="" className={styles.media} loading="lazy" />
          ) : (
            <div
              className={styles.media}
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}
            />
          )}
          <div className={styles.info}>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.date}>{formatDate(post.pubDate)}</span>
          </div>
        </a>
      ))}
    </>
  );
}

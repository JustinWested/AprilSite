import { useEffect, useState } from 'react';
import styles from './SubstackFeed.module.css';

const FEED_URL = 'https://substack-rss-proxy.justwested.workers.dev/';
const SUBSTACK_URL = 'https://ferretwithaknife.substack.com';

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

export default function SubstackFeed({ count = 3 }) {
  const [posts, setPosts] = useState(null); // null = loading
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(FEED_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const xml = await res.text();
        const parsed = parseFeed(xml).slice(0, count);
        if (!cancelled) setPosts(parsed);
      } catch (e) {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
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

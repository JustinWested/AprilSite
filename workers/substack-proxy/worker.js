// Cloudflare Worker: CORS proxy for April's Substack RSS feed.
//
// Servers have no CORS restrictions, so fetching the RSS from a Worker
// and re-serving it with Access-Control-Allow-Origin: * lets the React
// app load the feed directly from the browser without the Substack CORS block.
//
// Cached for 1 hour to avoid hammering Substack on every page load.

const SUBSTACK_FEED_URL = 'https://ferretwithaknife.substack.com/feed';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request) {
    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: CORS_HEADERS,
      });
    }

    try {
      const upstream = await fetch(SUBSTACK_FEED_URL, {
        // Edge-cache the response for 1 hour.
        cf: { cacheTtl: 3600, cacheEverything: true },
        headers: {
          // Browser-like UA — Substack rejects unknown user agents with 403.
          'User-Agent':
            'Mozilla/5.0 (compatible; AprilYankoRSSProxy/1.0; +https://aprilyanko.com)',
          Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
        },
      });

      if (!upstream.ok) {
        throw new Error(`Upstream returned ${upstream.status}`);
      }

      const xml = await upstream.text();

      return new Response(xml, {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch feed',
          detail: err && err.message ? err.message : String(err),
        }),
        {
          status: 500,
          headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
    }
  },
};

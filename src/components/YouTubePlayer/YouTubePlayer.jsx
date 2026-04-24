import { useState } from 'react';
import { getYouTubeId } from '../../data/films';
import styles from './YouTubePlayer.module.css';

// Reusable YouTube thumbnail-click-to-play component.
// Matches the FilmModal video styling (rounded, pink play button, watch label).
export default function YouTubePlayer({
  url,
  videoId: videoIdProp,
  title = 'YouTube video',
  label = '',
  thumbnail,
}) {
  const videoId = videoIdProp || getYouTubeId(url);
  const [active, setActive] = useState(false);

  if (!videoId) return null;

  const thumbSrc =
    thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={styles.playerWrap}>
      {active ? (
        <iframe
          className={styles.playerIframe}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.thumbnailBtn}
          onClick={() => setActive(true)}
          aria-label={`${label || 'Play'} — ${title}`}
        >
          <img
            src={thumbSrc}
            alt=""
            className={styles.thumbnailImg}
            onError={(e) => {
              // maxresdefault 404s for videos without a max-res upload.
              // hqdefault always exists. Fallback chain: maxres → hq.
              if (!e.currentTarget.dataset.fallback) {
                e.currentTarget.dataset.fallback = '1';
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
          <span className={styles.playIcon}>
            <i className="fa-solid fa-play" />
          </span>
          {label && <span className={styles.playLabel}>{label}</span>}
        </button>
      )}
    </div>
  );
}

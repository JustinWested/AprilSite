import { useState } from 'react';
import { getYouTubeId } from '../../data/films';
import styles from './YouTubePlayer.module.css';

const QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];

// Gradient fallback shown when all thumbnail qualities fail to load.
const FALLBACK_GRADIENT =
  'linear-gradient(135deg, #A1C3D1 0%, #B39BC8 50%, #E64398 100%)';

export default function YouTubePlayer({
  url,
  videoId: videoIdProp,
  title = 'YouTube video',
  label = '',
  thumbnail,
}) {
  const videoId = videoIdProp || getYouTubeId(url);
  const [active,      setActive]      = useState(false);
  const [qualityIdx,  setQualityIdx]  = useState(0);
  const [thumbFailed, setThumbFailed] = useState(false);

  if (!videoId) return null;

  // If a custom thumbnail is provided, use it directly (no fallback chain needed).
  const thumbSrc = thumbnail
    ? thumbnail
    : `https://img.youtube.com/vi/${videoId}/${QUALITIES[qualityIdx]}.jpg`;

  function handleThumbError() {
    if (qualityIdx < QUALITIES.length - 1) {
      setQualityIdx((prev) => prev + 1);
    } else {
      setThumbFailed(true);
    }
  }

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
          {thumbFailed ? (
            <div
              className={styles.thumbnailImg}
              style={{ background: FALLBACK_GRADIENT }}
            />
          ) : (
            <img
              src={thumbSrc}
              alt=""
              className={styles.thumbnailImg}
              onError={handleThumbError}
            />
          )}
          <span className={styles.playIcon}>
            <i className="fa-solid fa-play" />
          </span>
          {label && <span className={styles.playLabel}>{label}</span>}
        </button>
      )}
    </div>
  );
}

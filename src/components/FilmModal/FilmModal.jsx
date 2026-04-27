import { useEffect, useState } from 'react';
import { getYouTubeId } from '../../data/films';
import styles from './FilmModal.module.css';

const THUMB_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];
const FALLBACK_GRADIENT =
  'linear-gradient(135deg, #A1C3D1 0%, #B39BC8 50%, #E64398 100%)';

export default function FilmModal({ film, onClose }) {
  const [playerActive, setPlayerActive] = useState(false);
  const [thumbQualIdx, setThumbQualIdx] = useState(0);
  const [thumbFailed,  setThumbFailed]  = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Reset player + thumbnail state when film changes
  useEffect(() => {
    setPlayerActive(false);
    setThumbQualIdx(0);
    setThumbFailed(false);
  }, [film?.id]);

  if (!film) return null;

  const videoId = getYouTubeId(film.trailerUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/${THUMB_QUALITIES[thumbQualIdx]}.jpg`
    : null;

  function handleThumbError() {
    if (thumbQualIdx < THUMB_QUALITIES.length - 1) {
      setThumbQualIdx((prev) => prev + 1);
    } else {
      setThumbFailed(true);
    }
  }

  const hasYouTube = Boolean(videoId);
  const hasExternalTrailer = Boolean(film.trailerUrl) && !hasYouTube;
  const watchLabel = film.watchLabel || 'Watch';

  const hasAccolades = film.accolades && film.accolades.length > 0;
  const hasPress = film.pressLinks && film.pressLinks.length > 0;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={film.title}
      >
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark" />
        </button>

        {/* ── Top two-column layout ── */}
        <div className={styles.topGrid}>
          {/* Left — poster */}
          <div className={styles.posterWrap}>
            <img src={film.posterSrc} alt={`${film.title} poster`} className={styles.poster} />
          </div>

          {/* Right — title, credit, video, synopsis, genres */}
          <div className={styles.info}>
            <h2 className={styles.title}>{film.title}</h2>
            {film.aprilCredit && (
              <p className={styles.aprilCredit}>{film.aprilCredit}</p>
            )}

            {/* Video / trailer — YouTube thumbnail or external link button */}
            {hasYouTube && (
              <>
                <div className={styles.playerWrap}>
                  {playerActive ? (
                    <iframe
                      className={styles.playerIframe}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      title={`${film.title} — ${watchLabel}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      className={styles.thumbnailBtn}
                      onClick={() => setPlayerActive(true)}
                      aria-label={`${watchLabel} for ${film.title}`}
                    >
                      {thumbFailed ? (
                        <div
                          className={styles.thumbnailImg}
                          style={{ background: FALLBACK_GRADIENT }}
                        />
                      ) : (
                        <img
                          src={thumbnailUrl}
                          alt=""
                          className={styles.thumbnailImg}
                          onError={handleThumbError}
                          onLoad={(e) => {
                            // YouTube returns a 120x90 gray placeholder
                            // (HTTP 200) when a quality doesn't exist —
                            // onError never fires. Detect by size.
                            if (
                              e.target.naturalWidth === 120 &&
                              e.target.naturalHeight === 90
                            ) {
                              handleThumbError();
                            }
                          }}
                        />
                      )}
                      <span className={styles.playIcon}>
                        <i className="fa-solid fa-play" />
                      </span>
                      <span className={styles.playLabel}>{watchLabel}</span>
                    </button>
                  )}
                </div>
              </>
            )}

            {hasExternalTrailer && film.trailerThumbnail && (
              <div className={styles.playerWrap}>
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.thumbnailBtn}
                  aria-label={`${watchLabel} for ${film.title} (opens in new tab)`}
                >
                  <img src={film.trailerThumbnail} alt="" className={styles.thumbnailImg} />
                  <span className={styles.playIcon}>
                    <i className="fa-solid fa-play" />
                  </span>
                  <span className={styles.playLabel}>{watchLabel}</span>
                </a>
              </div>
            )}

            {film.synopsis && (
              <p className={styles.synopsis}>{film.synopsis}</p>
            )}

            {film.genres && film.genres.length > 0 && (
              <div className={styles.genres}>
                {film.genres.map((g) => (
                  <span key={g} className={styles.genrePill}>{g}</span>
                ))}
              </div>
            )}

            {film.whereToWatch && (
              <a
                href={film.whereToWatch}
                target="_blank"
                rel="noopener noreferrer"
                className={`pill-btn ${styles.watchBtn}`}
              >
                Where to Watch
              </a>
            )}
          </div>
        </div>

        {/* ── Press (before Accolades) ── */}
        {hasPress && (
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Press</h3>
            <div className={styles.pressRow}>
              {film.pressLinks.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pressCard}
                >
                  <span className={styles.pressName}>{p.publication}</span>
                  <i className={`fa-solid fa-arrow-up-right-from-square ${styles.pressIcon}`} />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Accolades ── */}
        {hasAccolades && (
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Accolades</h3>
            <div className={styles.accoladesList}>
              {film.accolades.map((fest, idx) => (
                <div key={idx} className={styles.festival}>
                  <h4 className={styles.festivalName}>{fest.festivalName}</h4>
                  <ul className={styles.awardList}>
                    {fest.wins?.map((w, i) => (
                      <li key={`w-${i}`} className={styles.awardRow}>
                        <i className={`fa-solid fa-star ${styles.iconWin}`} />
                        <span><strong>Winner —</strong> {w}</span>
                      </li>
                    ))}
                    {fest.nominations?.map((n, i) => (
                      <li key={`n-${i}`} className={styles.awardRow}>
                        <i className={`fa-regular fa-circle-dot ${styles.iconNom}`} />
                        <span><strong>Nominated —</strong> {n}</span>
                      </li>
                    ))}
                    {fest.officialSelections?.map((o, i) => (
                      <li key={`o-${i}`} className={styles.awardRow}>
                        <i className={`fa-solid fa-circle-check ${styles.iconOfficial}`} />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Full-bleed banner at very bottom ── */}
        {film.bannerSrc && (
          <div className={styles.bannerWrap}>
            <img src={film.bannerSrc} alt="" className={styles.bannerImg} />
          </div>
        )}
      </div>
    </div>
  );
}

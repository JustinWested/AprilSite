import { useEffect } from 'react';
import styles from './FilmModal.module.css';

export default function FilmModal({ film, onClose }) {
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

  if (!film) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className={styles.layout}>
          <div className={styles.posterWrap}>
            <img src={film.poster} alt={film.title} className={styles.poster} />
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{film.title}</h2>

            {film.logline && (
              <p className={styles.logline}>{film.logline}</p>
            )}

            {film.accolades && film.accolades.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionLabel}>Accolades</h3>
                <ul className={styles.accoladeList}>
                  {film.accolades.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {film.credits && (
              <div className={styles.section}>
                <h3 className={styles.sectionLabel}>Credits</h3>
                <p className={styles.credits}>{film.credits}</p>
              </div>
            )}

            {film.watchLink && (
              <a
                href={film.watchLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`pill-btn ${styles.watchBtn}`}
              >
                Where to Watch
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

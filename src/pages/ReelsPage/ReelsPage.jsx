import { useEffect, useRef, useState } from 'react';
import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import styles from './ReelsPage.module.css';

const reels = [
  {
    title: 'The Party D&D Series Highlight Reel',
    genre: 'comedy',
    genreLabel: 'Comedy',
    description: 'Comedy highlights from The Party D&D webseries',
    videoId: 'G3z8xAggZtw',
  },
  {
    title: 'The Party D&D Series Highlight Reel',
    genre: 'dramatic',
    genreLabel: 'Dramatic',
    description: 'Dramatic highlights from The Party D&D webseries',
    videoId: 'Br0LS_ptzuk',
  },
  {
    title: 'Acting Reel',
    genre: 'acting',
    genreLabel: 'Acting',
    description: 'General acting reel',
    videoId: 'dpw4OI_nvZg',
  },
  {
    title: 'Murder Made Me Famous Highlight Reel',
    genre: 'character',
    genreLabel: 'Character',
    description: 'Highlights from Murder Made Me Famous',
    videoId: 'E1vdluSESMU',
  },
  {
    title: 'Sketch Reel',
    genre: 'sketch',
    genreLabel: 'Sketch',
    description: 'Sketch comedy performance reel',
    videoId: 'kvPVf9H4TUM',
  },
];

export default function ReelsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  // IntersectionObserver — only active on desktop
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-40% 0px -40% 0px' }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Progress bar — tracks scroll through the scroll container
  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgress(pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeReel = reels[activeIdx];

  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      {/* Thin vertical progress indicator on the far left */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ height: `${progress}%` }}
        />
      </div>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Reels</h1>
        <p className={styles.heroSub}>
          Scroll through to watch. Each reel is a different flavor.
        </p>
      </section>

      <section ref={containerRef} className={styles.scrollSection}>
        <div className={styles.grid}>
          {/* Left column — scrolling labels */}
          <div className={styles.labelsCol}>
            {reels.map((reel, i) => (
              <div
                key={i}
                ref={(el) => (sectionRefs.current[i] = el)}
                data-idx={i}
                className={`${styles.labelSection} ${
                  activeIdx === i ? styles.active : ''
                }`}
              >
                <div className={styles.labelInner}>
                  <span className={styles.num}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className={styles.reelTitle}>{reel.title}</h2>
                  <span
                    className={`${styles.genrePill} ${styles[`genre_${reel.genre}`]}`}
                  >
                    {reel.genreLabel}
                  </span>
                  <p className={styles.desc}>{reel.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column — sticky player */}
          <div className={styles.videoCol}>
            <div className={styles.stickyPlayer}>
              <div
                key={activeReel.videoId}
                className={`${styles.playerFrame} ${styles[`glow_${activeReel.genre}`]}`}
              >
                <YouTubePlayer
                  videoId={activeReel.videoId}
                  title={activeReel.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile stack — simple vertical list, no sticky */}
      <section className={styles.mobileStack}>
        {reels.map((reel, i) => (
          <div key={i} className={styles.mobileCard}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <h2 className={styles.reelTitle}>{reel.title}</h2>
            <span
              className={`${styles.genrePill} ${styles[`genre_${reel.genre}`]}`}
            >
              {reel.genreLabel}
            </span>
            <p className={styles.desc}>{reel.description}</p>
            <div className={`${styles.mobilePlayer} ${styles[`glow_${reel.genre}`]}`}>
              <YouTubePlayer videoId={reel.videoId} title={reel.title} />
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

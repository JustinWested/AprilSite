import { useEffect, useRef, useState, useCallback } from 'react';
import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import styles from './ReelsPage.module.css';

const reels = [
  {
    title: 'The Party D&D Series Highlight Reel',
    genreLabel: 'Comedy',
    videoId: 'G3z8xAggZtw',
  },
  {
    title: 'The Party D&D Series Highlight Reel',
    genreLabel: 'Dramatic',
    videoId: 'Br0LS_ptzuk',
  },
  {
    title: 'Acting Reel',
    genreLabel: 'Acting',
    videoId: 'dpw4OI_nvZg',
  },
  {
    title: 'Murder Made Me Famous Highlight Reel',
    genreLabel: 'Character',
    videoId: 'E1vdluSESMU',
  },
  {
    title: 'Sketch Reel',
    genreLabel: 'Sketch',
    videoId: 'kvPVf9H4TUM',
  },
];

export default function ReelsPage() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [progress,  setProgress]    = useState(0);
  const [showHint,  setShowHint]    = useState(true);

  const sectionRefs  = useRef([]);
  const containerRef = useRef(null);

  // ── IntersectionObserver — fires when a section crosses the viewport midpoint ──
  // threshold:0 + rootMargin '-49% 0px -49%' creates a 2% strip at dead-center.
  // Any section that enters that strip becomes active.
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIdx(Number(entry.target.dataset.idx));
          }
        });
      },
      { threshold: 0, rootMargin: '-49% 0px -49% 0px' }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Scroll snap on html element — proximity so it doesn't fight the observer ──
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    document.documentElement.style.scrollSnapType = 'y proximity';
    return () => {
      document.documentElement.style.scrollSnapType = '';
    };
  }, []);

  // ── Left-edge progress bar ──
  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const pct   = Math.max(0, Math.min(100, (-rect.top / total) * 100));
      setProgress(pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll hint — hide after 50px, remove listener immediately ──
  useEffect(() => {
    function onFirstScroll() {
      if (window.scrollY > 50) {
        setShowHint(false);
        window.removeEventListener('scroll', onFirstScroll);
      }
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, []);

  // ── Dot click — smooth scroll section into vertical center ──
  const scrollToReel = useCallback((i) => {
    const el = sectionRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const activeReel = reels[activeIdx];

  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      {/* Left-edge scroll progress line */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressFill} style={{ height: `${progress}%` }} />
      </div>

      {/* Right-edge progress dots */}
      <nav className={styles.dotNav} aria-label="Reel navigation">
        {reels.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${activeIdx === i ? styles.dotActive : ''}`}
            onClick={() => scrollToReel(i)}
            aria-label={`Go to reel ${i + 1}`}
          />
        ))}
      </nav>

      {/* Scroll hint — fades out after first scroll */}
      <div className={`${styles.scrollHint} ${showHint ? '' : styles.scrollHintHidden}`} aria-hidden="true">
        <span className={styles.scrollHintText}>scroll to explore</span>
        <i className={`fa-solid fa-chevron-down ${styles.scrollHintChevron}`} />
      </div>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Reels</h1>
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
                className={`${styles.labelSection} ${activeIdx === i ? styles.active : ''} ${i === 0 ? styles.firstSection : ''}`}
              >
                <div className={styles.labelInner}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <h2 className={styles.reelTitle}>{reel.title}</h2>
                  <span className={styles.genrePill}>{reel.genreLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right column — sticky player */}
          <div className={styles.videoCol}>
            <div className={styles.stickyPlayer}>
              <div key={activeReel.videoId} className={styles.playerFrame}>
                <YouTubePlayer videoId={activeReel.videoId} title={activeReel.title} />
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
            <span className={styles.genrePill}>{reel.genreLabel}</span>
            <div className={styles.mobilePlayer}>
              <YouTubePlayer videoId={reel.videoId} title={reel.title} />
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Carousel.module.css';

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);
  const thumbRef = useRef(null);

  const goTo = useCallback((index, fromAuto = false) => {
    if (index === current && !fromAuto) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 350);
  }, [current]);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % slides.length;
        setFading(true);
        setTimeout(() => {
          setCurrent(next);
          setFading(false);
        }, 350);
        return c;
      });
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  // Scroll the thumb STRIP to keep active thumb visible — never touches the page scroll
  useEffect(() => {
    const strip = thumbRef.current;
    if (!strip) return;
    const active = strip.children[current];
    if (!active) return;
    const stripLeft = strip.scrollLeft;
    const stripWidth = strip.clientWidth;
    const thumbLeft = active.offsetLeft;
    const thumbRight = thumbLeft + active.offsetWidth;
    if (thumbLeft < stripLeft) {
      strip.scrollLeft = thumbLeft - 8;
    } else if (thumbRight > stripLeft + stripWidth) {
      strip.scrollLeft = thumbRight - stripWidth + 8;
    }
  }, [current]);

  function handleMouseEnter() {
    clearInterval(intervalRef.current);
  }

  function handleMouseLeave() {
    startInterval();
  }

  function handleManualNav(index) {
    clearInterval(intervalRef.current);
    goTo(index);
    startInterval();
  }

  const slide = slides[current];

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer capsule: image on top, info panel on bottom */}
      <div className={styles.capsule}>

        {/* Main image — square bottom edge, capsule rounds the top */}
        <div className={styles.imageWrap}>
          <img
            key={current}
            src={slide.image}
            alt={slide.title}
            className={`${styles.mainImage}${fading ? ' ' + styles.fading : ''}`}
          />
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => handleManualNav((current - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => handleManualNav((current + 1) % slides.length)}
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* Info panel — square top edge, capsule rounds the bottom */}
        <div className={styles.infoPanel}>
          <p className={styles.slideTitle}>{slide.title}</p>
          <div
            className={styles.slideText}
            dangerouslySetInnerHTML={{ __html: slide.html }}
          />
          <div className={styles.thumbStrip} ref={thumbRef}>
            {slides.map((s, i) => (
              <div
                key={i}
                className={`${styles.thumb}${i === current ? ' ' + styles.active : ''}`}
                onClick={() => handleManualNav(i)}
                role="button"
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleManualNav(i)}
              >
                <img src={s.image} alt={s.title} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const FALLBACK_IMG = '/images/fallback.webp';
const VIDEO_SRC = '/images/Headerlq.mp4';

/**
 * Hero header with a background video and a robust still-image fallback.
 *
 * Why this is more involved than a `<video poster>`: iOS Low Power Mode
 * (and some battery-saving modes on Android) silently block autoplay
 * even for muted + playsInline videos. The native `poster` attribute
 * disappears as soon as the video element loads metadata, so the user
 * ends up staring at a black frame with the OS play-button glyph.
 *
 * Strategy:
 *   1. Render the video normally and call .play() in an effect.
 *   2. If the play() promise rejects (autoplay blocked) → swap to <img>.
 *   3. After playback starts, listen for an *unexpected* pause/suspend
 *      (i.e. one that wasn't triggered by tab visibility change) and
 *      also swap to <img>. iOS dropping into Low Power mid-session
 *      surfaces here.
 *   4. Any `error` event on the video also swaps to <img>.
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [useFallback, setUseFallback] = useState(false);
  // Track whether the video ever successfully started. Before it
  // starts, a pause event is meaningless (the video hasn't begun yet).
  const startedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function showFallback() {
      setUseFallback(true);
    }

    function handlePlaying() {
      startedRef.current = true;
    }

    function handlePause() {
      // Ignore pauses caused by the tab being backgrounded — the video
      // will resume on its own when the tab is visible again.
      if (document.hidden) return;
      // Ignore pauses that happen before we've ever started playing
      // (these are spurious during initial buffering).
      if (!startedRef.current) return;
      // An unexpected pause while the tab is visible = battery saver
      // suspending playback. Swap to the still image.
      showFallback();
    }

    function handleError() {
      showFallback();
    }

    // Try to start playback. Catch the AbortError/NotAllowedError that
    // Low Power Mode throws and fall back immediately.
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(showFallback);
    }

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    // Some Safari builds emit `suspend` instead of `pause` when iOS
    // blocks playback mid-stream.
    video.addEventListener('suspend', () => {
      if (startedRef.current && !document.hidden && video.paused) {
        showFallback();
      }
    });

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {useFallback ? (
        <img
          className={styles.video}
          src={FALLBACK_IMG}
          alt="April Yanko"
        />
      ) : (
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          // The poster still helps for the brief moment before our
          // effect runs — it just isn't sufficient on its own.
          poster={FALLBACK_IMG}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.name}>APRIL YANKO</h1>
        <p className={styles.tagline}>Actor | Writer | Overall Weirdo</p>
      </div>
    </section>
  );
}

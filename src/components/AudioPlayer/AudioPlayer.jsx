import { useEffect, useRef, useState } from 'react';
import styles from './AudioPlayer.module.css';

function formatTime(s) {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

// Custom audio player. Pass `id`, `activeId`, `onPlay` to coordinate
// single-track playback across multiple instances.
export default function AudioPlayer({ src, id, activeId, onPlay }) {
  const audioRef = useRef(null);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);

  // Pause this player whenever another instance becomes active
  useEffect(() => {
    if (activeId !== id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [activeId, id, isPlaying]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      onPlay?.(id);
    }
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, pct)) * duration;
  }

  const fillPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={(e)     => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      <button
        type="button"
        className={styles.playBtn}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <i className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} />
      </button>

      <div className={styles.right}>
        <div
          className={styles.progressBar}
          onClick={handleSeek}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
        >
          <div className={styles.progressFill} style={{ width: `${fillPct}%` }} />
        </div>
        <div className={styles.times}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

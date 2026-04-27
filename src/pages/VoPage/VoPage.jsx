import { useState } from 'react';
import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import styles from './VoPage.module.css';

// ── Audio demos ──
const demos = [
  { id: 'commercial', title: 'Commercial',         src: '/images/audio/1 Minute Demo.mp3' },
  { id: 'animation',  title: 'Animation',          src: '/images/audio/Animation Demo.mp3' },
  { id: 'vex',        title: 'Vex Robotics Sample', src: '/images/audio/Vex Demo.mp3' },
];

// ── Featured podcasts ──
const podcasts = [
  {
    title: 'The Last Magician',
    image: '/images/The Last Magician.webp',
    href:  'https://open.spotify.com/episode/5F4tMaIzsVWtgYy8D4L9pz?si=8bb2e037589544a1&nd=1',
  },
  {
    title: 'Venice Magic Shop',
    image: '/images/Venice Magic Shop.webp',
    href:  'https://thesavvycreative.libsyn.com/storytime-the-last-magician-part-v',
  },
];

// ── Video work ──
// Order is interleaved [L1, R1, L2, R2, L3, R3] so a 2-col grid renders
// columns correctly on desktop and stacks in the requested interleaved
// order on mobile (single column).
const videos = [
  // Row 1
  { title: 'Caves & Creatures: S1E1',                kind: 'youtube', videoId: 'D_3In7YQP2U' },
  { title: 'VEXcode V5 Blocks Getting Started Tutorial', kind: 'youtube', videoId: 'O2hpi0TrYAE' },
  // Row 2
  { title: 'VEXGO Wait Until True',                  kind: 'youtube', videoId: 'u9TqG2f99xs' },
  { title: 'Trocaire College',                       kind: 'youtube', videoId: 'TOTAYcSGR0I' },
  // Row 3
  { title: 'Wrecking Crew Media Intro',              kind: 'vimeo',   src: 'https://player.vimeo.com/video/289107365?h=2bbfd6648a' },
  { title: 'A Helpful PSA',                          kind: 'youtube', videoId: 't-ySTMBqoTg' },
];

export default function VoPage() {
  const [activeAudio, setActiveAudio] = useState(null);

  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Voice Over</h1>
      </section>

      {/* ── Section 1: Audio Demos ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Audio Demos</h3>
        <div className={styles.demosGrid}>
          {demos.map((demo) => (
            <div key={demo.id} className={styles.demoCard}>
              <h4 className={styles.demoTitle}>{demo.title}</h4>
              <AudioPlayer
                id={demo.id}
                src={demo.src}
                activeId={activeAudio}
                onPlay={setActiveAudio}
              />
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 2: Testimonial ── */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialCard}>
          <p className={styles.quote}>
            April is the voice of VEXcode for K-12, and her voice is upbeat,
            inviting, and clear. She is a true professional who delivers high
            quality recordings in a timely manner. We highly recommend her.
          </p>
          <p className={styles.attribution}>
            — Jason McKenna, VEX Robotics, Director of Global Education Strategy
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 3: Featured Podcasts ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Featured Podcasts</h3>
        <div className={styles.podcastGrid}>
          {podcasts.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.podcastCard}
            >
              <div className={styles.podcastImageWrap}>
                <img src={p.image} alt={p.title} className={styles.podcastImage} />
              </div>
              <span className={styles.podcastTitle}>{p.title}</span>
            </a>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 4: Video Work ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Video Work</h3>
        <div className={styles.videoGrid}>
          {videos.map((v, i) => (
            <div key={i} className={styles.videoCard}>
              <h4 className={styles.videoTitle}>{v.title}</h4>
              {v.kind === 'youtube' ? (
                <div className={styles.videoEmbed}>
                  <YouTubePlayer videoId={v.videoId} title={v.title} />
                </div>
              ) : (
                <div className={`${styles.videoEmbed} ${styles.vimeoWrap}`}>
                  <iframe
                    className={styles.vimeoFrame}
                    src={v.src}
                    title={v.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />
      <Footer />
    </div>
  );
}

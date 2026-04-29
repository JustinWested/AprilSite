import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import styles from './ReelsPage.module.css';

// Reels grid: 2 columns on desktop, 1 column on mobile. The last item
// (Dramatic Reel) gets `wide: true` and spans the full row at the
// bottom. Order matters — the array drives left-to-right, top-to-bottom
// placement on desktop and the vertical stacking order on mobile.
const reels = [
  {
    title: 'The Party D&D Series Highlight Reel — Dramatic',
    videoId: 'Br0LS_ptzuk',
  },
  {
    title: 'Murder Made Me Famous Highlight Reel',
    videoId: 'E1vdluSESMU',
  },
  {
    title: 'The Party D&D Series Highlight Reel — Comedy',
    videoId: 'G3z8xAggZtw',
  },
  {
    title: 'Sketch Reel',
    videoId: 'kvPVf9H4TUM',
  },
  {
    // Same YouTube ID as the prior "Acting Reel" — display title only
    // changed per request.
    title: 'Dramatic Reel',
    videoId: 'dpw4OI_nvZg',
    wide: true,
  },
];

export default function ReelsPage() {
  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Reels</h1>
        <a
          href="https://resumes.actorsaccess.com/aprilyanko"
          target="_blank"
          rel="noopener noreferrer"
          className={`pill-btn ${styles.actorsAccessBtn}`}
        >
          More clips at Actors Access
          <i className="fa-solid fa-arrow-up-right-from-square" />
        </a>
      </section>

      <section className={styles.reelsGrid}>
        {reels.map((reel, i) => (
          <div
            key={i}
            className={`${styles.reelCard} ${reel.wide ? styles.reelCardWide : ''}`}
          >
            <div className={styles.playerFrame}>
              <YouTubePlayer videoId={reel.videoId} title={reel.title} />
            </div>
            <h2 className={styles.reelTitle}>{reel.title}</h2>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

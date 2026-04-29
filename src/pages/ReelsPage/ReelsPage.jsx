import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import styles from './ReelsPage.module.css';

// The Party reels skip the genre pill — the title alone already
// communicates Comedy / Dramatic.
const reels = [
  {
    title: 'The Party D&D Series Highlight Reel — Comedy',
    videoId: 'G3z8xAggZtw',
  },
  {
    title: 'The Party D&D Series Highlight Reel — Dramatic',
    videoId: 'Br0LS_ptzuk',
  },
  {
    title: 'Acting Reel',
    genreLabel: 'Acting',
    videoId: 'dpw4OI_nvZg',
  },
  {
    title: 'Murder Made Me Famous Highlight Reel',
    genreLabel: 'TV',
    videoId: 'E1vdluSESMU',
  },
  {
    title: 'Sketch Reel',
    genreLabel: 'Sketch',
    videoId: 'kvPVf9H4TUM',
  },
];

export default function ReelsPage() {
  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Reels</h1>
        <p className={styles.heroSub}>Actor | Comedian | Sketch Writer</p>
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
          <div key={i} className={styles.reelCard}>
            <div className={styles.playerFrame}>
              <YouTubePlayer videoId={reel.videoId} title={reel.title} />
            </div>
            <h2 className={styles.reelTitle}>{reel.title}</h2>
            {reel.genreLabel && (
              <span className={styles.genrePill}>{reel.genreLabel}</span>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

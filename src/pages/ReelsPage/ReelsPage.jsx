import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import styles from './ReelsPage.module.css';

const reels = [
  {
    title: 'The Party — Comedic Reel',
    genreLabel: 'Comedy',
    videoId: 'G3z8xAggZtw',
  },
  {
    title: 'The Party — Dramatic Reel',
    genreLabel: 'Dramatic',
    videoId: 'Br0LS_ptzuk',
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
      </section>

      <section className={styles.reelsGrid}>
        {reels.map((reel, i) => (
          <div key={i} className={styles.reelCard}>
            <div className={styles.playerFrame}>
              <YouTubePlayer videoId={reel.videoId} title={reel.title} />
            </div>
            <h2 className={styles.reelTitle}>{reel.title}</h2>
            <span className={styles.genrePill}>{reel.genreLabel}</span>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/fallback.webp"
      >
        <source src="/images/Headerlq.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.name}>APRIL YANKO</h1>
        <p className={styles.tagline}>Actor | Writer | Overall Weirdo</p>
      </div>
    </section>
  );
}

import { useState } from 'react';
import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Hero from '../../components/Hero/Hero';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import FilmModal from '../../components/FilmModal/FilmModal';
import Footer from '../../components/Footer/Footer';
import SubstackFeed from '../../components/SubstackFeed/SubstackFeed';
import SubstackSubscribe from '../../components/SubstackSubscribe/SubstackSubscribe';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import { films } from '../../data/films';
import styles from './HomePage.module.css';

// News items reference a film by id — clicking opens that film's modal.
const newsItems = [
  {
    headline: 'Butt Stuff premieres at Dances With Films at the historic TCL Chinese Theater in Los Angeles',
    filmId: 'buttstuff',
  },
  {
    headline: 'Pulling the Plug on Mom nominated for Best Comedy at Cannes Shorts',
    filmId: 'pullingplugmom',
  },
  {
    headline: 'Murder is on the Table wins Best Writing at LA 48 Hour Film Festival',
    filmId: 'murder',
  },
  {
    headline: 'Bite Me wins Audience Choice and Best Graphics at 48 Horror/Comedy Film Project',
    filmId: 'biteme',
  },
];

export default function HomePage() {
  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      {/* ── Section 1: Hero ── */}
      <Hero />

      {/* ── Section 2: Bio / News / Substack ── */}
      <section className={styles.bioSection}>
        <div className={styles.bioGrid}>
          {/* Left — headshot */}
          <div className={styles.bioLeft}>
            <img
              src="/images/hero.webp"
              alt="April Yanko"
              className={styles.bioPhoto}
            />
          </div>

          {/* Center — bio + news */}
          <div className={styles.bioCenter}>
            <p className={styles.bioText}>
              Hi I am April Yanko. I am a mother of cats and eater of pasta. You
              may find me around the web under &ldquo;post march,&rdquo; which is
              a small riddle, not a Post Malone reference.
            </p>

            <h3 className={styles.newsLabel}>Recent News</h3>
            <div className={styles.newsList}>
              {newsItems.map((item, i) => {
                const film = films.find((f) => f.id === item.filmId);
                return (
                  <button
                    type="button"
                    key={i}
                    className={`frosted-card ${styles.newsCard}`}
                    onClick={() => film && setSelectedFilm(film)}
                  >
                    <span className={styles.newsHeadline}>{item.headline}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — Substack */}
          <div className={styles.bioRight}>
            <h3 className={styles.blogLabel}>From the Blog</h3>
            <SubstackFeed count={2} />
            <SubstackSubscribe variant="light" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 3: Filmmaker Reel ── */}
      <section className={styles.reelSection}>
        <h3 className={styles.sectionLabel}>filmmaker reel</h3>
        <div className={styles.reelWrap}>
          <YouTubePlayer
            videoId="kvPVf9H4TUM"
            title="April Yanko — Filmmaker Reel"
            label=""
          />
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 4: Films ── */}
      <section className={styles.filmsSection}>
        <h3 className={styles.sectionLabel}>films</h3>
        <div className={styles.posterRow}>
          {films.map((film) => (
            <button
              key={film.id}
              className={styles.posterBtn}
              onClick={() => setSelectedFilm(film)}
              aria-label={`View details for ${film.title}`}
            >
              <img src={film.posterSrc} alt={film.title} className={styles.posterImg} />
            </button>
          ))}
        </div>
      </section>

      {selectedFilm && (
        <FilmModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />
      )}

      <SectionDivider />

      {/* ── Section 5: Contact ── */}
      <section className={styles.contactSection}>
        <div className={styles.contactGrid}>
          <div className={styles.contactLeft}>
            <img
              src="/images/aprilfilmapalooza.png"
              alt="April Yanko"
              className={styles.contactPhoto}
            />
          </div>
          <div className={`frosted-card ${styles.contactCard}`}>
            <h2 className={styles.contactHeading}>Call me, beep me</h2>
            <p className={styles.contactSub}>
              ...or just email me because that&rsquo;s what this is for.
            </p>
            <form
              action="https://aprilyanko.us12.list-manage.com/subscribe/post?u=a77f48c271656e6046f2833df&id=1cd0d2c44e&f_id=00b2b7e0f0"
              method="post"
              target="_blank"
              className={styles.contactForm}
            >
              <div className={styles.field}>
                <label htmlFor="mce-EMAIL" className={styles.label}>
                  Email Address <span className={styles.req}>*</span>
                </label>
                <p className={styles.helper}>What&rsquo;s your email?</p>
                <input
                  type="email"
                  name="EMAIL"
                  id="mce-EMAIL"
                  required
                  className="pill-input"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="mce-NAME" className={styles.label}>
                  Who are you?
                </label>
                <p className={styles.helper}>Who who, who who.</p>
                <input
                  type="text"
                  name="NAME"
                  id="mce-NAME"
                  className="pill-input"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="mce-WHAT" className={styles.label}>
                  What brings you here?
                </label>
                <input
                  type="text"
                  name="WHAT"
                  id="mce-WHAT"
                  className="pill-input"
                />
              </div>
              {/* Bot trap */}
              <input
                type="text"
                name="b_a77f48c271656e6046f2833df_1cd0d2c44e"
                tabIndex="-1"
                style={{ position: 'absolute', left: '-5000px' }}
                aria-hidden="true"
              />
              <button type="submit" className={`pill-btn ${styles.submitBtn}`}>
                To April, away!
              </button>
            </form>
          </div>
        </div>
      </section>

      <SectionDivider />
      <Footer />
    </div>
  );
}

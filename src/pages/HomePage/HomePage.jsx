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

// Recent Press list — every item is an external article (open in a new tab).
const pressItems = [
  {
    headline:
      "Morbidly Beautiful calls Yanko's film Butt Stuff a “sweet, funny, wonderfully weird short that will leave you grinning from ear to ear”",
    link: 'https://morbidlybeautiful.com/genreblast-2023-horror-comedy-shorts/',
  },
  {
    headline:
      'VisionRey snags 2 spots in the exclusive Filmapalooza with two films written by April Yanko, fresh off her Best Writer and Best Film win',
    link: 'https://www.indieactivity.com/visionrey-snags-acceptance-for-2-films-at-filmapalooza/',
  },
  {
    headline:
      "Gaming Trend: “April Yanko's type-A attempts to find order in the chaos that is tabletop roleplay creates endless hilarity”",
    link: 'https://gamingtrend.com/interviews/bringing-the-psychology-of-tabletop-to-screen-with-dd-web-sitcom-the-party/',
  },
  {
    headline:
      'Paste Magazine ICYMI: D&D Web Series The Party Is a Delightful Tabletop Romp',
    link: 'https://www.pastemagazine.com/tv/what-to-watch/the-party-web-series-dnd-cast-underrated-tv-shows-to-stream',
  },
  {
    headline:
      "Geek Mom: ‘The Party’ Is the Tabletop Web Series Heir to ‘The Guild’ and ‘LARPs’",
    link: 'https://geekmom.com/2023/04/the-party-is-the-tabletop-web-series-heir-to-the-guild-and-larps/',
  },
  {
    headline: "‘this is a garden’ reaches 30k+ views on YouTube",
    link: 'https://www.youtube.com/watch?v=b4eXILF8CIE',
  },
];

export default function HomePage() {
  const [selectedFilm, setSelectedFilm] = useState(null);

  // Helper for inline bio links that should open a film modal.
  function openFilm(id) {
    const film = films.find((f) => f.id === id);
    if (film) setSelectedFilm(film);
  }

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
              April Yanko is a filmmaker whose work pairs irreverent, lowbrow humor
              with dry, self-aware wit to make the uncomfortable something you can
              laugh at instead of turn away from.
            </p>
            <p className={styles.bioText}>
              Her short{' '}
              <button
                type="button"
                className={styles.bioLink}
                onClick={() => openFilm('buttstuff')}
              >
                “Butt Stuff”
              </button>{' '}
              debuted at Dances with Films at the TCL Chinese Theatre, and her
              films have since screened at Austin Revolution, Broad Humor, and
              GenreBlast. Most recently, she screened a short film at the Cannes
              Film Festival Short Film Corner via the 48HFP&rsquo;s curated
              selection from the worldwide Yes We Cannes competition. Her debut
              film,{' '}
              <button
                type="button"
                className={styles.bioLink}
                onClick={() => openFilm('thisisagarden')}
              >
                “this is a garden,”
              </button>{' '}
              was noted for its &lsquo;authentic and sincere LGBTQ+
              storytelling,&rsquo; and her work tends to live somewhere between
              heartfelt and super-effing weird.
            </p>
            <p className={styles.bioText}>
              She&rsquo;s studied sketch writing and improv at UCB and the Pack
              Theater under Sam Brown (Whitest Kids U&rsquo; Know), Keisha Zollar
              (Astronomy Club), and Eric Moneypenny (Eric Andre, Midnight Show),
              among others. April writes the Substack{' '}
              <a
                href="https://ferretwithaknife.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bioLink}
              >
                “Ferret with a Knife”
              </a>{' '}
              and performs sketch on the Pack house team{' '}
              <a
                href="https://www.youtube.com/playlist?list=PLMf0z8lyC0tO1-8fwdeGi8SvX-Lae8Y-R"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bioLink}
              >
                “Kickball.”
              </a>{' '}
              You can also catch her starring in{' '}
              <a
                href="https://www.youtube.com/watch?v=mLMrE2Im9vw"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bioLink}
              >
                “The Party,”
              </a>{' '}
              a D&amp;D webseries on YouTube.
            </p>
            <p className={styles.bioText}>
              All of her Neopets are alive and well.
            </p>

            <h3 className={styles.newsLabel}>Recent Press</h3>
            <div className={styles.newsList}>
              {pressItems.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`frosted-card ${styles.newsCard}`}
                >
                  <span className={styles.newsHeadline}>{item.headline}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Substack */}
          <div className={styles.bioRight}>
            <h3 className={styles.blogLabel}>Latest From Ferret With A Knife</h3>
            <SubstackFeed count={3} />
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
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactGrid}>
          <div className={styles.contactLeft}>
            <img
              src="/images/aprilyankopotato.jpeg"
              alt="April Yanko"
              className={styles.contactPhoto}
            />
          </div>
          <div className={`frosted-card ${styles.contactCard}`}>
            <h2 className={styles.contactHeading}>Call me, beep me</h2>
            <p className={styles.contactSub}>
              or just email me because that&rsquo;s what this is for.
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

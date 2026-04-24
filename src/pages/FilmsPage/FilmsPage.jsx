import { useState } from 'react';
import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import FilmModal from '../../components/FilmModal/FilmModal';
import { films } from '../../data/films';
import styles from './FilmsPage.module.css';

export default function FilmsPage() {
  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      <main className={styles.main}>
        <h1 className={styles.heading}>Films</h1>
        <p className={styles.subhead}>
          Click any poster for details, trailer, accolades, and press.
        </p>

        <div className={styles.grid}>
          {films.map((film) => (
            <button
              key={film.id}
              className={styles.posterBtn}
              onClick={() => setSelectedFilm(film)}
              aria-label={`View details for ${film.title}`}
            >
              <img
                src={film.posterSrc}
                alt={film.title}
                className={styles.posterImg}
              />
              <span className={styles.posterTitle}>{film.title}</span>
            </button>
          ))}
        </div>
      </main>

      {selectedFilm && (
        <FilmModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />
      )}

      <SectionDivider />
      <Footer />
    </div>
  );
}

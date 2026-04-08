import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const FOOTER_NAV = [
  { label: 'Home',             to: '/' },
  { label: 'Voice Over',       to: '/vo' },
  { label: 'Acting',           to: '/acting' },
  { label: 'Films',            to: '/films' },
  { label: 'Writing',          to: '/writing' },
  { label: 'Press & Podcasts', to: '/press' },
  { label: 'Contact',          to: '/contact' },
];

const SOCIAL_LINKS = [
  { icon: 'fa-brands fa-imdb',      href: 'https://www.imdb.com/',      label: 'IMDB' },
  { icon: 'fa-brands fa-threads',   href: 'https://www.threads.net/',   label: 'Threads' },
  { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/', label: 'Instagram' },
  { icon: 'fa-brands fa-youtube',   href: 'https://www.youtube.com/',   label: 'YouTube' },
];

function isActivePath(to, pathname) {
  if (to === '/') return pathname === '/';
  return pathname.startsWith(to);
}

export default function Footer() {
  const { pathname } = useLocation();

  function handleBackToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <div className={styles.socialIcons}>
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <i className={link.icon} />
              </a>
            ))}
            {/* Actors Access — custom image icon */}
            <a
              href="https://www.actorsaccess.com/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Actors Access"
            >
              <img
                src="/images/actorsaccess.webp"
                alt="Actors Access"
                className={styles.socialIconImg}
              />
            </a>
          </div>
          <img
            src="/images/hero.webp"
            alt="April Yanko headshot"
            className={styles.headshot}
          />
        </div>

        {/* Center column */}
        <div className={styles.centerCol}>
          <button
            className={styles.backToTop}
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <i className="fa-solid fa-arrow-up" />
          </button>

          <form
            className={styles.mailingForm}
            action="#"
            method="post"
            onSubmit={e => e.preventDefault()}
          >
            <p className={styles.mailingLabel}>Join my mailing list!</p>
            <input
              type="email"
              className={styles.emailInput}
              placeholder="your@email.com"
              name="EMAIL"
              required
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <ul className={styles.footerNav}>
            {FOOTER_NAV.map(item => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`${styles.footerNavLink}${isActivePath(item.to, pathname) ? ' ' + styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} April Yanko. All rights reserved.
      </p>
    </footer>
  );
}

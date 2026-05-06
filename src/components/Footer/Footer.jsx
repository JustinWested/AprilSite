import { NavLink, useLocation } from 'react-router-dom';
import SubstackSubscribe from '../SubstackSubscribe/SubstackSubscribe';
import styles from './Footer.module.css';

const socialLinks = [
  { icon: 'fa-brands fa-imdb', href: 'https://www.imdb.me/aprilyanko', label: 'IMDB' },
  { icon: 'fa-brands fa-threads', href: 'https://www.threads.net/@post.march', label: 'Threads' },
  { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/post.march/', label: 'Instagram' },
  { icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@postmarch/videos', label: 'YouTube' },
  { image: '/images/actorsaccess.webp', href: 'https://resumes.actorsaccess.com/aprilyanko', label: 'Actors Access' },
];

const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'Filmmaking', to: '/films' },
  { label: 'Reels', to: '/reels' },
  { label: 'Voiceover', to: '/vo' },
  {
    label: 'Ferret with a Knife',
    href: 'https://ferretwithaknife.substack.com',
    external: true,
  },
];

export default function Footer() {
  const location = useLocation();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className={styles.footer}>
      {/* Subtle bokeh blobs inside footer */}
      <div className={styles.footerBokeh} aria-hidden="true">
        <div className={styles.blob} style={{ background: '#A1C3D1', width: 180, height: 180, top: '10%', left: '5%', opacity: 0.08 }} />
        <div className={styles.blob} style={{ background: '#B39BC8', width: 150, height: 150, top: '40%', right: '10%', opacity: 0.06 }} />
        <div className={styles.blob} style={{ background: '#E64398', width: 120, height: 120, bottom: '10%', left: '50%', opacity: 0.05 }} />
        <div className={styles.blob} style={{ background: '#c64191', width: 160, height: 160, top: '20%', right: '30%', opacity: 0.06 }} />
      </div>

      <div className={styles.inner}>
        {/* Left column — social icons + headshot */}
        <div className={styles.left}>
          <div className={styles.socials}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={styles.socialIcon}
              >
                {link.image ? (
                  <img src={link.image} alt={link.label} className={styles.socialImg} />
                ) : (
                  <i className={link.icon} />
                )}
              </a>
            ))}
          </div>
          <div className={styles.headshotWrap}>
            <img
              src="/images/hero.webp"
              alt="April Yanko"
              className={styles.headshot}
            />
          </div>
        </div>

        {/* Center column — back to top + mailing list */}
        <div className={styles.center}>
          <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
            <i className="fa-solid fa-circle-chevron-up" />
          </button>
          <p className={styles.mailLabel}>Subscribe to my Substack</p>
          <SubstackSubscribe variant="dark" />
        </div>

        {/* Right column — flat nav */}
        <div className={styles.right}>
          <ul className={styles.footerLinks}>
            {footerNav.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive ? styles.activeFooterLink : styles.footerLink
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

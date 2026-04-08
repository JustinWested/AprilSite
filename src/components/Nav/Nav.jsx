import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Voice Over', to: '/vo' },
  {
    label: 'Acting',
    dropdown: [
      { label: 'Reels',    to: '/acting#reels' },
      { label: 'Resumes',  to: '/acting#resumes' },
      { label: 'Photos',   to: '/acting#photos' },
    ],
  },
  {
    label: 'Films',
    dropdown: [
      { label: 'All Films',               to: '/films' },
      { label: 'Butt Stuff',              to: '/buttstuff' },
      { label: 'Pulling the Plug on Mom', to: '/pullingplugmom' },
      { label: 'This Is a Garden',        to: '/thisisagarden' },
      { label: 'Norman',                  to: '/norman' },
      { label: 'Murder is on the Table',  to: '/murder' },
    ],
  },
  {
    label: 'Writing',
    dropdown: [
      { label: 'Films',          to: '/films' },
      { label: 'Writing Resume', to: '/writing#resume' },
      { label: 'Sketch',         to: '/writing#sketch' },
      { label: 'Articles',       to: '/writing#articles' },
    ],
  },
  { label: 'Press & Podcasts', to: '/press' },
  { label: 'Contact', to: '/contact' },
];

// Determine which top-level item is "active" for a given pathname
function getActiveTop(pathname) {
  if (pathname === '/') return '/';
  const map = {
    '/vo': '/vo',
    '/acting': '/acting',
    '/films': '/films',
    '/buttstuff': '/films',
    '/pullingplugmom': '/films',
    '/thisisagarden': '/films',
    '/norman': '/films',
    '/murder': '/films',
    '/writing': '/writing',
    '/press': '/press',
    '/contact': '/contact',
  };
  for (const [key, val] of Object.entries(map)) {
    if (pathname.startsWith(key)) return val;
  }
  return null;
}

export default function Nav({ transparent = false }) {
  const location = useLocation();
  const activeTop = getActiveTop(location.pathname);

  const [openDropdown, setOpenDropdown] = useState(null); // label of open dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  function toggleDropdown(label) {
    setOpenDropdown(prev => (prev === label ? null : label));
  }

  const navClass = [
    styles.nav,
    transparent ? styles.transparent : styles.solid,
  ].join(' ');

  return (
    <nav className={navClass} ref={navRef}>
      <div className={styles.inner}>
        {/* Logo */}
        <span className={styles.logo}>APRIL YANKO</span>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_ITEMS.map(item => {
            if (item.dropdown) {
              const isOpen = openDropdown === item.label;
              return (
                <li key={item.label} className={styles.link}>
                  <button
                    className={`${styles.dropdownTrigger}${isOpen ? ' ' + styles.open : ''}`}
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <i className={`fa-solid fa-chevron-down ${styles.chevron}${isOpen ? ' ' + styles.rotated : ''}`} />
                  </button>
                  {isOpen && (
                    <div className={styles.dropdown}>
                      <ul>
                        {item.dropdown.map(sub => (
                          <li key={sub.label}>
                            <Link
                              to={sub.to}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            }

            const isActive = item.to === '/'
              ? activeTop === '/'
              : activeTop === item.to;

            return (
              <li key={item.label} className={styles.link}>
                <Link
                  to={item.to}
                  className={`${styles.linkAnchor}${isActive ? ' ' + styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <i className={mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileList}>
            {NAV_ITEMS.map(item => {
              if (item.dropdown) {
                // On mobile: item is a link AND shows sub-items below
                const parentTo = item.label === 'Acting'
                  ? '/acting'
                  : item.label === 'Films'
                  ? '/films'
                  : '/writing';
                const isActive = activeTop === parentTo;

                return (
                  <li key={item.label}>
                    <Link
                      to={parentTo}
                      className={`${styles.mobileLink}${isActive ? ' ' + styles.active : ''}`}
                    >
                      {item.label}
                    </Link>
                    <ul className={styles.mobileSubList}>
                      {item.dropdown.map(sub => (
                        <li key={sub.label}>
                          <Link to={sub.to} className={styles.mobileSubLink}>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              const isActive = item.to === '/'
                ? activeTop === '/'
                : activeTop === item.to;

              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`${styles.mobileLink}${isActive ? ' ' + styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

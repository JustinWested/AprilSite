import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

// Items with `hash` route to /#<hash> — handled by App.jsx ScrollToTop,
// which smooth-scrolls to that anchor when the hash is present.
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Filmmaking', to: '/films' },
  { label: 'Reels', to: '/reels' },
  { label: 'Voiceover', to: '/vo' },
  {
    label: 'Ferret with a Knife',
    href: 'https://ferretwithaknife.substack.com',
    external: true,
  },
  { label: 'Contact', hash: 'contact' },
];

export default function Nav({ transparent }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleDropdown(label) {
    setOpenDropdown(openDropdown === label ? null : label);
  }

  function isDropdownActive(item) {
    return item.children?.some((child) => {
      const path = child.to.split('#')[0];
      return location.pathname === path;
    });
  }

  const navClass = [
    styles.nav,
    transparent ? styles.transparent : styles.solid,
  ].join(' ');

  return (
    <nav className={navClass} ref={navRef}>
      <div className={styles.inner}>
        {/* Mobile-only site title on the left of the header bar. Links
            home. Hidden on desktop via the .mobileBrand CSS rule. */}
        <Link to="/" className={styles.mobileBrand}>
          April Yanko
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
        </button>

        <ul className={`${styles.links} ${mobileOpen ? styles.mobileOpen : ''}`}>
          {navItems.map((item) =>
            item.external ? (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ) : item.hash ? (
              <li key={item.label}>
                <Link
                  to={`/#${item.hash}`}
                  onClick={(e) => {
                    // If already on home, prevent the route change and just
                    // smooth-scroll. Otherwise let the Link navigate and
                    // ScrollToTop in App.jsx will handle the hash.
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById(item.hash);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ) : item.children ? (
              <li key={item.label} className={styles.dropdown}>
                <button
                  className={`${styles.dropdownToggle} ${
                    isDropdownActive(item) ? styles.activeLink : ''
                  }`}
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.6em', marginLeft: 5 }} />
                </button>
                {openDropdown === item.label && (
                  <ul className={styles.dropdownMenu}>
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            isActive ? styles.activeLink : ''
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Mobile: show sub-items inline */}
                <ul className={styles.mobileSubItems}>
                  <li>
                    <NavLink
                      to={item.children[0].to.split('#')[0]}
                      className={({ isActive }) =>
                        isActive ? styles.activeLink : ''
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                  {item.children.map((child) => (
                    <li key={child.to} className={styles.subItem}>
                      <NavLink
                        to={child.to}
                        className={({ isActive }) =>
                          isActive ? styles.activeLink : ''
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ''
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

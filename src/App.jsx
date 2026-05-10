import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FilmsPage from './pages/FilmsPage/FilmsPage';
import ReelsPage from './pages/ReelsPage/ReelsPage';
import VoPage from './pages/VoPage/VoPage';
import VestigePitchDeck from './pages/VestigePitchDeck/VestigePitchDeck';
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Defer to next tick so the destination route has rendered and
      // the target element exists in the DOM.
      const id = hash.slice(1); // strip leading '#'
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/reels" element={<ReelsPage />} />
        <Route path="/vo" element={<VoPage />} />
        {/* Private pitch deck — direct-URL access only, NOT linked from
            the nav. caseSensitive: only `/Vestige-Pitch-Deck` matches,
            not `/vestige-pitch-deck`. */}
        <Route
          path="/Vestige-Pitch-Deck"
          element={<VestigePitchDeck />}
          caseSensitive
        />
        {/* Fallback — unknown routes land on home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

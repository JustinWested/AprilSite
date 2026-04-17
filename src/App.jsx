import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vo" element={<PlaceholderPage />} />
        <Route path="/acting" element={<PlaceholderPage />} />
        <Route path="/films" element={<PlaceholderPage />} />
        <Route path="/buttstuff" element={<PlaceholderPage />} />
        <Route path="/pullingplugmom" element={<PlaceholderPage />} />
        <Route path="/thisisagarden" element={<PlaceholderPage />} />
        <Route path="/norman" element={<PlaceholderPage />} />
        <Route path="/murder" element={<PlaceholderPage />} />
        <Route path="/biteme" element={<PlaceholderPage />} />
        <Route path="/writing" element={<PlaceholderPage />} />
        <Route path="/press" element={<PlaceholderPage />} />
        <Route path="/contact" element={<PlaceholderPage />} />
      </Routes>
    </>
  );
}

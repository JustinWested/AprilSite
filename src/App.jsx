import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage';
import ContactPage from './pages/ContactPage/ContactPage';

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Nav transparent={false} />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/vo"             element={<PlaceholderPage title="Voice Over" />} />
          <Route path="/acting"         element={<PlaceholderPage title="Acting" />} />
          <Route path="/films"          element={<PlaceholderPage title="Films" />} />
          <Route path="/buttstuff"      element={<PlaceholderPage title="Butt Stuff" />} />
          <Route path="/pullingplugmom" element={<PlaceholderPage title="Pulling the Plug on Mom" />} />
          <Route path="/thisisagarden"  element={<PlaceholderPage title="This Is a Garden" />} />
          <Route path="/norman"         element={<PlaceholderPage title="Norman" />} />
          <Route path="/murder"         element={<PlaceholderPage title="Murder is on the Table" />} />
          <Route path="/writing"        element={<PlaceholderPage title="Writing" />} />
          <Route path="/press"          element={<PlaceholderPage title="Press &amp; Podcasts" />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="*"               element={<PlaceholderPage title="Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

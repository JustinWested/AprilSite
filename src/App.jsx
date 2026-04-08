import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';

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

function BlankPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '64px', background: '#F3F3F4' }} />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<BlankPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { useLocation } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '') || 'page';

  return (
    <PageLayout transparentNav={false}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 60px)',
        textAlign: 'center',
        padding: 40,
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2a1f3d', marginBottom: 12 }}>
            {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
          </h1>
          <p style={{ color: '#B39BC8' }}>Coming soon</p>
        </div>
      </div>
    </PageLayout>
  );
}

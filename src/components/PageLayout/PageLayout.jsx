import BokehBackground from '../BokehBackground/BokehBackground';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import SectionDivider from '../SectionDivider/SectionDivider';
import styles from './PageLayout.module.css';

export default function PageLayout({ transparentNav = false, children }) {
  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={transparentNav} />
      <main className={styles.content}>
        {children}
      </main>
      <SectionDivider />
      <Footer />
    </div>
  );
}

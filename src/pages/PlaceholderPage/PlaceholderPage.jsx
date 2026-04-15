import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './PlaceholderPage.module.css';

export default function PlaceholderPage({ title }) {
  return (
    <PageLayout>
      <div className={styles.wrap}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>Coming soon — check back later!</p>
      </div>
    </PageLayout>
  );
}

import styles from './PageLayout.module.css';

export default function PageLayout({ children }) {
  return (
    <div className={styles.outer}>
      <div className={styles.column}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import styles from './SubstackSubscribe.module.css';

// Native subscribe form (no iframe) so we can match the site's design.
// Submitting GETs Substack's /subscribe page with the email prefilled —
// Substack then handles confirmation on their own page in a new tab.
export default function SubstackSubscribe({ variant = 'light' }) {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    const url = `https://ferretwithaknife.substack.com/subscribe?email=${encodeURIComponent(
      email.trim()
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.wrap} ${styles[variant]}`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`pill-input ${styles.input}`}
        aria-label="Email address"
      />
      <button type="submit" className={`pill-btn ${styles.btn}`}>
        Subscribe
      </button>
    </form>
  );
}

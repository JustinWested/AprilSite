import { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import BokehBackground from '../../components/BokehBackground/BokehBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import styles from './VestigePitchDeck.module.css';

const FORMSPREE_ID = 'mjglprrv';
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;
const ACCESS_KEY = 'vestige-deck-access';
const NAME_KEY = 'vestige-deck-name';
const EMAIL_KEY = 'vestige-deck-email';
const SLIDE_COUNT = 24;

export default function VestigePitchDeck() {
  // Initialize unlocked state straight from localStorage so a returning
  // visitor never sees the gate flash before the deck appears.
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(ACCESS_KEY) === 'true';
  });

  return (
    <div className={styles.page}>
      <BokehBackground />
      <Nav transparent={false} />

      {unlocked ? <DeckView /> : <AccessGate onSuccess={() => setUnlocked(true)} />}

      <Footer />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   STATE 1 — Locked: access request form
   ────────────────────────────────────────────────────────── */
function AccessGate({ onSuccess }) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // When Formspree confirms a successful submission, persist the
  // identity so we (a) skip the gate next time and (b) can pre-fill the
  // script-request submission inside the deck.
  useEffect(() => {
    if (state.succeeded) {
      try {
        window.localStorage.setItem(ACCESS_KEY, 'true');
        if (name) window.localStorage.setItem(NAME_KEY, name);
        if (email) window.localStorage.setItem(EMAIL_KEY, email);
      } catch (_) {
        /* localStorage may be unavailable (private mode); fall through */
      }
      // Tiny delay lets the user see the "Submitting..." → success
      // transition before the gate fades away.
      const t = setTimeout(onSuccess, 300);
      return () => clearTimeout(t);
    }
  }, [state.succeeded, name, email, onSuccess]);

  return (
    <main className={styles.gateWrap}>
      <div className={`frosted-card ${styles.gateCard}`}>
        <h1 className={styles.gateTitle}>Vestige</h1>
        <p className={styles.gateSubtitle}>A feature film by April Yanko</p>
        <p className={styles.gateBody}>
          Please share your name and email to view the pitch deck.
        </p>

        <form onSubmit={handleSubmit} className={styles.gateForm}>
          <div className={styles.field}>
            <label htmlFor="vestige-name" className={styles.label}>
              Name <span className={styles.req}>*</span>
            </label>
            <input
              id="vestige-name"
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pill-input"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="vestige-email" className={styles.label}>
              Email <span className={styles.req}>*</span>
            </label>
            <input
              id="vestige-email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pill-input"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="vestige-message" className={styles.label}>
              Message (optional)
            </label>
            <textarea
              id="vestige-message"
              name="message"
              rows="3"
              className={`pill-input ${styles.textarea}`}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className={styles.error}
            />
          </div>

          {/* Hidden form-type tag so submissions are easy to triage in
              the Formspree inbox. */}
          <input type="hidden" name="requestType" value="Pitch Deck Access" />

          {/* Bot trap honeypot — same pattern as the contact form. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            style={{ position: 'absolute', left: '-5000px' }}
            aria-hidden="true"
          />

          <button
            type="submit"
            className={`pill-btn ${styles.submitBtn}`}
            disabled={state.submitting}
          >
            {state.submitting ? 'Submitting...' : 'View Pitch Deck'}
          </button>

          {state.errors && state.errors.getFormErrors && state.errors.getFormErrors().length > 0 && (
            <p className={styles.error}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────
   STATE 2 — Unlocked: vertical slide stack + script CTA
   ────────────────────────────────────────────────────────── */
function DeckView() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scriptStatus, setScriptStatus] = useState('idle'); // idle | sending | done | error
  const storedName = typeof window !== 'undefined' ? window.localStorage.getItem(NAME_KEY) : null;

  // Show the "back to top" floating button once the user has scrolled
  // past the first slide (~700px is a comfortable trigger).
  useEffect(() => {
    function onScroll() {
      setShowTopBtn(window.scrollY > 700);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function requestScript() {
    if (scriptStatus === 'sending' || scriptStatus === 'done') return;
    setScriptStatus('sending');

    const name = window.localStorage.getItem(NAME_KEY) || 'Unknown viewer';
    const email = window.localStorage.getItem(EMAIL_KEY) || '';

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          requestType: 'Script Request',
          message: `${name} has requested the Vestige script.`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setScriptStatus('done');
    } catch (_) {
      setScriptStatus('error');
    }
  }

  const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => i + 1);

  return (
    <main className={styles.deckWrap}>
      <header className={styles.deckHeader}>
        <h1 className={styles.deckTitle}>Vestige</h1>
        <p className={styles.deckSubtitle}>Pitch Deck</p>
        {storedName && (
          <p className={styles.welcome}>Welcome, {storedName}</p>
        )}
      </header>

      <div className={styles.slideStack}>
        {slides.map((n) => {
          const padded = String(n).padStart(2, '0');
          return (
            <img
              key={n}
              src={`/images/pitchdeck/slide-${padded}.jpg`}
              alt={`Vestige pitch deck slide ${n}`}
              loading="lazy"
              className={styles.slide}
              // Until the actual files exist, hide the broken-image icon
              // and reveal a placeholder background instead.
              onError={(e) => {
                e.currentTarget.classList.add(styles.slidePlaceholder);
              }}
            />
          );
        })}
      </div>

      <section className={`frosted-card ${styles.scriptCta}`}>
        <h2 className={styles.scriptHeading}>Want to read the script?</h2>
        <p className={styles.scriptBody}>
          The full Vestige script is complete and available upon request.
          Click below to let us know you&rsquo;re interested and we&rsquo;ll be in touch.
        </p>

        {scriptStatus === 'done' ? (
          <p className={styles.scriptConfirm}>
            Thanks — April will be in touch about the script.
          </p>
        ) : (
          <>
            <button
              type="button"
              className={`pill-btn ${styles.scriptBtn}`}
              onClick={requestScript}
              disabled={scriptStatus === 'sending'}
            >
              {scriptStatus === 'sending' ? 'Sending...' : 'Request the Script'}
            </button>
            {scriptStatus === 'error' && (
              <p className={styles.error}>
                Something went wrong sending your request. Please try again.
              </p>
            )}
          </>
        )}
      </section>

      {showTopBtn && (
        <button
          type="button"
          className={styles.toTopBtn}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>
      )}
    </main>
  );
}

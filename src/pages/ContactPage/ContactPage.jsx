import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className={styles.wrap}>
        <h1 className={styles.heading}>Call me, beep me</h1>
        <p className={styles.subtitle}>...or just email me because that's what this is for.</p>

        <div id="mc_embed_signup" className={styles.formWrap}>
          <form
            action="https://aprilyanko.us12.list-manage.com/subscribe/post?u=a77f48c271656e6046f2833df&amp;id=1cd0d2c44e&amp;f_id=00b2b7e0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className={styles.form}
            target="_self"
          >
            <div id="mc_embed_signup_scroll">

              <div className={styles.fieldGroup}>
                <label htmlFor="mce-EMAIL" className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  defaultValue=""
                  name="EMAIL"
                  className={styles.input}
                  id="mce-EMAIL"
                  required
                />
                <span id="mce-EMAIL-HELPERTEXT" className={styles.helperText}>What's your email?</span>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="mce-NAME" className={styles.label}>Who are you?</label>
                <input
                  type="text"
                  defaultValue=""
                  name="NAME"
                  className={styles.input}
                  id="mce-NAME"
                />
                <span id="mce-NAME-HELPERTEXT" className={styles.helperText}>Who who, who who.</span>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="mce-WHAT" className={styles.label}>What brings you here?</label>
                <input
                  type="text"
                  defaultValue=""
                  name="WHAT"
                  className={styles.input}
                  id="mce-WHAT"
                />
              </div>

              <div id="mce-responses" className={styles.responses}>
                <div className={styles.response} id="mce-error-response" style={{ display: 'none' }} />
                <div className={styles.response} id="mce-success-response" style={{ display: 'none' }} />
              </div>

              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name="b_a77f48c271656e6046f2833df_1cd0d2c44e" tabIndex={-1} defaultValue="" />
              </div>

              <div className={styles.submitWrap}>
                <input
                  type="submit"
                  value="To April, away!"
                  name="subscribe"
                  id="mc-embedded-contact"
                  className={styles.submitBtn}
                />
              </div>

            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

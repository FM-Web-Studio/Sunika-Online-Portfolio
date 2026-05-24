import React, { useMemo } from 'react';
import quotes from './quotes.json';
import styles from './Loading.module.css';

const Loading = () => {
  const quote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    [],
  );

  return (
    <main className={styles.wrap} aria-busy="true" aria-live="polite">
      <div className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>

      {quote && (
        <figure className={styles.quote}>
          <blockquote className={styles.quoteText}>“{quote.quote}”</blockquote>
          <figcaption className={styles.quoteArtist}>— {quote.artist}</figcaption>
        </figure>
      )}

      <span className={styles.srOnly}>Loading…</span>
    </main>
  );
};

export default Loading;

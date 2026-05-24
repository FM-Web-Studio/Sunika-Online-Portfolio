import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.wrap}>
      <p className={styles.code} aria-hidden="true">404</p>
      <h1 className={styles.title}>This page wandered off the canvas</h1>
      <p className={styles.text}>
        The page you’re looking for doesn’t exist or has been moved.
        Let’s get you back to something colourful.
      </p>
      <button className="btn-primary" type="button" onClick={() => navigate('/')}>
        Back to home
      </button>
    </main>
  );
};

export default NotFound;

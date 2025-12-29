import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

/* Styling */
import styles from './Loading.module.css';
import '../../styles/Theme.css';
import '../../styles/Components.css';
import '../../styles/Wrappers.css';

const Loading = ({ message = 'Preparing the gallery...' }) => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const rootStyle = getComputedStyle(document.documentElement);
    const accent1 = rootStyle.getPropertyValue('--accent-1') || '#ff2f92';
    const accent2 = rootStyle.getPropertyValue('--accent-2') || '#ff4fa3';

    const particleCount = Math.round((width * height) / 90000) + 25;
    const particles = [];

    function rand(min, max) { return Math.random() * (max - min) + min; }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.6, 2.6),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.04, 0.04),
        hue: Math.random() > 0.6 ? accent1.trim() : accent2.trim(),
        alpha: rand(0.06, 0.22)
      });
    }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // subtle gradient overlay for depth
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy + Math.sin((p.x + p.y) * 0.001) * 0.2;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.r * 5;
        ctx.shadowColor = p.hue;
        ctx.ellipse(p.x, p.y, p.r * 1.4, p.r, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.loadingScreen} data-theme={theme}>
      <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />

      <div className={styles.bubbles} aria-hidden>
        <span className={styles.bubble} />
        <span className={styles.bubble} />
        <span className={styles.bubble} />
        <span className={styles.bubble} />
        <span className={styles.bubble} />
        <span className={styles.bubble} />
        <span className={styles.bubble} />
        <span className={styles.bubble} />
      </div>

      <div className={styles.centerCard} role="status" aria-live="polite">
        <svg className={styles.logo} viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-1)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          <path className={styles.brush} d="M40 140 C140 10, 260 10, 360 120 C420 180, 540 160, 560 100"
            stroke="url(#g1)" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle className={styles.logoDot} cx="560" cy="100" r="6" fill="var(--accent-2)" />
        </svg>

        <div className={styles.textWrap}>
          <h2 className={styles.title}>{message}</h2>
          <p className={styles.sub}>Curating visuals &amp; color — please wait a moment</p>

          <div className={styles.loaderArt} aria-hidden>
            <svg className={styles.loaderSvg} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lg1" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="var(--accent-1)" />
                  <stop offset="100%" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>
              <g>
                <circle className={`${styles.arc} ${styles.arc1}`} cx="60" cy="60" r="38" fill="none" stroke="url(#lg1)" />
                <circle className={`${styles.arc} ${styles.arc2}`} cx="60" cy="60" r="26" fill="none" stroke="url(#lg1)" />
                <circle className={`${styles.arc} ${styles.arc3}`} cx="60" cy="60" r="14" fill="none" stroke="url(#lg1)" />

                <g className={styles.tipGroup}>
                  <circle className={styles.tip} cx="60" cy="22" r="3.5" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* corner mark removed as requested */}
    </div>
  );
};

export default Loading;
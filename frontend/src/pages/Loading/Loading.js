import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './Loading.module.css';

const Loading = ({ message = 'Preparing the gallery...' }) => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const rootStyle = getComputedStyle(document.documentElement);
    const accent1 = rootStyle.getPropertyValue('--accent-1').trim() || '#ff2f92';
    const accent2 = rootStyle.getPropertyValue('--accent-2').trim() || '#ff4fa3';
    const accent3 = rootStyle.getPropertyValue('--accent-3').trim() || '#ff6fb5';

    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.min(80, Math.floor((width * height) / 12000));
      
      for (let i = 0; i < count; i++) {
        const colors = [accent1, accent2, accent3];
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          radius: Math.random() * 2.5 + 1,
          speed: Math.random() * 0.3 + 0.1,
          angle: Math.random() * Math.PI * 2,
          orbitRadius: Math.random() * 60 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    initParticles();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Ambient gradient overlay
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.3, width * 0.8
      );
      gradient.addColorStop(0, 'rgba(255, 47, 146, 0.02)');
      gradient.addColorStop(0.5, 'rgba(255, 111, 181, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles with orbital motion
      particlesRef.current.forEach((p, i) => {
        p.angle += p.speed * 0.02;
        p.x = p.baseX + Math.cos(p.angle) * p.orbitRadius;
        p.y = p.baseY + Math.sin(p.angle) * p.orbitRadius;

        // Drift effect
        p.baseX += Math.sin(timeRef.current + i) * 0.1;
        p.baseY += Math.cos(timeRef.current + i) * 0.08;

        // Wrap around edges
        if (p.baseX < -100) p.baseX = width + 100;
        if (p.baseX > width + 100) p.baseX = -100;
        if (p.baseY < -100) p.baseY = height + 100;
        if (p.baseY > height + 100) p.baseY = -100;

        // Pulsing opacity
        const pulse = Math.sin(timeRef.current * 2 + p.pulsePhase) * 0.2 + 0.8;
        const alpha = p.opacity * pulse;

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = p.radius * 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particlesRef.current.forEach((p2, j) => {
          if (i >= j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 120) * 0.15 * alpha;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15;
        return next >= 100 ? 100 : next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingScreen} data-theme={theme}>
      <canvas 
        ref={canvasRef} 
        className={styles.particleCanvas} 
        aria-hidden="true" 
      />

      <div className={styles.ambientGlow} aria-hidden="true">
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
        <div className={styles.glowOrb3} />
      </div>

      <div className={styles.centerCard} role="status" aria-live="polite">
        <div className={styles.logoSection}>
          <svg 
            className={styles.logo} 
            viewBox="0 0 200 200" 
            preserveAspectRatio="xMidYMid meet" 
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="brushGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-1)" />
                <stop offset="50%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <g className={styles.brushStrokes}>
              <path 
                className={`${styles.stroke} ${styles.stroke1}`}
                d="M 40 120 Q 60 60, 100 80 T 160 100" 
                stroke="url(#brushGradient)" 
                strokeWidth="8" 
                fill="none" 
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <path 
                className={`${styles.stroke} ${styles.stroke2}`}
                d="M 50 140 Q 100 100, 150 120" 
                stroke="url(#brushGradient)" 
                strokeWidth="6" 
                fill="none" 
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <circle 
                className={styles.dot}
                cx="160" 
                cy="100" 
                r="4" 
                fill="var(--accent-2)"
                filter="url(#glow)"
              />
            </g>
          </svg>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.textWrap}>
            <h2 className={styles.title}>{message}</h2>
            <p className={styles.subtitle}>
              Curating visuals &amp; colors — crafting your experience
            </p>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
              <div className={styles.progressGlow} />
              <div className={styles.progressShimmer} />
            </div>
            <span className={styles.progressText}>
              {Math.round(progress)}%
            </span>
          </div>

          <div className={styles.loaderAnimation} aria-hidden="true">
            <div className={styles.spinnerRing}>
              <svg className={styles.spinnerSvg} viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="spinGradient" x1="0%" x2="100%">
                    <stop offset="0%" stopColor="var(--accent-1)" />
                    <stop offset="100%" stopColor="var(--accent-2)" />
                  </linearGradient>
                </defs>
                <circle 
                  className={styles.spinnerCircle}
                  cx="50" 
                  cy="50" 
                  r="35" 
                  fill="none" 
                  stroke="url(#spinGradient)" 
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles.centerDot} />
          </div>
        </div>
      </div>

      <div className={styles.floatingElements} aria-hidden="true">
        <div className={styles.floatShape1} />
        <div className={styles.floatShape2} />
        <div className={styles.floatShape3} />
        <div className={styles.floatShape4} />
      </div>
    </div>
  );
};

export default Loading;
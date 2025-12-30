import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './NotFound.module.css';

const NotFound = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const inkBlobsRef = useRef([]);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initInkBlobs();
    };

    const initInkBlobs = () => {
      inkBlobsRef.current = [];
      for (let i = 0; i < 12; i++) {
        inkBlobsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 60,
          speed: Math.random() * 0.2 + 0.08,
          angle: Math.random() * Math.PI * 2,
          orbitRadius: Math.random() * 80 + 40,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          opacity: Math.random() * 0.04 + 0.02,
        });
      }
    };

    const createRipple = (x, y) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 240,
        opacity: 0.9,
        speed: 3.2,
      });
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      createRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (Math.random() > 0.97) {
        createRipple(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle flowing gradient background
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(timeRef.current * 0.5) * 100,
        canvas.height * 0.5 + Math.cos(timeRef.current * 0.5) * 100,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.7
      );
      bgGradient.addColorStop(0, 'rgba(255, 47, 146, 0.02)');
      bgGradient.addColorStop(0.5, 'rgba(255, 111, 181, 0.03)');
      bgGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle ink blobs
      inkBlobsRef.current.forEach((blob, i) => {
        blob.angle += blob.speed * 0.01;
        blob.x = blob.baseX + Math.cos(blob.angle) * blob.orbitRadius;
        blob.y = blob.baseY + Math.sin(blob.angle) * blob.orbitRadius;

        blob.baseX += Math.sin(timeRef.current * 0.3 + i) * 0.3;
        blob.baseY += Math.cos(timeRef.current * 0.2 + i) * 0.3;

        if (blob.baseX < -100) blob.baseX = canvas.width + 100;
        if (blob.baseX > canvas.width + 100) blob.baseX = -100;
        if (blob.baseY < -100) blob.baseY = canvas.height + 100;
        if (blob.baseY > canvas.height + 100) blob.baseY = -100;

        const pulse = Math.sin(timeRef.current * 1.5 + i) * 0.2 + 0.8;
        
        ctx.save();
        ctx.globalAlpha = blob.opacity * pulse;
        
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, 'rgba(255, 95, 176, ' + (blob.opacity * pulse * 0.8) + ')');
        gradient.addColorStop(0.5, 'rgba(255, 111, 181, ' + (blob.opacity * pulse * 0.4) + ')');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw subtle flowing brush strokes
      for (let i = 0; i < 4; i++) {
        const x1 = canvas.width * (0.15 + i * 0.2);
        const y1 = canvas.height * 0.3 + Math.sin(timeRef.current * 0.8 + i) * 40;
        const x2 = x1 + 120 + Math.cos(timeRef.current * 0.4 + i) * 80;
        const y2 = canvas.height * 0.7 + Math.cos(timeRef.current * 0.8 + i) * 40;
        
        const strokeGradient = ctx.createLinearGradient(x1, y1, x2, y2);
        strokeGradient.addColorStop(0, 'transparent');
        strokeGradient.addColorStop(0.5, 'rgba(255, 95, 176, 0.03)');
        strokeGradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = strokeGradient;
        ctx.lineWidth = 25 + Math.sin(timeRef.current + i) * 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw ripples with subtle colors
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.01;

        if (ripple.opacity <= 0) return false;

        ctx.save();

        // Main ripple ring - brighter, more visible
        ctx.globalAlpha = Math.min(1, ripple.opacity * 1.0);
        ctx.strokeStyle = 'rgba(255, 47, 146, ' + ripple.opacity + ')';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary inner ripple - slightly stronger
        ctx.globalAlpha = Math.min(1, ripple.opacity * 0.85);
        ctx.strokeStyle = 'rgba(255, 79, 140, ' + (ripple.opacity * 0.9) + ')';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.55, 0, Math.PI * 2);
        ctx.stroke();

        // Soft glow - increased intensity
        const glowGradient = ctx.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, ripple.radius
        );
        glowGradient.addColorStop(0, 'rgba(255, 47, 146, ' + (ripple.opacity * 0.28) + ')');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initInkBlobs();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const goHome = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  return (
    <div className={styles.container} data-theme={theme}>
      <canvas
        ref={canvasRef}
        className={styles.backgroundCanvas}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.brushStroke} aria-hidden="true">
            <svg viewBox="0 0 200 200" className={styles.brushSvg}>
              <defs>
                <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-1)" />
                  <stop offset="100%" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>
              <path
                d="M 20 100 Q 60 40, 100 80 T 180 120"
                stroke="url(#brushGrad)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className={styles.brushPath}
              />
            </svg>
          </div>

          <div className={styles.errorCode}>
            <span className={styles.digit}>4</span>
            <span className={styles.digitCenter}>0</span>
            <span className={styles.digit}>4</span>
          </div>

          <h1 className={styles.title}>Lost in the Gallery</h1>
          
          <p className={styles.description}>
            The masterpiece you're looking for has wandered off the canvas.
            Let's guide you back to the exhibition.
          </p>

          <div className={styles.decorativeLine} aria-hidden="true">
            <span className={styles.lineSegment}></span>
            <span className={styles.lineDot}></span>
            <span className={styles.lineSegment}></span>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.primaryButton} 
              onClick={goHome}
              aria-label="Return to home page"
            >
              <span className={styles.buttonText}>Return Home</span>
              <span className={styles.buttonIcon} aria-hidden="true">→</span>
            </button>
          </div>

          <div className={styles.inkSplashes} aria-hidden="true">
            <div className={styles.splash1}></div>
            <div className={styles.splash2}></div>
            <div className={styles.splash3}></div>
          </div>
        </div>

        <p className={styles.footer}>
          Click or move your cursor to create ripples in the artistic canvas
        </p>
      </div>
    </div>
  );
};

export default NotFound;
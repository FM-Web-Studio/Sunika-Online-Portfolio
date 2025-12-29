import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './NotFound.module.css';
import '../../styles/Theme.css';

const NotFound = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(300, rect.width * dpr);
      canvas.height = Math.max(180, rect.height * dpr);
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getPos = (e, el) => {
    const rect = el.getBoundingClientRect();
    const evt = e.touches ? e.touches[0] : e;
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const start = (e) => {
    drawingRef.current = true;
    const pos = getPos(e, canvasRef.current);
    lastRef.current = pos;
  };

  const end = () => {
    drawingRef.current = false;
  };

  const draw = (e) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastRef.current = pos;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const goHome = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  return (
    <div className={styles.wrap} data-theme={theme}>
      <main className={styles.card} role="main" aria-labelledby="nf-title">
        <div className={styles.headerRow}>
          <div className={styles.code} id="nf-title">404</div>
          <button className={styles.homeButton} onClick={goHome} aria-label="Go home">Home</button>
        </div>

        <h2 className={styles.title}>We couldn't find that page.</h2>
        <p className={styles.lead}>This artist's canvas is waiting — leave a tiny mark.</p>

        <div className={styles.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onMouseDown={start}
            onMouseUp={end}
            onMouseLeave={end}
            onMouseMove={draw}
            onTouchStart={start}
            onTouchEnd={end}
            onTouchCancel={end}
            onTouchMove={draw}
            aria-label="Drawing area"
          />
        </div>

        <div className={styles.controls} aria-hidden>
          <label className={styles.smallLabel}>
            Color
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.colorInput} />
          </label>

          <label className={styles.smallLabel}>
            Width
            <input type="range" min="1" max="24" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} />
          </label>

          <button className={styles.smallBtn} type="reset" onClick={clear}>Clear</button>
        </div>
      </main>

      <div className={styles.bgAccent} aria-hidden />
    </div>
  );
};

export default NotFound;
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FaHome, FaPaintBrush } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import styles from './NotFound.module.css';
import artistQuotes from './quotes.json';

const NotFound = () => {
  const { theme } = useTheme();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [paintSplashes, setPaintSplashes] = useState([]);
  const [brushStrokes, setBrushStrokes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState([]);
  const canvasRef = useRef(null);

  const colors = [
    'var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 
    'var(--accent-5)', 'var(--accent-6)', 'var(--accent-7)', 'var(--accent-8)'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % artistQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Clean up old splashes
    const cleanup = setInterval(() => {
      setPaintSplashes(prev => prev.filter(splash => Date.now() - splash.timestamp < 3000));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setCurrentStroke([{ x, y }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentStroke(prev => [...prev, { x, y }]);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentStroke.length > 2) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      setBrushStrokes(prev => [...prev, { 
        points: currentStroke, 
        color,
        id: Date.now() + Math.random() 
      }]);
    }
    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const handleClick = (e) => {
    if (isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 60 + Math.random() * 80;
    
    const newSplash = {
      x,
      y,
      size,
      color,
      id: Date.now() + Math.random(),
      timestamp: Date.now()
    };
    
    setPaintSplashes(prev => [...prev, newSplash]);
  };

  const clearCanvas = () => {
    setBrushStrokes([]);
    setPaintSplashes([]);
  };

  const goHome = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  return (
    <div className={styles.container} data-theme={theme}>
      {/* Interactive Canvas */}
      <div 
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      >
        {/* Paint Splashes */}
        {paintSplashes.map(splash => (
          <div
            key={splash.id}
            className={styles.paintSplash}
            style={{
              left: splash.x,
              top: splash.y,
              width: splash.size,
              height: splash.size,
              background: `radial-gradient(circle, ${splash.color}, transparent)`,
            }}
          />
        ))}

        {/* Brush Strokes */}
        <svg className={styles.strokesSvg}>
          {brushStrokes.map(stroke => (
            <path
              key={stroke.id}
              d={`M ${stroke.points.map(p => `${p.x},${p.y}`).join(' L ')}`}
              stroke={stroke.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className={styles.brushStroke}
            />
          ))}
          {/* Current drawing stroke */}
          {isDrawing && currentStroke.length > 1 && (
            <path
              d={`M ${currentStroke.map(p => `${p.x},${p.y}`).join(' L ')}`}
              stroke={colors[0]}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.8"
            />
          )}
        </svg>

        {/* Floating paint drops */}
        <div className={styles.floatingDrops}>
          <div className={styles.drop} data-color="1"></div>
          <div className={styles.drop} data-color="2"></div>
          <div className={styles.drop} data-color="3"></div>
          <div className={styles.drop} data-color="4"></div>
          <div className={styles.drop} data-color="5"></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className={styles.content}>
        <div className={styles.card}>
          {/* Palette Icon */}
          <div className={styles.paletteIcon}>
            <div className={styles.palette}>
              <div className={styles.paletteHole}></div>
              <div className={styles.paletteColor} data-color="1"></div>
              <div className={styles.paletteColor} data-color="2"></div>
              <div className={styles.paletteColor} data-color="3"></div>
              <div className={styles.paletteColor} data-color="4"></div>
              <div className={styles.paletteColor} data-color="5"></div>
            </div>
          </div>

          {/* 404 Display */}
          <div className={styles.errorDisplay}>
            <span className={styles.errorDigit}>4</span>
            <FaPaintBrush className={styles.brushIcon} />
            <span className={styles.errorDigit}>4</span>
          </div>

          <h1 className={styles.title}>Canvas Not Found</h1>
          <p className={styles.description}>
            Oops! This page has been painted over. But don't worry - you can create your own masterpiece right here!
          </p>

          {/* Instructions */}
          <div className={styles.instructions}>
            <div className={styles.instruction}>
              <span className={styles.instructionIcon}>🖱️</span>
              <span>Click to splatter paint</span>
            </div>
            <div className={styles.instruction}>
              <span className={styles.instructionIcon}>✏️</span>
              <span>Drag to draw strokes</span>
            </div>
          </div>

          {/* Quote */}
          <div className={styles.quoteSection}>
            <IoSparkles className={styles.quoteIcon} />
            <p className={styles.quoteText}>"{artistQuotes[currentQuote].quote}"</p>
            <cite className={styles.quoteAuthor}>— {artistQuotes[currentQuote].artist}</cite>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button className={styles.clearButton} onClick={clearCanvas}>
              Clear Canvas
            </button>
            <button className={styles.homeButton} onClick={goHome}>
              <FaHome />
              <span>Go Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
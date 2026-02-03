import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './Loading.module.css';

// ============================================
// LOADING COMPONENT
// ============================================
// Animated loading screen with progress bar
// and geometric loader animations

const Loading = ({ message = 'Loading your creative space' }) => {
  // ----------------------------------------
  // Hooks & State
  // ----------------------------------------
  
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  // Animated dots for loading message
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 8;
        return next >= 100 ? 100 : next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <div className={styles.container} data-theme={theme}>
      {/* Gradient orbs background */}
      <div className={styles.orbsBackground}>
        <div className={styles.orb} data-position="top-left"></div>
        <div className={styles.orb} data-position="bottom-right"></div>
        <div className={styles.orb} data-position="center"></div>
      </div>

      {/* Main loading card */}
      <div className={styles.loadingCard}>
        {/* Geometric loader */}
        <div className={styles.loaderWrapper}>
          <div className={styles.geometricLoader}>
            <div className={styles.ring} data-ring="1"></div>
            <div className={styles.ring} data-ring="2"></div>
            <div className={styles.ring} data-ring="3"></div>
            <div className={styles.centerDot}></div>
          </div>
        </div>

        {/* Message text */}
        <div className={styles.messageSection}>
          <h2 className={styles.message}>{message}{dots}</h2>
          <p className={styles.subMessage}>Please wait while we prepare everything</p>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            >
              <div className={styles.progressGlow}></div>
            </div>
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.progressPercent}>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className={styles.particles}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={styles.particle}
              style={{
                left: `${15 + i * 15}%`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating accents */}
      <div className={styles.floatingAccents}>
        <div className={styles.accent} data-accent="1"></div>
        <div className={styles.accent} data-accent="2"></div>
        <div className={styles.accent} data-accent="3"></div>
        <div className={styles.accent} data-accent="4"></div>
      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================

export default Loading;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Home, Compass, Palette } from 'lucide-react';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './NotFound.module.css';

// ============================================
// NOT FOUND COMPONENT
// ============================================
// 404 error page with navigation options
// and quick links to main sections

const NotFound = () => {
  // ----------------------------------------
  // Hooks & State
  // ----------------------------------------
  
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  // Trigger entrance animation
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <div className={styles.container} data-theme={theme}>
      {/* Background Gradient Orbs */}
      <div className={styles.backgroundOrbs} aria-hidden="true">
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Main Content */}
      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.glassContainer}>
          
          {/* 404 Number */}
          <div className={styles.errorNumber}>
            <span className={styles.number}>4</span>
            <span className={`${styles.number} ${styles.middle}`}>0</span>
            <span className={styles.number}>4</span>
          </div>

          {/* Title & Message */}
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.message}>
            Oops! The page you're looking for seems to have wandered off the canvas.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className={styles.actions}>
              <button 
              onClick={() => navigate('/')} 
              className={styles.btnPrimary}
            >
              <Home />
              <span>Go Home</span>
            </button>
            <button 
              onClick={() => navigate(-1)} 
              className={styles.btnSecondary}
            >
              <Compass />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <p className={styles.quickLinksTitle}>Or explore:</p>
            <div className={styles.links}>
              <a href="/bio" className={styles.link}>
                <span>About Me</span>
              </a>
              <a href="/gallery" className={styles.link}>
                <Palette />
                <span>Gallery</span>
              </a>
              <a href="/connect" className={styles.link}>
                <span>Connect</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Elements */}
      <div className={styles.floatingShapes} aria-hidden="true">
        <div className={styles.shape} data-shape="1"></div>
        <div className={styles.shape} data-shape="2"></div>
        <div className={styles.shape} data-shape="3"></div>
      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================

export default NotFound;
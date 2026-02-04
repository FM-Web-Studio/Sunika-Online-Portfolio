import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { LazyImage } from '../../components';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './Home.module.css';

// ============================================
// IMPORTS - DATA
// ============================================

import homeData from '../../information/home.json';

// ============================================
// IMPORTS - IMAGES
// ============================================

import adventureImage from '../../images/Me/Adventure.jpg';
import cruiseImage from '../../images/Me/Cruise.jpg';
import cherishedMomentsImage from '../../images/Me/Cherished Moments.jpg';

// ============================================
// IMAGE MAP
// ============================================

const imageMap = {
  'Adventure.jpg': adventureImage,
  'Cruise.jpg': cruiseImage,
  'Cherished Moments.jpg': cherishedMomentsImage,
};

// ============================================
// HOME COMPONENT
// ============================================
// Timeline page showcasing personal journey, 
// adventures, and cherished memories

const Home = () => {
  // ----------------------------------------
  // Hooks & State
  // ----------------------------------------
  
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleMemories, setVisibleMemories] = useState([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  // Trigger entrance animation
  
  useEffect(() => {
    setIsVisible(true);
    
    // Stagger memory card animations
    homeData.memories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMemories(prev => [...prev, index]);
      }, 200 * (index + 1));
    });
  }, []);

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <div className={styles.homeWrapper} data-theme={theme}>
      
      {/* Background Elements */}
      <div className={styles.backgroundGradient} aria-hidden="true"></div>
      
      {/* Scroll Indicator */}
      <div className={`${styles.scrollIndicator} ${isVisible && showScrollIndicator ? styles.visible : ''}`} aria-hidden="true">
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
      
      {/* Main Content */}
      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span>Living Life to the Fullest</span>
          </div>

          <h1 className={styles.mainTitle}>
            My Journey
          </h1>

          <p className={styles.subtitle}>
            A Collection of Adventures & Cherished Moments
          </p>
        </section>

        {/* Backstory Section */}
        <section className={styles.backstorySection}>
          <div className={styles.backstoryCard}>
            <div className={styles.backstoryIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
              </svg>
            </div>
            <h2 className={styles.backstoryTitle}>{homeData.backstory.title}</h2>
            <p className={styles.backstoryDescription}>{homeData.backstory.description}</p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <div className={styles.timelineTrack} aria-hidden="true"></div>
          
          {homeData.memories.map((memory, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleMemories.includes(index);
            
            return (
              <div 
                key={memory.id} 
                className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right} ${isVisible ? styles.visible : ''}`}
                data-accent={memory.accent}
              >
                {/* Timeline Dot */}
                <div className={styles.timelineDot}></div>
                
                {/* Memory Card */}
                <div className={styles.memoryCard}>
                  <div className={styles.memoryImageWrapper}>
                    <LazyImage
                      src={imageMap[memory.image]}
                      alt={memory.title}
                      className={styles.memoryImage}
                    />
                    <div className={styles.memoryImageOverlay}></div>
                  </div>
                  
                  <div className={styles.memoryContent}>
                    <span className={styles.memoryDate}>{memory.date}</span>
                    <h3 className={styles.memoryTitle}>{memory.title}</h3>
                    <p className={styles.memoryDescription}>{memory.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Let's Create Something Together</h2>
            <p className={styles.ctaDescription}>
              Whether you're looking for custom artwork, design services, or artisan baked goods, 
              I'd love to bring your vision to life.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/bio" className={styles.btnPrimary}>
                <span>Learn More About Me</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="/connect" className={styles.btnSecondary}>
                <span>Get in Touch</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================

export default Home;
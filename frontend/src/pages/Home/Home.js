// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { MdAutoAwesome, MdColorLens, MdCreate, MdDraw, MdFilterVintage, MdLocalFlorist } from 'react-icons/md';
import { BiPaint } from 'react-icons/bi';
import { BsStars, BsCloudMoon } from 'react-icons/bs';
import styles from './Home.module.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const floatingRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Dreamy floating elements
  useEffect(() => {
    const container = floatingRef.current;
    if (!container) return;

    const elements = [
      { icon: '✨', size: 1.2 },
      { icon: '🌙', size: 1.5 },
      { icon: '⭐', size: 1 },
      { icon: '🌸', size: 1.3 },
      { icon: '☁️', size: 1.8 },
      { icon: '🦋', size: 1.4 },
      { icon: '🌿', size: 1.1 },
      { icon: '💫', size: 1.2 },
    ];
    
    let mounted = true;
    const activeElements = [];

    const createFloatingElement = () => {
      if (!mounted || activeElements.length >= 20) return;

      const el = document.createElement('div');
      const item = elements[Math.floor(Math.random() * elements.length)];
      el.className = styles.floatElement;
      el.textContent = item.icon;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.fontSize = `${item.size}rem`;
      
      const duration = 25 + Math.random() * 20;
      el.style.setProperty('--float-duration', `${duration}s`);
      el.style.setProperty('--float-delay', `${Math.random() * 5}s`);
      el.style.setProperty('--float-x', `${(Math.random() - 0.5) * 100}px`);
      el.style.setProperty('--float-y', `${-150 - Math.random() * 100}px`);
      
      container.appendChild(el);
      activeElements.push(el);

      setTimeout(() => {
        if (el.parentNode) el.remove();
        const idx = activeElements.indexOf(el);
        if (idx !== -1) activeElements.splice(idx, 1);
      }, duration * 1000);
    };

    for (let i = 0; i < 15; i++) {
      setTimeout(() => createFloatingElement(), i * 400);
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.65) createFloatingElement();
    }, 3500);

    return () => {
      mounted = false;
      clearInterval(interval);
      activeElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.homeWrapper}
      onMouseMove={handleMouseMove}
    >
      {/* Dreamy gradient background */}
      <div 
        className={styles.dreamyBg}
        style={{
          transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px) translateY(${scrollY * 0.3}px)`
        }}
      />

      {/* Floating elements container */}
      <div 
        ref={floatingRef}
        className={styles.floatingContainer}
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
        }}
      />

      {/* Soft gradient orbs */}
      <div className={styles.orbsWrapper}>
        <div 
          className={`${styles.softOrb} ${styles.orb1}`}
          style={{
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
          }}
        />
        <div 
          className={`${styles.softOrb} ${styles.orb2}`}
          style={{
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
          }}
        />
        <div 
          className={`${styles.softOrb} ${styles.orb3}`}
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * 20}px)`
          }}
        />
      </div>

      {/* Main content */}
      <div className={`${styles.contentWrapper} ${isVisible ? styles.visible : ''}`}>
        
        {/* Hero Section */}
        <div className={styles.heroContainer}>
          {/* Decorative elements */}
          <div className={styles.heroDecorLeft}>
            <MdLocalFlorist size={40} />
          </div>
          <div className={styles.heroDecorRight}>
            <BsStars size={35} />
          </div>

          {/* Hero badge */}
          <div className={styles.heroBadge}>
            <BsCloudMoon size={14} />
            <span>Creative Artist & Designer</span>
            <MdAutoAwesome size={14} />
          </div>

          {/* Main title */}
          <h1 className={styles.mainTitle}>
            <span className={styles.titleLine}>Sunika</span>
            <span className={styles.titleLine}>Lombard</span>
          </h1>

          {/* Decorative line */}
          <div className={styles.decorativeLine}>
            <span className={styles.lineDecor}>✦</span>
            <span className={styles.lineFill}></span>
            <span className={styles.lineDecor}>✦</span>
          </div>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            Communication Design & Illustration
          </p>

          {/* Description */}
          <p className={styles.heroDescription}>
            Blending traditional artistry with digital innovation to craft 
            meaningful visual stories. Currently studying at OpenWindow, 
            where creativity meets professional excellence.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaContainer}>
            <a href="/portfolio" className={styles.btnPrimary}>
              <BiPaint size={20} />
              <span>Explore Portfolio</span>
            </a>
            <a href="/contact" className={styles.btnSecondary}>
              <MdCreate size={20} />
              <span>Let's Connect</span>
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <div className={styles.skillIconWrapper}>
              <BiPaint size={30} className={styles.skillIcon} />
            </div>
            <h3 className={styles.skillTitle}>Traditional Painting</h3>
            <p className={styles.skillDesc}>
              Masterful techniques in watercolor, acrylic, and oil painting
            </p>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIconWrapper}>
              <MdDraw size={30} className={styles.skillIcon} />
            </div>
            <h3 className={styles.skillTitle}>Digital Illustration</h3>
            <p className={styles.skillDesc}>
              Creating stunning digital artwork with modern tools
            </p>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIconWrapper}>
              <MdColorLens size={30} className={styles.skillIcon} />
            </div>
            <h3 className={styles.skillTitle}>Design & Craft</h3>
            <p className={styles.skillDesc}>
              Handcrafted creations combining art and imagination
            </p>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillIconWrapper}>
              <MdFilterVintage size={30} className={styles.skillIcon} />
            </div>
            <h3 className={styles.skillTitle}>Communication Design</h3>
            <p className={styles.skillDesc}>
              Visual storytelling through thoughtful design principles
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className={styles.quoteSection}>
          <div className={styles.quoteIcon}>
            <MdAutoAwesome size={24} />
          </div>
          <blockquote className={styles.quote}>
            "Art is not what you see, but what you make others see."
          </blockquote>
          <p className={styles.quoteAuthor}>— Edgar Degas</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
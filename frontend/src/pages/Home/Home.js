import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './Home.module.css';

// ============================================
// HOME COMPONENT
// ============================================
// Landing page with animated canvas background,
// hero section, services, and statistics

const Home = () => {
  // ----------------------------------------
  // Hooks & State
  // ----------------------------------------
  
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // ----------------------------------------
  // Refs for Canvas Animation
  // ----------------------------------------
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  // Trigger entrance animation
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Canvas particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Performance optimization: reduce particle count on mobile
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      // Adaptive particle count based on device
      let divisor = 12000;
      if (isMobile) divisor = 20000;
      else if (isTablet) divisor = 15000;
      
      const count = Math.floor((canvas.width * canvas.height) / divisor);
      
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.4 + 0.1,
          angle: Math.random() * Math.PI * 2,
          orbitRadius: Math.random() * 30 + 10,
          speed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const animate = () => {
      timeRef.current += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Flowing gradient background
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2 + Math.sin(timeRef.current) * 100,
        canvas.height * 0.3 + Math.cos(timeRef.current) * 100,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(255, 47, 146, 0.04)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8 + Math.cos(timeRef.current * 0.8) * 100,
        canvas.height * 0.7 + Math.sin(timeRef.current * 0.8) * 100,
        0,
        canvas.width * 0.7,
        canvas.height * 0.7,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(255, 111, 181, 0.03)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles with orbital motion
      particlesRef.current.forEach((p, i) => {
        p.angle += p.speed;
        const baseX = p.x + p.vx;
        const baseY = p.y + p.vy;
        
        const x = baseX + Math.cos(p.angle) * p.orbitRadius;
        const y = baseY + Math.sin(p.angle) * p.orbitRadius;

        p.x = baseX;
        p.y = baseY;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        const pulse = Math.sin(timeRef.current * 2 + i) * 0.3 + 0.7;

        ctx.save();
        ctx.globalAlpha = p.opacity * pulse;
        ctx.fillStyle = 'rgba(255, 95, 176, 0.6)';
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = 'rgba(255, 95, 176, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        particlesRef.current.forEach((p2, j) => {
          if (i >= j) return;
          const p2x = p2.x + Math.cos(p2.angle) * p2.orbitRadius;
          const p2y = p2.y + Math.sin(p2.angle) * p2.orbitRadius;
          const dx = x - p2x;
          const dy = y - p2y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.1 * pulse;
            ctx.strokeStyle = 'rgba(255, 95, 176, 0.4)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <div className={styles.homeWrapper} data-theme={theme}>
      <canvas ref={canvasRef} className={styles.backgroundCanvas} aria-hidden="true" />

      <div className={styles.glowOrbs} aria-hidden="true">
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>

      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.glassContainer}>
          
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>Available for Commissions</span>
            </div>

            <h1 className={styles.mainTitle}>Sunika Lombard</h1>

            <p className={styles.subtitle}>
              Communication Design · Illustration · Baking Artisan
            </p>

            <p className={styles.description}>
              Creating visual stories through art and design, while crafting 
              delightful meringues and baked creations.
            </p>

            <div className={styles.ctaButtons}>
              <a href="/bio" className={styles.btnPrimary}>
                About Me
              </a>
              <a href="/connect" className={styles.btnSecondary}>
                Get in Touch
              </a>
            </div>
          </section>

          <div className={styles.divider}></div>

          {/* Services Section */}
          <section className={styles.servicesSection}>
            <h2 className={styles.sectionTitle}>Services</h2>
            
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>Design & Illustration</h3>
                <p className={styles.serviceDesc}>
                  Custom illustrations and communication design for brands and personal projects.
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15L16 10L5 21" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>Traditional Art</h3>
                <p className={styles.serviceDesc}>
                  Paintings and handcrafted artwork using various traditional mediums.
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V21" />
                    <path d="M4 21H20" />
                    <path d="M12 5V3" />
                    <path d="M8 3H16" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>Artisan Baking</h3>
                <p className={styles.serviceDesc}>
                  Handcrafted meringues and custom baked goods made with care.
                </p>
              </div>
            </div>
          </section>

          <div className={styles.divider}></div>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>By the Numbers</h2>
            
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>45+</div>
                <div className={styles.statLabel}>Artworks Created</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statValue}>4+</div>
                <div className={styles.statLabel}>Design Projects</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statValue}>100%</div>
                <div className={styles.statLabel}>Handcrafted</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statValue}>∞</div>
                <div className={styles.statLabel}>Creativity</div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================

export default Home;
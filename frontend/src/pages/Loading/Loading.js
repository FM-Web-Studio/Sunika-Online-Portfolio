import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FaPalette, FaPaintBrush } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import styles from './Loading.module.css';
import loadingQuotes from './quotes.json';

const Loading = ({ message = 'Preparing your canvas...' }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [paintDrops, setPaintDrops] = useState([]);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loadingQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 12;
        return next >= 100 ? 100 : next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Generate random paint drops
  useEffect(() => {
    const drops = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.6,
      left: 10 + (i * 12) + Math.random() * 5,
      color: (i % 5) + 1,
    }));
    setPaintDrops(drops);
  }, []);

  return (
    <div className={styles.container} data-theme={theme}>
      {/* Animated background gradient orbs */}
      <div className={styles.backgroundOrbs}>
        <div className={styles.orb} data-orb="1"></div>
        <div className={styles.orb} data-orb="2"></div>
        <div className={styles.orb} data-orb="3"></div>
      </div>

      {/* Paint drops falling animation */}
      <div className={styles.paintDrops}>
        {paintDrops.map(drop => (
          <div
            key={drop.id}
            className={styles.paintDrop}
            data-color={drop.color}
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content card */}
      <div className={styles.card}>
        {/* Palette icon with animated colors */}
        <div className={styles.paletteContainer}>
          <div className={styles.paletteWrapper}>
            <FaPalette className={styles.paletteIcon} />
            <div className={styles.colorDots}>
              <div className={styles.colorDot} data-color="1"></div>
              <div className={styles.colorDot} data-color="2"></div>
              <div className={styles.colorDot} data-color="3"></div>
              <div className={styles.colorDot} data-color="4"></div>
              <div className={styles.colorDot} data-color="5"></div>
            </div>
          </div>
        </div>

        {/* Title and message */}
        <div className={styles.textSection}>
          <h1 className={styles.title}>{message}</h1>
          <p className={styles.subtitle}>Setting up your creative space</p>
        </div>

        {/* Animated brush stroke loader */}
        <div className={styles.brushLoader}>
          <FaPaintBrush className={styles.brushIcon} />
          <svg className={styles.brushStroke} viewBox="0 0 200 20">
            <defs>
              <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-1)" />
                <stop offset="50%" stopColor="var(--accent-5)" />
                <stop offset="100%" stopColor="var(--accent-8)" />
              </linearGradient>
            </defs>
            <path
              d="M 5 10 Q 50 5, 100 10 T 195 10"
              stroke="url(#brushGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              className={styles.strokePath}
            />
          </svg>
        </div>

        {/* Progress bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            >
              <div className={styles.progressShine}></div>
            </div>
          </div>
          <span className={styles.progressText}>{Math.round(progress)}%</span>
        </div>

        {/* Quote section */}
        <div className={styles.quoteSection}>
          <IoSparkles className={styles.quoteIcon} />
          <div className={styles.quoteContent} key={currentQuote}>
            <p className={styles.quoteText}>"{loadingQuotes[currentQuote].quote}"</p>
            <cite className={styles.quoteAuthor}>— {loadingQuotes[currentQuote].artist}</cite>
          </div>
        </div>

        {/* Color splash decorations */}
        <div className={styles.splashDecor}>
          <div className={styles.splash} data-splash="1"></div>
          <div className={styles.splash} data-splash="2"></div>
          <div className={styles.splash} data-splash="3"></div>
        </div>
      </div>

      {/* Floating paint splatters */}
      <div className={styles.floatingSplatters}>
        <div className={styles.splatter} data-splatter="1"></div>
        <div className={styles.splatter} data-splatter="2"></div>
        <div className={styles.splatter} data-splatter="3"></div>
        <div className={styles.splatter} data-splatter="4"></div>
      </div>
    </div>
  );
};

export default Loading;
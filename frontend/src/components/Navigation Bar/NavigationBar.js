import React, { useState, useRef, useEffect } from "react";
import { Palette, Paintbrush, Droplets, Sparkles, ImageIcon, Mail, User } from 'lucide-react';
import styles from "./NavigationBar.module.css";

const NavigationBar = ({ 
  links, 
  onNavigate, 
  burgerSize = 44,
  className = ""
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const wrapperRef = useRef();
  const menuRef = useRef();

  const ICONS = [Palette, Paintbrush, Droplets, Sparkles, ImageIcon, Mail, User];

  const handleBurgerClick = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLinkClick = (link) => {
    if (link.onClick) link.onClick();
    if (link.to) onNavigate(link.to);
    setMenuOpen(false);
    setHoveredLink(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideWrapper = wrapperRef.current && !wrapperRef.current.contains(event.target);
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      
      if (clickedOutsideWrapper && clickedOutsideMenu) {
        setMenuOpen(false);
        setHoveredLink(null);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setHoveredLink(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav className={`${styles.navbar} ${className}`}>
      <div className={styles.burgerContainer} ref={wrapperRef}>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerActive : ''}`}
          onClick={handleBurgerClick}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          type="button"
          style={{
            width: burgerSize,
            height: burgerSize,
          }}
        >
          <div className={styles.burgerInner}>
            <span className={styles.burgerBar}></span>
            <span className={styles.burgerBar}></span>
            <span className={styles.burgerBar}></span>
          </div>
          <svg className={styles.splatter} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className={`${styles.menu} ${styles.menuActive}`} ref={menuRef}>
          <div className={styles.paintSplash}>
            <div className={styles.splash} style={{ '--delay': '0s', '--size': '80px', '--x': '10%', '--y': '5%' }}></div>
            <div className={styles.splash} style={{ '--delay': '0.5s', '--size': '60px', '--x': '85%', '--y': '15%' }}></div>
            <div className={styles.splash} style={{ '--delay': '1s', '--size': '70px', '--x': '5%', '--y': '80%' }}></div>
            <div className={styles.splash} style={{ '--delay': '1.5s', '--size': '50px', '--x': '90%', '--y': '75%' }}></div>
          </div>

          <ul className={styles.linkList}>
            {links && links.slice(0, 7).map((link, index) => {
              const Icon = ICONS[index] || Palette;
              
              return (
                <li key={`nav-${index}`} className={styles.linkItem}>
                  <button
                    className={`${styles.link} ${hoveredLink === index ? styles.linkActive : ''}`}
                    onClick={() => handleLinkClick(link)}
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                    type="button"
                  >
                    <div className={styles.linkBg}></div>
                    <div className={styles.linkIcon}>
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className={styles.linkLabel}>{link.label}</span>
                    <div className={styles.inkDrip}></div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {menuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => {
            setMenuOpen(false);
            setHoveredLink(null);
          }}
        />
      )}
    </nav>
  );
};

export default NavigationBar;
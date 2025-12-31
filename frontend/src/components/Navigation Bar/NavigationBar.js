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
        </button>
      </div>

      {menuOpen && (
        <div className={styles.menu} ref={menuRef}>
          <ul className={styles.linkList}>
            {links && links.slice(0, 7).map((link, index) => {
              const Icon = ICONS[index] || Palette;
              const isHovered = hoveredLink === index;
              
              return (
                <li key={`nav-${index}`} className={styles.linkItem}>
                  <button
                    className={`${styles.link} ${isHovered ? styles.linkHovered : ''}`}
                    onClick={() => handleLinkClick(link)}
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                    type="button"
                    data-index={index}
                  >
                    <div className={styles.linkIcon}>
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <span className={styles.linkLabel}>{link.label}</span>
                    <svg className={styles.brushStroke} viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path 
                        d="M0,4 Q25,1 50,4 T100,4" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
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
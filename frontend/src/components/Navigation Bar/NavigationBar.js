import React, { useState, useRef, useEffect } from "react";
import { 
  RiPaletteLine, 
  RiImageLine, 
  RiBrushLine, 
  RiUserHeartLine, 
  RiMailLine, 
  RiGalleryLine,
  RiSparklingLine 
} from 'react-icons/ri';

/* Styling */
import styles from "./NavigationBar.module.css";
import '../../styles/Theme.css';
import '../../styles/Components.css';
import '../../styles/Wrappers.css';

// Default artistic navigation icons with colors
const DEFAULT_ICONS = [
  { icon: RiGalleryLine, name: "Gallery", color: "#FF6B9D" },
  { icon: RiPaletteLine, name: "Portfolio", color: "#C44569" },
  { icon: RiBrushLine, name: "Works", color: "#F8B500" },
  { icon: RiImageLine, name: "Collections", color: "#4ECDC4" },
  { icon: RiUserHeartLine, name: "About", color: "#95E1D3" },
  { icon: RiMailLine, name: "Contact", color: "#AA96DA" },
  { icon: RiSparklingLine, name: "Shop", color: "#FCBAD3" }
];

/**
 * Artistic Burger Menu NavigationBar with paint brush sweep effects
 */
const NavigationBar = function NavigationBar({ 
  links, 
  onNavigate, 
  burgerSize = 60,
  className = ""
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
  const [brushStrokes, setBrushStrokes] = useState([]);
  const wrapperRef = useRef();
  const menuRef = useRef();

  // Generate brush sweep effect
  const createBrushSweep = (index, color) => {
    const brushId = Date.now() + Math.random();
    const angle = Math.random() * 360;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    const newBrush = {
      id: brushId,
      index,
      color,
      angle,
      startX,
      startY
    };
    
    setBrushStrokes(prev => [...prev, newBrush]);
    
    // Remove brush stroke after animation
    setTimeout(() => {
      setBrushStrokes(prev => prev.filter(s => s.id !== brushId));
    }, 1500);
  };

  // Handle burger button click
  const handleBurgerClick = () => {
    setMenuOpen(prev => !prev);
    if (!menuOpen) {
      setBrushStrokes([]);
    }
  };

  // Handle link click with brush sweep
  const handleLinkClick = (link, index) => {
    const color = DEFAULT_ICONS[index]?.color || "#FF6B9D";
    
    setClickedLink(index);
    
    // Create multiple brush sweeps for dramatic effect
    createBrushSweep(index, color);
    setTimeout(() => createBrushSweep(index, color), 150);
    
    setTimeout(() => {
      if (link.onClick) link.onClick();
      if (link.to) onNavigate(link.to);
      setMenuOpen(false);
      setClickedLink(null);
      setHoveredLink(null);
      setBrushStrokes([]);
    }, 600);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideWrapper = wrapperRef.current && !wrapperRef.current.contains(event.target);
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      
      if (clickedOutsideWrapper && clickedOutsideMenu) {
        setMenuOpen(false);
        setHoveredLink(null);
        setBrushStrokes([]);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setHoveredLink(null);
        setBrushStrokes([]);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav className={`${styles.navbar} ${className}`}>
      {/* Colorful Burger Menu Button */}
      <div className={styles.burgerContainer} ref={wrapperRef}>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={handleBurgerClick}
          type="button"
          style={{
            width: burgerSize,
            height: burgerSize,
          }}
        >
          {/* Rainbow gradient background */}
          <div className={styles.burgerRainbow}></div>
          
          {/* Paint drip effect */}
          <div className={styles.paintDrips}>
            <div className={styles.drip} style={{ '--drip-color': '#FF6B9D', '--drip-delay': '0s' }}></div>
            <div className={styles.drip} style={{ '--drip-color': '#4ECDC4', '--drip-delay': '0.3s' }}></div>
            <div className={styles.drip} style={{ '--drip-color': '#F8B500', '--drip-delay': '0.6s' }}></div>
          </div>
          
          {/* Colorful burger lines */}
          <div className={styles.burgerLines}>
            <span className={styles.burgerLine} style={{ background: '#FF6B9D' }}></span>
            <span className={styles.burgerLine} style={{ background: '#4ECDC4' }}></span>
            <span className={styles.burgerLine} style={{ background: '#F8B500' }}></span>
          </div>
        </button>
      </div>

      {/* Navigation Menu */}
      {menuOpen && (
        <div 
          className={`${styles.menuDropdown} ${styles.menuDropdownOpen}`}
          ref={menuRef}
        >
          {/* Vibrant colorful background */}
          <div className={styles.colorfulBg}>
            <div className={styles.colorBlob} style={{ '--blob-color': '#FF6B9D', '--blob-index': 0 }}></div>
            <div className={styles.colorBlob} style={{ '--blob-color': '#4ECDC4', '--blob-index': 1 }}></div>
            <div className={styles.colorBlob} style={{ '--blob-color': '#F8B500', '--blob-index': 2 }}></div>
            <div className={styles.colorBlob} style={{ '--blob-color': '#AA96DA', '--blob-index': 3 }}></div>
            <div className={styles.colorBlob} style={{ '--blob-color': '#95E1D3', '--blob-index': 4 }}></div>
          </div>

          {/* Brush strokes canvas */}
          <div className={styles.brushCanvas}>
            {brushStrokes.map(brush => (
              <div
                key={brush.id}
                className={styles.brushStroke}
                style={{
                  '--brush-color': brush.color,
                  '--brush-angle': `${brush.angle}deg`,
                  '--brush-start-x': `${brush.startX}%`,
                  '--brush-start-y': `${brush.startY}%`
                }}
              >
                {/* Main brush stroke */}
                <div className={styles.brushPath}></div>
                {/* Paint splatters along the stroke */}
                <div className={styles.brushSplatter1}></div>
                <div className={styles.brushSplatter2}></div>
                <div className={styles.brushSplatter3}></div>
              </div>
            ))}
          </div>

          {/* Navigation Links */}
          <ul className={styles.linksList}>
            {links.map((link, index) => {
              const IconComponent = DEFAULT_ICONS[index]?.icon || RiSparklingLine;
              const iconName = DEFAULT_ICONS[index]?.name || "Link";
              const iconColor = DEFAULT_ICONS[index]?.color || "#FF6B9D";
              
              return (
                <li 
                  key={`${link.label}-${index}`} 
                  className={styles.linkItem}
                  style={{ '--link-index': index }}
                >
                  <button
                    className={`${styles.link} ${hoveredLink === index ? styles.linkHovered : ""} ${clickedLink === index ? styles.linkClicked : ""}`}
                    onClick={() => handleLinkClick(link, index)}
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                    type="button"
                    style={{ '--link-color': iconColor }}
                  >
                    {/* Paint stroke background */}
                    <div className={styles.paintStroke}></div>
                    
                    {/* Icon with color */}
                    <div className={styles.linkIconWrapper}>
                      <IconComponent className={styles.linkIcon} />
                      <div className={styles.colorBurst}></div>
                    </div>
                    
                    {/* Text content */}
                    <div className={styles.linkTextWrapper}>
                      <span className={styles.linkLabel}>{link.label}</span>
                      <span className={styles.linkSubtext}>{iconName}</span>
                    </div>
                    
                    {/* Paint drip decoration */}
                    <div className={styles.paintDripDecor}></div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {/* Colorful backdrop */}
      {menuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => { 
            setMenuOpen(false); 
            setHoveredLink(null);
            setBrushStrokes([]);
          }}
        ></div>
      )}
    </nav>
  );
};

export default NavigationBar;
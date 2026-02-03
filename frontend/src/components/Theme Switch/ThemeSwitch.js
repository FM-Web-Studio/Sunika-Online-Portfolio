import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './ThemeSwitch.module.css';
import '../../styles/Theme.css';
import '../../styles/Components.css';
import '../../styles/Wrappers.css';

// ============================================
// THEME SWITCH COMPONENT
// ============================================
// Toggle button for switching between light and dark themes
// Provides visual feedback with sun/moon icons

const ThemeSwitch = ({ theme, toggleTheme, size = 25 }) => {
  // ----------------------------------------
  // State Management
  // ----------------------------------------
  
  const [isPressed, setIsPressed] = useState(false);

  // ----------------------------------------
  // Event Handlers
  // ----------------------------------------
  
  const handlePointerDown = () => setIsPressed(true);
  const handlePointerUp = () => setIsPressed(false);

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <span
      className={`${styles['theme-switch']} ${isPressed ? styles['pressed'] : ''}`}
      onClick={toggleTheme}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="Toggle Theme"
      role="button"
      tabIndex={0}
    >
      <span className={styles['icon']} style={{ fontSize: `${size}px` }} aria-hidden="true">
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </span>
    </span>
  );
};

// ============================================
// EXPORTS
// ============================================

export default ThemeSwitch;
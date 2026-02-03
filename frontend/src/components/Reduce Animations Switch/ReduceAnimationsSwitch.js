import React, { useState, useEffect } from 'react';
import { Paintbrush, PaintbrushVertical } from 'lucide-react';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './ReduceAnimationsSwitch.module.css';
import '../../styles/Theme.css';
import '../../styles/Components.css';
import '../../styles/Wrappers.css';

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = 'reduceAnimations';

// ============================================
// REDUCE ANIMATIONS SWITCH COMPONENT
// ============================================
// Toggle switch for enabling/disabling animations
// Persists preference to localStorage and applies to DOM

const ReduceAnimationsSwitch = ({ size = 22 }) => {
  // ----------------------------------------
  // State Management
  // ----------------------------------------
  
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  // Apply animation preference to DOM and persist to storage
  
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.setAttribute('data-no-animations', 'true');
    } else {
      root.removeAttribute('data-no-animations');
    }
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
    } catch (e) {}
  }, [enabled]);

  // ----------------------------------------
  // Event Handlers
  // ----------------------------------------
  
  const toggle = () => setEnabled((v) => !v);

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <button
      className={`${styles.artistSwitch} ${enabled ? styles.active : ''}`}
      onClick={toggle}
      role="switch"
      aria-checked={enabled}
      aria-label="Reduce Animations"
      type="button"
    >
      <div className={styles.canvas}>
        <div className={styles.paintTrail}></div>
        <div className={styles.brushThumb}>
          {enabled ? (
            <PaintbrushVertical size={16} strokeWidth={2.5} />
          ) : (
            <Paintbrush size={16} strokeWidth={2.5} />
          )}
        </div>
        <div className={styles.splatterEffect}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </button>
  );
};

// ============================================
// EXPORTS
// ============================================

export default ReduceAnimationsSwitch;
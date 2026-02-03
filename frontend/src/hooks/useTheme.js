import { useState, useEffect } from 'react';

// ============================================
// THEME INITIALIZATION
// ============================================
// Get initial theme from localStorage or browser preference

export const getInitialTheme = () => {
  const sessionInfo = localStorage.getItem('userSessionInfo');
  if (sessionInfo) {
    try {
      const parsed = JSON.parse(sessionInfo);
      if (parsed.prefersColorScheme) return parsed.prefersColorScheme;
    } catch {
      // fallback to browser default
    }
  }

  // Use browser default if no stored preference
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

// ============================================
// USE THEME HOOK
// ============================================
// Custom hook for managing theme state across the application
// Syncs with localStorage and broadcasts changes

export const useTheme = () => {
  // ----------------------------------------
  // State Management
  // ----------------------------------------
  
  const [theme, setTheme] = useState(getInitialTheme());

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  // Apply theme to DOM and sync with localStorage
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const sessionInfo = localStorage.getItem('userSessionInfo');
    let updatedInfo = {};

    if (sessionInfo) {
      try {
        updatedInfo = JSON.parse(sessionInfo);
      } catch {
        updatedInfo = {};
      }
    }

    updatedInfo.prefersColorScheme = theme;
    localStorage.setItem('userSessionInfo', JSON.stringify(updatedInfo));

    // Broadcast theme change to other hook instances in this window
    try {
      const ev = new CustomEvent('themechange', { detail: theme });
      window.dispatchEvent(ev);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // Listen for theme changes from other instances and storage events
  useEffect(() => {
    const handler = (e) => {
      if (e && e.detail && e.detail !== theme) setTheme(e.detail);
    };

    const storageHandler = (e) => {
      if (e.key === 'userSessionInfo') {
        try {
          const parsed = JSON.parse(e.newValue || '{}');
          if (parsed.prefersColorScheme && parsed.prefersColorScheme !== theme) {
            setTheme(parsed.prefersColorScheme);
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('themechange', handler);
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('themechange', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, [theme]);

  // ----------------------------------------
  // Theme Toggle Function
  // ----------------------------------------
  
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // ----------------------------------------
  // Return Values
  // ----------------------------------------
  
  return { theme, toggleTheme, setTheme };
};
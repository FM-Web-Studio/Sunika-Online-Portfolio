import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, useNavigate, useLocation } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './components';

// ============================================
// IMPORTS - STYLING
// ============================================

import './styles/Theme.css';
import './styles/Components.css';
import './styles/Wrappers.css';

// ============================================
// ERROR BOUNDARY WRAPPER
// ============================================
// Wraps app with error boundary that uses router hooks

function ErrorBoundaryWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ErrorBoundary
      fallbackPath="/"
      navigate={navigate}
      onGoHome={() => navigate('/')}
      key={location.pathname}
    >
      {children}
    </ErrorBoundary>
  );
}

// ============================================
// HASH ROUTING SETUP
// ============================================
// Map pathname to hash-based route for static hosting

(() => {
  try {
    // Known repo/site bases to map into hash routing
    const bases = ['/Sunika-Online-Portfolio'];
    const { pathname, hash, origin, search } = window.location;
    if (!hash || hash === '' || hash === '#') {
      const matched = bases.find(b => pathname.startsWith(b));
      if (matched) {
        const sub = pathname.slice(matched.length) || '/';
        const newUrl = `${origin}${matched}/#${sub}${search}`;
        if (newUrl !== window.location.href) window.location.replace(newUrl);
      } else if (pathname !== '/' && pathname !== '') {
        // Generic mapping: move pathname into hash root
        const newUrl = `${origin}/#${pathname}${search}`;
        if (newUrl !== window.location.href) window.location.replace(newUrl);
      }
    }
  } catch (e) {
    // ignore in non-browser environments
  }
})();

// ============================================
// RENDER APPLICATION
// ============================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      {/* ErrorBoundaryWrapper must be inside HashRouter so hooks work */}
      <ErrorBoundaryWrapper>
        <App />
      </ErrorBoundaryWrapper>
    </HashRouter>
  </React.StrictMode>
);
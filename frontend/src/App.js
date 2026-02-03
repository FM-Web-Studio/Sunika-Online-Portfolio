import React, { Suspense, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { NotFound, Loading } from './pages';
import { NavigationBar, Settings } from './components';
import { useTheme } from './hooks';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './App.module.css';

// ============================================
// LAZY LOADED PAGE COMPONENTS
// ============================================

const Home = React.lazy(() => import('./pages/Home'));
const Bio = React.lazy(() => import('./pages/Bio'));
const Connect = React.lazy(() => import('./pages/Connect'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const GraphicDesign = React.lazy(() => import('./pages/Graphic Design'));

// ============================================
// NAVIGATION CONFIGURATION
// ============================================

const NAVIGATION_PAGES = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Bio',
    to: '/bio'
  },
  {
    label: 'Gallery',
    to: '/gallery'
  },
  {
    label: 'Graphic Design',
    to: '/graphic-design'
  },
  {
    label: 'Connect',
    to: '/connect'
  },
];

// ============================================
// LOADING FALLBACK COMPONENT
// ============================================

const LoadingFallback = () => <Loading />;

// ============================================
// APP LAYOUT COMPONENT
// ============================================
// Main layout wrapper with navigation and settings

const AppLayout = () => {
  // ----------------------------------------
  // Hooks
  // ----------------------------------------
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // ----------------------------------------
  // Navigation Handlers
  // ----------------------------------------
  // Memoize to prevent recreation
  
  const handleNavigate = useCallback((to) => {
    if (to) navigate(to);
  }, [navigate]);

  // Memoize navigation links to prevent recreation
  const navigationLinks = useMemo(() => 
    NAVIGATION_PAGES.map(page => ({
      ...page,
      onClick: page.onClick ? () => page.onClick(navigate) : undefined
    })),
    [navigate]
  );
  // ----------------------------------------
  // Render
  // ----------------------------------------
    return (
    <div className={styles.app}>
      <NavigationBar
        links={navigationLinks}
        burgerSize={25}
        onNavigate={handleNavigate}
      />

      <div>
        <Settings
          theme={theme}
          toggleTheme={toggleTheme}
          cogSize={44}
        />
      </div>

      <div className={styles.pageContent}>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

// ----------------------------------------
// Memoize AppLayout
// ----------------------------------------

const MemoizedAppLayout = React.memo(AppLayout);

// ============================================
// APP CONTENT COMPONENT
// ============================================
// Route configuration

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<MemoizedAppLayout />}>
        <Route index element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/graphic-design" element={<GraphicDesign />} />
        <Route path="/connect" element={<Connect />} />

        {/* 404 Not Found - handle unknown routes inside app layout */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// ============================================
// ROOT APP COMPONENT
// ============================================
// Initialize theme and render app content

const App = () => {
  // Initialize theme at root level
  useTheme();

  return <AppContent />;
};

// ============================================
// EXPORTS
// ============================================

export default App;
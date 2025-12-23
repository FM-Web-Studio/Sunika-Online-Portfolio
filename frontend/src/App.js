import React, { Suspense, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { NotFound, Loading } from './pages';
import { NavigationBar, Settings } from './components';
import { useTheme } from './hooks';

/* Styling */
import styles from './App.module.css';

// ============================================================================
// EAGER LOADED COMPONENTS
// ============================================================================
const Home = React.lazy(() => import('./pages/Home'));

// ============================================================================
// NAVIGATION STRUCTURE
// ============================================================================
const NAVIGATION_PAGES = [
  {
    label: 'Home',
    to: '/'
  },
];

// ============================================================================
// LOADING FALLBACK COMPONENT
// ============================================================================
const LoadingFallback = () => <Loading />;

// ============================================================================
// APP LAYOUT COMPONENT
// ============================================================================
const AppLayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Navigation handlers - memoize to prevent recreation
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

  return (
    <div className={styles.app}>
      <NavigationBar
        links={navigationLinks}
        burgerSize={25}
        onNavigate={handleNavigate}
        className={styles.navigationBar}
      />
      
      <div className={styles.themeSwitch}>
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

// Memoize AppLayout to prevent unnecessary re-renders
const MemoizedAppLayout = React.memo(AppLayout);

// ============================================================================
// APP CONTENT COMPONENT
// ============================================================================
const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<MemoizedAppLayout />}>
        <Route index element={<Home />} />
        {/* 404 Not Found - handle unknown routes inside app layout */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// ============================================================================
// ROOT APP COMPONENT
// ============================================================================
const App = () => {
  // Initialize theme at the root level so it applies to all routes
  useTheme();

  return (
    <AppContent />
  );
};

export default App;
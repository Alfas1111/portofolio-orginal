import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/initialData';

const PortfolioContext = createContext();

const LOCAL_STORAGE_KEY = 'bca_portfolio_data_v2';
const THEME_STORAGE_KEY = 'bca_portfolio_theme_v2';
const ADMIN_KEY = 'bca_admin_unlocked_v1';

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialPortfolioData, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) return savedTheme;
    } catch (e) {
      console.error('Failed to load theme from localStorage', e);
    }
    return 'yellow-black';
  });

  const [isAdminMode, setIsAdminMode] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true') return true;
        return localStorage.getItem(ADMIN_KEY) === 'true';
      }
    } catch (e) {}
    return false;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [blogModalData, setBlogModalData] = useState(null);
  const [certModalData, setCertModalData] = useState(null);
  const [galleryModalData, setGalleryModalData] = useState(null);

  // Keyboard shortcut listener: Ctrl + Shift + E or Cmd + Shift + E
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsAdminMode((prev) => {
          const next = !prev;
          localStorage.setItem(ADMIN_KEY, next ? 'true' : 'false');
          if (next) setIsAdminOpen(true);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      console.error('Failed to set theme attribute', e);
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const updateData = (updater) => {
    setData((prev) => {
      if (typeof updater === 'function') {
        return updater(prev);
      }
      return { ...prev, ...updater };
    });
  };

  const resetData = () => {
    if (window.confirm('Reset portfolio content to original default template data?')) {
      setData(initialPortfolioData);
      setThemeState('yellow-black');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal.name.replace(/\s+/g, '_')}_Portfolio_Data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setData(parsed);
      alert('Portfolio data successfully imported!');
    } catch (e) {
      alert('Invalid JSON file format. Please check your backup file.');
    }
  };

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => {
      const next = !prev;
      localStorage.setItem(ADMIN_KEY, next ? 'true' : 'false');
      return next;
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        exportJSON,
        importJSON,
        theme,
        setTheme,
        isAdminMode,
        setIsAdminMode,
        toggleAdminMode,
        isAdminOpen,
        setIsAdminOpen,
        isCropperOpen,
        setIsCropperOpen,
        resumeModalOpen,
        setResumeModalOpen,
        blogModalData,
        setBlogModalData,
        certModalData,
        setCertModalData,
        galleryModalData,
        setGalleryModalData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

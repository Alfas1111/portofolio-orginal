import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/initialData';
import { fetchPublishedContent } from '../lib/database';
import { isSupabaseConfigured } from '../lib/supabase';

const PortfolioContext = createContext();

const LOCAL_STORAGE_KEY = 'bca_portfolio_data_v2';
const THEME_STORAGE_KEY = 'bca_portfolio_theme_v2';

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personal && (!parsed.personal.resumeUrl || parsed.personal.resumeUrl.includes('w3.org'))) {
          parsed.personal.resumeUrl = '/Muhammed_Alfas_Resume.pdf';
        }
        return {
          ...initialPortfolioData,
          ...parsed,
          personal: { ...initialPortfolioData.personal, ...(parsed.personal || {}) },
          social: { ...initialPortfolioData.social, ...(parsed.social || {}) }
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  const refreshContent = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const publishedMap = await fetchPublishedContent();
      if (publishedMap && Object.keys(publishedMap).length > 0) {
        setData((prev) => {
          const updated = {
            ...prev,
            ...publishedMap,
            personal: { ...prev.personal, ...(publishedMap.personal || {}) },
            social: { ...prev.social, ...(publishedMap.social || {}) }
          };
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
          } catch (err) {}
          return updated;
        });
      }
    } catch (err) {
      console.warn('Could not load content from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch published data from Supabase backend on mount
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }
    refreshContent();
  }, []);

  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) return savedTheme;
    } catch (e) {
      console.error('Failed to load theme from localStorage', e);
    }
    return 'yellow-black';
  });

  // Modal states for public viewing
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [blogModalData, setBlogModalData] = useState(null);
  const [certModalData, setCertModalData] = useState(null);
  const [galleryModalData, setGalleryModalData] = useState(null);

  // Apply theme class to document
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
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const downloadResume = (customUrl, customName) => {
    const resumeUrl = customUrl || data?.personal?.resumeUrl || '/Muhammed_Alfas_Resume.pdf';
    const fileName = customName || data?.personal?.resumeFileName || 'Muhammed_Alfas_BCA_SoftwareEngineer_Resume.pdf';

    if (!resumeUrl) {
      alert('Resume file is not available.');
      return;
    }

    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        updateData,
        theme,
        setTheme,
        // Public viewer is always view-only (isAdminMode is strictly false)
        isAdminMode: false,
        resumeModalOpen,
        setResumeModalOpen,
        downloadResume,
        blogModalData,
        setBlogModalData,
        certModalData,
        setCertModalData,
        galleryModalData,
        setGalleryModalData,
        refreshContent,
        isSupabaseConfigured,
        // Compatibility stubs so legacy calls don't crash
        openAdminTab: () => {},
        requestAdminAccess: () => {},
        setIsAdminOpen: () => {},
        isAdminOpen: false
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

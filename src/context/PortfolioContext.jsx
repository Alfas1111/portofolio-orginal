import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/initialData';

const PortfolioContext = createContext();

const LOCAL_STORAGE_KEY = 'bca_portfolio_data_v2';
const THEME_STORAGE_KEY = 'bca_portfolio_theme_v2';
const AUTH_STORAGE_KEY = 'portfolio_admin_auth_v1';
const PASSCODE_STORAGE_KEY = 'portfolio_admin_passcode_v1';
export const DEFAULT_ADMIN_PASSCODE = 'alfas2026';

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

  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) return savedTheme;
    } catch (e) {
      console.error('Failed to load theme from localStorage', e);
    }
    return 'yellow-black';
  });

  // Admin Master Passcode
  const [adminPasscode, setAdminPasscodeState] = useState(() => {
    try {
      return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_ADMIN_PASSCODE;
    } catch (e) {
      return DEFAULT_ADMIN_PASSCODE;
    }
  });

  const setAdminPasscode = (newPass) => {
    const trimmed = (newPass || '').trim();
    if (!trimmed) return;
    try {
      localStorage.setItem(PASSCODE_STORAGE_KEY, trimmed);
      setAdminPasscodeState(trimmed);
    } catch (e) {
      console.error('Failed to save passcode', e);
    }
  };

  // Only true if authenticated via secret passcode or valid auth session
  const [isAdminMode, setIsAdminMode] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedPass = localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_ADMIN_PASSCODE;
        const urlParams = new URLSearchParams(window.location.search);
        const adminParam = urlParams.get('admin');

        // Secret URL access: ?admin=alfas2026 (or custom passcode)
        if (adminParam && adminParam.trim() === storedPass.trim()) {
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
          localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
          urlParams.delete('admin');
          const cleanQuery = urlParams.toString() ? `?${urlParams.toString()}` : '';
          window.history.replaceState({}, document.title, window.location.pathname + cleanQuery + window.location.hash);
          return true;
        }

        // Check existing authenticated session
        const isSessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated';
        const isLocalAuth = localStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated';
        if (isSessionAuth || isLocalAuth) {
          return true;
        }
      }
    } catch (e) {}
    // Default to false for all visitors!
    return false;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('personal');
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [blogModalData, setBlogModalData] = useState(null);
  const [certModalData, setCertModalData] = useState(null);
  const [galleryModalData, setGalleryModalData] = useState(null);

  const openAdminTab = (tabId = 'personal') => {
    if (!isAdminMode) {
      setIsAuthModalOpen(true);
      return;
    }
    setAdminActiveTab(tabId);
    setIsAdminOpen(true);
  };

  const requestAdminAccess = () => {
    if (isAdminMode) {
      setIsAdminOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const verifyAndUnlock = (inputPasscode) => {
    const trimmed = (inputPasscode || '').trim();
    if (trimmed === adminPasscode.trim()) {
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
      } catch (e) {}
      setIsAdminMode(true);
      setIsAuthModalOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  const lockAdminMode = () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
    setIsAdminMode(false);
    setIsAdminOpen(false);
    setIsAuthModalOpen(false);
  };

  // Keyboard shortcut listener: Ctrl + Shift + E or Cmd + Shift + E
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        requestAdminAccess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminMode]);

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
        updateData,
        resetData,
        exportJSON,
        importJSON,
        theme,
        setTheme,
        isAdminMode,
        setIsAdminMode,
        toggleAdminMode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        adminPasscode,
        setAdminPasscode,
        requestAdminAccess,
        verifyAndUnlock,
        lockAdminMode,
        isAdminOpen,
        setIsAdminOpen,
        adminActiveTab,
        setAdminActiveTab,
        openAdminTab,
        isCropperOpen,
        setIsCropperOpen,
        resumeModalOpen,
        setResumeModalOpen,
        downloadResume,
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

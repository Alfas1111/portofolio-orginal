import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/initialData';
import { fetchPublishedContent, subscribeToLiveContentUpdates } from '../lib/database';
import { isSupabaseConfigured } from '../lib/supabase';

const PortfolioContext = createContext();

export const LOCAL_STORAGE_KEY = 'bca_portfolio_data_v5';
export const LEGACY_STORAGE_KEYS = [
  'bca_portfolio_data_v4',
  'bca_portfolio_data_v3',
  'bca_portfolio_data_v2',
  'bca_portfolio_data_v1',
  'bca_portfolio_data'
];
export const THEME_STORAGE_KEY = 'bca_portfolio_theme_v2';
export const CACHE_VERSION_KEY = 'bca_portfolio_cache_version';

// Unique build fingerprint - whenever code or data is updated, this automatically invalidates older stale mobile/desktop caches
export const PORTFOLIO_BUILD_VERSION = 'v2026.10.24.sync6';

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedVersion = localStorage.getItem(CACHE_VERSION_KEY);
        if (storedVersion !== PORTFOLIO_BUILD_VERSION) {
          // Stale cache from previous build detected: clean up all legacy keys
          LEGACY_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          localStorage.setItem(CACHE_VERSION_KEY, PORTFOLIO_BUILD_VERSION);
        } else {
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
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio data from localStorage cache:', e);
    }
    return initialPortfolioData;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [isLiveSyncActive, setIsLiveSyncActive] = useState(isSupabaseConfigured);

  const refreshContent = async ({ silent = false } = {}) => {
    if (!silent) setIsSyncing(true);
    setSyncError(null);

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setIsSyncing(false);
      return;
    }

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
            localStorage.setItem(CACHE_VERSION_KEY, PORTFOLIO_BUILD_VERSION);
          } catch (storageErr) {
            // Mobile Safari / Chrome may throw QuotaExceededError if base64 attachments are large
            console.warn('LocalStorage write failed (quota limit):', storageErr);
          }

          return updated;
        });
        setLastSyncedAt(new Date());
      }
    } catch (err) {
      console.warn('Could not sync content from Supabase:', err);
      setSyncError(err.message || 'Sync failed');
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  };

  // Fetch published data from Supabase backend on mount
  useEffect(() => {
    refreshContent();
  }, []);

  // Realtime subscription + Cross-tab BroadcastChannel: updates all devices live
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // 1. Supabase Realtime WebSocket subscription
    const unsubscribe = subscribeToLiveContentUpdates((payload) => {
      setIsLiveSyncActive(true);
      if (payload.new && payload.new.section && payload.new.is_published) {
        const sectionKey = payload.new.section;
        const newContent = payload.new.content;
        setData((prev) => {
          const updated = {
            ...prev,
            [sectionKey]: newContent,
            personal: sectionKey === 'personal'
              ? { ...prev.personal, ...(newContent || {}) }
              : prev.personal,
            social: sectionKey === 'social'
              ? { ...prev.social, ...(newContent || {}) }
              : prev.social
          };
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
        setLastSyncedAt(new Date());
      } else if (payload.eventType === 'DELETE' || (payload.new && !payload.new.is_published)) {
        refreshContent({ silent: true });
      }
    });

    // 2. Cross-tab BroadcastChannel for instantaneous sync across browser tabs/windows
    let bc = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('portfolio_sync_bus');
        bc.onmessage = (event) => {
          if (event.data?.type === 'SECTION_SAVED' || event.data?.type === 'REFRESH_REQUESTED') {
            refreshContent({ silent: true });
          }
        };
      } catch (e) {}
    }

    // 3. Mobile screen unlock, tab focus, and network reconnection handlers
    const handleRevalidation = () => {
      if (typeof document !== 'undefined' && !document.hidden) {
        refreshContent({ silent: true });
      }
    };

    window.addEventListener('focus', handleRevalidation);
    document.addEventListener('visibilitychange', handleRevalidation);
    window.addEventListener('online', handleRevalidation);

    // 4. Background heartbeat polling (every 10 seconds)
    const pollInterval = setInterval(() => {
      if (typeof document !== 'undefined' && !document.hidden) {
        refreshContent({ silent: true });
      }
    }, 10000);

    return () => {
      if (unsubscribe) unsubscribe();
      if (bc) bc.close();
      window.removeEventListener('focus', handleRevalidation);
      document.removeEventListener('visibilitychange', handleRevalidation);
      window.removeEventListener('online', handleRevalidation);
      clearInterval(pollInterval);
    };
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

  const clearPortfolioCache = () => {
    try {
      LEGACY_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.setItem(CACHE_VERSION_KEY, PORTFOLIO_BUILD_VERSION);
    } catch (e) {}
    setData(initialPortfolioData);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
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
        isSyncing,
        syncError,
        lastSyncedAt,
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
        clearPortfolioCache,
        isSupabaseConfigured,
        isLiveSyncActive,
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


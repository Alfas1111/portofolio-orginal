import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is an admin
  const checkAdminStatus = async (userId) => {
    if (!supabase || !userId) {
      setIsAdmin(false);
      return false;
    }
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
        return false;
      }
      const adminStatus = !!data;
      setIsAdmin(adminStatus);
      return adminStatus;
    } catch (err) {
      console.error('Admin check failed:', err);
      setIsAdmin(false);
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    if (!isSupabaseConfigured) {
      try {
        const devSession = sessionStorage.getItem('portfolio_dev_admin_session');
        if (devSession === 'true') {
          setUser({ email: 'admin@portfolio.local', id: 'dev-admin-id' });
          setIsAdmin(true);
        }
      } catch (e) {}
      setLoading(false);
      return;
    }

    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await checkAdminStatus(session.user.id);
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await checkAdminStatus(session.user.id);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Developer local mode login (only available when Supabase credentials are not yet set)
  const loginDevMode = () => {
    const devUser = { email: 'admin@portfolio.local', id: 'dev-admin-id' };
    setUser(devUser);
    setIsAdmin(true);
    try {
      sessionStorage.setItem('portfolio_dev_admin_session', 'true');
    } catch (e) {}
  };

  // Login with email/password
  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      loginDevMode();
      return { user: { email: 'admin@portfolio.local' } };
    }
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError(authError.message);
        throw authError;
      }

      if (data?.user) {
        setUser(data.user);
        const adminStatus = await checkAdminStatus(data.user.id);
        if (!adminStatus) {
          // Sign out non-admin users
          await supabase.auth.signOut();
          setUser(null);
          setIsAdmin(false);
          const err = new Error('Access denied. This account does not have administrator privileges.');
          setError(err.message);
          throw err;
        }
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      sessionStorage.removeItem('portfolio_dev_admin_session');
    } catch (e) {}
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    setUser(null);
    setIsAdmin(false);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        error,
        login,
        loginDevMode,
        logout,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

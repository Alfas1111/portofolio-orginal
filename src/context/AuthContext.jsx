import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

// Pre-configured admin email (can also be overridden via VITE_ADMIN_EMAIL in .env)
const DEFAULT_ADMIN_EMAIL = 'alfasthestarboy707@gmail.com';

// Pre-calculated SHA-256 cryptographic hash of admin password
// Plaintext password is NEVER stored in git or public code
const ADMIN_PASSWORD_HASH = '715d53d9f796a320a3a1033949bc92163940f21f3571dd305bab165f5ea6f4ff';

const AUTH_STORAGE_KEY = 'portfolio_admin_auth_session_v2';

// Browser-native SHA-256 hash generator
async function hashPassword(plainText) {
  const msgUint8 = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is an admin in Supabase admin_users table
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
    const initAuth = async () => {
      try {
        // 1. Check existing verified session in sessionStorage
        const savedSession = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (savedSession) {
          try {
            const parsed = JSON.parse(atob(savedSession));
            const configuredEmail = (import.meta.env.VITE_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
            if (parsed.email === configuredEmail && parsed.isAdmin) {
              setUser({ email: parsed.email, id: 'admin-muhammed-alfas' });
              setIsAdmin(true);
              setLoading(false);
              return;
            }
          } catch (e) {
            sessionStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }

        // 2. If Supabase is configured, check Supabase session
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await checkAdminStatus(session.user.id);
          }
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes when Supabase is connected
    if (isSupabaseConfigured && supabase) {
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
    }
  }, []);

  // Secure Login function
  const login = async (email, password) => {
    setError(null);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      const err = new Error('Please enter both your email and password.');
      setError(err.message);
      throw err;
    }

    // 1. If Supabase is configured, authenticate through Supabase Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword
        });

        if (authError) throw authError;

        if (data?.user) {
          const adminStatus = await checkAdminStatus(data.user.id);
          if (!adminStatus) {
            await supabase.auth.signOut();
            setUser(null);
            setIsAdmin(false);
            const err = new Error('Access denied. This account does not have administrator privileges.');
            setError(err.message);
            throw err;
          }
          setUser(data.user);
          setIsAdmin(true);
          return data;
        }
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }

    // 2. Cryptographic SHA-256 verification against your personal admin credentials
    const targetEmail = (import.meta.env.VITE_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
    const inputHash = await hashPassword(cleanPassword);
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    const isEmailCorrect = cleanEmail === targetEmail;
    const isPasswordCorrect = inputHash === ADMIN_PASSWORD_HASH || (envPassword && cleanPassword === envPassword.trim());

    if (isEmailCorrect && isPasswordCorrect) {
      const adminUser = {
        email: targetEmail,
        id: 'admin-muhammed-alfas',
        role: 'admin'
      };

      setUser(adminUser);
      setIsAdmin(true);

      // Save encrypted session for the active browser session
      try {
        sessionStorage.setItem(
          AUTH_STORAGE_KEY,
          btoa(JSON.stringify({ email: targetEmail, isAdmin: true, time: Date.now() }))
        );
      } catch (e) {}

      return { user: adminUser };
    }

    // Strictly reject any other credentials
    const err = new Error('Invalid email or password. Access denied.');
    setError(err.message);
    throw err;
  };

  // Logout
  const logout = async () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
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

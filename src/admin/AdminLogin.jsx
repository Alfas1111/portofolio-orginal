import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';

const AdminLogin = () => {
  const { login, loginDevMode, isAdmin, user, loading, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef(null);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured) {
      loginDevMode();
      navigate('/admin', { replace: true });
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDevLogin = () => {
    loginDevMode();
    navigate('/admin', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-yellow-400 font-mono text-sm animate-pulse">AUTHENTICATING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFD700 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-display font-extrabold text-xl border-4 border-black shadow-[6px_6px_0px_#000] mb-6">
            <span>MA.</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            ADMIN <span className="text-yellow-400">LOGIN</span>
          </h1>
          <p className="font-mono text-xs text-zinc-500 mt-2 uppercase tracking-wider">
            // RESTRICTED ACCESS — AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* Not configured warning with quick preview access */}
        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 bg-amber-950/60 border-2 border-amber-500 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-xs font-bold text-amber-400 uppercase">Supabase Cloud Not Connected</p>
                <p className="font-sans text-xs text-amber-200 mt-1">
                  Add <code className="bg-black/50 px-1 py-0.5 text-yellow-300">VITE_SUPABASE_URL</code> and{' '}
                  <code className="bg-black/50 px-1 py-0.5 text-yellow-300">VITE_SUPABASE_ANON_KEY</code> to your{' '}
                  <code className="bg-black/50 px-1 py-0.5 text-yellow-300">.env</code> file for cloud auth.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDevLogin}
              className="w-full py-2.5 px-4 bg-yellow-400 text-black font-mono text-xs font-extrabold flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer border border-black shadow-[2px_2px_0px_#000]"
            >
              <Sparkles className="w-4 h-4" />
              <span>EXPLORE ADMIN DASHBOARD NOW (DEV PREVIEW)</span>
            </button>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-[#111] border-4 border-yellow-400 p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-400 text-black border-2 border-black">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
                // SECURE AUTHENTICATION
              </span>
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-white">
                SIGN IN
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-2">
                EMAIL ADDRESS:
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@example.com"
                  className="w-full bg-zinc-900 text-white font-mono text-sm pl-10 pr-4 py-3 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none transition-colors"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-2">
                PASSWORD:
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter password..."
                  className="w-full bg-zinc-900 text-white font-mono text-sm pl-10 pr-11 py-3 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none transition-colors"
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-950/80 border-2 border-red-500 text-red-300 font-mono text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-3.5 px-6 font-mono text-sm font-extrabold flex items-center justify-center gap-2 shadow-[4px_4px_0px_#FFF] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">VERIFYING...</span>
                ) : (
                  <>
                    <span>SIGN IN TO DASHBOARD</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Back to Portfolio */}
          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <a
              href="/"
              className="font-mono text-xs text-zinc-500 hover:text-yellow-400 transition-colors uppercase tracking-wider"
            >
              ← BACK TO PORTFOLIO
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center font-mono text-[10px] text-zinc-600 mt-6 uppercase">
          ADMIN PANEL • MUHAMMED ALFAS PORTFOLIO
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert, ArrowRight } from 'lucide-react';

export const AdminAuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, verifyAndUnlock } = usePortfolio();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      setPasscode('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter your passcode');
      return;
    }

    const success = verifyAndUnlock(passcode);
    if (!success) {
      setError('Access Denied: Incorrect admin passcode');
      setPasscode('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0A0A0A] text-white border-4 border-yellow-400 w-full max-w-md p-6 sm:p-8 shadow-[8px_8px_0px_#000] sm:shadow-[14px_14px_0px_#000] relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-black transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-400 text-black border-2 border-black">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
              // RESTRICTED ACCESS
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
              ADMIN VERIFICATION
            </h3>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-zinc-300 font-medium mb-6">
          This portfolio is protected. Enter your private master passcode to unlock editing and CMS management controls.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-2">
              MASTER PASSCODE:
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="Enter passcode..."
                className="w-full bg-zinc-900 text-white font-mono text-sm px-4 py-3 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-red-950/80 border-2 border-red-500 text-red-300 font-mono text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-3 px-4 font-mono text-xs font-extrabold flex items-center justify-center gap-2 shadow-[3px_3px_0px_#FFF] cursor-pointer"
            >
              <span>UNLOCK CONTROLS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="px-4 py-3 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 font-mono text-xs font-bold cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

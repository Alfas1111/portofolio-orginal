import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Palette, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'yellow-black',
      name: 'Theme 1 — YELLOW / BLACK',
      desc: 'Bold yellow background + black typography & borders',
      bgClass: 'bg-[#FFD700]',
      textClass: 'text-black',
      borderClass: 'border-black'
    },
    {
      id: 'black-gold',
      name: 'Theme 2 — BLACK / GOLD',
      desc: 'Luxury dark interface with gold accents',
      bgClass: 'bg-[#0A0A0C]',
      textClass: 'text-[#EAB308]',
      borderClass: 'border-[#EAB308]'
    },
    {
      id: 'white-black',
      name: 'Theme 3 — WHITE / BLACK',
      desc: 'Minimal Swiss-inspired professional design',
      bgClass: 'bg-[#F8F9FA]',
      textClass: 'text-[#0F172A]',
      borderClass: 'border-[#0F172A]'
    },
    {
      id: 'neon',
      name: 'Theme 4 — NEON FUTURISTIC',
      desc: 'Dark cyber interface with vibrant cyan accents',
      bgClass: 'bg-[#050814]',
      textClass: 'text-[#00F0FF]',
      borderClass: 'border-[#00F0FF]'
    },
    {
      id: 'editorial',
      name: 'Theme 5 — EDITORIAL MAGAZINE',
      desc: 'Creative magazine layout with warm cream & charcoal',
      bgClass: 'bg-[#F4EFEA]',
      textClass: 'text-[#1F1E1B]',
      borderClass: 'border-[#1F1E1B]'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="brutal-btn bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black p-3.5 flex items-center gap-2 text-xs font-mono font-bold shadow-[4px_4px_0px_#FFD700] transition-all"
        title="Change Visual Theme"
      >
        <Palette className="w-5 h-5 animate-spin-slow" />
        <span className="hidden sm:inline">CHANGE THEME</span>
      </button>

      {/* Theme Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-black text-white border-4 border-yellow-400 p-5 shadow-[12px_12px_0px_#000] z-50 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-yellow-400" />
                <h4 className="font-heading text-lg font-bold uppercase text-white">
                  SELECT PORTFOLIO THEME
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {themes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-yellow-400 bg-zinc-900 text-yellow-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-heading text-xs font-bold uppercase flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${t.bgClass} border border-white/40`}></span>
                        <span>{t.name}</span>
                      </div>
                      <p className="font-sans text-[11px] text-zinc-400 mt-1">
                        {t.desc}
                      </p>
                    </div>

                    {isSelected && (
                      <Check className="w-5 h-5 text-yellow-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-center font-mono text-[10px] text-zinc-500 uppercase border-t border-zinc-800">
              ⚡ LIVE THEME SYSTEM • ALL CONTENT IS PRESERVED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

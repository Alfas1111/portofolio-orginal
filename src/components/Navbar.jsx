import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Settings, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { data, setIsAdminOpen, isAdminMode, toggleAdminMode } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Triple-click on logo unlocks/toggles Admin mode!
  const handleLogoClick = (e) => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        toggleAdminMode();
        setIsAdminOpen(true);
        alert('⚡ SECRET ADMIN MODE UNLOCKED! You can now edit portfolio content.');
        return 0;
      }
      return next;
    });

    setTimeout(() => {
      setClickCount(0);
    }, 1500);
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Ideas & Startups', href: '#startups' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A] text-white border-b-4 border-yellow-400 py-3 shadow-2xl'
          : 'bg-[#0A0A0A]/90 backdrop-blur-md text-white py-4 border-b-2 border-zinc-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo (Triple-click unlocks Admin Mode) */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2 group cursor-pointer select-none"
            title="Double-click or triple-click for secret admin access"
          >
            <span className="bg-yellow-400 text-black px-2.5 py-1 font-display font-extrabold text-xl tracking-tighter border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
              AS.
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                {data.personal.name || 'ARYAN SHARMA'}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase -mt-1">
                BCA • Software Engineer
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-2.5 py-1 text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800/60 rounded transition-all uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* ONLY VISIBLE WHEN ADMIN MODE IS UNLOCKED */}
            {isAdminMode && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-yellow-400 text-black hover:bg-white border border-black shadow-[2px_2px_0px_#000] transition-all rounded"
                title="Admin Mode Active (Press Ctrl+Shift+E anytime)"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>EDIT PORTFOLIO</span>
              </button>
            )}

            <a
              href="#contact"
              className="brutal-btn flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 text-xs font-extrabold tracking-wider hover:bg-white transition-all"
            >
              <span>LET'S CONNECT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            {isAdminMode && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="p-2 bg-yellow-400 text-black rounded border border-black"
                title="Edit Content"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-yellow-400 text-black border-2 border-black focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b-4 border-yellow-400 px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-heading font-bold text-zinc-200 hover:bg-yellow-400 hover:text-black rounded border border-zinc-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center brutal-btn bg-yellow-400 text-black py-2.5 font-bold text-sm tracking-wider flex items-center justify-center gap-2"
            >
              <span>LET'S CONNECT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

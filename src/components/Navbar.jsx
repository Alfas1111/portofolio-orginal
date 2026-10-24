import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { data, isLiveSyncActive } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Internships', href: '#internships' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Ideas & Startups', href: '#startups' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smooth scroll handler taking mobile drawer closing and fixed navbar into account
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    setTimeout(() => {
      if (href === '#hero' || href === '#') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        if (window.history.pushState) window.history.pushState(null, '', href);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = window.innerWidth <= 768 ? 70 : 80;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - navbarHeight),
          behavior: 'smooth'
        });
        if (window.history.pushState) window.history.pushState(null, '', href);
      }
    }, 120);
  };

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
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group cursor-pointer select-none"
          >
            <span className="bg-yellow-400 text-black px-2.5 py-1 font-display font-extrabold text-xl tracking-tighter border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
              MA.
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                {data.personal.name || 'MUHAMMED ALFAS'}
              </span>
              <div className="flex items-center gap-2 -mt-1">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                  BCA • Software Engineer
                </span>
                {isLiveSyncActive && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.2 rounded" title="Supabase Live Cross-Device Sync Active">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    SYNC
                  </span>
                )}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-2.5 py-1 text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800/60 rounded transition-all uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="brutal-btn flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 text-xs font-extrabold tracking-wider hover:bg-white transition-all cursor-pointer"
            >
              <span>LET'S CONNECT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex xl:hidden items-center gap-2">
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
        <div className="xl:hidden bg-[#0A0A0A] border-b-4 border-yellow-400 px-4 pt-4 pb-6 space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-2 text-xs sm:text-sm font-heading font-bold text-zinc-200 hover:bg-yellow-400 hover:text-black rounded border border-zinc-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center brutal-btn bg-yellow-400 text-black py-2.5 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer"
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

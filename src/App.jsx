import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { StartupIdeas } from './components/StartupIdeas';
import { Services } from './components/Services';
import { Blog } from './components/Blog';
import { ResumeSection } from './components/ResumeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { ContactAndCTA } from './components/ContactAndCTA';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AdminCMSModal } from './components/AdminCMSModal';
import { ImageCropperModal } from './components/ImageCropperModal';
import { ResumeModal } from './components/ResumeModal';
import { BlogModal } from './components/BlogModal';
import { CertModal } from './components/CertModal';
import { GalleryModal } from './components/GalleryModal';

import { usePortfolio } from './context/PortfolioContext';

export const PortfolioContent = () => {
  const { data } = usePortfolio();
  const name = data?.personal?.name || 'MUHAMMED ALFAS';

  return (
    <div className="min-h-screen relative font-sans text-main bg-primary transition-colors duration-300">
      {/* Background Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise z-30"></div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <StartupIdeas />
        <Services />
        <Blog />
        <ResumeSection />
        <PhotoGallery />
        <ContactAndCTA />
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t-4 border-yellow-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-display font-bold text-yellow-400 text-lg block uppercase">
              {name} • BCA SOFTWARE ENGINEER
            </span>
            <p className="text-zinc-500 mt-1">
              Built with React, Tailwind CSS & High-Contrast Design. All content fully editable.
            </p>
          </div>
          <p className="text-zinc-400 uppercase">
            © {new Date().getFullYear()} {name}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Interactive Controls & Modals */}
      <ThemeSwitcher />
      <AdminCMSModal />
      <ImageCropperModal />
      <ResumeModal />
      <BlogModal />
      <CertModal />
      <GalleryModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

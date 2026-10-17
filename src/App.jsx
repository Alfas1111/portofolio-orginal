import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Public Portfolio Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Internships } from './components/Internships';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { StartupIdeas } from './components/StartupIdeas';
import { Services } from './components/Services';
import { Blog } from './components/Blog';
import { ResumeSection } from './components/ResumeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { ContactAndCTA } from './components/ContactAndCTA';
import { ThemeSwitcher } from './components/ThemeSwitcher';

// Viewer Modals
import { ResumeModal } from './components/ResumeModal';
import { BlogModal } from './components/BlogModal';
import { CertModal } from './components/CertModal';
import { GalleryModal } from './components/GalleryModal';

// Admin System
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';

// Admin Section Editors
import DashboardOverview from './admin/pages/DashboardOverview';
import PersonalEditor from './admin/pages/PersonalEditor';
import StatsEditor from './admin/pages/StatsEditor';
import SkillsEditor from './admin/pages/SkillsEditor';
import ProjectsEditor from './admin/pages/ProjectsEditor';
import EducationEditor from './admin/pages/EducationEditor';
import ExperienceEditor from './admin/pages/ExperienceEditor';
import InternshipsEditor from './admin/pages/InternshipsEditor';
import CertificationsEditor from './admin/pages/CertificationsEditor';
import AchievementsEditor from './admin/pages/AchievementsEditor';
import IdeasEditor from './admin/pages/IdeasEditor';
import ServicesEditor from './admin/pages/ServicesEditor';
import BlogEditor from './admin/pages/BlogEditor';
import GalleryEditor from './admin/pages/GalleryEditor';
import SocialEditor from './admin/pages/SocialEditor';
import CTAEditor from './admin/pages/CTAEditor';
import ResumeEditor from './admin/pages/ResumeEditor';

export const PortfolioContent = () => {
  const { data } = usePortfolio();
  const name = data?.personal?.name || 'MUHAMMED ALFAS';

  // Ensure correct scroll position when visiting on mobile / desktop
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      const hash = window.location.hash;
      if (!hash || hash === '#hero' || hash === '#') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        const timer = setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) {
            const navbarHeight = window.innerWidth <= 768 ? 70 : 80;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.max(0, elementPosition - navbarHeight),
              behavior: 'smooth'
            });
          }
        }, 250);
        return () => clearTimeout(timer);
      }
    }
  }, []);

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
        <Internships />
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
              Built with React, Tailwind CSS & High-Contrast Design. All content managed via secure Admin CMS.
            </p>
          </div>
          <p className="text-zinc-400 uppercase">
            © {new Date().getFullYear()} {name}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Interactive Controls & Viewer Modals */}
      <ThemeSwitcher />
      <ResumeModal />
      <BlogModal />
      <CertModal />
      <GalleryModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PortfolioContent />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="personal" element={<PersonalEditor />} />
            <Route path="stats" element={<StatsEditor />} />
            <Route path="skills" element={<SkillsEditor />} />
            <Route path="projects" element={<ProjectsEditor />} />
            <Route path="education" element={<EducationEditor />} />
            <Route path="experience" element={<ExperienceEditor />} />
            <Route path="internships" element={<InternshipsEditor />} />
            <Route path="certifications" element={<CertificationsEditor />} />
            <Route path="achievements" element={<AchievementsEditor />} />
            <Route path="ideas" element={<IdeasEditor />} />
            <Route path="services" element={<ServicesEditor />} />
            <Route path="blog" element={<BlogEditor />} />
            <Route path="gallery" element={<GalleryEditor />} />
            <Route path="social" element={<SocialEditor />} />
            <Route path="cta" element={<CTAEditor />} />
            <Route path="resume" element={<ResumeEditor />} />
          </Route>

          {/* Catch-all redirect to public portfolio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PortfolioProvider>
    </AuthProvider>
  );
}

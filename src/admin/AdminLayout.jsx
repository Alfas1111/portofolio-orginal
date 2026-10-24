import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import {
  LayoutDashboard, User, BarChart3, Code, FolderGit2, GraduationCap,
  Briefcase, Award, Trophy, Rocket, Wrench, BookOpen, Image as ImageIcon,
  Share2, MessageSquare, FileText, LogOut, Menu, X, ChevronRight, Shield, Radio
} from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/personal', icon: User, label: 'Personal Info' },
  { to: '/admin/stats', icon: BarChart3, label: 'Stats & Metrics' },
  { to: '/admin/skills', icon: Code, label: 'Skills' },
  { to: '/admin/projects', icon: FolderGit2, label: 'Projects' },
  { to: '/admin/education', icon: GraduationCap, label: 'Education' },
  { to: '/admin/experience', icon: Briefcase, label: 'Experience' },
  { to: '/admin/internships', icon: Briefcase, label: 'Internships' },
  { to: '/admin/certifications', icon: Award, label: 'Certifications' },
  { to: '/admin/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/admin/ideas', icon: Rocket, label: 'Startup Ideas' },
  { to: '/admin/services', icon: Wrench, label: 'Services' },
  { to: '/admin/blog', icon: BookOpen, label: 'Blog' },
  { to: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
  { to: '/admin/social', icon: Share2, label: 'Social Links' },
  { to: '/admin/cta', icon: MessageSquare, label: 'CTA Section' },
  { to: '/admin/resume', icon: FileText, label: 'Resume / CV' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { isLiveSyncActive } = usePortfolio();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await logout();
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#0D0D0D] border-r-4 border-yellow-400 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b-2 border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-2 py-1 font-display font-extrabold text-lg border-2 border-black">
                MA.
              </span>
              <div>
                <span className="font-heading text-sm font-bold text-white block">ADMIN PANEL</span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Dashboard</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          <div className="mt-3 flex items-center gap-2 p-2 bg-zinc-900/80 border border-zinc-800 rounded">
            <Shield className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="font-mono text-[11px] text-zinc-400 truncate">
              {user?.email || 'Admin'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-thin">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded ${
                    isActive
                      ? 'bg-yellow-400 text-black shadow-[3px_3px_0px_#000]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.label}</span>
                <ChevronRight className="w-3 h-3 ml-auto opacity-40" />
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t-2 border-zinc-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase border border-zinc-800 transition-colors rounded"
          >
            <span>VIEW PORTFOLIO</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white font-mono text-xs font-bold uppercase border border-red-900/40 transition-colors rounded cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur border-b-2 border-zinc-800 px-4 py-3 flex items-center justify-between lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
              PORTFOLIO CMS
            </span>
            {isLiveSyncActive ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SUPABASE LIVE SYNC ACTIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800">
                OFFLINE CACHE
              </span>
            )}
          </div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

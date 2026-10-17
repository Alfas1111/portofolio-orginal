import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchAllContent, seedInitialData } from '../../lib/database';
import { initialPortfolioData } from '../../data/initialData';
import { isSupabaseConfigured } from '../../lib/supabase';
import {
  LayoutDashboard, User, Code, FolderGit2, GraduationCap, Briefcase,
  Award, Trophy, Rocket, Wrench, BookOpen, Image as ImageIcon, Share2,
  MessageSquare, BarChart3, Database, CheckCircle, XCircle, Upload,
  AlertTriangle, ExternalLink, FileText, ChevronRight
} from 'lucide-react';

const sectionMeta = {
  personal: { icon: User, label: 'Personal Info', link: '/admin/personal', color: 'bg-blue-500' },
  stats: { icon: BarChart3, label: 'Stats & Metrics', link: '/admin/stats', color: 'bg-purple-500' },
  skills: { icon: Code, label: 'Skills', link: '/admin/skills', color: 'bg-green-500' },
  projects: { icon: FolderGit2, label: 'Projects', link: '/admin/projects', color: 'bg-amber-500' },
  education: { icon: GraduationCap, label: 'Education', link: '/admin/education', color: 'bg-cyan-500' },
  experience: { icon: Briefcase, label: 'Experience', link: '/admin/experience', color: 'bg-pink-500' },
  internships: { icon: Briefcase, label: 'Internships', link: '/admin/internships', color: 'bg-rose-500' },
  certifications: { icon: Award, label: 'Certifications', link: '/admin/certifications', color: 'bg-indigo-500' },
  achievements: { icon: Trophy, label: 'Achievements', link: '/admin/achievements', color: 'bg-orange-500' },
  startupIdeas: { icon: Rocket, label: 'Startup Ideas', link: '/admin/ideas', color: 'bg-red-500' },
  services: { icon: Wrench, label: 'Services', link: '/admin/services', color: 'bg-teal-500' },
  blog: { icon: BookOpen, label: 'Blog', link: '/admin/blog', color: 'bg-violet-500' },
  gallery: { icon: ImageIcon, label: 'Gallery', link: '/admin/gallery', color: 'bg-sky-500' },
  social: { icon: Share2, label: 'Social Links', link: '/admin/social', color: 'bg-emerald-500' },
  ctaSection: { icon: MessageSquare, label: 'CTA Section', link: '/admin/cta', color: 'bg-lime-500' },
};

const DashboardOverview = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  const loadContent = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    try {
      const data = await fetchAllContent();
      setSections(data || []);
    } catch (err) {
      console.error('Failed to load content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSeedData = async () => {
    if (!window.confirm('This will populate the database with your portfolio template data. Continue?')) return;
    setSeeding(true);
    setSeedMessage('');
    try {
      const result = await seedInitialData(initialPortfolioData);
      setSeedMessage(result.message);
      if (result.seeded) {
        await loadContent();
      }
    } catch (err) {
      setSeedMessage(`Error: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const publishedCount = sections.filter((s) => s.is_published).length;
  const draftCount = sections.filter((s) => !s.is_published).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-400 text-black border-2 border-black">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
              // ADMIN DASHBOARD
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              DASHBOARD <span className="text-yellow-400">OVERVIEW</span>
            </h1>
          </div>
        </div>
        <p className="font-sans text-sm text-zinc-400 mt-2">
          Welcome back, <span className="text-yellow-400 font-semibold">{user?.email}</span>. Manage your portfolio content below.
        </p>
      </div>

      {/* Supabase not configured warning */}
      {!isSupabaseConfigured && (
        <div className="p-5 bg-amber-950/50 border-2 border-amber-500 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-heading text-sm font-bold text-amber-300 uppercase">Database Not Connected</p>
            <p className="font-sans text-xs text-amber-300/80 mt-1">
              Configure your Supabase environment variables to enable database storage. Until then, the portfolio displays data from the local template file.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4 hover:border-yellow-400 transition-colors">
          <Database className="w-5 h-5 text-yellow-400 mb-2" />
          <div className="font-display text-3xl font-extrabold text-yellow-400">{sections.length}</div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1">Total Sections</div>
        </div>
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4 hover:border-green-400 transition-colors">
          <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
          <div className="font-display text-3xl font-extrabold text-green-400">{publishedCount}</div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1">Published</div>
        </div>
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4 hover:border-orange-400 transition-colors">
          <XCircle className="w-5 h-5 text-orange-400 mb-2" />
          <div className="font-display text-3xl font-extrabold text-orange-400">{draftCount}</div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1">Drafts</div>
        </div>
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4 hover:border-purple-400 transition-colors">
          <FileText className="w-5 h-5 text-purple-400 mb-2" />
          <div className="font-display text-3xl font-extrabold text-purple-400">{Object.keys(sectionMeta).length}</div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1">Available</div>
        </div>
      </div>

      {/* Seed Data Button */}
      {isSupabaseConfigured && sections.length === 0 && !loading && (
        <div className="p-5 bg-zinc-900 border-2 border-dashed border-yellow-400/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-heading text-sm font-bold text-white uppercase">Initialize Database</p>
              <p className="font-sans text-xs text-zinc-400 mt-1">
                No content found in database. Seed it with your portfolio template data to get started.
              </p>
            </div>
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="brutal-btn bg-yellow-400 text-black hover:bg-white px-5 py-2.5 font-mono text-xs font-extrabold flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{seeding ? 'SEEDING...' : 'SEED INITIAL DATA'}</span>
            </button>
          </div>
          {seedMessage && (
            <p className={`font-mono text-xs mt-3 ${seedMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
              {seedMessage}
            </p>
          )}
        </div>
      )}

      {/* Section Grid */}
      <div>
        <h2 className="font-heading text-lg font-bold text-white uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-yellow-400 inline-block" />
          CONTENT SECTIONS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(sectionMeta).map(([key, meta]) => {
            const Icon = meta.icon;
            const dbSection = sections.find((s) => s.section === key);
            const isInDb = !!dbSection;
            const isPublished = dbSection?.is_published ?? false;

            return (
              <Link
                key={key}
                to={meta.link}
                className="group bg-zinc-900 border-2 border-zinc-800 p-4 hover:border-yellow-400 transition-all hover:shadow-[4px_4px_0px_#FFD700] flex items-center gap-4"
              >
                <div className={`p-2.5 ${meta.color} text-white shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-heading text-sm font-bold text-white uppercase group-hover:text-yellow-400 transition-colors truncate">
                    {meta.label}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {isInDb ? (
                      <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase ${isPublished ? 'text-green-400' : 'text-orange-400'}`}>
                        {isPublished ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {isPublished ? 'Published' : 'Draft'}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-600 uppercase">Not in DB</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded">
        <h3 className="font-mono text-xs font-bold text-zinc-500 uppercase mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 font-mono text-xs font-bold uppercase border border-zinc-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

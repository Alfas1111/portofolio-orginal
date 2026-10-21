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
  AlertTriangle, ExternalLink, FileText, ChevronRight,
  Download, Copy, Smartphone, HelpCircle, Check, ArrowRight
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
  const [copyMessage, setCopyMessage] = useState('');
  const [showCloudGuide, setShowCloudGuide] = useState(false);
  const [hasLocalEdits, setHasLocalEdits] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bca_portfolio_data_v2');
      if (stored) {
        setHasLocalEdits(true);
      }
    } catch (e) {}
  }, []);

  const getCurrentPortfolioData = () => {
    try {
      const stored = localStorage.getItem('bca_portfolio_data_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...initialPortfolioData,
          ...parsed,
          personal: { ...initialPortfolioData.personal, ...(parsed.personal || {}) },
          social: { ...initialPortfolioData.social, ...(parsed.social || {}) }
        };
      }
    } catch (e) {}
    return initialPortfolioData;
  };

  const handleDownloadInitialData = () => {
    const fullData = getCurrentPortfolioData();
    const fileContent = `export const initialPortfolioData = ${JSON.stringify(fullData, null, 2)};\n`;
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'initialData.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopyMessage('Downloaded initialData.js! Replace src/data/initialData.js with this file and git push to update mobile & all visitors.');
  };

  const handleCopyInitialData = async () => {
    const fullData = getCurrentPortfolioData();
    const fileContent = `export const initialPortfolioData = ${JSON.stringify(fullData, null, 2)};\n`;
    try {
      await navigator.clipboard.writeText(fileContent);
      setCopyMessage('Copied to clipboard! Paste into src/data/initialData.js and git push to update mobile & all visitors.');
      setTimeout(() => setCopyMessage(''), 6000);
    } catch (err) {
      setCopyMessage('Failed to copy to clipboard.');
    }
  };

  const handleExportJSON = () => {
    const fullData = getCurrentPortfolioData();
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        localStorage.setItem('bca_portfolio_data_v2', JSON.stringify(parsed));
        setHasLocalEdits(true);
        setCopyMessage('Imported successfully! Reloading to apply changes...');
        setTimeout(() => window.location.reload(), 1200);
      } catch (err) {
        setCopyMessage('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

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

      {/* Cross-Device Sync & Export Notification Banner */}
      {!isSupabaseConfigured && (
        <div className="bg-zinc-900 border-4 border-yellow-400 p-5 sm:p-6 shadow-[8px_8px_0px_#FFD700] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-400 text-black border-2 border-black">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
                  // DESKTOP VS MOBILE SYNC STATUS
                </span>
                <h2 className="font-display text-lg sm:text-xl font-extrabold text-white uppercase tracking-tight">
                  LOCAL STORAGE MODE: <span className="text-yellow-400">WHY MOBILE DOESN'T UPDATE</span>
                </h2>
              </div>
            </div>
            {hasLocalEdits && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-950/80 border border-green-500 text-green-400 font-mono text-xs font-bold uppercase self-start sm:self-auto">
                <Check className="w-3.5 h-3.5" />
                Edits saved in this browser
              </span>
            )}
          </div>

          <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
            You updated a section on desktop, but your mobile phone still shows the original content. This happens because <strong>Supabase cloud database is not connected</strong>. Your edits are currently saved only inside this desktop browser's local storage. When you open the same link on your phone, mobile has its own isolated storage and falls back to default data.
          </p>

          {/* Quick Action Buttons */}
          <div className="bg-black/60 border-2 border-zinc-800 p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 inline-block" />
                METHOD 1: EXPORT EDITS TO YOUR CODE (RECOMMENDED • ZERO SETUP)
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                Replace <code>src/data/initialData.js</code> & git push
              </span>
            </div>

            <p className="font-sans text-xs text-zinc-400">
              Download your current updated data as <code>initialData.js</code>, replace the file in your repository, and commit/push to Vercel. Both mobile and desktop will display your new content permanently!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleDownloadInitialData}
                className="brutal-btn bg-yellow-400 text-black hover:bg-white px-4 py-2 font-mono text-xs font-extrabold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD INITIALDATA.JS</span>
              </button>

              <button
                onClick={handleCopyInitialData}
                className="brutal-btn bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 px-4 py-2 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer border border-zinc-700"
              >
                <Copy className="w-4 h-4" />
                <span>COPY INITIALDATA.JS CODE</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3 py-2 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 font-mono text-xs font-bold flex items-center gap-1.5 border border-zinc-800 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT JSON</span>
              </button>

              <label className="px-3 py-2 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 font-mono text-xs font-bold flex items-center gap-1.5 border border-zinc-800 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>IMPORT JSON</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>

            {copyMessage && (
              <div className="p-2.5 bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 font-mono text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{copyMessage}</span>
              </div>
            )}
          </div>

          {/* Cloud Database Guide Toggle */}
          <div className="pt-1">
            <button
              onClick={() => setShowCloudGuide(!showCloudGuide)}
              className="text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-yellow-400" />
              <span>{showCloudGuide ? 'HIDE' : 'OR METHOD 2: CONNECT SUPABASE FOR AUTOMATIC REAL-TIME CLOUD SYNC'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showCloudGuide ? 'rotate-90' : ''}`} />
            </button>

            {showCloudGuide && (
              <div className="mt-3 p-4 bg-black/80 border-2 border-zinc-800 font-sans text-xs text-zinc-300 space-y-3">
                <p className="font-heading font-bold text-white uppercase text-sm">
                  How to enable live cross-device cloud sync:
                </p>
                <ol className="list-decimal list-inside space-y-2 font-mono text-xs text-zinc-300">
                  <li>
                    Create a free project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">supabase.com</a>.
                  </li>
                  <li>
                    In Supabase Dashboard, go to <strong>SQL Editor</strong> &gt; <strong>New Query</strong>, paste the content of <code>supabase/schema.sql</code>, and click <strong>Run</strong>.
                  </li>
                  <li>
                    In your <strong>Vercel Project Settings</strong> (or local <code>.env</code> file), add these two environment variables:
                    <div className="mt-1 p-2 bg-zinc-900 border border-zinc-700 text-yellow-300 select-all font-mono text-[11px]">
                      VITE_SUPABASE_URL=https://your-project.supabase.co<br />
                      VITE_SUPABASE_ANON_KEY=your-anon-key
                    </div>
                  </li>
                  <li>
                    Redeploy on Vercel. Now every edit in this Admin dashboard saves straight to the cloud and updates mobile devices instantly in real-time!
                  </li>
                </ol>
              </div>
            )}
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

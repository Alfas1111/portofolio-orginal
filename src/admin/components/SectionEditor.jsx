import React, { useState, useEffect, useCallback } from 'react';
import { fetchSectionContent, saveSectionContent, togglePublishStatus } from '../../lib/database';
import { initialPortfolioData } from '../../data/initialData';
import { isSupabaseConfigured } from '../../lib/supabase';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Save, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, RotateCcw, ArrowLeft,
  AlertTriangle, Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable section editor wrapper.
 * Handles loading, saving, publishing, and error states for any portfolio section.
 *
 * Props:
 * - sectionKey: string (e.g. 'personal', 'skills', 'projects')
 * - title: string (display title)
 * - icon: React component (lucide icon)
 * - children: function(content, setContent) => JSX — the form fields
 */
const SectionEditor = ({ sectionKey, title, icon: Icon, children }) => {
  const { updateData } = usePortfolio();
  const [content, setContent] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [hasChanges, setHasChanges] = useState(false);

  // Load section content
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (isSupabaseConfigured) {
          const data = await fetchSectionContent(sectionKey);
          if (data) {
            setContent(data.content);
            setIsPublished(data.is_published);
          } else {
            // Use initial data as fallback
            const fallback = initialPortfolioData[sectionKey];
            setContent(fallback || {});
          }
        } else {
          // Check localStorage first
          const stored = localStorage.getItem('bca_portfolio_data_v2');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed[sectionKey] !== undefined) {
                setContent(parsed[sectionKey]);
                setLoading(false);
                return;
              }
            } catch (e) {}
          }
          const fallback = initialPortfolioData[sectionKey];
          setContent(fallback || {});
        }
      } catch (err) {
        console.error(`Failed to load ${sectionKey}:`, err);
        const fallback = initialPortfolioData[sectionKey];
        setContent(fallback || {});
        setMessage({ type: 'error', text: `Failed to load: ${err.message}` });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [sectionKey]);

  // Warn user before leaving page if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // Wrapper for setContent that also marks changes
  const updateContent = useCallback((updater) => {
    setContent((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
    setHasChanges(true);
    setMessage(null);
  }, []);

  // Save content to database
  const handleSave = async (publish = isPublished) => {
    if (!isSupabaseConfigured) {
      try {
        const stored = localStorage.getItem('bca_portfolio_data_v2');
        const parsed = stored ? JSON.parse(stored) : { ...initialPortfolioData };
        parsed[sectionKey] = content;
        localStorage.setItem('bca_portfolio_data_v2', JSON.stringify(parsed));
        if (updateData) {
          updateData({ [sectionKey]: content });
        }
      } catch (e) {}

      setMessage({
        type: 'error',
        text: 'DATABASE NOT CONNECTED! Changes are saved locally on this device only. To sync across mobile and all devices, connect Supabase in Vercel or use Sync Tools in Dashboard.'
      });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      await saveSectionContent(sectionKey, content, publish);
      if (updateData) {
        updateData({ [sectionKey]: content });
      }
      setIsPublished(publish);
      setHasChanges(false);
      setMessage({
        type: 'success',
        text: publish
          ? '✓ Saved to server and published! Changes are now live across all devices.'
          : '✓ Saved as draft in database.'
      });
    } catch (err) {
      console.error('Save error:', err);
      setMessage({
        type: 'error',
        text: `Server save failed: ${err.message || 'Unknown network error'}. Changes were not saved to database.`
      });
    } finally {
      setSaving(false);
    }
  };

  // Toggle publish status
  const handleTogglePublish = async () => {
    const newStatus = !isPublished;
    const action = newStatus ? 'publish' : 'unpublish';
    if (!window.confirm(`Are you sure you want to ${action} this section?`)) return;

    if (!isSupabaseConfigured) {
      setMessage({
        type: 'error',
        text: 'Database not connected. Cannot toggle server publish status.'
      });
      return;
    }

    setSaving(true);
    try {
      await togglePublishStatus(sectionKey, newStatus);
      setIsPublished(newStatus);
      setMessage({
        type: 'success',
        text: newStatus
          ? '✓ Section published to database! Visible on all devices.'
          : '✓ Section unpublished from database. Hidden from visitors.'
      });
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to ${action}: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  // Reset to initial data
  const handleReset = () => {
    if (!window.confirm('Reset this section to the original template data? Your unsaved changes will be lost.')) return;
    const fallback = initialPortfolioData[sectionKey];
    setContent(fallback || {});
    setHasChanges(true);
    setMessage({ type: 'success', text: 'Reset to template data. Save to persist the changes.' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-3" />
          <p className="font-mono text-xs text-zinc-500 uppercase">Loading {title}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-1.5 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          {Icon && (
            <div className="p-2 bg-yellow-400 text-black border-2 border-black">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
              // EDIT SECTION
            </span>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] font-bold uppercase border ${
              isPublished
                ? 'bg-green-950/60 text-green-400 border-green-700'
                : 'bg-orange-950/60 text-orange-400 border-orange-700'
            }`}
          >
            {isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {isPublished ? 'Published' : 'Draft'}
          </span>
          {hasChanges && (
            <span className="inline-flex items-center gap-1 px-2 py-1 font-mono text-[10px] font-bold uppercase text-yellow-400 border border-yellow-400/30 bg-yellow-400/10">
              Unsaved Changes
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-2 p-3 font-mono text-xs font-bold border-2 ${
            message.type === 'success'
              ? 'bg-green-950/60 text-green-400 border-green-700'
              : 'bg-red-950/60 text-red-400 border-red-700'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Supabase Not Configured Notice */}
      {!isSupabaseConfigured && (
        <div className="p-3 bg-amber-950/40 border border-amber-500/50 flex items-center justify-between gap-3 text-amber-300 font-mono text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Local Mode:</strong> Changes are saved only to this desktop browser. To sync to your mobile phone and all visitors, export to code or connect Supabase.
            </span>
          </div>
          <Link
            to="/admin"
            className="shrink-0 underline hover:text-white flex items-center gap-1 font-bold text-[11px]"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Sync Guide</span>
          </Link>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-zinc-900/50 border-2 border-zinc-800 p-4 sm:p-6">
        {children(content, updateContent)}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-zinc-900 border-2 border-zinc-800 sticky bottom-0 z-10">
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="brutal-btn bg-yellow-400 text-black hover:bg-white px-5 py-2.5 font-mono text-xs font-extrabold flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'SAVING TO DATABASE...' : 'SAVE & PUBLISH'}</span>
        </button>

        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="brutal-btn bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white px-4 py-2.5 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>SAVE DRAFT</span>
        </button>

        <button
          onClick={handleTogglePublish}
          disabled={saving}
          className={`px-4 py-2.5 font-mono text-xs font-bold flex items-center gap-2 border cursor-pointer disabled:opacity-50 transition-colors ${
            isPublished
              ? 'bg-orange-950/40 text-orange-400 border-orange-800 hover:bg-orange-900'
              : 'bg-green-950/40 text-green-400 border-green-800 hover:bg-green-900'
          }`}
        >
          {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{isPublished ? 'UNPUBLISH' : 'PUBLISH'}</span>
        </button>

        <button
          onClick={handleReset}
          disabled={saving}
          className="px-4 py-2.5 font-mono text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-2 cursor-pointer disabled:opacity-50 ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
};

export default SectionEditor;

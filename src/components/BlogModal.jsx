import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, Clock, BookOpen, Edit2 } from 'lucide-react';

export const BlogModal = () => {
  const { blogModalData, setBlogModalData, openAdminTab } = usePortfolio();

  if (!blogModalData) return null;

  const handleEditClick = () => {
    setBlogModalData(null);
    openAdminTab('blog');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-3xl max-h-[88vh] p-4 sm:p-8 shadow-[6px_6px_0px_#000] sm:shadow-[16px_16px_0px_#000] flex flex-col justify-between overflow-y-auto relative">
        
        <div className="flex items-start sm:items-center justify-between border-b-2 border-zinc-800 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-3">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="p-2 bg-yellow-400 text-black shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[11px] sm:text-xs text-yellow-400 font-bold block truncate">
                {blogModalData.date} • {blogModalData.readTime}
              </span>
              <h3 className="font-heading text-lg sm:text-2xl font-bold uppercase text-white leading-tight">
                {blogModalData.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleEditClick}
              className="p-1.5 sm:p-2 bg-zinc-900 border border-zinc-700 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-mono text-xs font-bold flex items-center gap-1.5"
              title="Edit this article in CMS"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">EDIT ARTICLE</span>
            </button>
            <button
              onClick={() => setBlogModalData(null)}
              className="p-1.5 sm:p-2 bg-zinc-800 text-zinc-300 hover:bg-yellow-400 hover:text-black transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4 font-sans text-base text-zinc-200 leading-relaxed mb-6">
          <p className="font-bold text-yellow-400 bg-zinc-900 p-4 border-l-4 border-yellow-400">
            {blogModalData.summary}
          </p>
          <div className="pt-2 space-y-4 whitespace-pre-line text-zinc-300">
            {blogModalData.content}
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={handleEditClick}
            className="text-xs font-mono text-zinc-400 hover:text-yellow-400 flex items-center gap-1.5 font-bold"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>EDIT POST IN CMS</span>
          </button>
          <button
            onClick={() => setBlogModalData(null)}
            className="brutal-btn bg-yellow-400 text-black px-6 py-2 text-xs font-bold"
          >
            CLOSE ARTICLE
          </button>
        </div>

      </div>
    </div>
  );
};

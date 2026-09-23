import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, Clock, BookOpen } from 'lucide-react';

export const BlogModal = () => {
  const { blogModalData, setBlogModalData } = usePortfolio();

  if (!blogModalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-3xl max-h-[85vh] p-6 sm:p-8 shadow-[16px_16px_0px_#000] flex flex-col justify-between overflow-y-auto relative">
        
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 text-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-yellow-400 font-bold block">
                {blogModalData.date} • {blogModalData.readTime}
              </span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                {blogModalData.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setBlogModalData(null)}
            className="p-2 bg-zinc-800 text-zinc-300 hover:bg-yellow-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 font-sans text-base text-zinc-200 leading-relaxed mb-6">
          <p className="font-bold text-yellow-400 bg-zinc-900 p-4 border-l-4 border-yellow-400">
            {blogModalData.summary}
          </p>
          <div className="pt-2 space-y-4 whitespace-pre-line text-zinc-300">
            {blogModalData.content}
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 text-right">
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

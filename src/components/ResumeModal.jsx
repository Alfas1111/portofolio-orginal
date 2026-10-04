import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

export const ResumeModal = () => {
  const { data, resumeModalOpen, setResumeModalOpen, downloadResume } = usePortfolio();
  const { personal } = data;

  if (!resumeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-4xl h-[88vh] sm:h-[85vh] p-4 sm:p-6 shadow-[6px_6px_0px_#000] sm:shadow-[16px_16px_0px_#000] flex flex-col justify-between relative overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-zinc-800 pb-3 sm:pb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 text-black font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-white truncate">
                CURRICULUM VITAE PREVIEW
              </h3>
              <p className="font-mono text-xs text-yellow-400 truncate">
                {personal.name} • {personal.degree}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              onClick={downloadResume}
              className="brutal-btn bg-yellow-400 text-black px-3.5 sm:px-4 py-2 text-xs font-extrabold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD</span>
            </button>
            <button
              onClick={() => setResumeModalOpen(false)}
              className="p-2 bg-zinc-800 hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile browser hint */}
        <div className="sm:hidden mt-2 bg-yellow-400/10 border border-yellow-400/30 p-2 text-center text-[11px] font-mono text-yellow-400">
          💡 If PDF preview is limited on your phone, tap <strong className="underline">DOWNLOAD</strong> or <strong className="underline">OPEN IN NEW TAB</strong>.
        </div>

        {/* Viewer Container */}
        <div className="flex-1 my-3 sm:my-4 bg-zinc-900 border-2 border-zinc-800 overflow-hidden relative">
          <iframe
            src={personal.resumeUrl}
            title="Resume Viewer"
            className="w-full h-full border-none"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-zinc-400 pt-2.5 sm:pt-3 border-t border-zinc-800">
          <span className="truncate max-w-xs text-center sm:text-left">FILE: {personal.resumeFileName || 'Resume.pdf'}</span>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 flex items-center gap-1 font-bold text-yellow-400 sm:text-zinc-400"
          >
            <span>OPEN IN NEW TAB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

export const ResumeModal = () => {
  const { data, resumeModalOpen, setResumeModalOpen } = usePortfolio();
  const { personal } = data;

  if (!resumeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-4xl h-[85vh] p-6 shadow-[16px_16px_0px_#000] flex flex-col justify-between relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 text-black font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                CURRICULUM VITAE PREVIEW
              </h3>
              <p className="font-mono text-xs text-yellow-400">
                {personal.name} • {personal.degree}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personal.resumeUrl}
              download={personal.resumeFileName}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-extrabold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD</span>
            </a>
            <button
              onClick={() => setResumeModalOpen(false)}
              className="p-2 bg-zinc-800 hover:bg-yellow-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Container */}
        <div className="flex-1 my-4 bg-zinc-900 border-2 border-zinc-800 overflow-hidden relative">
          <iframe
            src={personal.resumeUrl}
            title="Resume Viewer"
            className="w-full h-full border-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 pt-3 border-t border-zinc-800">
          <span>FILE: {personal.resumeFileName || 'Resume.pdf'}</span>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 flex items-center gap-1"
          >
            <span>OPEN IN NEW TAB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

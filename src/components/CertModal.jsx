import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Award } from 'lucide-react';

export const CertModal = () => {
  const { certModalData, setCertModalData } = usePortfolio();

  if (!certModalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-2xl p-6 shadow-[16px_16px_0px_#000] space-y-4 relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              {certModalData.name}
            </h3>
          </div>
          <button
            onClick={() => setCertModalData(null)}
            className="p-1 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-[16/9] border-2 border-yellow-400 overflow-hidden bg-zinc-900">
          <img
            src={certModalData.image}
            alt={certModalData.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-zinc-300 pt-2 border-t border-zinc-800">
          <span>ISSUED BY: <strong className="text-yellow-400">{certModalData.organization}</strong> ({certModalData.date})</span>
          {certModalData.verifyLink && (
            <a
              href={certModalData.verifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>VERIFY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Image as ImageIcon, Tag } from 'lucide-react';

export const GalleryModal = () => {
  const { galleryModalData, setGalleryModalData } = usePortfolio();

  if (!galleryModalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-3xl p-6 shadow-[16px_16px_0px_#000] space-y-4 relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-yellow-400" />
            <h3 className="font-heading text-xl font-bold uppercase text-white">
              {galleryModalData.title}
            </h3>
          </div>
          <button
            onClick={() => setGalleryModalData(null)}
            className="p-1 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] border-2 border-yellow-400 overflow-hidden bg-zinc-950 flex items-center justify-center">
          <img
            src={galleryModalData.url}
            alt={galleryModalData.title}
            className="max-h-[60vh] w-auto object-contain"
          />
        </div>

        <div className="space-y-1 font-sans text-sm text-zinc-300 pt-2 border-t border-zinc-800">
          {galleryModalData.category && (
            <div className="font-mono text-xs font-bold text-yellow-400 uppercase inline-block bg-zinc-900 border border-zinc-800 px-2 py-0.5 mb-1">
              CATEGORY: #{galleryModalData.category}
            </div>
          )}
          {galleryModalData.caption && (
            <p className="italic text-zinc-200">{galleryModalData.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
};

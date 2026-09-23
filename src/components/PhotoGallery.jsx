import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Image as ImageIcon, Eye, Tag, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoGallery = () => {
  const { data, setGalleryModalData } = usePortfolio();
  const { gallery } = data;
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', ...new Set(gallery ? gallery.map((g) => g.category || 'General') : [])];

  const filteredGallery = selectedCat === 'All'
    ? gallery
    : (gallery || []).filter((g) => g.category === selectedCat);

  return (
    <section id="gallery" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 11. VISUAL SNAPSHOTS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              PERSONAL <span className="underline decoration-black decoration-4">GALLERY</span>
            </h2>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase border border-black transition-all ${
                  selectedCat === cat
                    ? 'bg-black text-yellow-400 shadow-[3px_3px_0px_#FFF]'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Editorial Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredGallery && filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setGalleryModalData(item)}
                className="break-inside-avoid bg-black text-white border-4 border-black p-3 shadow-[6px_6px_0px_#000] cursor-pointer group hover:-translate-y-1 transition-transform"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900 mb-3 border border-zinc-800">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-mono text-xs font-bold text-yellow-400">
                    <Maximize2 className="w-5 h-5" />
                    <span>EXPAND IMAGE</span>
                  </div>
                  {item.category && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-black font-mono text-[10px] font-bold px-2 py-0.5 border border-black uppercase">
                      {item.category}
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-lg font-bold text-white uppercase group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="font-sans text-xs text-zinc-400 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

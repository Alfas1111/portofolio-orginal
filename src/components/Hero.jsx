import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowDownRight, FileText, Camera, Edit3, Sparkles, Code2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const { data, setIsCropperOpen, setResumeModalOpen, isAdminMode } = usePortfolio();
  const { personal } = data;

  const imgStyle = personal.imagePosition
    ? {
        transform: `scale(${personal.imagePosition.zoom || 1}) translate(${personal.imagePosition.x || 0}px, ${personal.imagePosition.y || 0}px) rotate(${personal.imagePosition.rotate || 0}deg)`,
      }
    : {};

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-yellow-400 text-black overflow-hidden border-b-4 border-black"
    >
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 bg-black text-yellow-400 px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border-2 border-black shadow-[4px_4px_0px_#000]">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>HELLO, I'M {personal.name || 'MUHAMMED ALFAS'}</span>
            </div>

            {/* Sub-tagline */}
            <div className="font-label font-bold text-sm md:text-base tracking-widest text-black/90 uppercase border-l-4 border-black pl-3 py-0.5">
              {personal.tagline || 'BCA STUDENT • SOFTWARE ENGINEER • TECH ENTHUSIAST'}
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold uppercase leading-[0.95] tracking-tighter text-black">
              {personal.headline || 'I BUILD IDEAS INTO DIGITAL EXPERIENCES.'}
            </h1>

            {/* Short Intro */}
            <p className="font-sans text-lg sm:text-xl font-medium text-black/90 leading-relaxed max-w-2xl bg-white/40 p-4 border-2 border-black shadow-[4px_4px_0px_#000]">
              {personal.shortIntro ||
                "I'm a BCA student passionate about software development, cloud computing, startups, and building innovative digital products."}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="brutal-btn bg-black text-yellow-400 hover:bg-white hover:text-black px-7 py-4 text-sm font-extrabold flex items-center gap-3 tracking-wider group"
              >
                <span>VIEW MY WORK</span>
                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>

              <button
                onClick={() => setResumeModalOpen(true)}
                className="brutal-btn bg-white text-black hover:bg-black hover:text-yellow-400 px-7 py-4 text-sm font-extrabold flex items-center gap-3 tracking-wider"
              >
                <FileText className="w-5 h-5" />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs font-mono font-bold text-black/80">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-black" />
                <span>CLEAN CODE ARCHITECTURE</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-black" />
                <span>FULL STACK & CLOUD</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Photo Column with Frame & Edit Controls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-md">
              {/* Offset Decorative Background Rectangles */}
              <div className="absolute -inset-4 bg-black border-4 border-black transform translate-x-4 translate-y-4 shadow-2xl"></div>
              <div className="absolute -inset-2 bg-white border-4 border-black transform -translate-x-2 -translate-y-2"></div>

              {/* Photo Frame */}
              <div className="relative border-4 border-black bg-zinc-900 aspect-[4/5] overflow-hidden">
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  style={imgStyle}
                  className="w-full h-full object-cover transition-transform duration-200"
                />

                {/* Yellow Offset Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-yellow-400 border-2 border-black p-3 shadow-[4px_4px_0px_#000]">
                  <p className="font-heading font-bold text-sm text-black uppercase tracking-tight">
                    {personal.name}
                  </p>
                  <p className="font-mono text-xs font-bold text-black/80">
                    BCA CANDIDATE • 2023 - 2026
                  </p>
                </div>

                {/* Edit Photo Trigger Button (Admin Only) */}
                {isAdminMode && (
                  <button
                    onClick={() => setIsCropperOpen(true)}
                    className="absolute top-4 right-4 bg-black text-yellow-400 p-3 border-2 border-black shadow-[4px_4px_0px_#fff] opacity-95 hover:opacity-100 hover:scale-105 transition-all flex items-center gap-2 font-mono text-xs font-bold"
                    title="Upload, Crop & Adjust Profile Photo"
                  >
                    <Camera className="w-4 h-4" />
                    <span>EDIT PHOTO</span>
                  </button>
                )}
              </div>

              {/* Decorative Corner Labels */}
              <div className="absolute -top-6 -left-6 bg-black text-white px-3 py-1 font-mono text-[11px] font-bold border-2 border-black shadow-[3px_3px_0px_#FFD700]">
                STUDENT • DEV
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

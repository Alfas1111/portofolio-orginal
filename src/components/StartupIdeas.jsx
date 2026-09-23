import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Rocket, AlertTriangle, Lightbulb, Compass, Target, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const StartupIdeas = () => {
  const { data } = usePortfolio();
  const { startupIdeas } = data;

  return (
    <section id="startups" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 08. ENTREPRENEURIAL VISION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              IDEAS & <span className="underline decoration-black decoration-4">STARTUPS</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-black/90 max-w-md mt-4 lg:mt-0 uppercase">
            Ventures, product concepts & SaaS startup models I am actively researching and prototyping.
          </p>
        </div>

        {/* Startup Cards Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {startupIdeas && startupIdeas.map((idea, idx) => (
            <motion.article
              key={idea.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-black text-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge & Stage */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-400 text-black font-extrabold border-2 border-black">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-yellow-400 block uppercase">
                        CONCEPT #{idx + 1}
                      </span>
                      <h3 className="font-display text-3xl font-extrabold text-white uppercase group-hover:text-yellow-400 transition-colors">
                        {idea.name}
                      </h3>
                    </div>
                  </div>

                  <span className="bg-yellow-400 text-black font-mono text-xs font-bold px-3 py-1 border border-black uppercase tracking-wider">
                    ⚡ {idea.currentStage || 'Prototyping'}
                  </span>
                </div>

                {/* Editorial Content Blocks */}
                <div className="space-y-4 font-sans text-sm sm:text-base">
                  
                  {/* Problem Statement */}
                  <div className="bg-zinc-900/90 p-4 border-l-4 border-red-500 rounded-r">
                    <span className="font-mono text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      THE PROBLEM
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      {idea.problem}
                    </p>
                  </div>

                  {/* Solution Statement */}
                  <div className="bg-zinc-900/90 p-4 border-l-4 border-yellow-400 rounded-r">
                    <span className="font-mono text-xs font-bold text-yellow-400 flex items-center gap-1.5 uppercase mb-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      THE SOLUTION
                    </span>
                    <p className="text-zinc-200 leading-relaxed font-medium">
                      {idea.solution}
                    </p>
                  </div>

                  {/* Core Concept */}
                  {idea.concept && (
                    <div className="font-mono text-xs text-zinc-400 flex items-start gap-2 pt-2">
                      <Compass className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white uppercase">Product Concept:</strong> {idea.concept}</span>
                    </div>
                  )}

                  {/* Future Vision */}
                  {idea.futureVision && (
                    <div className="font-mono text-xs text-zinc-400 flex items-start gap-2">
                      <Target className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white uppercase">Long-Term Vision:</strong> {idea.futureVision}</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500 uppercase">
                  OPEN TO COLLABORATORS
                </span>
                <a
                  href="#contact"
                  className="font-mono text-xs font-bold text-yellow-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>DISCUSS THIS IDEA</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

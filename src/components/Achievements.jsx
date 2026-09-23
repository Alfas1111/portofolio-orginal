import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, Medal, Star, Calendar, Users, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const Achievements = () => {
  const { data } = usePortfolio();
  const { achievements } = data;

  return (
    <section id="achievements" className="py-20 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-800 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1">
              // 07. HONORS & RECOGNITION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              ACHIEVEMENTS <span className="text-yellow-400">& AWARDS</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-zinc-400 max-w-sm mt-4 md:mt-0 uppercase">
            Hackathons, competitions, academic ranks & leadership.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements && achievements.map((ach, idx) => (
            <motion.div
              key={ach.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-6 sm:p-8 shadow-[8px_8px_0px_#FFD700] flex flex-col justify-between group hover:border-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-400 text-black font-extrabold border-2 border-black">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold bg-zinc-800 text-yellow-400 px-2.5 py-1 border border-zinc-700 uppercase">
                    {ach.category || 'Award'}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-yellow-400 transition-colors">
                  {ach.title}
                </h3>

                <p className="font-sans text-sm text-zinc-300 leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              {ach.date && (
                <div className="pt-4 border-t border-zinc-800 font-mono text-xs text-yellow-400 font-bold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{ach.date}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

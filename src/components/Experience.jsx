import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, CheckCircle, Code, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience = () => {
  const { data } = usePortfolio();
  const { experience, experienceFallbackMessage } = data;

  const hasExperience = experience && experience.length > 0;

  return (
    <section id="experience" className="py-20 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-800 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1">
              // 05. CAREER TRACK
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              EXPERIENCE <span className="text-yellow-400">& ROLES</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-zinc-400 max-w-sm mt-4 md:mt-0 uppercase">
            Internships, freelance contracts, college projects & tech leadership.
          </p>
        </div>

        {/* Experience List or Fallback */}
        {hasExperience ? (
          <div className="grid grid-cols-1 gap-8">
            {experience.map((exp, idx) => (
              <motion.article
                key={exp.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-6 sm:p-8 shadow-[8px_8px_0px_#FFD700]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white uppercase">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-yellow-400 font-mono text-sm font-bold mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.organization}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-400 text-black px-3 py-1 font-mono text-xs font-bold border border-black flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.achievements && (
                  <div className="mb-4 bg-zinc-950 p-3 border border-zinc-800 font-mono text-xs text-yellow-400 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-400" />
                    <span><strong>Key Outcome:</strong> {exp.achievements}</span>
                  </div>
                )}

                {/* Tech Stack Badges */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-xs px-2.5 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          /* Graceful Fallback Statement */
          <div className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-8 text-center space-y-4 shadow-[8px_8px_0px_#FFD700]">
            <Info className="w-10 h-10 text-yellow-400 mx-auto" />
            <h3 className="font-heading text-xl font-bold text-white uppercase">
              BUILDING CONTINUOUS PRACTICAL EXPERIENCE
            </h3>
            <p className="font-sans text-base text-zinc-300 max-w-xl mx-auto italic">
              "{experienceFallbackMessage || 'Currently building experience through projects, internships, certifications and independent learning.'}"
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, School, BookOpen, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const Education = () => {
  const { data } = usePortfolio();
  const { education } = data;

  return (
    <section id="education" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 04. ACADEMIC BACKGROUND
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              EDUCATION <span className="underline decoration-black decoration-4">& QUALIFICATIONS</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-black/80 max-w-sm mt-4 md:mt-0 uppercase">
            Computer Applications coursework & academic milestones.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-4 border-black ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {education && education.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-black text-white p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_#000] group"
            >
              {/* Timeline Bullet Badge */}
              <div className="absolute -left-[43px] md:-left-[59px] top-6 w-8 h-8 bg-yellow-400 border-4 border-black flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5 text-black" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-yellow-400 uppercase bg-zinc-900 border border-zinc-800 px-2.5 py-1">
                    {edu.grade}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase mt-2">
                    {edu.degree}
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 font-mono text-xs font-bold border border-black">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.years}</span>
                </div>
              </div>

              {/* Institution Details */}
              <div className="space-y-3 font-sans text-sm text-zinc-300">
                <div className="flex items-center gap-2 text-yellow-400 font-semibold text-base">
                  <School className="w-4 h-4" />
                  <span>{edu.institution} — <span className="text-white">{edu.university}</span></span>
                </div>

                {edu.subjects && (
                  <div className="bg-zinc-900/90 p-4 border border-zinc-800 rounded font-mono text-xs text-zinc-300">
                    <span className="text-yellow-400 font-bold block mb-1 uppercase">// KEY SUBJECTS & COURSEWORK:</span>
                    {edu.subjects}
                  </div>
                )}

                {edu.achievements && (
                  <div className="flex items-start gap-2 text-xs font-mono text-zinc-300">
                    <Award className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span><strong className="text-yellow-400">Honors & Impact:</strong> {edu.achievements}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

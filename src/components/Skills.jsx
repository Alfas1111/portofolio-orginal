import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code, Terminal, Globe, Database, Cloud, Layers, CheckCircle2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Skills = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  const categoryIcons = {
    Programming: Terminal,
    'Web Development': Globe,
    Database: Database,
    'Cloud & Tools': Cloud,
  };

  const levelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert':
        return 'bg-yellow-400 text-black font-extrabold';
      case 'advanced':
        return 'bg-zinc-100 text-black font-bold';
      case 'proficient':
        return 'bg-zinc-800 text-yellow-400 font-bold border border-yellow-400/40';
      default:
        return 'bg-zinc-900 text-zinc-300 font-semibold border border-zinc-700';
    }
  };

  return (
    <section id="skills" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 02. TECHNICAL STACK
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              SKILLS & <span className="underline decoration-black decoration-4">CAPABILITIES</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-black/80 max-w-sm mt-4 md:mt-0 uppercase">
            Categorized technical capabilities & developer tools. Fully editable.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills || {}).map(([category, items], idx) => {
            const Icon = categoryIcons[category] || Layers;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-black text-white p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_#000]"
              >
                {/* Category Title */}
                <div className="flex items-center gap-3 pb-4 mb-6 border-b-2 border-zinc-800">
                  <div className="p-2 bg-yellow-400 text-black">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
                      {category}
                    </h3>
                    <span className="font-mono text-xs text-yellow-400">
                      {items.length} Core Technologies
                    </span>
                  </div>
                </div>

                {/* Skill Items Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-zinc-900 border border-zinc-800 p-3 flex flex-col justify-between hover:border-yellow-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-base font-bold text-white">
                          {skill.name}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wide ${levelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      
                      {skill.badge && (
                        <div className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                          <span>{skill.badge}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

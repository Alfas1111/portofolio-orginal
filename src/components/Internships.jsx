import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Building2,
  Clock,
  Sparkles,
  Code2,
  Award,
  Layers,
  Edit2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Internships = () => {
  const { data, isAdminMode, openAdminTab } = usePortfolio();
  const internships = data?.internships || [];
  const [activeFilter, setActiveFilter] = useState('ALL');

  const hasInternships = internships && internships.length > 0;

  const filteredInternships = internships.filter((item) => {
    if (activeFilter === 'COMPLETED') return item.status?.toLowerCase() === 'completed';
    if (activeFilter === 'ONGOING') return item.status?.toLowerCase() === 'ongoing' || item.status?.toLowerCase() === 'in progress';
    return true;
  });

  return (
    <section id="internships" className="py-20 bg-[#0E0E10] text-white border-b-4 border-yellow-400 relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-black bg-yellow-400 border border-yellow-400 px-3 py-1 uppercase tracking-widest">
                // 05. INDUSTRY EXPERIENCE
              </span>
              <span className="font-mono text-xs text-yellow-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1">
                {internships.length} ROLES RECORDED
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              INTERNSHIPS <span className="text-yellow-400">& TRAINING</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col md:items-end gap-3">
            {isAdminMode && (
              <button
                onClick={() => openAdminTab?.('internships')}
                className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-mono text-xs font-extrabold border-2 border-black hover:bg-white transition-all shadow-[3px_3px_0px_#FFD700] cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>MANAGE INTERNSHIPS</span>
              </button>
            )}
            <p className="font-mono text-xs font-bold text-zinc-400 max-w-sm uppercase text-left md:text-right">
              Hands-on industry internships, corporate training & startup software engineering roles.
            </p>

            {/* Filter Buttons */}
            {hasInternships && (
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 font-mono text-xs">
                {['ALL', 'COMPLETED', 'ONGOING'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 font-bold transition-all uppercase ${
                      activeFilter === filter
                        ? 'bg-yellow-400 text-black shadow-[2px_2px_0px_#000]'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Internships List Container */}
        {hasInternships && filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {filteredInternships.map((item, idx) => {
              const isOngoing = item.status?.toLowerCase() === 'ongoing' || item.status?.toLowerCase() === 'in progress';

              return (
                <motion.article
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-6 sm:p-8 shadow-[8px_8px_0px_#FFD700] hover:shadow-[12px_12px_0px_#FFD700] transition-all relative group"
                >
                  {/* Status Ribbon Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-zinc-800 pb-5 mb-5">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-mono text-[11px] font-extrabold px-2.5 py-0.5 border uppercase ${
                          isOngoing
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                            : 'bg-yellow-400 text-black border-black'
                        }`}>
                          {isOngoing ? '● ONGOING INTERNSHIP' : '✓ COMPLETED'}
                        </span>
                        {item.type && (
                          <span className="font-mono text-[11px] text-zinc-300 bg-zinc-800 border border-zinc-700 px-2 py-0.5">
                            {item.type}
                          </span>
                        )}
                        {item.stipend && (
                          <span className="font-mono text-[11px] text-yellow-300 bg-yellow-950/60 border border-yellow-700/50 px-2 py-0.5">
                            💰 {item.stipend}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors pt-1">
                        {item.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-zinc-300 font-mono text-sm pt-1">
                        <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                          <Building2 className="w-4 h-4 shrink-0 text-yellow-400" />
                          <span>{item.company}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1 text-zinc-400 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="bg-yellow-400 text-black px-3.5 py-1.5 font-mono text-xs font-extrabold border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-black" />
                        <span>{item.duration}</span>
                      </div>

                      {item.certificateLink && (
                        <a
                          href={item.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-yellow-400 hover:text-white hover:underline transition-colors mt-1"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>VERIFY CERTIFICATE</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {isAdminMode && (
                        <button
                          onClick={() => openAdminTab?.('internships')}
                          className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-yellow-400 bg-zinc-800 border border-yellow-400/40 hover:bg-yellow-400 hover:text-black px-2 py-0.5 transition-colors cursor-pointer mt-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>EDIT ROLE</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Summary / Role Overview */}
                  {item.description && (
                    <p className="font-sans text-sm sm:text-base text-zinc-200 leading-relaxed mb-5">
                      {item.description}
                    </p>
                  )}

                  {/* Key Deliverables & Responsibilities */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="mb-6 bg-zinc-950 p-4 border border-zinc-800 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 border-b border-zinc-850 pb-1">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                        <span>KEY RESPONSIBILITIES & DELIVERABLES</span>
                      </div>
                      <ul className="space-y-2">
                        {item.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-zinc-300">
                            <span className="font-mono text-yellow-400 font-bold mt-0.5">▸</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-zinc-400 flex items-center gap-1 mr-1 uppercase">
                        <Code2 className="w-3.5 h-3.5 text-yellow-400" />
                        Tech Stack:
                      </span>
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-zinc-800 hover:bg-zinc-700 text-yellow-300 border border-zinc-700 font-mono text-xs px-2.5 py-1 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* Graceful Fallback if empty */
          <div className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-10 text-center space-y-4 shadow-[8px_8px_0px_#FFD700]">
            <Layers className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="font-heading text-xl font-bold text-white uppercase">
              INTERNSHIP PROGRAMMES & TECHNICAL TRAINING
            </h3>
            <p className="font-sans text-sm text-zinc-300 max-w-xl mx-auto">
              Actively seeking and participating in software engineering internships, frontend development programs, and cloud infrastructure traineeships.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

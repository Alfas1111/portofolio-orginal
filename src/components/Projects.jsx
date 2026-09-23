import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github, FolderGit2, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category || 'Other'))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b-2 border-zinc-800 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1">
              // 03. SELECTED WORKS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              FEATURED <span className="text-yellow-400">PROJECTS</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-all border ${
                  selectedCategory === cat
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-[3px_3px_0px_#FFF]'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id || idx}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="brutal-card bg-zinc-900 border-4 border-yellow-400 flex flex-col justify-between group overflow-hidden shadow-[8px_8px_0px_#FFD700]"
              >
                <div>
                  {/* Image Container with Hover Zoom */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b-4 border-yellow-400 bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/90 text-yellow-400 font-mono text-xs font-bold px-3 py-1 border border-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{project.category}</span>
                    </div>

                    {project.date && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-black font-mono text-xs font-bold px-2.5 py-1 border border-black flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {project.shortDescription || project.fullDescription}
                    </p>

                    {/* Technologies Badges */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {project.technologies && project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono text-xs px-2.5 py-1 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 flex flex-wrap items-center gap-3 border-t border-zinc-800/80 mt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 brutal-btn bg-zinc-800 text-white hover:bg-yellow-400 hover:text-black py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GITHUB CODE</span>
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-2.5 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

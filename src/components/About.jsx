import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { User, GraduationCap, MapPin, Target, Heart, Sparkles, BookOpen, Clock, Code, Award, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = () => {
  const { data } = usePortfolio();
  const { personal, stats } = data;

  const statItems = [
    { label: 'Years Learning', val: stats.learningYears || '02+', icon: Clock },
    { label: 'Projects Built', val: stats.projectsCount || '10+', icon: Code },
    { label: 'Certifications', val: stats.certsCount || '05+', icon: Award },
    { label: 'Startup Ideas', val: stats.ideasCount || '∞', icon: Lightbulb },
  ];

  return (
    <section id="about" className="py-20 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-800 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1">
              // 01. WHO I AM
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              ABOUT <span className="text-yellow-400">ME</span>
            </h2>
          </div>
          <p className="font-italic-accent text-zinc-400 text-lg md:text-xl max-w-md mt-4 md:mt-0 italic">
            "Combining computer application fundamentals with modern engineering execution."
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Profile Card & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="brutal-card p-4 bg-zinc-900 border-4 border-yellow-400 shadow-[8px_8px_0px_#FFD700]">
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-zinc-800 mb-4">
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-3 left-3 bg-yellow-400 text-black font-mono text-xs font-bold px-2.5 py-1 border border-black">
                  BCA STUDENT
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
                {personal.name}
              </h3>
              <p className="font-mono text-xs text-yellow-400 mt-0.5">
                {personal.degree}
              </p>

              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 font-sans text-xs">
                <div className="flex items-center gap-3 text-zinc-300">
                  <GraduationCap className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{personal.college}, {personal.university}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Target className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="text-yellow-400 font-semibold">{personal.careerGoal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography & Editable Stats */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio Paragraphs */}
            <div className="space-y-4 font-sans text-base text-zinc-300 leading-relaxed">
              <p className="text-lg font-medium text-white border-l-4 border-yellow-400 pl-4 py-1">
                {personal.personalIntro}
              </p>
              <p className="bg-zinc-900/80 p-5 border border-zinc-800 rounded">
                {personal.aboutBio}
              </p>
            </div>

            {/* Key Interests Tags */}
            <div>
              <h4 className="font-label text-xs text-zinc-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-yellow-400" />
                KEY INTERESTS & PASSIONS
              </h4>
              <div className="flex flex-wrap gap-2">
                {personal.interests && personal.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 font-mono text-xs px-3 py-1.5 font-semibold"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Editable Statistics Showcase */}
            <div>
              <h4 className="font-label text-xs text-zinc-400 font-bold tracking-widest uppercase mb-4">
                // PORTFOLIO METRICS & LEARNING IMPACT
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {statItems.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="bg-zinc-900 border-2 border-zinc-800 p-4 hover:border-yellow-400 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-yellow-400 mb-2" />
                      <div className="font-display text-3xl sm:text-4xl font-extrabold text-yellow-400 tracking-tight">
                        {stat.val}
                      </div>
                      <div className="font-mono text-[11px] font-bold text-zinc-400 uppercase mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

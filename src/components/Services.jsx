import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Layout, Server, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services = () => {
  const { data } = usePortfolio();
  const { services } = data;

  const serviceIcons = [Layout, Server, Cpu, Sparkles];

  return (
    <section id="services" className="py-20 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-800 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1">
              // 09. OFFERINGS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              SERVICES <span className="text-yellow-400">& CAPABILITIES</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-zinc-400 max-w-sm mt-4 md:mt-0 uppercase">
            Technical solutions for clients, startups & academic teams.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services && services.map((service, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-6 sm:p-8 shadow-[8px_8px_0px_#FFD700] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-yellow-400 text-black border-2 border-black">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-yellow-400 bg-zinc-800 px-3 py-1 border border-zinc-700">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white uppercase mb-3 group-hover:text-yellow-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 uppercase">HIGH QUALITY DELIVERY</span>
                  <a
                    href="#contact"
                    className="font-mono text-xs font-bold text-yellow-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>REQUEST SERVICE</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

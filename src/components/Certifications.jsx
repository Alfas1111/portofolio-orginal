import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, Calendar, ShieldCheck, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const Certifications = () => {
  const { data, setCertModalData } = usePortfolio();
  const { certifications } = data;

  return (
    <section id="certifications" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 06. VERIFIED CREDENTIALS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              CERTIFICATIONS <span className="underline decoration-black decoration-4">& BADGES</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-black/80 max-w-sm mt-4 md:mt-0 uppercase">
            Industry recognized cloud & developer certifications.
          </p>
        </div>

        {/* Certifications Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications && certifications.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-black text-white p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-400 text-black border-2 border-black">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-yellow-400 font-bold block uppercase">
                        {cert.organization}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white uppercase group-hover:text-yellow-400 transition-colors">
                        {cert.name}
                      </h3>
                    </div>
                  </div>

                  <span className="bg-yellow-400 text-black font-mono text-xs font-bold px-2.5 py-1 border border-black shrink-0">
                    {cert.date}
                  </span>
                </div>

                {/* Certificate Image Preview if available */}
                {cert.image && (
                  <div
                    onClick={() => setCertModalData(cert)}
                    className="relative aspect-[16/9] mb-4 overflow-hidden border-2 border-zinc-800 cursor-pointer group/img"
                  >
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-yellow-400 font-mono text-xs font-bold">
                      <Eye className="w-4 h-4" />
                      <span>CLICK TO VIEW CERTIFICATE</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1 font-mono text-xs text-zinc-400">
                  {cert.credentialId && (
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-yellow-400" />
                      <span>ID: <strong className="text-white">{cert.credentialId}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Button */}
              {cert.verifyLink && (
                <div className="pt-4 border-t border-zinc-800 mt-4">
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

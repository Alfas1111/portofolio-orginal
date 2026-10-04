import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, Calendar, ShieldCheck, Eye, Plus, FileText, Upload, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Certifications = () => {
  const { data, setCertModalData, openAdminTab, isAdminMode } = usePortfolio();
  const certifications = data?.certifications || [];

  return (
    <section id="certifications" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black pb-6 gap-4">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 06. VERIFIED CREDENTIALS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              CERTIFICATIONS <span className="underline decoration-black decoration-4">& BADGES</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="font-mono text-xs font-bold text-black/80 max-w-xs uppercase">
              Industry recognized cloud & developer certifications.
            </p>
            <button
              onClick={() => openAdminTab('certifications')}
              className="brutal-btn bg-black text-yellow-400 hover:bg-white hover:text-black px-4 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-[4px_4px_0px_#000] shrink-0"
              title="Upload your own certificates or edit credentials"
            >
              <Upload className="w-4 h-4" />
              <span>UPLOAD / EDIT CERTIFICATES</span>
            </button>
          </div>
        </div>

        {/* Certifications Showcase Grid */}
        {certifications && certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, idx) => {
              const isPdf = cert.image?.startsWith('data:application/pdf') ||
                cert.image?.toLowerCase().endsWith('.pdf') ||
                cert.fileType === 'pdf';

              const hasFile = Boolean(cert.image);

              return (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black text-white p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-3 bg-yellow-400 text-black border-2 border-black shrink-0">
                          <Award className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-mono text-xs text-yellow-400 font-bold block uppercase truncate">
                            {cert.organization}
                          </span>
                          <h3 className="font-heading text-xl font-bold text-white uppercase group-hover:text-yellow-400 transition-colors">
                            {cert.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isAdminMode && (
                          <button
                            onClick={() => openAdminTab('certifications')}
                            className="p-1 bg-zinc-800 text-zinc-400 hover:text-yellow-400 hover:bg-black transition-colors"
                            title="Edit Certificate"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {cert.date && (
                          <span className="bg-yellow-400 text-black font-mono text-xs font-bold px-2.5 py-1 border border-black shrink-0">
                            {cert.date}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Certificate Preview Box (PDF or Image) */}
                    {hasFile && (
                      isPdf ? (
                        <div
                          onClick={() => setCertModalData(cert)}
                          className="relative aspect-[16/9] mb-4 overflow-hidden border-2 border-zinc-800 hover:border-yellow-400 bg-zinc-950 flex flex-col items-center justify-center cursor-pointer group/pdf p-4 text-center transition-all"
                        >
                          <FileText className="w-12 h-12 text-yellow-400 mb-2 group-hover/pdf:scale-110 transition-transform" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block truncate max-w-full">
                            {cert.fileName || 'OFFICIAL PDF CERTIFICATE'}
                          </span>
                          <span className="text-[10px] text-yellow-400 font-mono mt-1 font-bold">
                            CLICK TO VIEW / DOWNLOAD DOCUMENT →
                          </span>
                        </div>
                      ) : (
                        <div
                          onClick={() => setCertModalData(cert)}
                          className="relative aspect-[16/9] mb-4 overflow-hidden border-2 border-zinc-800 hover:border-yellow-400 cursor-pointer group/img bg-zinc-950"
                        >
                          <img
                            src={cert.image}
                            alt={cert.name}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-yellow-400 font-mono text-xs font-bold">
                            <Eye className="w-4 h-4" />
                            <span>CLICK TO VIEW FULL CERTIFICATE</span>
                          </div>
                        </div>
                      )
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

                  {/* Actions & Verification */}
                  <div className="pt-4 border-t border-zinc-800 mt-4 flex flex-col sm:flex-row gap-2">
                    {hasFile && (
                      <button
                        onClick={() => setCertModalData(cert)}
                        className="flex-1 brutal-btn bg-zinc-900 border border-zinc-700 text-white hover:bg-yellow-400 hover:text-black py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>VIEW CERTIFICATE</span>
                      </button>
                    )}

                    {cert.verifyLink && (
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <span>VERIFY CREDENTIAL</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-black text-white p-12 border-4 border-black text-center space-y-4 shadow-[8px_8px_0px_#000]">
            <Award className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="font-heading text-2xl font-bold uppercase">NO CERTIFICATIONS RECORDED</h3>
            <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
              Upload your cloud certifications, course badges, and academic credentials here.
            </p>
            <button
              onClick={() => openAdminTab('certifications')}
              className="brutal-btn bg-yellow-400 text-black px-6 py-3 font-bold text-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>UPLOAD YOUR OWN CERTIFICATE NOW</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

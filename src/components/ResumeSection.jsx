import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, Download, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResumeSection = () => {
  const { data, setResumeModalOpen } = usePortfolio();
  const { personal } = data;

  return (
    <section className="py-16 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="brutal-card bg-yellow-400 text-black border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_#000] text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-black text-yellow-400 px-4 py-1.5 font-mono text-xs font-bold uppercase border border-black">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>FULL CURRICULUM VITAE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-black">
            WANT TO KNOW MORE ABOUT ME?
          </h2>

          <p className="font-sans text-base sm:text-lg text-black/90 font-medium max-w-2xl mx-auto">
            Explore my verified academic achievements, software projects, coursework, and technical skills in detail.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={personal.resumeUrl}
              download={personal.resumeFileName || 'Aryan_Sharma_BCA_Resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn bg-black text-yellow-400 hover:bg-white hover:text-black px-8 py-4 text-sm font-extrabold flex items-center gap-3 tracking-wider"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD RESUME</span>
            </a>

            <button
              onClick={() => setResumeModalOpen(true)}
              className="brutal-btn bg-white text-black hover:bg-black hover:text-yellow-400 px-8 py-4 text-sm font-extrabold flex items-center gap-3 tracking-wider"
            >
              <Eye className="w-5 h-5" />
              <span>VIEW RESUME</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-xs font-bold text-black/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black" />
              VERIFIED BCA CREDENTIALS
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black" />
              UP-TO-DATE PROJECTS
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

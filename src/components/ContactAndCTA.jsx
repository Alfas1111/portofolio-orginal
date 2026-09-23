import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, Linkedin, Github, Instagram, Facebook, Twitter, Send, ArrowRight, Sparkles, CheckCircle2, MessageSquare, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const ContactAndCTA = () => {
  const { data } = usePortfolio();
  const { social, personal, ctaSection } = data;

  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#000000', '#FFFFFF']
      });
    } catch (err) {}

    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: social?.linkedin },
    { name: 'GitHub', icon: Github, url: social?.github },
    { name: 'Instagram', icon: Instagram, url: social?.instagram },
    { name: 'Facebook', icon: Facebook, url: social?.facebook },
    { name: 'X / Twitter', icon: Twitter, url: social?.twitter },
    { name: 'Email', icon: Mail, url: social?.email ? `mailto:${social.email}` : undefined }
  ];

  return (
    <>
      {/* 1. STARTUP-FOCUSED CALL TO ACTION SECTION */}
      <section className="py-24 bg-yellow-400 text-black border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black text-white border-4 border-black p-8 sm:p-14 shadow-[16px_16px_0px_#000] space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 font-mono text-xs font-bold uppercase border-2 border-black">
              <Flame className="w-4 h-4 text-black animate-bounce" />
              <span>STARTUP & FOUNDER COLLABORATION</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold uppercase leading-[0.95] tracking-tighter text-yellow-400">
              {ctaSection?.title || "HAVE AN IDEA? LET'S BUILD IT."}
            </h2>

            <p className="font-sans text-lg sm:text-2xl text-zinc-200 font-medium leading-relaxed max-w-3xl border-l-4 border-yellow-400 pl-4 py-1">
              {ctaSection?.body ||
                "I’m always interested in discovering new ideas, exploring startup opportunities, collaborating on innovative projects, and turning promising concepts into real products."}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black px-8 py-4 text-sm sm:text-base font-extrabold flex items-center gap-3 tracking-wider group"
              >
                <span>{ctaSection?.primaryBtnText || "LET'S BUILD SOMETHING →"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="brutal-btn bg-zinc-800 text-white hover:bg-yellow-400 hover:text-black px-6 py-4 text-xs sm:text-sm font-bold tracking-wider"
              >
                {ctaSection?.secondaryBtn1Text || "SHARE AN IDEA"}
              </a>

              <a
                href="#contact"
                className="brutal-btn bg-zinc-800 text-white hover:bg-yellow-400 hover:text-black px-6 py-4 text-xs sm:text-sm font-bold tracking-wider"
              >
                {ctaSection?.secondaryBtn2Text || "START A COLLABORATION"}
              </a>
            </div>

            {/* Smaller interest links */}
            <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-3 text-xs font-mono">
              {(ctaSection?.smallLinks || [
                "Startup / Founder Collaboration",
                "Technology Projects",
                "Innovation & Ideas",
                "Open to Opportunities"
              ]).map((link, idx) => (
                <span
                  key={idx}
                  className="bg-zinc-900 text-yellow-400 border border-zinc-800 px-3 py-1 font-semibold"
                >
                  #{link}
                </span>
              ))}
            </div>

            {/* Closing Statement */}
            <div className="pt-4 text-center border-t-2 border-yellow-400/30">
              <p className="font-display text-xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight uppercase">
                "{ctaSection?.closingStatement || "IDEAS ARE ONLY THE BEGINNING. LET'S TURN THEM INTO SOMETHING REAL."}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT SECTION */}
      <section id="contact" className="py-20 bg-[#0A0A0A] text-white border-b-4 border-yellow-400 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-800 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1">
                // 12. GET IN TOUCH
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
                CONTACT <span className="text-yellow-400">ME</span>
              </h2>
            </div>
            <p className="font-mono text-xs font-bold text-zinc-400 max-w-sm mt-4 md:mt-0 uppercase">
              Send a direct message or connect across developer platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Info & Socials */}
            <div className="lg:col-span-5 space-y-8">
              <div className="brutal-card bg-yellow-400 text-black border-4 border-black p-8 shadow-[8px_8px_0px_#000] space-y-6">
                <h3 className="font-heading text-3xl font-bold uppercase tracking-tight">
                  LET'S CONNECT & BUILD
                </h3>

                <p className="font-sans text-sm text-black/90 font-medium">
                  Whether you have an internship opportunity, freelance project, startup collaboration, or simply want to chat about tech — my inbox is open!
                </p>

                <div className="space-y-4 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black text-yellow-400 border border-black">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>{social?.email || personal.social?.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black text-yellow-400 border border-black">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span>{personal.location}</span>
                  </div>
                </div>

                {/* Social Icons Grid */}
                <div className="pt-4 border-t-2 border-black">
                  <span className="font-mono text-xs font-bold block mb-3 uppercase">
                    DEVELOPER & SOCIAL PROFILES:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {socialLinks.map((s, idx) => {
                      const Icon = s.icon;
                      if (!s.url) return null;
                      return (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-yellow-400 hover:bg-white hover:text-black border-2 border-black p-2.5 flex flex-col items-center justify-center gap-1 transition-colors text-[10px] font-mono font-bold uppercase"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="truncate w-full text-center">{s.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <div className="brutal-card bg-zinc-900 border-4 border-yellow-400 p-8 sm:p-10 shadow-[8px_8px_0px_#FFD700]">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
                    <h3 className="font-heading text-3xl font-bold text-white uppercase">
                      MESSAGE TRANSMITTED!
                    </h3>
                    <p className="font-mono text-sm text-zinc-300">
                      Thank you for reaching out. I will respond to your email as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-heading text-2xl font-bold text-white uppercase border-b border-zinc-800 pb-4">
                      SEND DIRECT INQUIRY
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="font-mono text-xs font-bold text-yellow-400 block mb-2 uppercase">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Rivera"
                          className="w-full bg-black border-2 border-zinc-700 focus:border-yellow-400 text-white p-3 font-sans text-sm outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-xs font-bold text-yellow-400 block mb-2 uppercase">
                          YOUR EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full bg-black border-2 border-zinc-700 focus:border-yellow-400 text-white p-3 font-sans text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-xs font-bold text-yellow-400 block mb-2 uppercase">
                        SUBJECT *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Project Collaboration / Internship Opportunity"
                        className="w-full bg-black border-2 border-zinc-700 focus:border-yellow-400 text-white p-3 font-sans text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs font-bold text-yellow-400 block mb-2 uppercase">
                        MESSAGE *
                      </label>
                      <textarea
                        rows="5"
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Hi Aryan, I'd like to discuss building..."
                        className="w-full bg-black border-2 border-zinc-700 focus:border-yellow-400 text-white p-3 font-sans text-sm outline-none transition-colors"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-4 text-sm font-extrabold flex items-center justify-center gap-3 tracking-wider"
                    >
                      <Send className="w-5 h-5" />
                      <span>TRANSMIT MESSAGE</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

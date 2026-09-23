import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Blog = () => {
  const { data, setBlogModalData } = usePortfolio();
  const { blog } = data;

  return (
    <section id="blog" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 10. WRITING & THOUGHTS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              BLOG <span className="underline decoration-black decoration-4">& ARTICLES</span>
            </h2>
          </div>
          <p className="font-mono text-xs font-bold text-black/90 max-w-sm mt-4 md:mt-0 uppercase">
            Technical writing, computer science guides & software architecture logs.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blog && blog.map((post, idx) => (
            <motion.article
              key={post.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-black text-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-yellow-400 border-b border-zinc-800 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white uppercase group-hover:text-yellow-400 transition-colors mb-3">
                  {post.title}
                </h3>

                <p className="font-sans text-sm text-zinc-300 leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <button
                onClick={() => setBlogModalData(post)}
                className="w-full brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black py-2.5 text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <span>READ ARTICLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

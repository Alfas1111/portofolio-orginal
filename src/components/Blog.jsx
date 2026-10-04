import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BookOpen, Calendar, Clock, ArrowRight, Plus, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Blog = () => {
  const { data, setBlogModalData, openAdminTab, isAdminMode } = usePortfolio();
  const blog = data?.blog || [];

  return (
    <section id="blog" className="py-20 bg-yellow-400 text-black border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black pb-6 gap-4">
          <div>
            <span className="font-mono text-xs font-bold bg-black text-yellow-400 px-3 py-1 uppercase tracking-widest">
              // 10. WRITING & THOUGHTS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase mt-3 tracking-tight">
              BLOG <span className="underline decoration-black decoration-4">& ARTICLES</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="font-mono text-xs font-bold text-black/90 max-w-xs uppercase">
              Technical writing, computer science guides & software architecture logs.
            </p>
            <button
              onClick={() => openAdminTab('blog')}
              className="brutal-btn bg-black text-yellow-400 hover:bg-white hover:text-black px-4 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-[4px_4px_0px_#000] shrink-0"
              title="Add or edit blog posts in CMS"
            >
              <Plus className="w-4 h-4" />
              <span>WRITE / EDIT ARTICLES</span>
            </button>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {blog && blog.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blog.map((post, idx) => (
              <motion.article
                key={post.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-black text-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-yellow-400 border-b border-zinc-800 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      {post.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                      )}
                      {post.readTime && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      )}
                    </div>

                    {isAdminMode && (
                      <button
                        onClick={() => openAdminTab('blog')}
                        className="p-1 bg-zinc-800 text-zinc-400 hover:text-yellow-400 transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
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
        ) : (
          <div className="bg-black text-white p-12 border-4 border-black text-center space-y-4 shadow-[8px_8px_0px_#000]">
            <BookOpen className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="font-heading text-2xl font-bold uppercase">NO BLOG ARTICLES PUBLISHED YET</h3>
            <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
              Share your technical guides, computer science notes, and development logs.
            </p>
            <button
              onClick={() => openAdminTab('blog')}
              className="brutal-btn bg-yellow-400 text-black px-6 py-3 font-bold text-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>WRITE YOUR FIRST ARTICLE</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

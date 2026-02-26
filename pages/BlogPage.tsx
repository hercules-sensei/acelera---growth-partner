import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const categoryColors: Record<string, string> = {
  B2B: 'bg-dark-charcoal text-white',
  DTC: 'bg-acelera-orange text-white',
  Strategy: 'bg-stone-200 text-dark-charcoal',
};

const BlogPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Blog | Acelera Growth Partner';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Growth strategy insights for B2B services and DTC brands. Acquisition systems, paid media, and authority-driven growth.');
  }, []);

  return (
    <div className="min-h-screen bg-stone-light" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>

      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-light/90 backdrop-blur-sm border-b border-stone-200/50">
        <div className="container mx-auto px-6 md:px-16 py-4 md:py-5 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Acelera" className="h-10 md:h-12 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest opacity-70">
            <a href="/#services" className="hover:opacity-100 transition-opacity">Services</a>
            <a href="/blog" className="opacity-100 text-acelera-orange">Blog</a>
          </div>
          <a
            href="https://calendar.app.google/29to7brSPsZf5huk6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 md:px-8 md:py-3 bg-dark-charcoal text-white rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Book Call
          </a>
        </div>
      </header>

      <main className="pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">

          {/* Page Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-14 md:mb-20"
          >
            <p className="text-acelera-orange text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Acelera Journal
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1] mb-6">
              Growth<br />
              <span className="font-serif italic font-normal text-stone-400">Insights</span>
            </h1>
            <p className="text-stone-500 text-lg md:text-xl max-w-xl leading-relaxed">
              Hard-won perspective on B2B and DTC acquisition. No fluff, no generic playbooks — just what actually moves the needle.
            </p>
          </motion.div>

          {/* Featured Post */}
          <motion.a
            href={`/blog/${blogPosts[0].slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group block bg-dark-charcoal text-white rounded-3xl p-8 md:p-14 mb-6 relative overflow-hidden hover:scale-[1.01] transition-transform duration-500 shadow-2xl shadow-black/10"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-acelera-orange opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-700" />

            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full ${categoryColors[blogPosts[0].category]}`}>
                  {blogPosts[0].category}
                </span>
                <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">Featured</span>
              </div>
              <ArrowUpRight size={22} className="text-white/30 group-hover:text-white/80 transition-colors shrink-0" />
            </div>

            <div className="max-w-3xl">
              <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-4">
                {blogPosts[0].date} · {blogPosts[0].readTime}
              </p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">
                {blogPosts[0].title}
              </h2>
              <p className="text-stone-400 text-base md:text-lg leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
            </div>
          </motion.a>

          {/* Secondary Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {blogPosts.slice(1).map((post, idx) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + idx * 0.1, duration: 0.6 }}
                className="group bg-white border border-stone-200 rounded-3xl p-7 md:p-9 flex flex-col justify-between hover:border-acelera-orange hover:shadow-xl transition-all duration-300 min-h-[260px]"
              >
                <div className="flex items-start justify-between gap-3 mb-6">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <ArrowUpRight size={18} className="text-stone-300 group-hover:text-acelera-orange transition-colors shrink-0" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold tracking-tight leading-snug mb-3">
                    {post.title}
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                    {post.date} · {post.readTime}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark-charcoal text-white py-16">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <img src="/logo.png" alt="Acelera" className="h-8 w-auto brightness-0 invert mb-5" />
              <p className="text-stone-500 max-w-sm text-sm">
                Authority-driven acquisition for B2B services and DTC brands.
              </p>
            </div>
            <a
              href="https://calendar.app.google/29to7brSPsZf5huk6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-acelera-orange text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Book a Strategy Call
            </a>
          </div>
          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-stone-600 uppercase tracking-widest font-bold">
            <span>© 2026 Acelera. All rights reserved.</span>
            <a href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <ArrowLeft size={10} /> Back to Home
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default BlogPage;

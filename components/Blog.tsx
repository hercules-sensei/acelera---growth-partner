import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const categoryColors: Record<string, string> = {
  B2B: 'bg-dark-charcoal text-white',
  DTC: 'bg-acelera-orange text-white',
  Strategy: 'bg-stone-200 text-dark-charcoal',
};

const Blog: React.FC = () => {
  const featured = blogPosts[0];
  const secondary = blogPosts.slice(1);

  return (
    <section className="h-full w-full flex items-center justify-center bg-stone-light px-6 pt-20 md:pt-28 pb-6 overflow-y-auto no-scrollbar">
      <div className="container mx-auto max-w-7xl w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10"
        >
          <div>
            <p className="text-acelera-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-2">
              Acelera Journal
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1] text-dark-charcoal">
              Thinking out<br />
              <span className="font-serif italic font-normal text-stone-400">loud</span>
            </h2>
          </div>
          <a
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-dark-charcoal/50 hover:text-dark-charcoal transition-colors shrink-0 pb-1"
          >
            All Articles <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">

          {/* Featured Post */}
          <motion.a
            href={`/blog/${featured.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-2 group bg-dark-charcoal text-white rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col justify-between min-h-[240px] md:min-h-[300px] relative overflow-hidden hover:scale-[1.01] transition-transform duration-500 shadow-xl shadow-black/10"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-acelera-orange opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-700" />

            <div className="flex items-start justify-between gap-4">
              <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full ${categoryColors[featured.category]}`}>
                {featured.category}
              </span>
              <ArrowUpRight
                size={18}
                className="text-white/30 group-hover:text-white/80 transition-colors shrink-0 mt-0.5"
              />
            </div>

            <div>
              <p className="text-stone-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">
                {featured.date} · {featured.readTime}
              </p>
              <h3 className="text-xl md:text-3xl font-bold tracking-tight leading-tight mb-3 group-hover:text-white transition-colors">
                {featured.title}
              </h3>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed line-clamp-2">
                {featured.excerpt}
              </p>
            </div>
          </motion.a>

          {/* Secondary Posts */}
          <div className="flex flex-col gap-4 md:gap-5">
            {secondary.map((post, idx) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + idx * 0.1, duration: 0.6 }}
                className="group bg-white border border-stone-200 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-acelera-orange hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.25em] px-2 py-0.5 rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-stone-300 group-hover:text-acelera-orange transition-colors shrink-0 mt-0.5"
                  />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold tracking-tight leading-snug mb-1.5 group-hover:text-dark-charcoal transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-stone-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {post.date} · {post.readTime}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Blog;

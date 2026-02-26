import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPostBySlug, blogPosts } from '../data/blogPosts';

const categoryColors: Record<string, string> = {
  B2B: 'bg-dark-charcoal text-white',
  DTC: 'bg-acelera-orange text-white',
  Strategy: 'bg-stone-200 text-dark-charcoal',
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Acelera`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', post.excerpt);
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-light flex items-center justify-center" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 px-8 py-4 bg-dark-charcoal text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1] ?? blogPosts[0];

  return (
    <div className="min-h-screen bg-stone-light" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-light/90 backdrop-blur-sm border-b border-stone-200/50">
        <div className="container mx-auto px-6 md:px-16 py-4 md:py-5 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Acelera" className="h-10 md:h-12 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest opacity-70">
            <a href="/#services" className="hover:opacity-100 transition-opacity">Services</a>
            <a href="/blog" className="hover:opacity-100 transition-opacity text-acelera-orange opacity-100">Blog</a>
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
        <div className="container mx-auto px-6 md:px-16 max-w-4xl">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-dark-charcoal transition-colors"
            >
              <ArrowLeft size={12} /> All Articles
            </a>
          </motion.div>

          {/* Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                {post.category}
              </span>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">
                {post.date} · {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-6">
              {post.title}
            </h1>
            <p className="text-stone-500 text-lg md:text-xl leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-stone-200 mb-12 md:mb-16" />

          {/* Post Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="prose-acelera"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="h-px bg-stone-200 mt-16 mb-12 md:mt-20 md:mb-16" />

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-dark-charcoal text-white rounded-3xl p-8 md:p-12 mb-16 text-center"
          >
            <p className="text-acelera-orange text-xs font-bold uppercase tracking-[0.3em] mb-4">Ready to act on this?</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              Let's build your acquisition system
            </h2>
            <p className="text-stone-400 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Two active projects at a time. If we're a fit, we move fast.
            </p>
            <a
              href="https://calendar.app.google/29to7brSPsZf5huk6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 md:px-12 md:py-5 bg-acelera-orange text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl shadow-acelera-orange/20"
            >
              Book a Strategy Call <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Next Post */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Read Next</p>
            <a
              href={`/blog/${nextPost.slug}`}
              className="group flex items-center justify-between bg-white border border-stone-200 rounded-2xl p-6 md:p-8 hover:border-acelera-orange hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <span className={`inline-block text-[9px] font-bold uppercase tracking-[0.25em] px-2.5 py-0.5 rounded-full mb-3 ${categoryColors[nextPost.category]}`}>
                  {nextPost.category}
                </span>
                <p className="font-bold text-base md:text-lg tracking-tight line-clamp-2 group-hover:text-dark-charcoal transition-colors">
                  {nextPost.title}
                </p>
              </div>
              <ArrowRight size={18} className="text-stone-300 group-hover:text-acelera-orange transition-colors shrink-0 ml-4" />
            </a>
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

export default BlogPostPage;

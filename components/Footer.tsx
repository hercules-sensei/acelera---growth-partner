
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-dark-charcoal text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-acelera-orange rounded-full"></div>
              <span className="text-xl font-bold tracking-tight uppercase">Acelera</span>
            </div>
            <p className="text-stone-500 max-w-sm">
              Authority-driven acquisition for B2B services and DTC brands looking for solid, real-world growth.
            </p>
          </div>
          
          <div className="flex gap-12 text-sm text-stone-400">
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold mb-2">Company</span>
              <a href="#" className="hover:text-acelera-orange transition-colors">Approach</a>
              <a href="#" className="hover:text-acelera-orange transition-colors">Impact</a>
              <a href="https://calendar.app.google/29to7brSPsZf5huk6" target="_blank" rel="noopener noreferrer" className="hover:text-acelera-orange transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold mb-2">Legal</span>
              <a href="#" className="hover:text-acelera-orange transition-colors">Privacy</a>
              <a href="#" className="hover:text-acelera-orange transition-colors">Terms</a>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-xs text-stone-600 uppercase tracking-widest font-bold">
          <span>© 2024 Acelera. All rights reserved. Precision Growth Partner.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

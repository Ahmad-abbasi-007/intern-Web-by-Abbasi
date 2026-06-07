import React, { useState } from 'react';
import { Layers, Mail, Facebook, Twitter, Linkedin, Github, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setSubError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setSubError('Valid format required');
      return;
    }

    setSubError('');
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setNewsletterEmail('');
    }, 1500);
  };

  const menuLinks = [
    { label: 'Platform Home', target: 'home' },
    { label: 'Our Service Suite', target: 'service' },
    { label: 'Featured Portfolio', target: 'portfolio' },
    { label: 'Creative Squad Creators', target: 'team' },
    { label: 'Client Testimonials', target: 'testimonial' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-8 text-left relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[90px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Core footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1: Branding and description */}
          <div className="md:col-span-4 space-y-6">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-sans font-bold tracking-tight text-white">
                Start<span className="text-indigo-400">Up</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm">
              An interactive responsive clone of the Colorlib Startup2 template, formulated around
              complete grid alignment, strict typing, and smooth interactive design modules.
            </p>

            {/* Social icons list */}
            <div className="flex items-center gap-3">
              <a href="#" className="h-9 w-9 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links list */}
          <div className="md:col-span-2.5 space-y-5">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cbd5e1] font-mono">
              Directory Links
            </h4>
            <div className="flex flex-col gap-3">
              {menuLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(link.target)}
                  className="text-sm text-slate-400 hover:text-indigo-400 flex items-center gap-1 group/item transition-colors cursor-pointer text-left py-0.5"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover/item:text-indigo-400 group-hover/item:translate-x-1 transition-all" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact coordinate fields */}
          <div className="md:col-span-2.5 space-y-5">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cbd5e1] font-mono">
              Inquire Support
            </h4>
            <div className="space-y-4 text-sm text-[#94a3b8] font-medium leading-relaxed font-sans">
              <div className="space-y-1">
                <span className="font-semibold block text-slate-500 text-[10px] uppercase font-mono">OFFICE HQ</span>
                <span className="text-slate-300">King Street, Melbourne, AU</span>
              </div>
              <div className="space-y-1">
                <span className="font-semibold block text-slate-500 text-[10px] uppercase font-mono">HOTLINE PHONE</span>
                <span className="text-slate-300">+61 (03) 9420 1852</span>
              </div>
              <div className="space-y-1">
                <span className="font-semibold block text-slate-500 text-[10px] uppercase font-mono">MAIN EMAIL</span>
                <span className="text-indigo-400 block break-all">support@start-up.studio</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Sign-up with inline state */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cbd5e1] font-mono">
              Incline Newsletters
            </h4>
            <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
              Register your workspace email to receive recurring updates on designs and code templates.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subform"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="space-y-2 relative"
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (subError) setSubError('');
                      }}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-sans font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all pr-12"
                      placeholder="founder@your-brand.com"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="absolute right-1 text-white bg-indigo-600 hover:bg-indigo-500 h-8 w-8 top-1 bg-gradient shadow-sm rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Subscribe to newsletter"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  {subError && (
                    <span className="text-[10px] text-rose-500 font-bold font-sans block">{subError}</span>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="subsuccess"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-400 font-sans font-semibold"
                >
                  <Check className="h-4 w-4 flex-shrink-0" />
                  Successfully Subscribed!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Separator Copyright bar line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-semibold font-sans">
            Copyright &copy; 2026 All rights reserved | This clone is crafted with premium styling templates.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-wide text-indigo-400 font-bold font-mono">POWERED BY COLORLIB CLONE INITIATIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

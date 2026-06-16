/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Instagram, Facebook, Monitor, ThumbsUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-850" id="store-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Upper Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-stone-800 items-center">
          <div className="lg:col-span-6 text-left">
            <h3 className="font-serif text-2xl lg:text-3xl font-normal text-white">
              Stay Informed of New Collections
            </h3>
            <p className="text-stone-400 text-xs mt-2 max-w-md leading-relaxed">
              Subscribe to recieve rare notifications of seasonal ateliers, master craftsmen showcases, and private VIP sample vault openings. No spam.
            </p>
          </div>
          
          <div className="lg:col-span-6 w-full lg:max-w-md ml-auto">
            {isSubscribed ? (
              <div className="bg-stone-800/80 border border-amber-600/30 text-amber-500 rounded-full px-6 py-4 flex items-center gap-3 animate-fade-in text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>Inducted Successfully. Check your Inbox shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insert email address"
                  className="bg-stone-850 border border-stone-800 focus:border-amber-700 focus:outline-none rounded-full px-5 py-3.5 text-xs font-medium text-white placeholder-stone-500 flex-1"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="bg-white hover:bg-amber-700 hover:text-white text-stone-900 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
                >
                  Join List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Hyperlinks Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-left" id="footer-links-grid">
          
          <div>
            <h4 className="text-[11px] font-bold tracking-widest text-white uppercase mb-5">Atelier Curations</h4>
            <ul className="space-y-3.5 text-xs text-stone-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Nordic Sofa Lounges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solid White-Oak Dining</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mid-Century Armchairs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soft Ceramic Lighting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ash Bedside Nightstands</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest text-white uppercase mb-5">Care & Craftsmanship</h4>
            <ul className="space-y-3.5 text-xs text-stone-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">FSC Timber Guarantee</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solid Wood Preservation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Belgian Linen Clean Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Restoration Atelier services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability Score</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest text-white uppercase mb-5">Enterprise & Trade</h4>
            <ul className="space-y-3.5 text-xs text-stone-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Interior Design Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hospitality Contracts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Catalog Download (PDF)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trade Portal login</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Real-estate partnership</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest text-white uppercase mb-5">Customer Care</h4>
            <ul className="space-y-3.5 text-xs text-stone-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">White-Glove Shipping Notes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hassle-Free Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">10-Year框架 Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ & Sizing consultations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Logistical Desk</a></li>
            </ul>
          </div>

        </div>

        {/* Lower Footnotes / Legal Copyright */}
        <div className="border-t border-stone-850 pt-10 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 font-medium gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span className="font-display font-bold text-white tracking-widest uppercase">
              AURA<span className="font-serif italic font-normal text-amber-500">home</span>
            </span>
            <span>&copy; {new Date().getFullYear()} Aura Home Interiors Inc. All rights reserve-gloved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-350 transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-stone-350 transition-colors">Service Terms</a>
            <a href="#" className="hover:text-stone-350 transition-colors">Eco Certifications</a>
          </div>

          {/* Socials Placeholder */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-stone-500 hover:text-white transition-colors p-1" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors p-1" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

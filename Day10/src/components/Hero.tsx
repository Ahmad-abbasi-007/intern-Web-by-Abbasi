/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  setActiveCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, setActiveCategory }) => {
  return (
    <section className="relative overflow-hidden bg-stone-50 py-12 lg:py-20" id="hero-banner">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-cream-50/50 hidden lg:block -z-10 rounded-l-[100px]" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left" id="hero-text-block">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/50 text-amber-900 rounded-full py-1.5 px-4 w-fit mb-6 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase">
                Summer Atelier Exhibition 2026
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1] mb-6">
              Sculpted Comfort <br />
              <span className="italic font-normal text-amber-800">for Modern Havens</span>
            </h1>

            {/* Subheading */}
            <p className="text-base text-stone-600 font-normal leading-relaxed mb-8 max-w-lg">
              Experience the harmony of organic minimalism and masterclass carpentry. Every item in our curated summer catalog is sustainably sourced, precision-joinered, and crafted to endure generations.
            </p>

            {/* Hero CTA Actions */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={onExploreClick}
                id="hero-primary-cta"
                className="flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full px-8 py-4 font-semibold tracking-wider text-xs uppercase shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                Assemble Your Space
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveCategory('chairs');
                  onExploreClick();
                }}
                className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-stone-400 rounded-full px-7 py-4 font-semibold tracking-wider text-xs uppercase transition-all duration-300"
              >
                View Best Sellers
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-stone-200/80 pt-8 max-w-md">
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-stone-900 leading-none">12K+</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mt-1">Spaces Furnished</p>
              </div>
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-stone-900 leading-none">4.92</p>
                <div className="flex items-center gap-1 mt-1 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">User Rating</p>
                </div>
              </div>
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-stone-900 leading-none">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Eco-Certified Timber</p>
              </div>
            </div>

          </div>

          {/* Image Block with Offset Floating Overlay Cards */}
          <div className="lg:col-span-6 relative flex justify-center" id="hero-image-block">
            
            {/* Decorative Frame */}
            <div className="absolute -inset-1.5 bg-amber-100/40 rounded-3xl blur-md -z-10 max-w-lg w-full aspect-[4/5] lg:aspect-[5/6]" />

            <div className="relative max-w-lg w-full rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[5/6] shadow-xl group border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200"
                alt="Nordic Interior Minimal Showroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1 - Pure Craftsmanship */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white rounded-xl p-4 shadow-xl border border-stone-100 max-w-[200px] animate-fade-in hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-800 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-tight">10-Year Warranty</p>
                  <p className="text-[10px] text-stone-500 font-medium">On framework & joints</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 - Curated Luxury */}
            <div className="absolute top-12 -right-2 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-stone-150 text-left max-w-[140px] hidden sm:block">
              <p className="text-[9px] uppercase tracking-wider text-amber-800 font-extrabold mb-1">Spotlight chair</p>
              <p className="text-xs font-bold text-stone-900 leading-none mb-0.5">Lounge Armchair</p>
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-stone-400 text-[10px] line-through font-medium">$420</span>
                <span className="text-amber-800 font-extrabold text-xs">$349</span>
              </div>
              <span className="bg-stone-900 text-white rounded px-1.5 py-0.5 text-[8px] font-bold">15% SUMMER OFF</span>
            </div>

          </div>

        </div>
      </div>

      {/* Feature Pillar Badges Section (below main hero description) */}
      <div className="border-t border-stone-200 mt-16 lg:mt-24 bg-white py-6" id="brand-benefit-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-stone-100 md:divide-x">
            
            <div className="flex items-start gap-4 px-2 py-2">
              <div className="p-3 bg-stone-50 text-stone-900 rounded-full flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Free White-Glove Delivery</h4>
                <p className="text-xs text-stone-500 mt-1">Complimentary in-home delivery, package disposal, and setup on orders over $500.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 px-2 md:pl-8 py-2">
              <div className="p-3 bg-stone-50 text-stone-900 rounded-full flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Eco-Certified Sourcing</h4>
                <p className="text-xs text-stone-500 mt-1">Constructed with FSC-certified timbers finished exclusively in organic VOC-free oils.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 px-2 md:pl-8 py-2">
              <div className="p-3 bg-stone-50 text-stone-900 rounded-full flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">30-Day Comfort Trial</h4>
                <p className="text-xs text-stone-500 mt-1">Bring it home, feel it in your lighting. Easily exchange or return within 30 days hassle-free.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

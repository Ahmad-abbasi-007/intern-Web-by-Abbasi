/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Search, Compass, Armchair, Sofa, Table, Lightbulb, Inbox, Menu, X, Heart, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onToggleCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

// Icon helper to dynamically render Lucide icons
export const CategoryIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case 'Compass':
      return <Compass className={className} />;
    case 'Armchair':
      return <Armchair className={className} />;
    case 'Sofa':
      return <Sofa className={className} />;
    case 'Table':
      return <Table className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'Inbox':
      return <Inbox className={className} />;
    default:
      return <Compass className={className} />;
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onToggleCart,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all duration-300 shadow-sm" id="store-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center" id="brand-logo-container">
            <a href="#" className="flex flex-col text-left group">
              <span className="font-display text-2xl font-bold tracking-widest text-stone-900 group-hover:text-amber-800 transition-colors uppercase">
                AURA<span className="font-serif italic font-normal text-amber-700 font-medium">home</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-medium leading-none">
                Interior Atelier
              </span>
            </a>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-category-nav">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                id={`nav-cat-${category.id}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  // Scroll down to products catalog smoothly
                  const catalogElement = document.getElementById('catalog-section');
                  if (catalogElement) {
                    catalogElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                }`}
              >
                <CategoryIcon name={category.iconName} className="w-3.5 h-3.5" />
                {category.name === 'All Products' ? 'All' : category.name}
              </button>
            ))}
          </nav>

          {/* Search, Favorites & Cart Actions */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-sm justify-end ml-4" id="desktop-actions-box">
            {/* Search Input */}
            <div className="relative w-full max-w-[220px] lg:max-w-[260px]">
              <input
                type="text"
                value={searchQuery}
                id="navbar-search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full bg-stone-50 border border-stone-200 focus:border-amber-700 rounded-full px-4 py-1.5 pl-10 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Nice little indicator for quick notification */}
            <div className="text-stone-400 hover:text-stone-900 cursor-pointer p-2 rounded-full hover:bg-stone-50 transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
            </div>

            {/* Cart Icon trigger */}
            <button
              onClick={onToggleCart}
              id="navbar-cart-trigger"
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full px-5 py-2 hover:shadow-md transition-all duration-200 relative group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wider">BAG</span>
              <span className="bg-amber-600 text-white text-[11px] font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center transition-all duration-300">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Quick-Action Cart & Mobile Hamburger for small screens */}
          <div className="flex md:hidden items-center space-x-2" id="mobile-cart-action">
            {/* Simple Cart Trigger */}
            <button
              onClick={onToggleCart}
              id="mobile-cart-trigger"
              className="p-2 relative text-stone-800 hover:text-stone-950"
            >
              <ShoppingBag className="w-[22px] h-[22px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile search bar, below header */}
      <div className="md:hidden px-4 pb-3 pt-1 border-t border-stone-50">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            id="mobile-search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beautiful furniture..."
            className="w-full bg-stone-50 border border-stone-200 focus:border-amber-700 rounded-full px-4 py-2 pl-10 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 py-3 px-4 shadow-inner space-y-4 animate-fade-in" id="mobile-drawer">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold px-3 py-1">Categories</p>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsMobileMenuOpen(false);
                  const catalogElement = document.getElementById('catalog-section');
                  if (catalogElement) {
                    catalogElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                  activeCategory === category.id
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <CategoryIcon name={category.iconName} className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs text-stone-500 px-3">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Complimentary Delivery over $500</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <article
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      
      {/* Product Image & Badges Container */}
      <div className="relative aspect-square w-full bg-stone-50 overflow-hidden group/img">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-amber-800 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
              <Sparkles className="w-2.5 h-2.5 fill-white" />
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-stone-900 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
              New Arrival
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">
              -{discountPercent}% Save
            </span>
          )}
        </div>

        {/* Hover Action Overlays */}
        <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-10 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            id={`quick-view-${product.id}`}
            title="Quick View Details"
            className="p-3 bg-white hover:bg-stone-900 hover:text-white rounded-full text-stone-900 shadow-md transform translate-y-3 group-hover/img:translate-y-0 transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={(e) => onAddToCart(product, e)}
            id={`overlay-add-to-cart-${product.id}`}
            title="Add to Basket"
            className="p-3 bg-amber-700 hover:bg-stone-900 text-white rounded-full shadow-md transform translate-y-3 group-hover/img:translate-y-0 transition-all duration-300 delay-75 hover:scale-105"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Primary Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Stock status indicator if running low */}
        {product.stock <= 6 && (
          <div className="absolute bottom-2.5 left-2.5 bg-red-50 border border-red-200 text-red-700 rounded px-2 py-0.5 text-[9px] font-extrabold tracking-wider uppercase z-10">
            Running low: Only {product.stock} units!
          </div>
        )}
      </div>

      {/* Content Meta Area */}
      <div className="p-5 flex flex-col flex-1 text-left">
        
        {/* Category & Rating Row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
            {product.category}
          </span>
          
          {/* Static rating stars */}
          <div className="flex items-center gap-1 bg-stone-50 rounded px-1.5 py-0.5">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="text-[10px] font-bold text-stone-700">{product.rating}</span>
            <span className="text-[10px] text-stone-400 font-medium">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-display text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>

        {/* Short description line */}
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Color Palette Indicators */}
        <div className="flex items-center gap-1.5 mb-5" aria-label="Available product colors">
          {product.colors.map((colorHex, idx) => (
            <span
              key={idx}
              className="w-3.5 h-3.5 rounded-full border border-stone-200 ring-offset-2 ring-1 ring-transparent hover:ring-amber-700 hover:scale-110 cursor-help transition-all"
              style={{ backgroundColor: colorHex }}
              title={`Finish Swatch #${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Price & Call To Action Row */}
        <div className="border-t border-stone-100 pt-4 flex items-center justify-between mt-auto">
          <div className="flex flex-col text-left">
            {hasDiscount && (
              <span className="text-stone-400 text-xs line-through leading-none mb-1 font-semibold">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
            <span className="text-stone-900 font-display font-black text-lg tracking-tight leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            id={`btn-add-to-cart-${product.id}`}
            className="flex items-center gap-1.5 bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs tracking-wider uppercase rounded-full px-4 py-2.5 transition-all duration-200 hover:shadow-md"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add To Bag
          </button>
        </div>

      </div>

    </article>
  );
};

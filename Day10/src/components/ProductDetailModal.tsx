/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Info, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartWithDetails: (product: Product, quantity: number, selectedColor: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCartWithDetails,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');

  // Sync color selection when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedColor(product.colors[0] || '');
    }
  }, [product]);

  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddClick = () => {
    onAddToCartWithDetails(product, quantity, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto" id="quick-view-overlay">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden border border-stone-100 flex flex-col md:flex-row animate-fade-in z-10">
        
        {/* Close Button top-right corner */}
        <button
          onClick={onClose}
          id="close-modal-btn"
          className="absolute right-4 top-4 md:right-6 md:top-6 z-20 p-2 text-stone-400 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Column 1: Image Showcase */}
        <div className="w-full md:w-1/2 relative bg-stone-50" id="modal-image-col">
          <div className="aspect-[4/5] h-full relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-amber-800 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                Bestseller Icon
              </span>
            )}
          </div>
        </div>

        {/* Column 2: Tech Specs & Interaction detail panel */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col text-left justify-between" id="modal-details-col">
          
          <div>
            {/* Category */}
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
              {product.category}
            </span>

            {/* Title */}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-950 tracking-tight mb-3">
              {product.name}
            </h2>

            {/* Reviews / Ratings row */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < Math.floor(product.rating) ? 'fill-amber-500' : 'text-stone-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-850">{product.rating}</span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-500 font-medium">{product.reviewsCount} verified reviews</span>
            </div>

            {/* Pricing Section split */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-stone-100">
              <span className="text-2xl font-display font-black text-stone-950">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-stone-400 line-through font-semibold text-sm">
                  ${product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Material & Dimension Info Spec Grid */}
            <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-150 mb-6 text-xs">
              <div>
                <span className="block text-[10px] uppercase font-bold text-stone-400 mb-0.5">Primary Materials</span>
                <span className="font-semibold text-stone-800">{product.material}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-stone-400 mb-0.5">Dimensions (Outer)</span>
                <span className="font-semibold text-stone-800">{product.dimensions}</span>
              </div>
            </div>

            {/* Finish Color Swatches */}
            <div className="mb-6">
              <span className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                Select Finish Finish:
              </span>
              <div className="flex items-center gap-3">
                {product.colors.map((colorHex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(colorHex)}
                    className={`w-7 h-7 rounded-full border border-stone-200 ring-2 ring-offset-2 transition-all flex items-center justify-center ${
                      selectedColor === colorHex ? 'ring-amber-800 scale-110 shadow-sm' : 'ring-transparent opacity-85 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: colorHex }}
                    title={`Material Finish Option ${idx + 1}`}
                  >
                    {selectedColor === colorHex && (
                      <Check className="w-3.5 h-3.5 text-white stroke-[3] mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Stock Indicator Row */}
            <div className="mb-8">
              <span className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                Quantity:
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full px-3 py-1">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="p-1.5 text-stone-500 hover:text-stone-900 duration-150 disabled:opacity-25 transition-colors"
                  >
                    <X className="w-3 h-3 rotate-45 stroke-[3]" />
                  </button>
                  <span className="px-5 text-sm font-bold text-stone-800 font-mono w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                    className="p-1.5 text-stone-500 hover:text-stone-900 duration-150 disabled:opacity-25 transition-colors"
                  >
                    <Check className="w-3 h-3 rotate-45 stroke-[3]" />
                  </button>
                </div>
                
                <span className="text-xs text-stone-500 font-medium">
                  {product.stock} units available in local warehouse
                </span>
              </div>
            </div>

          </div>

          {/* Action Row Checkout */}
          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleAddClick}
              id={`modal-add-to-cart-${product.id}`}
              className="flex-1 flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-amber-800 text-white rounded-full py-4 px-6 font-semibold tracking-wider text-xs uppercase shadow-md transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4" />
              Add To Curation Basket • ${(product.price * quantity).toFixed(2)}
            </button>
            <div className="bg-stone-50 px-3.5 py-3 rounded-xl border border-stone-150 flex items-center justify-center text-[10px] text-stone-500 gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-amber-800" />
              <span>Ships in 2-4 days</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

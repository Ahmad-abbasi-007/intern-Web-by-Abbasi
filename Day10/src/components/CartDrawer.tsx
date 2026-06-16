/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, CreditCard, Sparkles, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, action: 'increment' | 'decrement') => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingThreshold = 500;
  const shippingFee = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 49.00;
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + shippingFee + tax;

  // Simulate checkout flow
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setCheckoutSuccess(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-fade-in border-l border-stone-150">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-stone-900">
                Your Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              id="close-cart-btn"
              className="p-1 rounded-full text-stone-400 hover:text-stone-900 duration-150 transition-colors hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success screen placeholder */}
          {checkoutSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white" id="checkout-success-view">
              <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-2">Order Confirmed!</h3>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed mb-8">
                Your luxury home curation has been booked. A custom white-glove logistics agent will reach out in 24 hours to schedule installation.
              </p>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-left w-full mb-8">
                <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">Curation Receipt ID</p>
                <p className="text-xs font-mono font-bold text-stone-800">AUR-29402910-2026</p>
              </div>
              <button
                onClick={handleCloseSuccess}
                id="success-continue-shopping"
                className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-full py-4 text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                Continue Curation
              </button>
            </div>
          ) : (
            <>
              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center py-12 text-center" id="empty-cart-view">
                    <div className="p-4 bg-stone-50 text-stone-400 rounded-full mb-4">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-stone-850 mb-1">Your bag is empty</h3>
                    <p className="text-xs text-stone-500 max-w-[210px] leading-relaxed mb-6">
                      Add handcrafted furniture to assemble the home of your dreams.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 text-left" id={`cart-item-${item.product.id}`}>
                      {/* Image */}
                      <div className="w-20 h-20 bg-stone-50 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info and Actions */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400">
                              {item.product.category}
                            </span>
                            <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            {item.selectedColor && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[10px] text-stone-400">Finish:</span>
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-stone-200"
                                  style={{ backgroundColor: item.selectedColor }}
                                />
                              </div>
                            )}
                          </div>
                          
                          <p className="text-xs font-bold text-stone-900 whitespace-nowrap">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Adjuster row */}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center bg-stone-50 border border-stone-200 rounded-full px-2 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 'decrement')}
                              className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors"
                              disabled={item.quantity <= 1}
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-bold text-stone-800 font-mono w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 'increment')}
                              className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors"
                              disabled={item.quantity >= item.product.stock}
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            id={`remove-cart-item-${item.product.id}`}
                            className="p-1.5 text-stone-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary Card */}
              {cartItems.length > 0 && (
                <div className="border-t border-stone-150 bg-stone-50/50 p-6 shadow-outer flex-shrink-0" id="cart-summary-box">
                  
                  {/* Delivery banner */}
                  <div className="mb-4 bg-white border border-stone-200/80 rounded-xl p-3 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-amber-700 flex-shrink-0" />
                    <div>
                      {subtotal >= shippingThreshold ? (
                        <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                          CONGRATS! FREE WHITE-GLOVE DELIVERY UNLOCKED
                        </p>
                      ) : (
                        <p className="text-[10px] text-stone-600 font-semibold leading-tight">
                          Add <span className="text-amber-800 font-extrabold">${(shippingThreshold - subtotal).toFixed(2)}</span> more to unlock complimentary white-glove shipping.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pricing break downs */}
                  <div className="space-y-1.5 text-xs text-stone-600 font-medium pb-4 border-b border-stone-150">
                    <div className="flex justify-between">
                      <span>Curation Subtotal</span>
                      <span className="text-stone-900 font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>White-Glove Shipping & Assembly</span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">Free</span>
                      ) : (
                        <span className="text-stone-900 font-bold">${shippingFee.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Sales Tax (8%)</span>
                      <span className="text-stone-900 font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Grand total */}
                  <div className="flex items-center justify-between py-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-stone-900">Est. Total</span>
                    <span className="text-xl font-bold font-display text-stone-950 tracking-tight">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout simulated Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                    <button
                      type="submit"
                      id="checkout-book-button"
                      disabled={isCheckingOut}
                      className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-amber-800 disabled:bg-stone-400 text-white rounded-full py-4 text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg"
                    >
                      <CreditCard className="w-4 h-4" />
                      {isCheckingOut ? 'Securing Booking...' : 'Book White-Glove Installation'}
                    </button>
                    <p className="text-[9px] text-stone-400 font-medium text-center leading-none">
                      Secured by SSL certified bank processing standard. No upfront money charged.
                    </p>
                  </form>

                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

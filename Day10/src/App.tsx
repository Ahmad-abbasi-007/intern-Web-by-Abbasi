/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, CartItem } from './types';
import { 
  Sparkles, 
  Filter, 
  LayoutGrid, 
  Grid3X3, 
  ArrowUpDown, 
  Compass, 
  Armchair, 
  Sofa, 
  Table, 
  Lightbulb, 
  Inbox, 
  CheckCircle2, 
  Info,
  Gift,
  HelpCircle,
  Truck
} from 'lucide-react';

export default function App() {
  // --- Persistent LocalStorage State ---
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_home_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Custom Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | null }>({
    message: '',
    type: null
  });

  // Persist cart updates to localStorage on change
  useEffect(() => {
    localStorage.setItem('aura_home_cart_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  // Toast auto-dismiss helper
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Toast Invoker
  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  // --- Cart Core handlers ---
  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    if (product.stock <= 0) {
      triggerToast(`Sorry, ${product.name} is currently out of stock`, 'info');
      return;
    }

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.product.id === product.id);
      
      if (existingIdx !== -1) {
        const item = prevItems[existingIdx];
        if (item.quantity >= product.stock) {
          triggerToast(`Reached local warehouse limit (${product.stock}) for ${product.name}`, 'info');
          return prevItems;
        }
        
        const updated = [...prevItems];
        updated[existingIdx] = { ...item, quantity: item.quantity + 1 };
        triggerToast(`Added another ${product.name} to your space bag!`);
        return updated;
      }

      triggerToast(`Successfully added ${product.name} to packaging list!`);
      return [...prevItems, { product, quantity: 1, selectedColor: product.colors[0] }];
    });
  };

  const handleAddToCartWithDetails = (product: Product, quantity: number, selectedColor: string) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.product.id === product.id);
      
      if (existingIdx !== -1) {
        const updated = [...prevItems];
        const newQty = Math.min(updated[existingIdx].quantity + quantity, product.stock);
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          selectedColor
        };
        triggerToast(`Added ${quantity} units of ${product.name} to your space bag!`);
        return updated;
      }

      triggerToast(`Added ${quantity} units of ${product.name} to your space bag!`);
      return [...prevItems, { product, quantity, selectedColor }];
    });
  };

  const handleUpdateQuantity = (productId: string, action: 'increment' | 'decrement') => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const limit = item.product.stock;
          const nextQty = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
          
          if (nextQty > limit) {
            triggerToast(`Maximum stock allocation reached (${limit} available)`, 'info');
            return item;
          }
          return { ...item, quantity: Math.max(1, nextQty) };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId);
    setCartItems((prevItems) => prevItems.filter((i) => i.product.id !== productId));
    if (item) {
      triggerToast(`Removed ${item.product.name} from curation.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Helper toggle
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Smooth scroll down to Catalog catalog section
  const scrollToCatalog = () => {
    const section = document.getElementById('catalog-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Filter and Sort Core calculations ---
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Matches Category filter tag
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    // 2. Matches Search term query ("search products by name")
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !searchLower ||
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.material.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  // Apply sorting algorithms
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default or 'featured'
    return a.stock - b.stock; // Show low stock/best-selling or custom arrangement
  });

  // Category selection icon rendering helper
  const getCategoryIconElement = (name: string, className: string = "w-4 h-4") => {
    switch (name) {
      case 'Compass': return <Compass className={className} />;
      case 'Armchair': return <Armchair className={className} />;
      case 'Sofa': return <Sofa className={className} />;
      case 'Table': return <Table className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      case 'Inbox': return <Inbox className={className} />;
      default: return <Compass className={className} />;
    }
  };

  // Helpers to get specific counts for each category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === categoryId).length;
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900" id="shop-root">
      
      {/* 1. Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onToggleCart={toggleCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Mini notification banner top-level */}
      <div className="bg-amber-800 text-stone-100 text-xs py-2 px-4 flex items-center justify-center gap-1.5 font-semibold tracking-wider uppercase">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Summer Design Festival: Save up to 20% on selected architectural models. Auto-applied.</span>
      </div>

      <main className="flex-grow">
        {/* 2. Hero Presentation Showcase */}
        <Hero 
          onExploreClick={scrollToCatalog}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* 3. Catalog Section Grid */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-t-[40px] shadow-sm -mt-10 relative z-10" id="catalog-section">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber-800 font-extrabold block mb-2.5">
              The 2026 Collection Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
              Curate Your Living Room Signature
            </h2>
            <p className="text-stone-500 text-sm font-medium leading-relaxed mt-3 max-w-lg mx-auto">
              Click a material group category below to filter our summer catalogue. Dynamic layouts update without refresh.
            </p>
          </div>

          {/* Interactive Categories Swatch Selector Chips with dynamic count bubbles */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10" id="catalog-quick-category-sorter">
            {CATEGORIES.map((category) => {
              const count = getCategoryCount(category.id);
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  id={`chip-cat-${category.id}`}
                  onClick={() => {
                    setActiveCategory(category.id);
                  }}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-amber-800 text-white shadow-md scale-[1.03]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-950 border border-stone-150'
                  }`}
                >
                  {getCategoryIconElement(category.iconName, `w-4 h-4 ${isActive ? 'text-amber-200' : 'text-stone-400'}`)}
                  <span>{category.name === 'All Products' ? 'All Curations' : category.name}</span>
                  <span className={`text-[10px] rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center font-bold ${
                    isActive ? 'bg-amber-900/40 text-amber-140' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Catalog Operations Bar: Search result text, Sorting selector, Layout switch */}
          <div className="border-t border-b border-stone-150 py-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4" id="catalog-operations-panel">
            
            {/* Displaying match metrics */}
            <div className="text-stone-600 text-xs font-semibold uppercase tracking-wider text-left">
              {searchQuery ? (
                <span>
                  Search results for "<span className="text-stone-950 font-extrabold">{searchQuery}</span>" : {sortedProducts.length} items
                </span>
              ) : (
                <span>
                  Showing <span className="text-stone-950 font-extrabold">{sortedProducts.length}</span> signature curations found
                </span>
              )}
            </div>

            {/* Sort Dropdowns */}
            <div className="flex items-center gap-3" id="sorting-dropdown-box">
              <span className="text-xs text-stone-450 font-medium whitespace-nowrap flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                Sort Curation:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                id="sorting-select"
                className="bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 py-1.5 px-3 focus:outline-none focus:border-amber-700 cursor-pointer"
              >
                <option value="featured">Warehouse Stock Sort</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Industry Ratings</option>
              </select>
            </div>

          </div>

          {/* Core Dynamic Product Rendering Cards Grid */}
          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto" id="no-matching-products">
              <div className="p-4 bg-stone-50 text-stone-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-2">No Curations Match Filters</h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-6">
                We couldn't locate any products matching "{searchQuery}" under the chosen categories list. Reset your search filters to view catalog.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="bg-stone-950 hover:bg-stone-850 text-white rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
              id="dynamic-products-output"
            >
              {sortedProducts.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setSelectedProductForModal(p)}
                  />
                </div>
              ))}
            </div>
          )}

        </section>

        {/* 4. Highlighted Story Section */}
        <section className="bg-stone-900 text-stone-300 py-16 lg:py-24 relative overflow-hidden" id="brand-story-banner">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-800/50 via-stone-950 to-stone-950 -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 text-left" id="story-text">
                <span className="text-[11px] uppercase tracking-[0.3em] text-amber-500 font-extrabold block mb-3">
                  Eco-Sustainability Pledge
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight mb-6">
                  For every armchair assembled, <br />
                  <span className="italic text-amber-400">we preserve a woodland grove.</span>
                </h3>
                
                <div className="space-y-6 text-xs text-stone-400 leading-relaxed font-normal">
                  <p>
                    Aura Home operates on a circular blueprint. By partnering with carbon-neutral timber mills in Sweden and France, we strictly guarantee all maple, ash, oak, and walnut are harvested sustainably.
                  </p>
                  <p>
                    Additionally, 3% of every individual checkout is routed globally to supporting forest conservancies across North America and sub-Saharan zones. Experience comfort that preserves the ecosystems of tomorrow.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <div className="flex items-center gap-3.5">
                    <div className="px-3 py-2 bg-stone-800 rounded-lg border border-stone-700 text-amber-500 font-serif italic text-lg font-bold">
                      FSC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">100% Eco-Certified</p>
                      <p className="text-[10px] text-stone-500 mt-1">Council Code #S-39502-B</p>
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-stone-800" />
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-stone-800 rounded-full text-amber-500">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">In-house Logistical fleet</p>
                      <p className="text-[10px] text-stone-500 mt-1">Zero-emission vehicles</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="lg:col-span-7 relative flex justify-center" id="story-visuals">
                <div className="grid grid-cols-2 gap-4 max-w-md w-full relative">
                  
                  <div className="absolute inset-x-0 -bottom-10 bg-gradient-to-t from-stone-950 to-transparent h-24 z-15" />

                  <img
                    src="https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600"
                    alt="Sustainable Geometric Oak Shell Bookcase"
                    className="rounded-2xl shadow-lg h-56 w-full object-cover border border-stone-800 hover:scale-[1.02] duration-300 transition-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600"
                    alt="Satin Gold Pendant Dome Shade"
                    className="rounded-2xl shadow-lg mt-8 h-56 w-full object-cover border border-stone-800 hover:scale-[1.02] duration-300 transition-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                </div>
              </div>

            </div>
          </div>

        </section>

      </main>

      {/* 5. Shopping Cart Drawout Side Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 6. Dynamic Detail Modal Screen */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCartWithDetails={handleAddToCartWithDetails}
      />

      {/* 7. General Purpose Footer component */}
      <Footer />

      {/* Bottom Floating Interactive Notification Toasts */}
      {toast.message && (
        <div 
          id="toast-notification"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl animate-fade-in border text-xs font-bold uppercase transition-all duration-300 text-left ${
            toast.type === 'info'
              ? 'bg-stone-900 border-stone-800 text-stone-200'
              : 'bg-stone-950 border-amber-800/40 text-amber-500'
          }`}
          style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
        >
          <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="tracking-wide">
            {toast.message}
          </p>
        </div>
      )}

    </div>
  );
}

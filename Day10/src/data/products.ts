/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Products', iconName: 'Compass' },
  { id: 'chairs', name: 'Chairs', iconName: 'Armchair' },
  { id: 'sofas', name: 'Sofas', iconName: 'Sofa' },
  { id: 'tables', name: 'Tables', iconName: 'Table' },
  { id: 'lighting', name: 'Lighting', iconName: 'Lightbulb' },
  { id: 'storage', name: 'Storage', iconName: 'Inbox' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Nordic Lounge Armchair',
    price: 349.99,
    originalPrice: 420.00,
    rating: 4.8,
    reviewsCount: 124,
    category: 'chairs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
    description: 'This Nordic style lounge chair represents the perfect marriage of functional minimalism and organic warmth. Crafted with a premium ash wood frame and upholstered in breathable, stain-resistant organic linen compound.',
    dimensions: 'W: 75cm x D: 80cm x H: 92cm',
    material: 'Ash Wood & Belgian Linen',
    colors: ['#D6C5B3', '#4A5568', '#2D3748'],
    stock: 14,
    isBestSeller: true
  },
  {
    id: 'prod-2',
    name: 'Mid-Century Oak Dining Table',
    price: 899.00,
    originalPrice: 1050.00,
    rating: 4.9,
    reviewsCount: 88,
    category: 'tables',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600',
    description: 'A masterpiece of classic joinery. Made of 100% sustainably-sourced white oak with a durable water-resistant matte topcoat. Features elegant tapered dowel legs and seats up to 6 adults comfortably.',
    dimensions: 'W: 180cm x D: 90cm x H: 75cm',
    material: 'Solid White Oak',
    colors: ['#C1936D', '#8C6239'],
    stock: 5,
    isBestSeller: true
  },
  {
    id: 'prod-3',
    name: 'Minimalist Charcoal Sofa',
    price: 1299.99,
    rating: 4.7,
    reviewsCount: 57,
    category: 'sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
    description: 'Lounge in ultimate comfort. Incorporates deep pocket-spring seating nested inside triple-density responsive memory foam layers. Draped elegantly in premium textured charcoal tweed cloth.',
    dimensions: 'W: 220cm x D: 95cm x H: 82cm',
    material: 'Hardwood Frame, Steel Springs, Tweed Fabric',
    colors: ['#2D3748', '#718096', '#E2E8F0'],
    stock: 8,
    isNewArrival: true
  },
  {
    id: 'prod-4',
    name: 'Sleek Ceramic Floor Lamp',
    price: 189.50,
    originalPrice: 249.99,
    rating: 4.6,
    reviewsCount: 42,
    category: 'lighting',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
    description: 'Radiating rich amber ambient lighting, this handcrafted ceramic floor lamp pairs an earthy, textured base with an adjustable unbleached linen drum shade. Ideal for reading corners and soft bedroom scenes.',
    dimensions: 'D: 40cm x H: 155cm',
    material: 'Ceramic & Linen Shade',
    colors: ['#F7FAFC', '#CBD5E0'],
    stock: 22
  },
  {
    id: 'prod-5',
    name: 'Ash Wood Slide Nightstand',
    price: 215.00,
    rating: 4.5,
    reviewsCount: 73,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1532372320978-9b4d8a3a0245?auto=format&fit=crop&q=80&w=600',
    description: 'Optimize your bedside storage space. This modern bedside nightstand features a soft-closing drawer with a brushed brass knob and an open lower-tier bookshelf for seamless access to evening readings.',
    dimensions: 'W: 45cm x D: 40cm x H: 55cm',
    material: 'Solid Ash Wood & Veneer',
    colors: ['#E2E8F0', '#A0AEC0'],
    stock: 12
  },
  {
    id: 'prod-6',
    name: 'Modernist Tan Leather Armchair',
    price: 549.00,
    rating: 4.9,
    reviewsCount: 165,
    category: 'chairs',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600',
    description: 'Inspired by iconic mid-century Italian design. This leather armchair has a resilient steel skeleton powder-coated in matte black, supporting a thick, vegetable-tanned saddle aniline leather seat.',
    dimensions: 'W: 80cm x D: 78cm x H: 85cm',
    material: 'Aniline Leather & Powder-Coated Steel',
    colors: ['#8C5B32', '#1A202C'],
    stock: 7,
    isBestSeller: true
  },
  {
    id: 'prod-7',
    name: 'Off-White Linen Corduroy Couch',
    price: 1450.00,
    originalPrice: 1650.00,
    rating: 4.8,
    reviewsCount: 39,
    category: 'sofas',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600',
    description: 'The epitome of cloud-like relaxation. Its deep seat and ultra-soft plush corduroy make it practically impossible to leave. All covers are removable and washable for low-maintenance hosting.',
    dimensions: 'W: 240cm x D: 105cm x H: 80cm',
    material: 'Feather-Down Fill, Corduroy Velvet',
    colors: ['#F7FAFC', '#E2DBCF'],
    stock: 4,
    isNewArrival: true
  },
  {
    id: 'prod-8',
    name: 'Minimalist Brass Dome Pendant',
    price: 125.00,
    rating: 4.4,
    reviewsCount: 29,
    category: 'lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600',
    description: 'Cast an elegant dining glow. This spin-formed aluminum alloy pendant is electroplated in soft satin brass, rendering a polished, highly-reflective inner dome surface that evenly diffuses downlight.',
    dimensions: 'D: 35cm x H: 28cm (Cord: 150cm)',
    material: 'Electroplated Brass & Aluminum',
    colors: ['#ECC94B', '#2D3748'],
    stock: 18
  },
  {
    id: 'prod-9',
    name: 'Industrial Wood Work Desk',
    price: 480.00,
    originalPrice: 550.00,
    rating: 4.7,
    reviewsCount: 92,
    category: 'tables',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600',
    description: 'A robust dual-tiered home office desk featuring structural carbon steel frames with pre-drilled management wire holes. Topped with heavy-duty structured walnut wood slats.',
    dimensions: 'W: 140cm x D: 70cm x H: 75cm',
    material: 'Solid Walnut & Carbon Steel',
    colors: ['#6B46C1', '#1A202C'],
    stock: 9
  },
  {
    id: 'prod-10',
    name: 'Geometric Oak Divider Cabinet',
    price: 680.00,
    rating: 4.8,
    reviewsCount: 51,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600',
    description: 'A multi-functional shelving unit styled with off-set cubbyholes to display books, sculptures, and houseplants elegantly. Can be positioned against walls or used as an ambient space divider.',
    dimensions: 'W: 100cm x D: 32cm x H: 160cm',
    material: 'Premium Oak Veneer & MDF',
    colors: ['#E2E8F0', '#C1936D'],
    stock: 6,
    isNewArrival: true
  },
  {
    id: 'prod-11',
    name: 'Nordic Sherpa Accent Pouf',
    price: 110.00,
    rating: 4.6,
    reviewsCount: 66,
    category: 'chairs',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600',
    description: 'An elegant, cozy statement accessory piece. Use it as a comfortable footstool, quick extra seating, or conversational lounge accent. Swathed in ultra-cushy white bouclé faux-sherpa shearling.',
    dimensions: 'W: 50cm x D: 50cm x H: 45cm',
    material: 'Bouclé Fabric & High-Density Core',
    colors: ['#FFFFFF', '#CBD5E0'],
    stock: 19
  }
];

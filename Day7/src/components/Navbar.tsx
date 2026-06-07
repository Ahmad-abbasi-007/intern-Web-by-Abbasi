import { useState, useEffect } from 'react';
import { Layers, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'service', label: 'Service' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'team', label: 'Team' },
    { id: 'testimonial', label: 'Testimonial' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            id="logo-container"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-xl font-sans font-bold tracking-tight text-white">
              Start<span className="text-indigo-400">Up</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-menu" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer relative py-1 ${
                  activeSection === link.id
                    ? 'text-indigo-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Call To Action Button (Desktop) */}
          <div className="hidden md:block">
            <button
              id="cta-get-started"
              onClick={() => handleLinkClick('contact')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 z-40 md:hidden p-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-3 px-4 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-indigo-900/50 text-indigo-400 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-800">
                <button
                  id="mobile-cta-get-started"
                  onClick={() => handleLinkClick('contact')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold rounded-xl text-center shadow-lg cursor-pointer transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

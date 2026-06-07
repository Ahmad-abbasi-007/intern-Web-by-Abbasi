import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutDetail from './components/AboutDetail';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Find offset to account for navbar height
      const navbar = document.getElementById('main-navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll to absolute top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setActiveSection('home');
  };

  // Intersection Observer to active highlight current scroll sections
  useEffect(() => {
    const sections = ['home', 'service', 'portfolio', 'team', 'testimonial', 'contact'];
    
    const handleScrollObserver = () => {
      // Scroll to top button display check
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const scrollPosition = window.scrollY + 200; // Offset checking threshold

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver);
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  return (
    <div id="startup2-clone-wrapper" className="min-h-screen bg-slate-950 font-sans text-white antialiased selection:bg-indigo-600/30 selection:text-white">
      {/* Floating Sticky Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Sections */}
      <main id="main-content-layout">
        {/* Home / Hero */}
        <Hero onLearnMore={scrollToSection} />

        {/* Services We Provide */}
        <Services />

        {/* About detail specs & Counting stats */}
        <AboutDetail />

        {/* Dynamic Showcase Catalog Portfolio */}
        <Portfolio />

        {/* Blueprint Process Steps 'How We Work' */}
        <Process />

        {/* Creative Advisor Creators Team */}
        <Team />

        {/* Quotation Reviews Testimonials */}
        <Testimonials />

        {/* Get in Touch form and metadata */}
        <Contact />
      </main>

      {/* Footer credits and subscription newsletter */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Scroll To Top trigger button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 h-12 w-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center z-40 cursor-pointer shadow-lg hover:shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all border border-indigo-400/20"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

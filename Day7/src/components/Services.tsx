import { useState } from 'react';
import { Palette, Monitor, Smartphone, ArrowRight, X, Check, Sparkles, Zap, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { servicesData, ServiceItem } from '../data';

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Mapping helper to resolve Lucide component based on service data string ids
  const getIcon = (name: string) => {
    switch (name) {
      case 'Palette':
        return <Palette className="h-7 w-7 text-indigo-400 group-hover:text-pink-400 transition-colors" />;
      case 'Monitor':
        return <Monitor className="h-7 w-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />;
      case 'Smartphone':
        return <Smartphone className="h-7 w-7 text-indigo-400 group-hover:text-teal-400 transition-colors" />;
      default:
        return <Monitor className="h-7 w-7 text-indigo-400" />;
    }
  };

  // Specific features description based on service clicked
  const getServiceHighlights = (id: string) => {
    switch (id) {
      case 'graphic-design':
        return {
          header: 'Premium Graphic Design Ecosystem',
          description: 'Deploy beautiful vector graphics, modern typography, corporate brand books, and custom layout frameworks.',
          deliverables: [
            { icon: <Sparkles className="h-4 w-4 text-pink-400" />, text: 'Brand Guidelines & Custom Systems' },
            { icon: <Paintbrush className="h-4 w-4 text-pink-400" />, text: 'High-contrast Vector Library Packs' },
            { icon: <Zap className="h-4 w-4 text-pink-400" />, text: 'Marketing banners & Landing illustrations' },
          ],
          color: 'from-pink-500/20 to-indigo-500/20',
          badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
        };
      case 'web-design':
        return {
          header: 'Next-Generation Full-Stack Web layouts',
          description: 'Beautiful responsive architectures compiled using ultra-speedy component kits and SEO-oriented structures.',
          deliverables: [
            { icon: <Code className="h-4 w-4 text-indigo-400" />, text: 'Custom React & Vite setups' },
            { icon: <Zap className="h-4 w-4 text-indigo-400" />, text: 'PageSpeed score optimized (95%+ guaranteed)' },
            { icon: <Sparkles className="h-4 w-4 text-indigo-400" />, text: 'Full Tailwind CSS utility mapping' },
          ],
          color: 'from-indigo-500/20 to-pink-500/20',
          badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        };
      case 'mobile-app':
        return {
          header: 'Immersive Mobile Application Designs',
          description: 'Responsive prototype screens, spatial navigation flows, and interactive app animations.',
          deliverables: [
            { icon: <Smartphone className="h-4 w-4 text-teal-400" />, text: 'App Store & Google Play UI kits' },
            { icon: <Sparkles className="h-4 w-4 text-teal-400" />, text: 'Smooth layout & Gesture prototypes' },
            { icon: <Zap className="h-4 w-4 text-teal-400" />, text: 'Offline first mobile UX flows' },
          ],
          color: 'from-teal-500/20 to-indigo-500/20',
          badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
        };
      default:
        return {
          header: 'Core Capabilities',
          description: 'Specializing in elite digital development procedures.',
          deliverables: [],
          color: 'from-indigo-500/20 to-slate-500/20',
          badgeColor: 'bg-indigo-500/10 text-indigo-400',
        };
    }
  };

  const Paintbrush = ({ className }: { className?: string }) => <Palette className={className} />;

  return (
    <section id="service" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Visual separators / ambient backdrop element */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-pink-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-400/20 inline-block">
            Our Core Specialization
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
            We provide deep visual solutions for modern brands
          </h2>
          <p className="text-slate-400 font-sans leading-relaxed text-sm sm:text-base">
            Expertly crafted services structured around responsiveness, elegant typography pairing,
            and complete grid precision matching the custom visual Startup2 aesthetics.
          </p>
        </div>

        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-8 hover:bg-slate-900 transition-all shadow-xl relative cursor-pointer hover:-translate-y-1"
              onClick={() => setSelectedService(service)}
            >
              {/* Card visual glowing border accent on hover */}
              <div className="absolute inset-0 bg-indigo-500/2 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur" />

              <div className="space-y-6 relative z-10 flex flex-col h-full">
                {/* Custom rounded icon container */}
                <div id={`service-icon-box-${service.id}`} className="h-14 w-14 rounded-2xl bg-indigo-500/10 group-hover:bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40 transition-all">
                  {getIcon(service.iconName)}
                </div>

                <div className="space-y-3 flex-1">
                  <h3 className="text-xl font-sans font-semibold text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed font-sans font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Learn more visual trigger */}
                <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold group-hover:text-indigo-300 transition-colors pt-2 border-t border-slate-800/60">
                  Explore Capabilities
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Detail Capabilities Modal popup */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              id="service-detail-modal"
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                id="close-service-modal"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Decorative top colored header */}
              <div className={`h-24 bg-gradient-to-r ${getServiceHighlights(selectedService.id).color} p-6 flex items-end`}>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getServiceHighlights(selectedService.id).badgeColor}`}>
                  {selectedService.title} Details
                </span>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {getServiceHighlights(selectedService.id).header}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {getServiceHighlights(selectedService.id).description}
                  </p>
                </div>

                {/* Custom deliverables check list */}
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block">
                    Deliverables Include:
                  </span>
                  <div className="space-y-2.5">
                    {getServiceHighlights(selectedService.id).deliverables.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                        <div className="flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm font-sans font-medium text-slate-300">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions inside modal */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    id="modal-srv-close"
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-medium transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                  <button
                    id="modal-srv-contact"
                    onClick={() => {
                      setSelectedService(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

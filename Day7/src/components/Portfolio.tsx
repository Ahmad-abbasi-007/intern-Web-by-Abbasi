import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, ExternalLink, Sparkles, Folder } from 'lucide-react';
import { portfolioData, PortfolioItem } from '../data';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'graphic'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Filter Categories
  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'web', label: 'Web Design' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'graphic', label: 'Graphic Design' },
  ];

  // Filter items
  const filteredProjects = portfolioData.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="portfolio" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[15%] right-[-5%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-xs uppercase tracking-widest text-[#a5b4fc] font-bold">
              Crafted Artifacts Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Featured Works
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
              Explore our historic catalog of modern web, mobile, and design identity systems
              deployed across global industries.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 border border-slate-800 p-2 rounded-2xl w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`portfolio-filter-${cat.id}`}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer relative ${
                  activeFilter === cat.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
                {activeFilter === cat.id && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-indigo-600 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Portfolio Item grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-slate-900 border border-slate-800/80 hover:border-indigo-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-indigo-500/5 transition-all text-left flex flex-col justify-between"
              >
                <div
                  id={`portfolio-trigger-${project.id}`}
                  className="cursor-pointer overflow-hidden relative aspect-[4/3] bg-slate-950"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Item Image */}
                  <img
                    referrerPolicy="no-referrer"
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                  {/* Floating badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600/30 backdrop-blur border border-indigo-400/30 text-indigo-300 rounded-full text-[10px] uppercase font-bold tracking-widest">
                    {project.category}
                  </span>

                  {/* Text Container overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 space-y-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs text-indigo-400 font-bold block opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono">
                      CLICK TO SEE INSIGHTS
                    </span>
                    <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Item Detailed Lightbox Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              id="portfolio-detail-modal"
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Button */}
              <button
                id="close-portfolio-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full cursor-pointer z-10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Project Image */}
                <div className="aspect-square md:aspect-auto md:h-full bg-slate-950 relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
                </div>

                {/* Right: Project Insights details */}
                <div className="p-8 space-y-6 text-left flex flex-col justify-center">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block font-mono">
                      Project Insights
                    </span>
                    <h4 className="text-2xl font-bold font-sans text-white tracking-tight lead-tight">
                      {selectedProject.title}
                    </h4>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>

                  {/* Metadata fields columns */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400">
                      <User className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">CLIENT/ORGANIZATION</span>
                        <span className="font-semibold text-slate-300">{selectedProject.client}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2.5 text-xs text-slate-400">
                      <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">DELIVERY DATE</span>
                        <span className="font-semibold text-slate-300">{selectedProject.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Abstract Technology stack section to enrich the clone */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block">TECHNOLOGY STACK USED</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['TailwindCSS', 'TypeScript', 'Framer Motion', 'Vite', 'Lucide Icons'].map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-md border border-indigo-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom dynamic detail button action */}
                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      id="modal-portfolio-discover"
                      onClick={() => {
                        setSelectedProject(null);
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      Inquire About Similar Architectures
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

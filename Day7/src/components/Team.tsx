import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Twitter, Linkedin, Github, X, Quote, Briefcase, Award } from 'lucide-react';
import { teamMembers, TeamMember } from '../data';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const getMemberBio = (id: string) => {
    switch (id) {
      case 'team-1':
        return {
          quote: 'Design is not just what it looks like and feels like. Design is how it works.',
          philosophy: 'Crafting pixel-perfect interface grids that prioritize immediate content comprehension and visual hierarchy.',
          experience: '7+ Years guiding creative projects at major agencies.',
          deliverable: 'Visual Identity, Systems Mapping, Grid orchestration.',
        };
      case 'team-2':
        return {
          quote: 'Clean components, rigorous typing, and lightning compile times lead to peaceful states.',
          philosophy: 'Committed to compiling strict, strict, zero-dependency modules which guarantee fast cold-startup times on any cloud node.',
          experience: '6+ Years composing TypeScript enterprise services.',
          deliverable: 'TypeScript engines, Vite structures, motion transitions.',
        };
      case 'team-3':
        return {
          quote: 'Your product either guides the user seamlessly, or it acts as a roadblock. Experience is everything.',
          philosophy: 'Investigating detailed user scroll behaviours and micro-intent metrics to engineer optimal conversion pathways.',
          experience: '5+ Years wireframing spatial interfaces.',
          deliverable: 'Heuristics Audits, Figma flows, interactive playboards.',
        };
      case 'team-4':
        return {
          quote: 'A brand is not a logo. It is a promise of value, trust, and flawless execution quality.',
          philosophy: 'Formulating robust copywriting strategies and marketing ecosystems that align precisely with creative display aesthetics.',
          experience: '5+ Years branding technology startups.',
          deliverable: 'Creative copywriting, SEO tags, launch metrics.',
        };
      default:
        return {
          quote: 'We deliver professional-grade visual products.',
          philosophy: 'Craftsmanship at every layer.',
          experience: 'Veteran team.',
          deliverable: 'End-to-end launch kits.',
        };
    }
  };

  return (
    <section id="team" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background visual indicators */}
      <div className="absolute top-[30%] left-[-10%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#a5b4fc] font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-400/20 inline-block">
            Our Elite Creators
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white animate-fade-in">
            Our Creative Team
          </h2>
          <p className="text-[#94a3b8] font-sans leading-relaxed text-sm sm:text-base">
            A cohesive squad of senior designers, developers, and product orchestrators
            synthesizing bold startup ideas into beautiful online platforms.
          </p>
        </div>

        {/* Team Members Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              id={`team-card-${member.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/30 transition-all text-left relative flex flex-col justify-between cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              {/* Profile Image with subtle Zoom overlay */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                <img
                  referrerPolicy="no-referrer"
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Cover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Brand Logo floating floating */}
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-slate-900/80 backdrop-blur border border-slate-700/50 text-indigo-400 rounded-lg text-[9px] uppercase font-bold tracking-widest font-mono">
                  CREATOR
                </span>

                {/* Slide Up Social Overlay */}
                <div className="absolute bottom-4 inset-x-4 flex justify-center gap-3.5 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <span className="h-8 w-8 bg-slate-900/95 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                    <Facebook className="h-4 w-4" />
                  </span>
                  <span className="h-8 w-8 bg-slate-900/95 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                    <Twitter className="h-4 w-4" />
                  </span>
                  <span className="h-8 w-8 bg-slate-900/95 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  {member.socials.github && (
                    <span className="h-8 w-8 bg-slate-900/95 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                      <Github className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>

              {/* Identity Details */}
              <div className="p-6 space-y-1.5 bg-slate-900">
                <h3 className="text-lg font-sans font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">
                  {member.role}
                </p>
                <span className="text-[10px] text-indigo-400 block pt-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-wider font-mono">
                  READ PORTFOLION STATS
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Member Biography Insight Modal Popup */}
      <AnimatePresence>
        {selectedMember && (
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
              id="team-detail-modal"
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button button */}
              <button
                id="close-team-modal"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full z-10 cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Profile Portrait card */}
                <div className="md:col-span-5 h-72 md:h-auto bg-slate-950 relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-60" />
                </div>

                {/* Insights and Bio */}
                <div className="md:col-span-7 p-8 space-y-6 text-left flex flex-col justify-center">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase font-mono">
                      {selectedMember.role} Insights
                    </span>
                    <h4 className="text-2xl font-bold font-sans text-white tracking-tight leading-tight">
                      {selectedMember.name}
                    </h4>
                  </div>

                  {/* Interview Quote quotes */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex gap-3 relative">
                    <Quote className="h-8 w-8 text-indigo-500/20 absolute -top-2 -left-1 flex-shrink-0" />
                    <p className="text-xs sm:text-sm font-medium italic text-indigo-300 relative z-10 leading-relaxed pl-4">
                      "{getMemberBio(selectedMember.id).quote}"
                    </p>
                  </div>

                  {/* Career descriptions */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <Briefcase className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block font-mono">CAREER STRETCH</span>
                        <p className="text-xs font-medium text-slate-300">{getMemberBio(selectedMember.id).experience}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <Award className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block font-mono">DISCIPLINE FOCUS & CORE SKILL</span>
                        <p className="text-xs font-medium text-slate-300">{getMemberBio(selectedMember.id).philosophy}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      id="modal-team-contact"
                      onClick={() => {
                        setSelectedMember(null);
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all"
                    >
                      Inquire Team Capabilities
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

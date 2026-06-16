import React, { useState } from "react";
import { PortfolioData, ThemeConfig } from "../types";
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Send,
  Terminal,
  CircleCheck,
  Smartphone,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioPreviewProps {
  data: PortfolioData;
  theme: ThemeConfig;
  onContactSubmit: (senderName: string, senderEmail: string, senderMessage: string) => Promise<void>;
  sendingMessage: boolean;
  contactSuccess: boolean;
  generatedAutoReply: string | null;
}

export default function PortfolioPreview({
  data,
  theme,
  onContactSubmit,
  sendingMessage,
  contactSuccess,
  generatedAutoReply
}: PortfolioPreviewProps) {
  const { fullName, title, bioHeader, bioDetailed, skills, projects, experience, education, socials } = data;
  const { visualStyle, fontFamily } = theme;

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");

  // Category unique calculations
  const projectCategories = Array.from(new Set(projects.map(p => p.projectType)));

  // Font Family selectors
  const getFontClass = () => {
    switch (fontFamily) {
      case "Space Grotesk": return "font-space";
      case "Playfair Display": return "font-playfair";
      case "JetBrains Mono": return "font-mono";
      default: return "font-inter";
    }
  };

  // Aesthetic mappings
  const getThemeThemeStyles = () => {
    switch (visualStyle) {
      case "cyber":
        return {
          bg: "bg-[#0d0e15] text-[#00ffcc]",
          text: "text-[#00ffcc]",
          textMuted: "text-slate-400",
          cardBg: "bg-[#161824] border border-[#00ffcc]/20 shadow-[0_4px_20px_rgba(0,255,204,0.03)]",
          badge: "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30",
          accentText: "text-[#ff007f]",
          primaryBtn: "bg-[#00ffcc] text-black font-mono font-semibold tracking-wide hover:opacity-90 shadow-[0_0_12px_rgba(0,255,204,0.3)] transition-all",
          secondaryBtn: "border border-[#ff007f] text-[#ff007f] hover:bg-[#ff007f]/10 font-mono",
          divider: "border-slate-800",
          pill: "bg-slate-900 text-[#00ffcc] border border-[#00ffcc]/10",
          bullet: "bg-[#ff007f]"
        };
      case "dark-cosmic":
        return {
          bg: "bg-[#0B0C10] text-[#C5C6C7]",
          text: "text-[#C5C6C7]",
          textMuted: "text-slate-400",
          cardBg: "bg-[#1F2833] border border-[#2C3539] shadow-xl",
          badge: "bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30",
          accentText: "text-[#45A29E]",
          primaryBtn: "bg-[#66FCF1] text-black font-semibold hover:opacity-90 shadow-[0_0_10px_rgba(102,252,241,0.2)] transition-all",
          secondaryBtn: "border border-slate-500 text-slate-300 hover:bg-slate-800",
          divider: "border-[#2C3539]",
          pill: "bg-slate-800 text-slate-300 border border-slate-700",
          bullet: "bg-[#66FCF1]"
        };
      case "warm":
        return {
          bg: "bg-[#FAF6F0] text-[#403D39]",
          text: "text-[#403D39]",
          textMuted: "text-stone-500",
          cardBg: "bg-[#FFFDF9] border border-[#EADECA] shadow-sm",
          badge: "bg-[#D48C6F]/10 text-[#D48C6F] border border-[#D48C6F]/20",
          accentText: "text-[#A78255]",
          primaryBtn: "bg-[#D48C6F] text-[#FAF6F0] hover:bg-[#D48C6F]/90 font-medium transition-all",
          secondaryBtn: "border border-[#7D7461] text-[#7D7461] hover:bg-[#7D7461]/5",
          divider: "border-[#EADECA]",
          pill: "bg-[#FAF6F0] text-stone-700 border border-[#EADECA]",
          bullet: "bg-[#D1a280]"
        };
      case "swiss-modern":
        return {
          bg: "bg-[#f4f4f4] text-[#1a1a1a]",
          text: "text-[#1a1a1a]",
          textMuted: "text-zinc-600",
          cardBg: "bg-white border border-[#e5e5e5]",
          badge: "bg-[#d9383a]/10 text-[#d9383a] border border-[#d9383a]/20",
          accentText: "text-[#d9383a]",
          primaryBtn: "bg-[#d9383a] text-white hover:bg-[#b8292b] font-medium tracking-tight h-11 uppercase text-xs rounded-none transition-all",
          secondaryBtn: "border border-black text-black hover:bg-black/5 uppercase text-xs font-semibold rounded-none",
          divider: "border-[#e5e5e5]",
          pill: "bg-zinc-100 text-zinc-800 rounded-none",
          bullet: "bg-[#d9383a]"
        };
      default: // minimal
        return {
          bg: "bg-[#fbfbfb] text-stone-900",
          text: "text-stone-900",
          textMuted: "text-stone-500",
          cardBg: "bg-white border border-stone-200/90 shadow-sm",
          badge: "bg-stone-100 text-stone-800 border border-stone-200",
          accentText: "text-stone-700",
          primaryBtn: "bg-stone-900 text-white hover:bg-stone-800 transition-all font-medium",
          secondaryBtn: "border border-stone-300 text-stone-700 hover:bg-stone-50",
          divider: "border-stone-200",
          pill: "bg-stone-50 text-stone-600 border border-stone-200",
          bullet: "bg-stone-900"
        };
    }
  };

  const style = getThemeThemeStyles();

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMsg) return;
    onContactSubmit(formName, formEmail, formMsg);
    setFormName("");
    setFormEmail("");
    setFormMsg("");
  };

  const filteredProjects = projects.filter(p => activeFilter === "all" || p.projectType === activeFilter);

  return (
    <div id="portfolio-preview" className={`w-full min-h-screen transition-colors duration-300 ${style.bg} ${getFontClass()} flex flex-col justify-between overflow-hidden relative`}>
      
      {/* Dynamic Navigation Line */}
      <nav className={`w-full border-b ${style.divider} ${style.cardBg} backdrop-blur-md sticky top-0 z-40 transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className={`w-5 h-5 ${style.text}`} />
            <span className={`font-bold tracking-tight text-lg ${style.text}`}>{fullName}</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#preview-home" className={`${style.text} hover:opacity-75 transition-opacity`}>Home</a>
            <a href="#preview-about" className={`${style.text} hover:opacity-75 transition-opacity`}>About</a>
            <a href="#preview-skills" className={`${style.text} hover:opacity-75 transition-opacity`}>Skills</a>
            <a href="#preview-projects" className={`${style.text} hover:opacity-75 transition-opacity`}>Projects</a>
            <a href="#preview-experience" className={`${style.text} hover:opacity-75 transition-opacity`}>Experience</a>
            <a href="#preview-contact" className={`${style.text} hover:opacity-75 transition-opacity`}>Contact</a>
          </div>
          <a href="#preview-contact" className={`text-xs px-3 py-1.5 rounded ${style.badge}`}>Connect</a>
        </div>
      </nav>

      {/* Main Home / Hero Section */}
      <section id="preview-home" className="py-20 md:py-28 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <span className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-flex items-center gap-1.5 ${style.badge}`}>
            <Sparkles className="w-3.5 h-3.5" /> Open to collaboration
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-none">
            {fullName}
          </h1>
          <p className={`text-lg md:text-xl font-medium mb-6 ${style.textMuted} max-w-2xl`}>
            {title}
          </p>
          <blockquote className={`text-base md:text-lg border-l-2 pl-4 py-1 italic mb-10 text-center max-w-3xl ${style.divider} opacity-90`}>
            "{bioHeader}"
          </blockquote>
          
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#preview-projects" className={`px-6 py-2.5 rounded text-sm font-semibold shadow-sm ${style.primaryBtn}`}>
              Explore Projects
            </a>
            <a href="#preview-contact" className={`px-6 py-2.5 rounded text-sm font-semibold ${style.secondaryBtn}`}>
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="preview-about" className={`py-16 md:py-20 border-t ${style.divider} max-w-5xl mx-auto px-6 w-full`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold mb-6 tracking-tight flex items-center">
              <span className={`inline-block w-6 h-1 mr-3 rounded ${style.bullet}`}></span> About Me
            </h2>
            <div className={`space-y-4 text-sm md:text-base leading-relaxed ${style.textMuted} whitespace-pre-line`}>
              {bioDetailed}
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-xl ${style.cardBg} transition-all`}>
              <h3 className="text-base font-bold mb-4 flex items-center tracking-tight">
                <Terminal className={`w-4 h-4 mr-2 ${style.text}`} /> Metadata Dossier
              </h3>
              <ul className="space-y-4 text-xs">
                <li className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${style.textMuted}`} />
                  <div>
                    <span className="block font-semibold">Location</span>
                    <span className={style.textMuted}>{socials.location || "San Francisco, CA"}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className={`w-4 h-4 ${style.textMuted}`} />
                  <div>
                    <span className="block font-semibold">Direct Email</span>
                    <span className={style.textMuted}>{socials.email}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Github className={`w-4 h-4 ${style.textMuted}`} />
                  <div>
                    <span className="block font-semibold">GitHub Engine</span>
                    <a href={socials.github} target="_blank" rel="noreferrer" className="underline hover:opacity-80 break-all">{socials.github}</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className={`w-4 h-4 ${style.textMuted}`} />
                  <div>
                    <span className="block font-semibold">LinkedIn Handle</span>
                    <a href={socials.linkedin} target="_blank" rel="noreferrer" className="underline hover:opacity-80 break-all">{socials.linkedin}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="preview-skills" className={`py-16 md:py-20 border-t border-b ${style.divider} ${style.cardBg} w-full transition-colors`}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-2 text-center tracking-tight">Professional Skill Set</h2>
          <p className={`text-xs text-center ${style.textMuted} mb-12`}>Categorized technical competencies & proficiency values</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Frontend Skills List */}
            <div className="space-y-5">
              <h3 className={`text-sm font-bold tracking-wider uppercase mb-2 pb-2 border-b ${style.divider} ${style.text} flex items-center justify-between`}>
                <span>Frontend Dev</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${style.badge}`}>UI</span>
              </h3>
              {skills.filter(s => s.category === "Frontend").map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{skill.name}</span>
                    <span className={style.textMuted}>{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${skill.level}%` }} 
                      transition={{ duration: 1, delay: 0.1 }}
                      className={`h-full ${style.bullet}`} 
                    />
                  </div>
                </div>
              ))}
              {skills.filter(s => s.category === "Frontend").length === 0 && (
                <p className={`text-xs italic ${style.textMuted}`}>No frontend skills initialized.</p>
              )}
            </div>

            {/* Backend Skills List */}
            <div className="space-y-5">
              <h3 className={`text-sm font-bold tracking-wider uppercase mb-2 pb-2 border-b ${style.divider} ${style.text} flex items-center justify-between`}>
                <span>Backend Dev</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${style.badge}`}>Server</span>
              </h3>
              {skills.filter(s => s.category === "Backend").map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{skill.name}</span>
                    <span className={style.textMuted}>{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${skill.level}%` }} 
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${style.bullet}`} 
                    />
                  </div>
                </div>
              ))}
              {skills.filter(s => s.category === "Backend").length === 0 && (
                <p className={`text-xs italic ${style.textMuted}`}>No backend skills initialized.</p>
              )}
            </div>

            {/* Tools/Other Column */}
            <div className="space-y-5">
              <h3 className={`text-sm font-bold tracking-wider uppercase mb-2 pb-2 border-b ${style.divider} ${style.text} flex items-center justify-between`}>
                <span>Tools &amp; Infrastructure</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${style.badge}`}>DevOps</span>
              </h3>
              {skills.filter(s => s.category === "Tools/Other").map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{skill.name}</span>
                    <span className={style.textMuted}>{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${skill.level}%` }} 
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full ${style.bullet}`} 
                    />
                  </div>
                </div>
              ))}
              {skills.filter(s => s.category === "Tools/Other").length === 0 && (
                <p className={`text-xs italic ${style.textMuted}`}>No infrastructure options initialized.</p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Projects Grid Section with Filter animation */}
      <section id="preview-projects" className="py-16 md:py-20 max-w-5xl mx-auto px-6 w-full">
        <h2 className="text-2xl font-bold mb-2 text-center tracking-tight">Featured Projects</h2>
        <p className={`text-xs text-center ${style.textMuted} mb-8`}>Select category filters below to browse build archives.</p>
        
        {/* Dynamic Interactive Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button 
            onClick={() => setActiveFilter("all")} 
            className={`text-xs px-3.5 py-1.5 rounded-full transition-all border ${
              activeFilter === "all" 
                ? style.primaryBtn 
                : `${style.cardBg} ${style.textMuted} border-transparent hover:border-slate-300`
            }`}
          >
            All Tech ({projects.length})
          </button>
          
          {projectCategories.map((cat, i) => (
            <button 
              key={i}
              onClick={() => setActiveFilter(cat)} 
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all border ${
                activeFilter === cat 
                  ? style.primaryBtn 
                  : `${style.cardBg} ${style.textMuted} border-transparent hover:border-slate-300`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, i) => (
              <motion.div 
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-xl flex flex-col justify-between ${style.cardBg}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[10px] uppercase font-semibold px-2.5 py-1 rounded ${style.badge}`}>{proj.projectType}</span>
                    <div className="flex space-x-3 text-sm">
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className={`hover:opacity-75 ${style.text}`}>
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className={`hover:opacity-75 ${style.text}`}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-base font-bold mb-2 tracking-tight">{proj.title}</h3>
                  <p className={`text-xs font-medium mb-3 ${style.textMuted}`}>{proj.shortDescription}</p>
                  <p className={`text-xs leading-relaxed ${style.textMuted} opacity-90 line-clamp-4 mb-4`}>{proj.detailedDescription}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-700/10 dark:border-slate-200/10 mt-auto">
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} className={`text-[9px] font-mono px-2 py-0.5 rounded ${style.pill}`}>{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Experience & Education Timelines */}
      <section id="preview-experience" className={`py-16 md:py-20 border-t border-b ${style.divider} ${style.cardBg} w-full transition-colors`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Experience Column */}
            <div>
              <h3 className="text-lg font-bold mb-8 flex items-center tracking-tight">
                <Briefcase className={`w-5 h-5 mr-3 ${style.text}`} /> Professional Experience
              </h3>
              
              <div className="relative pl-6 border-l-2 border-slate-700/15 dark:border-slate-200/15 space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative group">
                    {/* Ring timeline connector */}
                    <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-transparent transition-colors ring-4 ring-offset-4 ring-offset-current ${style.bullet}`} />
                    
                    <span className={`block text-xs font-semibold mb-1 ${style.accentText}`}>{exp.period}</span>
                    <h4 className="text-sm font-bold tracking-tight">{exp.role}</h4>
                    <span className={`block text-xs font-semibold mb-3 ${style.textMuted}`}>{exp.company}</span>
                    
                    <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${style.bullet}`} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {experience.length === 0 && (
                  <p className={`text-xs italic ${style.textMuted}`}>No business roles defined.</p>
                )}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-lg font-bold mb-8 flex items-center tracking-tight">
                <GraduationCap className={`w-5 h-5 mr-3 ${style.text}`} /> Academic Education
              </h3>
              
              <div className="relative pl-6 border-l-2 border-slate-700/15 dark:border-slate-200/15 space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative">
                    <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-transparent ring-4 ring-offset-4 ring-offset-current ${style.bullet}`} />
                    
                    <span className={`block text-xs font-semibold mb-1 ${style.accentText}`}>{edu.period}</span>
                    <h4 className="text-sm font-bold tracking-tight">{edu.degree}</h4>
                    <p className={`text-xs ${style.textMuted}`}>{edu.institution}</p>
                  </div>
                ))}
                {education.length === 0 && (
                  <p className={`text-xs italic ${style.textMuted}`}>No education history logged.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form Container Section */}
      <section id="preview-contact" className="py-16 md:py-20 max-w-3xl mx-auto px-6 w-full">
        <div className={`p-8 rounded-2xl ${style.cardBg} shadow-md`}>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-center tracking-tight">Initiate Correspondence</h2>
          <p className={`text-xs text-center ${style.textMuted} mb-8`}>Have a proposal, feedback, or job offer? Drop a secure transmission</p>
          
          <AnimatePresence mode="wait">
            {!contactSuccess ? (
              <motion.form 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onSubmit={handleForm} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Recruiter" 
                      required 
                      className={`w-full p-3 text-xs rounded bg-black/5 dark:bg-white/5 border border-transparent focus:border-slate-500 focus:outline-none`} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold">Your Email</label>
                    <input 
                      type="email" 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@agency.com" 
                      required 
                      className={`w-full p-3 text-xs rounded bg-black/5 dark:bg-white/5 border border-transparent focus:border-slate-500 focus:outline-none`} 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold">Message</label>
                  <textarea 
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    rows={4} 
                    placeholder="We loved your FinFlow architecture! Let's arrange a standard screening chat next week..." 
                    required 
                    className={`w-full p-3 text-xs rounded bg-black/5 dark:bg-white/5 border border-transparent focus:border-slate-500 focus:outline-none`} 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={sendingMessage}
                  className={`w-full py-3 rounded text-xs font-semibold flex items-center justify-center gap-2 ${style.primaryBtn}`}
                >
                  {sendingMessage ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      Dispatching Transmission...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Send Secure Inquiry
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="text-center space-y-4 py-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                  <CircleCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold tracking-tight">Transmission Received Successfully!</h3>
                <p className={`text-xs ${style.textMuted} max-w-md mx-auto`}>
                  Excellent. The message was cataloged on our fullstack container database loop. We have processed a live AI auto-reply below!
                </p>

                {generatedAutoReply && (
                  <div className="text-left mt-6 p-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs max-w-lg mx-auto">
                    <span className="block font-bold text-emerald-500 mb-2 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Instantly Generated AI auto-reply:
                    </span>
                    <div className="whitespace-pre-line leading-relaxed italic opacity-95">
                      {generatedAutoReply}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-center ${style.cardBg} ${style.divider} text-xs transition-colors`}>
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href={socials.github} target="_blank" rel="noreferrer" className={`hover:opacity-75 ${style.text}`}><Github className="w-4 h-4" /></a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className={`hover:opacity-75 ${style.text}`}><Linkedin className="w-4 h-4" /></a>
            <a href={socials.twitter} target="_blank" rel="noreferrer" className={`hover:opacity-75 ${style.text}`}><Twitter className="w-4 h-4" /></a>
          </div>
          <p className={style.textMuted}>&copy; 2026 {fullName}. All engineering rights reserved.</p>
          <p className={`text-[10px] ${style.textMuted} opacity-80`}>Prepared utilizing the professional Portfolio Website Builder system</p>
        </div>
      </footer>

    </div>
  );
}

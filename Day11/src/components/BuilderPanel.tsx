import React, { useState } from "react";
import { PortfolioData, ThemeConfig, Skill, Project, ExperienceItem, EducationItem } from "../types";
import { 
  Palette, 
  User, 
  Sparkles, 
  Sliders, 
  Briefcase, 
  GraduationCap, 
  Download, 
  Trash2, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  MessageSquare, 
  Globe,
  Settings,
  Flame,
  Inbox,
  Terminal,
  Eye,
  Menu
} from "lucide-react";

interface BuilderPanelProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  onExport: () => void;
  inboxMessages: Array<{
    id: string;
    senderName: string;
    senderEmail: string;
    senderMessage: string;
    receivedAt: string;
    aiReply: string;
  }>;
}

export default function BuilderPanel({
  data,
  setData,
  theme,
  setTheme,
  onExport,
  inboxMessages
}: BuilderPanelProps) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Expanded section states to keep interface compact and elegant
  const [expandedSection, setExpandedSection] = useState<string>("design");
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const [expandedExpIndex, setExpandedExpIndex] = useState<number | null>(null);

  // New item states
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<"Frontend" | "Backend" | "Tools/Other">("Frontend");
  const [newSkillLevel, setNewSkillLevel] = useState(85);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  // AI Generation Trigger
  const handleAIGeneration = async () => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setAiError(null);

    try {
      const response = await fetch("/api/generate-portfolio-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to parse generation query.");
      }

      // Merge results with existing socials links
      setData(prev => ({
        ...resData,
        socials: prev.socials // Preserve active socials links so they don't get wiped
      }));
      
      setAiPrompt("");
      toggleSection("identity"); // Open identity to verify
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Something went wrong during generation. Please confirm API keys are safe.");
    } finally {
      setGenerating(false);
    }
  };

  // State Updates Helpers
  const updateSocial = (field: keyof PortfolioData["socials"], value: string) => {
    setData(prev => ({
      ...prev,
      socials: { ...prev.socials, [field]: value }
    }));
  };

  const updateIdentity = (field: "fullName" | "title" | "bioHeader" | "bioDetailed", value: string) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Skill manipulations
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel
    };
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    setNewSkillName("");
  };

  const handleRemoveSkill = (index: number) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index)
    }));
  };

  // Project manipulations
  const updateProject = (index: number, field: keyof Project, value: any) => {
    setData(prev => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      return { ...prev, projects: updatedProjects };
    });
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      title: "New Platform Node",
      shortDescription: "A short, fast marketing teaser line.",
      detailedDescription: "A comprehensive description logging architecture specifications, concurrency parameters, and product outcomes designed to solve modern problems.",
      techStack: ["React", "TypeScript", "Node.js"],
      projectType: "Full Stack",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com"
    };
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
    setExpandedProjectIndex(data.projects.length);
  };

  const handleRemoveProject = (index: number) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== index)
    }));
    setExpandedProjectIndex(null);
  };

  // Experience timeline manipulations
  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    setData(prev => {
      const updatedExp = [...prev.experience];
      updatedExp[index] = { ...updatedExp[index], [field]: value };
      return { ...prev, experience: updatedExp };
    });
  };

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      role: "System Software Developer",
      company: "Universal Startups, Inc.",
      period: "2025 - Present",
      achievements: [
        "Crafted robust caching layers driving throughput gains and system latency reduction.",
        "Facilitated modern visual layout updates with robust modular elements."
      ]
    };
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
    setExpandedExpIndex(data.experience.length);
  };

  const handleRemoveExperience = (index: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== index)
    }));
    setExpandedExpIndex(null);
  };

  const addAchievementBullet = (expIndex: number) => {
    setData(prev => {
      const updatedExp = [...prev.experience];
      updatedExp[expIndex].achievements = [...updatedExp[expIndex].achievements, "New metric-driven performance achievement details."];
      return { ...prev, experience: updatedExp };
    });
  };

  const removeAchievementBullet = (expIndex: number, bulletIdx: number) => {
    setData(prev => {
      const updatedExp = [...prev.experience];
      updatedExp[expIndex].achievements = updatedExp[expIndex].achievements.filter((_, idx) => idx !== bulletIdx);
      return { ...prev, experience: updatedExp };
    });
  };

  const updateAchievementBullet = (expIndex: number, bulletIdx: number, value: string) => {
    setData(prev => {
      const updatedExp = [...prev.experience];
      updatedExp[expIndex].achievements[bulletIdx] = value;
      return { ...prev, experience: updatedExp };
    });
  };

  // Education manipulations
  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    setData(prev => {
      const updatedEdu = [...prev.education];
      updatedEdu[index] = { ...updatedEdu[index], [field]: value };
      return { ...prev, education: updatedEdu };
    });
  };

  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      degree: "B.S. in Software Systems",
      institution: "STU University",
      period: "2020 - 2024"
    };
    setData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="w-full bg-[#111218] text-slate-100 border-r border-slate-800 flex flex-col justify-between min-h-screen">
      
      {/* Configuration Header Panel */}
      <div className="p-5 border-b border-slate-800 bg-[#151722] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-[#00ffcc] animate-spin-slow" />
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white uppercase">Portfolio Builder</h2>
            <p className="text-[10px] text-slate-400">Tailwind Preview &bull; Bootstrap Deploy</p>
          </div>
        </div>
        
        <button 
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00ffcc] text-black font-semibold text-xs transition-transform transform active:scale-95 shadow-[0_0_10px_rgba(0,255,204,0.15)] hover:opacity-90"
        >
          <Download className="w-3.5 h-3.5" /> Export HTML
        </button>
      </div>

      {/* Main Accordion Inputs Form */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[calc(100vh-140px)]">

        {/* SECTION: AI Generation Hub */}
        <div className="rounded-lg border border-[#00ffcc]/20 bg-[#161a29]/60 overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("ai-hub")}
            className="w-full p-4 flex justify-between items-center bg-[#191d32] hover:bg-[#1f243d] transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-[#00ffcc] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 animate-pulse" /> Gemini AI Architect
            </span>
            {expandedSection === "ai-hub" ? <ChevronUp className="w-4 h-4 text-[#00ffcc]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          
          {expandedSection === "ai-hub" && (
            <div className="p-4 space-y-3.5 border-t border-[#00ffcc]/10">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Describe who you are or what projects you build. Gemini 3.5 Flash will write custom titles, summaries, skills portfolios, experiences, and project blocks instantly!
              </p>
              
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="E.g., Write me a portfolio for a Rust backend specialist with 4 years in cryptographic infrastructure who loves CLI design and Kubernetes."
                rows={3}
                className="w-full p-3 rounded text-xs bg-slate-900 border border-slate-700 focus:border-[#00ffcc] focus:outline-none placeholder-slate-500 text-slate-200"
              />

              {aiError && (
                <div className="p-2.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] leading-relaxed">
                  {aiError}
                </div>
              )}

              <button 
                type="button"
                onClick={handleAIGeneration}
                disabled={generating || !aiPrompt.trim()}
                className="w-full py-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 bg-[#00ffcc] text-black disabled:bg-slate-700 disabled:text-slate-500 hover:opacity-90 transition-all"
              >
                {generating ? (
                  <>
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full" />
                    Composing structured JSON profiles...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Re-Write Complete Site with AI
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* SECTION: Theme & Aesthetics */}
        <div className="rounded-lg border border-slate-800 bg-[#16171e] overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("design")}
            className="w-full p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-white uppercase tracking-wider">
              <Palette className="w-4 h-4 text-purple-400" /> Style &amp; Visual Themes
            </span>
            {expandedSection === "design" ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === "design" && (
            <div className="p-4 space-y-4 border-t border-slate-800">
              
              {/* Preset selectors */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-400">Design Preset Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "minimal", label: "Clean Minimalist" },
                    { id: "cyber", label: "Cyber Terminal" },
                    { id: "warm", label: "Editorial Sepia" },
                    { id: "dark-cosmic", label: "Cosmic Midnight" },
                    { id: "swiss-modern", label: "Swiss Modernist" }
                  ].map((styleOption) => (
                    <button 
                      key={styleOption.id}
                      onClick={() => setTheme(prev => ({ ...prev, visualStyle: styleOption.id as any }))}
                      className={`p-2 rounded text-left text-xs font-medium border transition-all ${
                        theme.visualStyle === styleOption.id 
                          ? "border-[#00ffcc] bg-[#00ffcc]/10 text-white" 
                          : "border-slate-800 hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      {styleOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font selection */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-400">Typography Pairing</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "Inter", label: "Inter (Classic Sans-S)" },
                    { id: "Space Grotesk", label: "Space Grotesk (Tech)" },
                    { id: "Playfair Display", label: "Playfair (Display Serif)" },
                    { id: "JetBrains Mono", label: "JetBrains Mono" }
                  ].map((fontOption) => (
                    <button 
                      key={fontOption.id}
                      onClick={() => setTheme(prev => ({ ...prev, fontFamily: fontOption.id as any }))}
                      className={`p-2 rounded text-left text-[11px] font-medium border transition-all ${
                        theme.fontFamily === fontOption.id 
                          ? "border-[#00ffcc] bg-[#00ffcc]/10 text-white" 
                          : "border-slate-800 hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      {fontOption.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* SECTION: Identity & Biography */}
        <div className="rounded-lg border border-slate-800 bg-[#16171e] overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("identity")}
            className="w-full p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-white uppercase tracking-wider">
              <User className="w-4 h-4 text-emerald-400" /> Identity &amp; Bio
            </span>
            {expandedSection === "identity" ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === "identity" && (
            <div className="p-4 space-y-3.5 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={data.fullName}
                    onChange={(e) => updateIdentity("fullName", e.target.value)}
                    className="w-full p-2.5 rounded text-xs bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold uppercase">Professional Title</label>
                  <input 
                    type="text" 
                    value={data.title}
                    onChange={(e) => updateIdentity("title", e.target.value)}
                    className="w-full p-2.5 rounded text-xs bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-semibold uppercase">Hero Hook Tagline</label>
                <input 
                  type="text" 
                  value={data.bioHeader}
                  onChange={(e) => updateIdentity("bioHeader", e.target.value)}
                  className="w-full p-2.5 rounded text-xs bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-semibold uppercase">Detailed Bio Description</label>
                <textarea 
                  value={data.bioDetailed}
                  onChange={(e) => updateIdentity("bioDetailed", e.target.value)}
                  rows={4}
                  className="w-full p-2.5 rounded text-xs bg-slate-900 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="pt-2 border-t border-slate-800/60 pb-1">
                <h4 className="text-[10px] uppercase text-slate-400 font-bold mb-3 tracking-wide">Social Connect Profiles</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400">Email Address</label>
                    <input 
                      type="email" 
                      value={data.socials.email}
                      onChange={(e) => updateSocial("email", e.target.value)}
                      className="w-full p-2 rounded text-[11px] bg-slate-900 border border-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400">Location Base</label>
                    <input 
                      type="text" 
                      value={data.socials.location}
                      onChange={(e) => updateSocial("location", e.target.value)}
                      className="w-full p-2 rounded text-[11px] bg-slate-900 border border-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400">GitHub Url</label>
                    <input 
                      type="text" 
                      value={data.socials.github}
                      onChange={(e) => updateSocial("github", e.target.value)}
                      className="w-full p-2 rounded text-[11px] bg-slate-900 border border-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400">LinkedIn Url</label>
                    <input 
                      type="text" 
                      value={data.socials.linkedin}
                      onChange={(e) => updateSocial("linkedin", e.target.value)}
                      className="w-full p-2 rounded text-[11px] bg-slate-900 border border-slate-800"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* SECTION: Skills matrix */}
        <div className="rounded-lg border border-slate-800 bg-[#16171e] overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("skills")}
            className="w-full p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-white uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-cyan-400" /> Technical Skills
            </span>
            {expandedSection === "skills" ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === "skills" && (
            <div className="p-4 space-y-4 border-t border-slate-800">
              
              {/* List of current skills */}
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {data.skills.map((skill, index) => (
                  <div key={index} className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white truncate">{skill.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{skill.category}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={skill.level}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setData(prev => {
                            const updated = [...prev.skills];
                            updated[index] = { ...updated[index], level: val };
                            return { ...prev, skills: updated };
                          });
                        }}
                        className="w-full accent-[#00ffcc] h-1 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(index)}
                      className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add skill widget */}
              <div className="pt-3 border-t border-slate-800/60 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Initialize New Competency</span>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="E.g., Docker"
                    className="p-2 rounded text-xs bg-slate-900 border border-slate-800 text-white"
                  />
                  <select 
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="p-2 rounded text-xs bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="Frontend">Frontend Dev</option>
                    <option value="Backend">Backend Dev</option>
                    <option value="Tools/Other">Tools/DevOps</option>
                  </select>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Level:</span>
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                      className="flex-1 accent-[#00ffcc]"
                    />
                    <span className="text-xs font-bold font-mono text-[#00ffcc] w-8 text-right">{newSkillLevel}%</span>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 rounded bg-slate-800 text-[#00ffcc] hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* SECTION: Projects Management */}
        <div className="rounded-lg border border-slate-800 bg-[#16171e] overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("projects")}
            className="w-full p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-white uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-teal-400" /> Projects Portfolio ({data.projects.length})
            </span>
            {expandedSection === "projects" ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === "projects" && (
            <div className="p-4 space-y-4 border-t border-slate-800">
              
              {/* Project Accordions */}
              <div className="space-y-2.5">
                {data.projects.map((proj, idx) => (
                  <div key={proj.id} className="rounded border border-slate-800 bg-slate-900/40 overflow-hidden">
                    <button 
                      type="button"
                      onClick={() => setExpandedProjectIndex(expandedProjectIndex === idx ? null : idx)}
                      className="w-full p-3 flex justify-between items-center hover:bg-slate-800/40 text-xs font-bold transition-colors"
                    >
                      <span className="truncate pr-4 text-white">{proj.title || "Untitled Project"}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{proj.projectType}</span>
                        {expandedProjectIndex === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {expandedProjectIndex === idx && (
                      <div className="p-3 border-t border-slate-800 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-semibold">Title</label>
                            <input 
                              type="text" 
                              value={proj.title}
                              onChange={(e) => updateProject(idx, "title", e.target.value)}
                              className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-semibold">Category Type</label>
                            <input 
                              type="text" 
                              value={proj.projectType}
                              onChange={(e) => updateProject(idx, "projectType", e.target.value)}
                              className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-semibold">Short Description (Snippet)</label>
                          <input 
                            type="text" 
                            value={proj.shortDescription}
                            onChange={(e) => updateProject(idx, "shortDescription", e.target.value)}
                            className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-semibold">Detailed Architectural Bio</label>
                          <textarea 
                            value={proj.detailedDescription}
                            onChange={(e) => updateProject(idx, "detailedDescription", e.target.value)}
                            rows={3}
                            className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800 text-slate-200"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-semibold">Technologies (Comma separated)</label>
                          <input 
                            type="text" 
                            value={proj.techStack.join(", ")}
                            onChange={(e) => {
                              const arr = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                              updateProject(idx, "techStack", arr);
                            }}
                            className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase">GitHub Repo</label>
                            <input 
                              type="text" 
                              value={proj.githubUrl}
                              onChange={(e) => updateProject(idx, "githubUrl", e.target.value)}
                              className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400">Live URL</label>
                            <input 
                              type="text" 
                              value={proj.liveUrl}
                              onChange={(e) => updateProject(idx, "liveUrl", e.target.value)}
                              className="w-full p-2 rounded text-xs bg-[#111218] border border-slate-800"
                            />
                          </div>
                        </div>

                        <div className="text-right">
                          <button 
                            type="button"
                            onClick={() => handleRemoveProject(idx)}
                            className="text-[10px] px-2 py-1 bg-rose-500/10 text-rose-400 rounded hover:bg-rose-500/20 flex items-center gap-1.5 ml-auto"
                          >
                            <Trash2 className="w-3 h-3" /> Delete Project
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button 
                type="button"
                onClick={handleAddProject}
                className="w-full py-2 border border-dashed border-slate-700 rounded text-xs text-[#00ffcc] hover:bg-slate-800/40 font-semibold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Custom Project Block
              </button>

            </div>
          )}
        </div>

        {/* SECTION: History Timelines (Education & Experience) */}
        <div className="rounded-lg border border-slate-800 bg-[#16171e] overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("timelines")}
            className="w-full p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-white uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-orange-400" /> Career &amp; Academy Base
            </span>
            {expandedSection === "timelines" ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === "timelines" && (
            <div className="p-4 space-y-4 border-t border-slate-800">
              
              {/* Business experience */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Work Roles Portfolio</span>
                
                <div className="space-y-2.5">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="p-3 rounded bg-slate-900/60 border border-slate-800 text-xs space-y-3">
                      <div className="flex justify-between items-center font-bold text-white">
                        <span className="truncate">{exp.role} @ {exp.company}</span>
                        <button type="button" onClick={() => handleRemoveExperience(idx)} className="text-rose-400 hover:opacity-70">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <input 
                            type="text" 
                            value={exp.role} 
                            onChange={(e) => updateExperience(idx, "role", e.target.value)}
                            placeholder="Role Title"
                            className="w-full p-1.5 rounded text-[11px] bg-[#111218] border border-slate-800"
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={exp.period} 
                            onChange={(e) => updateExperience(idx, "period", e.target.value)}
                            placeholder="2024 - Pres"
                            className="w-full p-1.5 rounded text-[11px] bg-[#111218] border border-slate-800"
                          />
                        </div>
                      </div>

                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => updateExperience(idx, "company", e.target.value)}
                        placeholder="Company Name"
                        className="w-full p-1.5 rounded text-[11px] bg-[#111218] border border-slate-800"
                      />

                      {/* Bullet achievements list */}
                      <div className="space-y-1.5 pt-1.5 border-t border-slate-800">
                        <span className="text-[9px] text-slate-400 uppercase font-semibold">Achievements (Bullet Points)</span>
                        {exp.achievements.map((ach, bIdx) => (
                          <div key={bIdx} className="flex gap-1.5 items-center">
                            <input 
                              type="text" 
                              value={ach} 
                              onChange={(e) => updateAchievementBullet(idx, bIdx, e.target.value)}
                              className="flex-1 p-1 rounded text-[10px] bg-[#111218] border border-slate-850"
                            />
                            <button type="button" onClick={() => removeAchievementBullet(idx, bIdx)} className="text-rose-400 opacity-60 hover:opacity-100">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button" 
                          onClick={() => addAchievementBullet(idx)}
                          className="text-[9px] text-[#00ffcc] font-semibold hover:underline flex items-center gap-0.5 mt-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Achievement Bullet
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={handleAddExperience}
                  className="w-full py-1.5 border border-dashed border-slate-800 rounded text-[11px] text-[#00ffcc] hover:bg-slate-900/40 font-medium"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Business Role
                </button>
              </div>

              {/* Academic experiences */}
              <div className="space-y-3 pt-3 border-t border-slate-800/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Education timelines</span>
                
                <div className="space-y-2">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between items-center font-semibold text-white">
                        <span>{edu.degree}</span>
                        <button type="button" onClick={() => handleRemoveEducation(idx)} className="text-rose-400 hover:opacity-75">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input 
                          type="text" 
                          value={edu.degree}
                          onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                          placeholder="Degree"
                          className="col-span-2 p-1.5 rounded text-[11px] bg-[#111218] border border-slate-800"
                        />
                        <input 
                          type="text" 
                          value={edu.period}
                          onChange={(e) => updateEducation(idx, "period", e.target.value)}
                          placeholder="Period"
                          className="p-1.5 rounded text-[11px] bg-[#111218] border border-slate-800"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={edu.institution}
                        onChange={(e) => updateEducation(idx, "institution", e.target.value)}
                        placeholder="University/College"
                        className="w-full p-1.5 rounded text-[11px] bg-[#111218] border border-slate-800"
                      />
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={handleAddEducation}
                  className="w-full py-1.5 border border-dashed border-slate-800 rounded text-[11px] text-[#00ffcc] hover:bg-slate-900/40 font-medium"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Education
                </button>
              </div>

            </div>
          )}
        </div>

        {/* SECTION: Recruiter Inbox Logger */}
        <div className="rounded-lg border border-slate-800 bg-[#16171e] overflow-hidden">
          <button 
            type="button"
            onClick={() => toggleSection("inbox")}
            className="w-full p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center text-xs font-bold gap-2 text-white uppercase tracking-wider">
              <Inbox className="w-4 h-4 text-emerald-400" /> Recruiter Inbox logs ({inboxMessages.length})
            </span>
            {expandedSection === "inbox" ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === "inbox" && (
            <div className="p-4 space-y-3.5 border-t border-slate-800">
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Whenever anyone types a contact query from the preview panel on the right, it loops onto our server and triggers an instant AI mail auto-reply, logged on screen for debugging and evaluation!
              </p>
              
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {inboxMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded border border-emerald-500/10 bg-emerald-500/[0.02] text-xs space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-slate-200">{msg.senderName} ({msg.senderEmail})</span>
                      <span>{msg.receivedAt}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic p-2 rounded bg-slate-950 font-mono">
                      "{msg.senderMessage}"
                    </p>
                    <div className="p-2.5 rounded bg-[#0b0c10] border border-[#ff007f]/10 text-[#00ffcc]">
                      <span className="font-bold block text-[9px] uppercase tracking-wider text-[#ff007f] mb-1">
                        AI Generated Auto-responder:
                      </span>
                      <p className="text-[10px] italic whitespace-pre-line leading-relaxed text-slate-200 font-mono">
                        {msg.aiReply}
                      </p>
                    </div>
                  </div>
                ))}
                {inboxMessages.length === 0 && (
                  <div className="text-center py-6 text-slate-500 italic text-xs">
                    No correspondence dispatched yet. Try writing a message in the right-side preview contact form!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer export notice */}
      <div className="p-5 border-t border-slate-800 bg-[#0e0f14] text-center text-[10px] text-slate-500 leading-relaxed">
        Exported code includes Bootstrap 5, FontAwesome, filter scripts, and forms. Fully verified.
      </div>

    </div>
  );
}

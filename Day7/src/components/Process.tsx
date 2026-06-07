import { useState } from 'react';
import { ClipboardList, Brush, Code, Globe, ShieldCheck, Search, Database, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { processSteps, ProcessStep } from '../data';

export default function Process() {
  const [activeStepId, setActiveStepId] = useState<string>('proc-1');

  const getStepIcon = (name: string, isActive: boolean) => {
    const iconClass = `h-6 w-6 transition-colors ${isActive ? 'text-white' : 'text-indigo-400'}`;
    switch (name) {
      case 'ClipboardList':
        return <ClipboardList className={iconClass} />;
      case 'Brush':
        return <Brush className={iconClass} />;
      case 'CodeXml':
        return <Code className={iconClass} />;
      case 'Globe':
        return <Globe className={iconClass} />;
      default:
        return <ClipboardList className={iconClass} />;
    }
  };

  // Custom step simulation data
  const getStepSimulation = (id: string) => {
    switch (id) {
      case 'proc-1':
        return {
          title: 'Immersive Research Labs',
          badge: 'Phase 01',
          metric: 'Sprint Duration: 3 Days',
          highlights: [
            { icon: <Search className="h-4 w-4 text-indigo-400" />, label: 'Competitive Landscape Analysis' },
            { icon: <Sparkles className="h-4 w-4 text-indigo-400" />, label: 'User Persona Mapping & Flow charts' },
            { icon: <Database className="h-4 w-4 text-indigo-400" />, label: 'Content Auditing & Schema Outline' },
          ],
          previewType: 'research',
        };
      case 'proc-2':
        return {
          title: 'Interactive Spatial Wireframing',
          badge: 'Phase 02',
          metric: 'Sprint Duration: 5 Days',
          highlights: [
            { icon: <Search className="h-4 w-4 text-pink-400" />, label: 'Bento Grid Structural Planning' },
            { icon: <Sparkles className="h-4 w-4 text-pink-400" />, label: 'Color Contrast & Typography Pairing' },
            { icon: <Database className="h-4 w-4 text-pink-400" />, label: 'Clickable Micro-interaction Prototypes' },
          ],
          previewType: 'prototype',
        };
      case 'proc-3':
        return {
          title: 'Clean Modular Code Engineering',
          badge: 'Phase 03',
          metric: 'Sprint Duration: 10 Days',
          highlights: [
            { icon: <Search className="h-4 w-4 text-indigo-400" />, label: 'TypeScript Interfaces & Strict Typing' },
            { icon: <Sparkles className="h-4 w-4 text-indigo-400" />, label: 'Tailwind CSS Custom Config Mapping' },
            { icon: <Database className="h-4 w-4 text-indigo-400" />, label: 'Motion Orchestrated Transitions' },
          ],
          previewType: 'code',
        };
      case 'proc-4':
        return {
          title: 'Fast Grid Cloud Deployment',
          badge: 'Phase 04',
          metric: 'Sprint Duration: 2 Days',
          highlights: [
            { icon: <Search className="h-4 w-4 text-emerald-400" />, label: 'Vite Static Compiler Optimization' },
            { icon: <Sparkles className="h-4 w-4 text-emerald-400" />, label: 'Automated SEO Tag Deployments' },
            { icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, label: 'SSL certifications & DNS mapping' },
          ],
          previewType: 'cloud',
        };
      default:
        return {
          title: 'Research',
          badge: 'Phase 01',
          metric: 'Sprint Duration: 1 Day',
          highlights: [],
          previewType: 'research',
        };
    }
  };

  const simInfo = getStepSimulation(activeStepId);

  return (
    <section id="how-we-work" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient indicators */}
      <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* Section Heading Tagline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#a5b4fc] font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-400/20 inline-block">
            Our Blueprint Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
            How We Work
          </h2>
          <p className="text-[#94a3b8] font-sans leading-relaxed text-sm sm:text-base">
            A precise, structured 4-step framework formulated to transition bold creative ideas
            from wireframe design assets to blazing fast responsive web code.
          </p>
        </div>

        {/* Process content: Left Steps Menu, Right Interactive Simulation Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Steps Menu list */}
          <div className="lg:col-span-5 space-y-4 flex flex-col">
            {processSteps.map((step) => {
              const isActive = activeStepId === step.id;
              return (
                <div
                  key={step.id}
                  id={`process-bar-${step.id}`}
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex items-center gap-5 p-5 rounded-2xl border transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-600/5 translate-x-2'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700/60 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Circle indicating process index */}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-colors ${
                    isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {getStepIcon(step.iconName, isActive)}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-xs font-bold font-mono tracking-widest">
                        PHASE {step.stepNumber}
                      </span>
                    </div>
                    <h3 className={`text-base font-sans font-extrabold tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Simulated Screen based on active phase */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]"
              >
                {/* Visual glow backdrop inside screen */}
                <div className="absolute -inset-10 bg-indigo-500/5 blur-3xl opacity-50 rounded-full" />

                {/* Top Simulation Header */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md text-[10px] uppercase font-bold tracking-wide">
                      {simInfo.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-bold font-mono">{simInfo.metric}</span>
                  </div>
                  <div className="h-2.5 w-2.5 bg-indigo-500 rounded-full animate-pulse" />
                </div>

                {/* Core Simulation Content display area */}
                <div className="my-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1">
                  
                  {/* Text columns */}
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                      {simInfo.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans font-medium">
                      {processSteps.find((s) => s.id === activeStepId)?.description}
                    </p>

                    {/* Simulation highlights */}
                    <div className="space-y-2 pt-2">
                      {simInfo.highlights.map((hlt, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                          {hlt.icon}
                          <span>{hlt.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic columns representing simulated interface */}
                  <div className="md:col-span-5 flex justify-center">
                    {simInfo.previewType === 'research' && (
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 w-full max-w-[200px] space-y-3 font-mono text-[9px] text-[#94a3b8]">
                        <span className="text-indigo-400 block font-bold">RESEARCH_LOG:</span>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span>Target Aud:</span> <span className="text-white">GenZ</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span>Focus USP:</span> <span className="text-white">Speed</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span>Uptime Sl:</span> <span className="text-white">99.9%</span>
                        </div>
                      </div>
                    )}

                    {simInfo.previewType === 'prototype' && (
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 w-full max-w-[200px] space-y-2 text-[9px]">
                        <span className="text-pink-400 block font-extrabold uppercase font-mono">Bento Grids:</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          <div className="h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-slate-500">CTA</div>
                          <div className="h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-indigo-500">Chart</div>
                          <div className="h-10 col-span-2 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-slate-400">Services Grid</div>
                        </div>
                      </div>
                    )}

                    {simInfo.previewType === 'code' && (
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 w-full max-w-[200px] space-y-1.5 font-mono text-[8px] text-slate-400">
                        <span className="text-[#a5b4fc] block font-bold font-mono">import React from 'react';</span>
                        <span className="text-[#a5b4fc] block font-bold font-mono">interface CustomProps &#123;</span>
                        <span className="text-[#cbd5e1] block ml-2">isActive: boolean;</span>
                        <span className="text-indigo-400 block">&#125;</span>
                        <span className="text-emerald-400 block">const App = () =&gt; &#123; ... &#125;;</span>
                      </div>
                    )}

                    {simInfo.previewType === 'cloud' && (
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 w-full max-w-[200px] space-y-3 text-center text-[9px]">
                        <span className="text-emerald-400 block font-bold font-mono">SERVER STATUS</span>
                        <div className="h-6 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center font-bold tracking-wider mx-auto">
                          LIVE
                        </div>
                        <span className="text-slate-500 font-mono text-[8px] block">Latency: 14ms</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Step Wizard Footer */}
                <div className="bg-slate-950/40 border-t border-slate-800 -mx-8 -mb-8 p-4 text-center">
                  <span className="text-xs text-slate-500 font-semibold">
                    Click steps on the left to review deliverables
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

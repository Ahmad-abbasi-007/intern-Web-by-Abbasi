import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Award, Coffee, Smile, Layers, Activity } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { statsData } from '../data';

export default function AboutDetail() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Custom hook-like timer counting up stats dynamically
  const [animatedStats, setAnimatedStats] = useState(
    statsData.map((stat) => ({ ...stat, currentVal: 0 }))
  );

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // Counter animation over 2 seconds
      const steps = 50;
      const stepDuration = duration / steps;
      let stepCount = 0;

      const timer = setInterval(() => {
        stepCount++;
        setAnimatedStats((prevStats) =>
          prevStats.map((stat) => {
            const target = stat.value;
            const inc = Math.ceil((target / steps) * stepCount);
            return {
              ...stat,
              currentVal: inc > target ? target : inc,
            };
          })
        );

        if (stepCount >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const skills = [
    { name: 'Interface Wireframing & Design', level: 90, color: 'bg-indigo-500' },
    { name: 'High-Performance Development', level: 85, color: 'bg-indigo-400' },
    { name: 'System SEO & Performance Metrics', level: 75, color: 'bg-emerald-500' },
  ];

  const valuePoints = [
    {
      title: 'Easy-to-use Interface',
      desc: 'Seamless drag and drop options allowing teams to build faster without design bottlenecks.',
    },
    {
      title: 'Lightning Uptime Speed',
      desc: 'Engineered from the ground up to bundle static elements cleanly, leading to instant rendering.',
    },
    {
      title: 'SEO & Meta Standardized',
      desc: 'Fully indexable structures that search engines crawl and highlight instantly.',
    },
  ];

  const getStatIcon = (id: string) => {
    switch (id) {
      case 'stat-projects':
        return <Layers className="h-6 w-6 text-indigo-400" />;
      case 'stat-clients':
        return <Smile className="h-6 w-6 text-indigo-400" />;
      case 'stat-coffee':
        return <Coffee className="h-6 w-6 text-indigo-400" />;
      case 'stat-awards':
        return <Award className="h-6 w-6 text-indigo-400" />;
      default:
        return <Activity className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-[30%] left-[-10%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Core Detail Grid Info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Skill list and visual stats layout */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#a5b4fc] font-bold">
                Platform Quality & Standards
              </span>
              <h3 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Empowering individuals with modern startup ideas.
              </h3>
              <p className="text-[#94a3b8] font-sans leading-relaxed text-sm sm:text-base">
                We bridge the gap between creative wireframes and lightning-fast web deployments.
                Our structural framework operates with deep container logic, giving you robust power to orchestrate conversion flows.
              </p>
            </div>

            {/* Dynamic Skills bar */}
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#e2e8f0]">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`h-full ${skill.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Value checklist with key items */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-5">
              {valuePoints.map((pt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/20 hover:bg-slate-900/60 transition-all group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 group-hover:text-[#a5b4fc] transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-sans font-semibold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                      {pt.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic counting Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-900">
          {animatedStats.map((stat) => (
            <div
              key={stat.id}
              id={stat.id}
              className="bg-slate-900/40 border border-slate-800/70 p-6 rounded-2xl flex flex-col justify-between items-center text-center space-y-4 hover:border-indigo-500/20 hover:bg-slate-900/60 transition-all cursor-default"
            >
              {/* Rounded icon box */}
              <div className="h-12 w-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
                {getStatIcon(stat.id)}
              </div>
              
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight block font-mono">
                  {stat.currentVal.toLocaleString()}
                  {stat.suffix}
                </span>
                <span className="text-xs text-slate-500 font-bold block uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

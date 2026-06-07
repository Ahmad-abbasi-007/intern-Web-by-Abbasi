import { useState } from 'react';
import { Play, ArrowRight, X, TrendingUp, Users, CheckCircle2, CloudLightning } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onLearnMore: (sectionId: string) => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(15);
  const [dashFilter, setDashFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Mini Chart data simulation
  const chartPoints = {
    daily: [20, 45, 28, 60, 42, 85],
    weekly: [120, 240, 180, 310, 290, 420],
    monthly: [850, 1200, 950, 1500, 1400, 1920],
  };

  const currentPoints = chartPoints[dashFilter];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 bg-slate-950 flex items-center overflow-hidden"
    >
      {/* Background abstract gradients matching Colorlib Startup2 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[100px]" />
        
        {/* Fine grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415511_1px,transparent_1px),linear-gradient(to_bottom,#33415511_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Rich Typography and Copy */}
        <div className="lg:col-span-7 space-y-8 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-xs font-semibold tracking-wide"
          >
            <CloudLightning className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            Empowering Modern Startups
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.15]"
          >
            Startup you can build a website online using the{' '}
            <span className="text-indigo-400 bg-clip-text">Bootstrap builder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 font-sans leading-relaxed max-w-2xl"
          >
            Design, deploy, and scale majestic digital storefronts and robust service platforms.
            Trusted by active founders to establish high-fidelity, high-conversion visual architectures.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              id="hero-btn-start"
              onClick={() => onLearnMore('contact')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all cursor-pointer flex items-center gap-2 group transform hover:-translate-y-0.5"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              id="hero-btn-video"
              onClick={() => setIsVideoOpen(true)}
              className="px-6 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-medium rounded-full cursor-pointer hover:bg-slate-800/80 transition-all flex items-center gap-3.5 group"
            >
              <span className="flex items-center justify-center h-10 w-10 bg-indigo-600/10 text-indigo-400 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Play className="h-4.5 w-4.5 fill-current ml-0.5" />
              </span>
              Watch Video
            </button>
          </motion.div>

          {/* Core Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-900 w-full"
          >
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white tracking-tight">99.9%</span>
              <span className="text-xs text-slate-500 font-medium">Core Platform Uptime</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-indigo-400 tracking-tight">10k+</span>
              <span className="text-xs text-slate-500 font-medium">Builders Launched</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white tracking-tight">4.9/5</span>
              <span className="text-xs text-slate-500 font-medium">User Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High-Fidelity Floating Dashboard Artifact mock */}
        <div className="lg:col-span-5 relative mt-10 lg:mt-0 flex justify-center w-full">
          {/* Decorative glowing backplate */}
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-3xl" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
            className="w-full max-w-[440px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-red-500 rounded-full" />
                <span className="h-3 w-3 bg-yellow-500 rounded-full" />
                <span className="h-3 w-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-xs font-mono text-slate-500">studio_live_deployment.json</span>
              <div className="flex gap-1.5">
                {(['daily', 'weekly', 'monthly'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDashFilter(filter)}
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded cursor-pointer ${
                      dashFilter === filter
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard details */}
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Total Revenue Generated</span>
                  <span className="text-2xl font-bold text-white tracking-tight">
                    {dashFilter === 'daily' ? '$4,815' : dashFilter === 'weekly' ? '$34,920' : '$142,650'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +12.4%
                </div>
              </div>

              {/* Sparkline chart path based on dynamic state */}
              <div className="h-28 flex items-end gap-1.5 pt-2 border-b border-slate-800 pb-2">
                {currentPoints.map((val, idx) => {
                  const maxVal = Math.max(...currentPoints);
                  const heightPercent = `${(val / maxVal) * 80 + 10}%`;
                  return (
                    <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full group/bar cursor-pointer">
                      <div className="text-[9px] font-mono font-bold text-indigo-400 mb-1 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                        {val}
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: heightPercent }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-t-sm transition-colors relative"
                      >
                        {/* Glow on hover */}
                        <div className="absolute inset-0 bg-indigo-400 blur-sm opacity-0 group-hover/bar:opacity-40 transition-opacity" />
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Status checklist metrics */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">CONVERSIONS</span>
                    <span className="text-sm font-bold text-white font-mono">2,852</span>
                  </div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">INTEGRATIONS</span>
                    <span className="text-sm font-bold text-white font-mono">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom active tag */}
            <div className="bg-indigo-900/10 border-t border-indigo-900/30 -mx-6 -mb-6 p-4 flex items-center justify-between text-xs text-indigo-300">
              <span className="font-medium">Vite Server running perfectly</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Demo Modal popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                id="close-video-modal"
                onClick={() => {
                  setIsVideoOpen(false);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full z-10 cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Interface Player Mockup */}
              <div className="aspect-video bg-slate-950 flex flex-col justify-between p-6 relative group overflow-hidden">
                {/* Simulated Playing Geometric Screen */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-950/20" />
                  {isPlaying ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Interactive audio abstract waves */}
                      <div className="flex items-end gap-1 px-8 py-4 bg-slate-900/60 backdrop-blur-sm rounded-xl">
                        {[1, 2, 3, 4, 5, 4, 3, 2, 5, 6, 2, 4, 5, 2, 3].map((val, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ height: [12, val * 8, 12] }}
                            transition={{
                              duration: 0.6 + idx * 0.05,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="w-1.5 bg-indigo-400 rounded-full h-3"
                          />
                        ))}
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="text-xl font-bold text-white tracking-widest block font-sans">
                          DEMO IN PROGRESS
                        </span>
                        <span className="text-xs text-indigo-300 block mt-1 tracking-wider animate-pulse">
                          STREAMING WORKSPACE METRICS
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      id="video-player-trigger"
                      onClick={() => setIsPlaying(true)}
                      className="h-20 w-20 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 rounded-full text-white cursor-pointer transition-all shadow-xl shadow-indigo-600/35 hover:scale-105"
                    >
                      <Play className="h-8 w-8 ml-1.5 fill-current" />
                    </button>
                  )}
                </div>

                {/* Player Bottom Bar Controls overlay */}
                <div className="relative z-10 w-full mt-auto bg-slate-900/85 backdrop-blur px-5 py-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-6">
                  <button
                    id="video-play-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-indigo-400 transition-colors text-sm font-semibold cursor-pointer"
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>

                  {/* Progress Line */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = Math.round((clickX / rect.width) * 100);
                      setVideoProgress(percentage);
                    }}
                    className="flex-1 h-1.5 bg-slate-800 rounded-full relative cursor-pointer group"
                  >
                    <div
                      className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full"
                      style={{ width: `${videoProgress}%` }}
                    />
                    <div
                      className="absolute h-3 w-3 bg-white rounded-full shadow border border-indigo-600 -translate-y-1/4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `calc(${videoProgress}% - 6px)` }}
                    />
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {`0:${videoProgress < 10 ? '0' : ''}${videoProgress} / 1:30`}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

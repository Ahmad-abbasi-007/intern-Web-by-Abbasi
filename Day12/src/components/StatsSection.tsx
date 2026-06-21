/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Todo } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Award,
  Zap
} from 'lucide-react';

interface StatsSectionProps {
  todos: Todo[];
}

export default function StatsSection({ todos }: StatsSectionProps) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Breakdown of priority for active tasks
  const highPriorityActive = todos.filter(t => !t.completed && t.priority === 'high').length;
  const mediumPriorityActive = todos.filter(t => !t.completed && t.priority === 'medium').length;
  const lowPriorityActive = todos.filter(t => !t.completed && t.priority === 'low').length;

  // Get dynamic motivation message
  const getMotivation = (pt: number, tot: number) => {
    if (tot === 0) return { title: 'Create your first task', desc: "Focus starts with writing it down." };
    if (pt === 100) return { title: 'Excellent work!', desc: "You have completed all objectives for now! 🎉" };
    if (pt >= 70) return { title: 'Almost there!', desc: "Brilliant progress, keep pushing to the finish line!" };
    if (pt >= 40) return { title: 'In the zone', desc: "Halfway through! Your focus is paying off." };
    if (pt > 0) return { title: 'Great start!', desc: "Keep that momentum going, one task at a time." };
    return { title: 'Fresh slate', desc: "Ready to conquer your goals today?" };
  };

  const motivation = getMotivation(percent, total);

  return (
    <div id="stats-dashboard" className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Percentage Completion Card */}
      <div 
        id="completion-progress-card" 
        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-400">Completion</span>
          <span className="text-2xl font-display font-bold text-slate-800">{percent}%</span>
        </div>
        
        {/* Animated Progress Bar Container */}
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
          <motion.div 
            className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ActivityIcon percent={percent} />
          <span>{motivation.desc}</span>
        </div>
      </div>

      {/* Numerical Quick Stats Card */}
      <div 
        id="numerical-metrics-card" 
        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs grid grid-cols-2 gap-4"
      >
        <div id="stats-pending" className="flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-mono font-medium tracking-wider uppercase">Pending</span>
          </div>
          <div>
            <span className="text-3xl font-display font-semibold text-slate-800">{pending}</span>
            <span className="text-xs text-slate-400 ml-1">tasks</span>
          </div>
        </div>

        <div id="stats-completed" className="flex flex-col justify-between border-l border-slate-100 pl-4">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-mono font-medium tracking-wider uppercase">Completed</span>
          </div>
          <div>
            <span className="text-3xl font-display font-semibold text-slate-800">{completed}</span>
            <span className="text-xs text-slate-400 ml-1">of {total}</span>
          </div>
        </div>
      </div>

      {/* Focus & Priority Heatmap Card */}
      <div 
        id="urgency-heatmap-card" 
        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
      >
        <div className="flex items-center gap-1.5 text-slate-400 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
          <span className="text-xs font-mono font-medium tracking-wider uppercase">Active Latency Breakdown</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {/* High Priority Pill */}
          <div className="bg-rose-50/50 border border-rose-100/50 rounded-xl p-2.5 text-center">
            <div className="text-xs text-rose-500 font-medium mb-1 flex items-center justify-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              High
            </div>
            <span className="text-lg font-display font-bold text-rose-700">{highPriorityActive}</span>
          </div>

          {/* Medium Priority Pill */}
          <div className="bg-amber-50/50 border border-amber-100/50 rounded-xl p-2.5 text-center">
            <div className="text-xs text-amber-600 font-medium mb-1 flex items-center justify-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Med
            </div>
            <span className="text-lg font-display font-bold text-amber-700">{mediumPriorityActive}</span>
          </div>

          {/* Low Priority Pill */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
            <div className="text-xs text-slate-500 font-medium mb-1 flex items-center justify-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Low
            </div>
            <span className="text-lg font-display font-bold text-slate-700">{lowPriorityActive}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityIcon({ percent }: { percent: number }) {
  if (percent === 100) return <Award className="w-4 h-4 text-amber-500 shrink-0" />;
  if (percent >= 50) return <Zap className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (percent > 0) return <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />;
  return <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />;
}

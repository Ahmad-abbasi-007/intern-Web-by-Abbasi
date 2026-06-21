/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Todo, Priority } from './types';

export const DEFAULT_CATEGORIES = [
  { name: 'Work', bg: 'bg-indigo-50/80', text: 'text-indigo-700', border: 'border-indigo-100', dot: 'bg-indigo-500' },
  { name: 'Personal', bg: 'bg-fuchsia-50/80', text: 'text-fuchsia-700', border: 'border-fuchsia-100', dot: 'bg-fuchsia-500' },
  { name: 'Shopping', bg: 'bg-amber-50/80', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-500' },
  { name: 'Health', bg: 'bg-emerald-50/80', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500' },
  { name: 'Finance', bg: 'bg-rose-50/80', text: 'text-rose-700', border: 'border-rose-100', dot: 'bg-rose-500' },
];

export function getCategoryStyle(categoryName: string) {
  const normalized = categoryName.trim().toLowerCase();
  const matched = DEFAULT_CATEGORIES.find(c => c.name.toLowerCase() === normalized);
  if (matched) return matched;
  
  // Return deterministic styling for custom categories based on string hashing
  const customColors = [
    { bg: 'bg-blue-50/80', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-500' },
    { bg: 'bg-cyan-50/80', text: 'text-cyan-700', border: 'border-cyan-100', dot: 'bg-cyan-500' },
    { bg: 'bg-teal-50/80', text: 'text-teal-700', border: 'border-teal-100', dot: 'bg-teal-500' },
    { bg: 'bg-orange-50/80', text: 'text-orange-700', border: 'border-orange-100', dot: 'bg-orange-500' },
    { bg: 'bg-violet-50/80', text: 'text-violet-700', border: 'border-violet-100', dot: 'bg-violet-500' },
  ];
  
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % customColors.length;
  return {
    name: categoryName,
    ...customColors[index]
  };
}

export function getPriorityStyle(priority: Priority) {
  switch (priority) {
    case 'high':
      return {
        bg: 'bg-rose-50 border-rose-100 text-rose-700',
        dot: 'bg-rose-500',
        text: 'High'
      };
    case 'medium':
      return {
        bg: 'bg-amber-50 border-amber-100 text-amber-700',
        dot: 'bg-amber-500',
        text: 'Medium'
      };
    case 'low':
      default:
      return {
        bg: 'bg-slate-50 border-slate-100 text-slate-700',
        dot: 'bg-slate-400',
        text: 'Low'
      };
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// Ensure pre-populated data shows upcoming tomorrow/today dates dynamically relative to current local time.
const todayStr = new Date().toISOString().split('T')[0];
const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const textDayStr = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

export const INITIAL_TODOS: Todo[] = [
  {
    id: 'setup-todo-app',
    title: 'Structure the React To-Do List project',
    description: 'Create the primary state engine, define core Type declarations, and extract modular components for seamless presentation.',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: todayStr,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4h ago
    subtasks: [
      { id: 'sub-1', title: 'Define types in types.ts', completed: true },
      { id: 'sub-2', title: 'Configure global CSS with custom theme fonts', completed: true },
      { id: 'sub-3', title: 'Extract sub-components (StatsSection, TodoItem, FiltersBar)', completed: false },
    ],
  },
  {
    id: 'grocery-run',
    title: 'Plan weekly grocery list',
    description: 'Focus on fresh, healthy, and organic ingredients for family meals.',
    completed: false,
    priority: 'low',
    category: 'Shopping',
    dueDate: tomorrowStr,
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(), // 20h ago
    subtasks: [
      { id: 'sub-4', title: 'Fresh baby spinach and ripe avocados', completed: true },
      { id: 'sub-5', title: 'Organic almond milk', completed: false },
      { id: 'sub-6', title: 'Wild-caught salmon fillets', completed: false },
    ],
  },
  {
    id: 'stretching-routine',
    title: 'Daily morning yoga and stretching',
    description: 'Keep the body active and minds focused. 15-minute sequence to kickstart energy.',
    completed: true,
    priority: 'medium',
    category: 'Health',
    dueDate: todayStr,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18h ago
    subtasks: [],
  },
  {
    id: 'tax-prep',
    title: 'Review monthly subscription budgets',
    description: 'Identify unused or redundant streaming/workspace subscriptions.',
    completed: false,
    priority: 'medium',
    category: 'Finance',
    dueDate: textDayStr,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2d ago
    subtasks: [
      { id: 'sub-7', title: 'Audit software licenses', completed: false },
    ],
  },
];

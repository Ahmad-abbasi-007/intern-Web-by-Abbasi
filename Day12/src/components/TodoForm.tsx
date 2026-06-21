/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Priority } from '../types';
import { DEFAULT_CATEGORIES } from '../utils';
import { 
  Plus, 
  Sparkles, 
  Calendar, 
  Tag, 
  Flag, 
  ListChecks, 
  X,
  PlusCircle,
  FolderOpen
} from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (data: {
    title: string;
    description: string;
    priority: Priority;
    category: string;
    dueDate?: string;
    subtasks: string[];
  }) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Work');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Subtask creation state
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  // Close form or collapse it if clicked outside and forms is empty
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (!title && !description && subtasks.length === 0 && !isOpen) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description, subtasks, isOpen]);

  const handleAddSubtask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSubtaskTitle.trim();
    if (trimmed) {
      setSubtasks([...subtasks, trimmed]);
      setNewSubtaskTitle('');
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    const finalCategory = isCustomCategory ? (customCategoryName.trim() || 'General') : category;

    onAddTodo({
      title: title.trim(),
      description: description.trim(),
      priority,
      category: finalCategory,
      dueDate: dueDate || undefined,
      subtasks,
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('Work');
    setIsCustomCategory(false);
    setCustomCategoryName('');
    setDueDate('');
    setSubtasks([]);
    setNewSubtaskTitle('');
    setError('');
    setIsOpen(false);
  };

  const cancelAndClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('Work');
    setIsCustomCategory(false);
    setCustomCategoryName('');
    setDueDate('');
    setSubtasks([]);
    setError('');
    setIsOpen(false);
  };

  return (
    <div 
      id="todo-form-container" 
      ref={formRef} 
      className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden mb-6 transition-all"
    >
      {!isOpen ? (
        <div 
          id="collapsed-form-trigger"
          onClick={() => setIsOpen(true)}
          className="p-4 flex items-center justify-between cursor-pointer group hover:bg-slate-50/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform duration-200">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-sans text-slate-400 font-medium group-hover:text-slate-500 transition-colors">
              Add a new task to your schedule...
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-500 transition-colors">
            <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
            New
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-2">
            <span className="text-sm font-display font-semibold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Draft New Task
            </span>
            <button 
              type="button" 
              onClick={cancelAndClose}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="task-title-input" className="sr-only">Task Title</label>
            <input
              id="task-title-input"
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className="w-full text-base font-sans font-semibold placeholder:text-slate-400 text-slate-800 focus:outline-hidden border-b border-dashed border-slate-200 focus:border-indigo-500 pb-1.5 transition-colors"
              autoFocus
            />
            {error && (
              <span id="form-error-msg" className="text-xs font-medium text-rose-500 block mt-1">
                {error}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="task-desc-input" className="sr-only">Description</label>
            <textarea
              id="task-desc-input"
              rows={2}
              placeholder="Add description or structured notes (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-sans text-slate-600 placeholder:text-slate-300 focus:outline-hidden bg-slate-50 border border-slate-100 rounded-xl p-3 focus:bg-white focus:border-indigo-50 focus:ring-4 focus:ring-indigo-500/5 transition-all text-left align-top resize-none"
            />
          </div>

          {/* Settings Grid (Priority, Category, Due Date) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-100">
            
            {/* Priority Selection */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Flag className="w-3 h-3 text-slate-300" />
                Priority Level
              </span>
              <div id="form-priority-selector" className="flex items-center gap-1.5">
                {(['low', 'medium', 'high'] as Priority[]).map((p) => {
                  const getStyle = (lvl: Priority) => {
                    switch (lvl) {
                      case 'high': return priority === 'high' ? 'bg-rose-500 text-white' : 'hover:bg-rose-50 text-rose-600';
                      case 'medium': return priority === 'medium' ? 'bg-amber-500 text-white' : 'hover:bg-amber-50 text-amber-600';
                      case 'low': return priority === 'low' ? 'bg-slate-600 text-white' : 'hover:bg-slate-100 text-slate-600';
                    }
                  };
                  return (
                    <button
                      id={`form-priority-${p}`}
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 text-center py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase transition-all border border-transparent cursor-pointer ${getStyle(p)}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-1.5 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-300" />
                Category Tags
              </span>
              
              {!isCustomCategory ? (
                <div className="flex gap-1">
                  <label htmlFor="category-select" className="sr-only">Category</label>
                  <select
                    id="category-select"
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomCategory(true);
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-600 focus:outline-hidden focus:border-indigo-500"
                  >
                    {DEFAULT_CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                    <option value="__custom__">+ Custom Tag</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <label htmlFor="custom-category-input" className="sr-only">Custom Category</label>
                  <input
                    id="custom-category-input"
                    type="text"
                    placeholder="E.g. Study, Event"
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    className="flex-1 min-w-0 bg-white border border-indigo-200 focus:ring-2 focus:ring-indigo-100 rounded-lg px-2.5 py-1 text-xs text-slate-700 placeholder-slate-300 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="p-1 hover:bg-slate-100 text-slate-400 rounded-md cursor-pointer shrink-0"
                    title="Cancel custom"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Due Date Selector */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-300" />
                Due Date
              </span>
              <div className="relative">
                <label id="due-date-label" htmlFor="due-date-input" className="sr-only">Due Date Selector</label>
                <input
                  id="due-date-input"
                  aria-labelledby="due-date-label"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-3.5 pr-2 py-1 text-xs text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Subtasks Builder Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ListChecks className="w-3.5 h-3.5 text-slate-400" />
              Subtasks Checklist ({subtasks.length})
            </span>

            {/* Existing subtasks stack */}
            {subtasks.length > 0 && (
              <div className="space-y-1 bg-slate-50/30 p-2.5 rounded-xl border border-slate-100/50">
                <AnimatePresence>
                  {subtasks.map((task, idx) => (
                    <motion.div
                      id={`form-subtask-${idx}`}
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between text-xs py-1.5 px-2 bg-white rounded-lg border border-slate-100"
                    >
                      <span className="text-slate-600 font-medium truncate pr-2">{task}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(idx)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 rounded-md hover:bg-slate-50 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Add new subtask input form */}
            <div className="flex gap-1.5">
              <label htmlFor="create-subtask-input" className="sr-only">Subtask Title</label>
              <input
                id="create-subtask-input"
                type="text"
                placeholder="E.g. Check client files, review code..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="flex-1 bg-white border border-slate-200 focus:border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-600 placeholder-slate-300 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => handleAddSubtask()}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-50">
            <button
              id="form-cancel-btn"
              type="button"
              onClick={cancelAndClose}
              className="px-4 py-2 hover:bg-slate-50 text-slate-500 rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              id="form-submit-btn"
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Save Objective
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

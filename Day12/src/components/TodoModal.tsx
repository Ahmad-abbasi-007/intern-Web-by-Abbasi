/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Todo, Priority } from '../types';
import { DEFAULT_CATEGORIES } from '../utils';
import { X, Calendar, Flag, Tag, Check, ArrowRight } from 'lucide-react';

interface TodoModalProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (updatedTodo: Todo) => void;
}

export default function TodoModal({ isOpen, todo, onClose, onSave }: TodoModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Sychronize with selected todo when modal loads
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setPriority(todo.priority);
      
      const isDefault = DEFAULT_CATEGORIES.some(c => c.name.toLowerCase() === todo.category.toLowerCase());
      if (isDefault) {
        setCategory(todo.category);
        setIsCustomCategory(false);
        setCustomCategoryName('');
      } else {
        setCategory('__custom__');
        setIsCustomCategory(true);
        setCustomCategoryName(todo.category);
      }
      setDueDate(todo.dueDate || '');
      setError('');
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    const finalCategory = isCustomCategory ? (customCategoryName.trim() || 'General') : category;

    onSave({
      ...todo,
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category: finalCategory,
      dueDate: dueDate || undefined,
    });

    onClose();
  };

  return (
    <div id="edit-modal-backdrop" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      {/* Modal Dialog */}
      <div 
        id="edit-modal-dialog" 
        className="bg-white border border-slate-100 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-slate-50/50">
          <div>
            <h3 className="font-display font-bold text-slate-800 text-lg">Edit Objective</h3>
            <p className="text-xs text-slate-400">Modify properties of this specific item</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="modal-todo-title" className="text-xs font-semibold text-slate-500 font-sans">
              Task Title
            </label>
            <input
              id="modal-todo-title"
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className="w-full text-base font-sans font-semibold placeholder:text-slate-300 text-slate-800 border-b border-slate-200 focus:border-indigo-500 pb-1 focus:outline-hidden transition-colors"
            />
            {error && (
              <span id="modal-error-msg" className="text-xs font-semibold text-rose-500 block">
                {error}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="modal-todo-desc" className="text-xs font-semibold text-slate-500 font-sans">
              Description / Notes
            </label>
            <textarea
              id="modal-todo-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed explanation, links or context..."
              className="w-full text-xs font-sans text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition-all resize-none"
            />
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
            
            {/* Priority Column */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Flag className="w-3 h-3" /> Priority
              </span>
              <div className="relative">
                <label id="modal-priority-label" htmlFor="modal-priority-select" className="sr-only">Priority</label>
                <select
                  id="modal-priority-select"
                  aria-labelledby="modal-priority-label"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                >
                  <option value="high">🔥 High</option>
                  <option value="medium">⚡ Medium</option>
                  <option value="low">☕ Low</option>
                </select>
              </div>
            </div>

            {/* Category Column */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3" /> Category
              </span>
              
              {!isCustomCategory ? (
                <div className="relative">
                  <label id="modal-category-label" htmlFor="modal-category-select" className="sr-only">Category Selection</label>
                  <select
                    id="modal-category-select"
                    aria-labelledby="modal-category-label"
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomCategory(true);
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                  >
                    {DEFAULT_CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                    <option value="__custom__">+ Custom Tag</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <label id="modal-custom-category-label" htmlFor="modal-custom-category-input" className="sr-only">Custom Category</label>
                  <input
                    id="modal-custom-category-input"
                    aria-labelledby="modal-custom-category-label"
                    type="text"
                    placeholder="Category"
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    className="w-full bg-slate-50 border border-indigo-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="p-1 hover:bg-slate-100 text-slate-400 rounded-md cursor-pointer shrink-0"
                    title="Choose preset"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Due Date Column */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Due Date
              </span>
              <div className="relative">
                <label id="modal-due-date-label" htmlFor="modal-due-date-input" className="sr-only">Due Date Selector</label>
                <input
                  id="modal-due-date-input"
                  aria-labelledby="modal-due-date-label"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-500 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              id="modal-close-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              id="modal-save-btn"
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 mr-1" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

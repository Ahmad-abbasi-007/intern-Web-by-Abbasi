/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Todo, SubTask } from '../types';
import { getCategoryStyle, getPriorityStyle, generateId } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  Edit2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Check, 
  Plus, 
  X,
  ListTodo
} from 'lucide-react';

interface TodoItemProps {
  key?: string;
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onUpdateSubtask: (todoId: string, subtaskId: string, completed: boolean) => void;
  onAddSubtask: (todoId: string, subtaskTitle: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
}

export default function TodoItem({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
  onUpdateSubtask,
  onAddSubtask,
  onDeleteSubtask,
}: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [subtaskError, setSubtaskError] = useState('');

  const priorityStyle = getPriorityStyle(todo.priority);
  const categoryStyle = getCategoryStyle(todo.category);

  // Subtask statistics
  const totalSubtasks = todo.subtasks.length;
  const completedSubtasks = todo.subtasks.filter(s => s.completed).length;
  const percentSubtasks = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Render relative due date elegantly
  const getFormattedDueDate = (dueDateStr?: string, completed?: boolean) => {
    if (!dueDateStr) return null;
    
    // Parse target date relative to current day boundaries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add timezone offset to preserve literal date selected by date input
    const parts = dueDateStr.split('-');
    const due = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return { text: 'Due Today', color: 'text-amber-700 bg-amber-50 border-amber-200', isOverdue: false };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', color: 'text-indigo-700 bg-indigo-50 border-indigo-200', isOverdue: false };
    } else if (diffDays === -1) {
      return { 
        text: 'Overdue Yesterday', 
        color: completed ? 'text-slate-400 bg-slate-50 border-slate-100' : 'text-rose-700 bg-rose-50 border-rose-200 font-semibold animate-pulse', 
        isOverdue: !completed 
      };
    } else if (diffDays < -1) {
      return { 
        text: `Overdue (${Math.abs(diffDays)}d ago)`, 
        color: completed ? 'text-slate-400 bg-slate-50 border-slate-100' : 'text-rose-700 bg-rose-50 border-rose-100 font-semibold animate-pulse', 
        isOverdue: !completed 
      };
    } else if (diffDays > 1 && diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, color: 'text-slate-600 bg-slate-50 border-slate-200', isOverdue: false };
    } else {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      const dateText = due.toLocaleDateString(undefined, options);
      return { text: `Due ${dateText}`, color: 'text-slate-500 bg-slate-50 border-slate-200', isOverdue: false };
    }
  };

  const dueInfo = getFormattedDueDate(todo.dueDate, todo.completed);

  const handleCreateSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSubtaskTitle.trim();
    if (!trimmed) {
      setSubtaskError('Cannot be empty');
      return;
    }
    onAddSubtask(todo.id, trimmed);
    setNewSubtaskTitle('');
    setSubtaskError('');
  };

  return (
    <motion.div
      id={`todo-card-${todo.id}`}
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={`bg-white border rounded-2xl shadow-xs hover:shadow-xs transition-shadow overflow-hidden ${
        todo.completed 
          ? 'border-slate-100/70 bg-slate-50/50' 
          : 'border-slate-100'
      }`}
    >
      {/* Primary Card View */}
      <div className="p-4 sm:p-5 flex items-start gap-4">
        {/* Toggle Complete Checkbox */}
        <button
          id={`todo-toggle-checkbox-${todo.id}`}
          onClick={() => onToggleComplete(todo.id)}
          className={`mt-1 flex items-center justify-center w-5.5 h-5.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
            todo.completed
              ? 'bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 text-white shadow-xs shadow-emerald-500/10'
              : 'bg-white border-slate-300 hover:border-indigo-400 focus:ring-4 focus:ring-indigo-100'
          }`}
          aria-label={todo.completed ? 'Mark task pending' : 'Mark task completed'}
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </motion.div>
          )}
        </button>

        {/* Text Area & Badges */}
        <div className="flex-1 min-w-0">
          {/* Header row: title, expand trigger, and context triggers */}
          <div className="flex items-start justify-between gap-2">
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer group flex-1"
            >
              <h4 
                id={`todo-title-text-${todo.id}`}
                className={`font-sans font-semibold text-sm sm:text-base tracking-tight text-slate-800 break-words group-hover:text-indigo-600 transition-colors ${
                  todo.completed ? 'line-through text-slate-400 font-normal' : ''
                }`}
              >
                {todo.title}
              </h4>
              
              {/* Optional Inline Description Snippet (when collapsed) */}
              {todo.description && !isExpanded && (
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 pr-4 font-sans">
                  {todo.description}
                </p>
              )}
            </div>

            {/* Core control buttons */}
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                id={`todo-edit-btn-${todo.id}`}
                onClick={() => onEdit(todo)}
                className="p-1 px-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
                title="Edit Objective"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                id={`todo-delete-btn-${todo.id}`}
                onClick={() => onDelete(todo.id)}
                className="p-1 px-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                title="Delete instantly"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Details Row (Metadata pills) */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {/* Category tag */}
            <span 
              id={`todo-category-badge-${todo.id}`}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 leading-none ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
              {todo.category}
            </span>

            {/* Priority tag */}
            <span 
              id={`todo-priority-badge-${todo.id}`}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border flex items-center gap-1 leading-none ${priorityStyle.bg} ${priorityStyle.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
              {priorityStyle.text}
            </span>

            {/* Due date element */}
            {dueInfo && (
              <span 
                id={`todo-duedate-badge-${todo.id}`}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-medium border flex items-center gap-1.5 leading-none ${dueInfo.color}`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                {dueInfo.text}
              </span>
            )}

            {/* Subtask completion state overview */}
            {totalSubtasks > 0 && (
              <span 
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-md text-[10px] font-semibold cursor-pointer flex items-center gap-1 border border-slate-200/40 transition-colors"
              >
                <ListTodo className="w-3 h-3 text-slate-400" />
                {completedSubtasks}/{totalSubtasks} Subtasks ({percentSubtasks}%)
              </span>
            )}

            {/* General Expand Toggle */}
            <button
              id={`todo-expand-btn-${todo.id}`}
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label={isExpanded ? 'Collapse notes' : 'Expand notes'}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 font-bold" />
              ) : (
                <ChevronDown className="w-4 h-4 font-bold" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Subtasks & Description Panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`todo-expanded-panel-${todo.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-50 bg-slate-50/20"
          >
            <div className="p-4 sm:p-5 pt-3 space-y-4">
              
              {/* Detailed Description */}
              {todo.description && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    Description Notes
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans bg-white border border-slate-100 p-3 rounded-xl whitespace-pre-wrap">
                    {todo.description}
                  </p>
                </div>
              )}

              {/* Subtasks Stack */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                    <ListTodo className="w-3 h-3 text-slate-300" />
                    Subtasks Checklist ({completedSubtasks}/{totalSubtasks})
                  </span>
                  
                  {totalSubtasks > 0 && (
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {percentSubtasks}% Completed
                    </span>
                  )}
                </div>

                {/* Checklist Visualizer Bar */}
                {totalSubtasks > 0 && (
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300" 
                      style={{ width: `${percentSubtasks}%` }} 
                    />
                  </div>
                )}

                {/* Subtask list */}
                {totalSubtasks > 0 ? (
                  <div className="space-y-1 bg-white border border-slate-100 p-2 rounded-xl">
                    {todo.subtasks.map((sub, idx) => (
                      <div 
                        id={`todo-subtask-row-${sub.id}`}
                        key={sub.id}
                        className="flex items-center justify-between group/sub px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <button
                            id={`todo-subtask-checkbox-${sub.id}`}
                            type="button"
                            onClick={() => onUpdateSubtask(todo.id, sub.id, !sub.completed)}
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                              sub.completed 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : 'bg-white border-slate-300 hover:border-indigo-400'
                            }`}
                          >
                            {sub.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </button>
                          <span 
                            id={`todo-subtask-text-${sub.id}`}
                            className={`text-xs text-slate-700 min-w-0 flex-1 truncate ${
                              sub.completed ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {sub.title}
                          </span>
                        </div>
                        
                        <button
                          id={`todo-subtask-delete-${sub.id}`}
                          type="button"
                          onClick={() => onDeleteSubtask(todo.id, sub.id)}
                          className="opacity-0 group-hover/sub:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded hover:bg-slate-100 transition-all cursor-pointer shrink-0"
                          title="Delete subtask"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No subtasks added yet. Formulate baby steps below!</p>
                )}

                {/* Fast Subtask Creator */}
                <form onSubmit={handleCreateSubtask} className="flex gap-1.5 mt-2 pt-1 border-t border-slate-50/50">
                  <div className="relative flex-1 min-w-0">
                    <label htmlFor={`todo-${todo.id}-subtask-input`} className="sr-only">New Subtask</label>
                    <input
                      id={`todo-${todo.id}-subtask-input`}
                      type="text"
                      placeholder="Add step... (e.g., call drycleaners)"
                      value={newSubtaskTitle}
                      onChange={(e) => {
                        setNewSubtaskTitle(e.target.value);
                        if (e.target.value) setSubtaskError('');
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-slate-300 focus:outline-hidden rounded-lg px-2.5 py-1.5 text-xs text-slate-600 placeholder-slate-300"
                    />
                    {subtaskError && (
                      <span className="text-[9px] font-semibold text-rose-500 absolute -bottom-4 left-1">
                        {subtaskError}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="p-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Add step"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Created timestamp */}
              <div className="text-[9px] text-right text-slate-400 font-mono">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

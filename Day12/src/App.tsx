/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Todo, TodoFilter, SortOption, SubTask } from './types';
import { INITIAL_TODOS, generateId, DEFAULT_CATEGORIES } from './utils';
import { ClipboardList, Calendar, Sparkles, FilterX, Clock, RefreshCcw } from 'lucide-react';

// Sub-components
import StatsSection from './components/StatsSection';
import FiltersBar from './components/FiltersBar';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoModal from './components/TodoModal';

export default function App() {
  // --- States ---
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem('to_do_list_tasks');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse cached tasks; reset to default template.', e);
    }
    return INITIAL_TODOS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TodoFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('createdAt-desc');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Editing modal state
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // --- Real-time Clock effect ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Persistence effect ---
  useEffect(() => {
    localStorage.setItem('to_do_list_tasks', JSON.stringify(todos));
  }, [todos]);

  // --- Task Operations ---
  const handleAddTodo = (data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
    dueDate?: string;
    subtasks: string[];
  }) => {
    const newTodo: Todo = {
      id: generateId(),
      title: data.title,
      description: data.description || undefined,
      completed: false,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
      subtasks: data.subtasks.map(title => ({
        id: generateId(),
        title,
        completed: false,
      })),
    };

    setTodos(prev => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          const nextCompleted = !todo.completed;
          // If the main task is completed, mark all its subtasks as completed as well! Very convenient!
          // Conversely, if marked pending, keep subtasks intact unless they choose to reset.
          const updatedSubtasks = nextCompleted 
            ? todo.subtasks.map(sub => ({ ...sub, completed: true }))
            : todo.subtasks;
          return {
            ...todo,
            completed: nextCompleted,
            subtasks: updatedSubtasks
          };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleOpenEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedTodo = (updatedTodo: Todo) => {
    setTodos(prev => prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t)));
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  // --- Subtasks Operations ---
  const handleUpdateSubtask = (todoId: string, subtaskId: string, completed: boolean) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === todoId) {
          const updatedSubtasks = todo.subtasks.map(sub =>
            sub.id === subtaskId ? { ...sub, completed } : sub
          );
          // Smart rule: If all subtasks are finished, we do not force completed immediately to preserve user choice,
          // but if any subtask is incomplete and main task is completed, keep it completed. Let the user manage.
          return {
            ...todo,
            subtasks: updatedSubtasks,
          };
        }
        return todo;
      })
    );
  };

  const handleAddSubtaskInline = (todoId: string, subtaskTitle: string) => {
    const newSub: SubTask = {
      id: generateId(),
      title: subtaskTitle,
      completed: false,
    };

    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: [...todo.subtasks, newSub],
          };
        }
        return todo;
      })
    );
  };

  const handleDeleteSubtaskInline = (todoId: string, subtaskId: string) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.filter(sub => sub.id !== subtaskId),
          };
        }
        return todo;
      })
    );
  };

  // --- Reset to default template if needed ---
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset your to-do planner to the default tasks? Your current changes will be overwritten.')) {
      setTodos(INITIAL_TODOS);
      setSearchQuery('');
      setStatusFilter('all');
      setSelectedCategory(null);
      setSortBy('createdAt-desc');
    }
  };

  // --- Filter and Search logic ---
  const activeCategories = Array.from(new Set(todos.map(t => t.category))).filter(Boolean) as string[];

  const filteredTodos = todos
    .filter(todo => {
      // 1. Status Filter
      if (statusFilter === 'pending') return !todo.completed;
      if (statusFilter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      // 2. Category Filter
      if (selectedCategory === null) return true;
      return todo.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    .filter(todo => {
      // 3. Search Query
      if (!searchQuery.trim()) return true;
      const term = searchQuery.toLowerCase();
      const matchTitle = todo.title.toLowerCase().includes(term);
      const matchDesc = todo.description?.toLowerCase().includes(term);
      const matchSubtasks = todo.subtasks.some(s => s.title.toLowerCase().includes(term));
      return matchTitle || matchDesc || matchSubtasks;
    });

  // --- Sorting ---
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'dueDate-asc':
        // If no due date, float to bottom
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      case 'priority-desc': {
        const rank = { high: 3, medium: 2, low: 1 };
        return rank[b.priority] - rank[a.priority];
      }
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'createdAt-desc':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Today schedule string format for display
  const formatDateString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div id="todo-app-root" className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 text-slate-800 antialiased font-sans flex flex-col justify-between">
      <div className="max-w-4xl w-full mx-auto flex-1">
        
        {/* Upper Brand / Interactive Time Header */}
        <header id="todo-app-header" className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/15">
              <ClipboardList className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight sm:text-3xl flex items-center gap-1.5">
                Schedule Planner
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Organize milestones, coordinate subtasks & track productivity.
              </p>
            </div>
          </div>
          
          {/* Digital Time Center Widget */}
          <div id="live-clock" className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-xs self-start sm:self-auto shrink-0">
            <Clock className="w-4 h-4 text-indigo-500 animate-pulse" />
            <div className="text-right">
              <div className="text-xs font-bold text-slate-700 font-sans tracking-wide">
                {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold font-mono">
                {formatDateString(currentTime)}
              </div>
            </div>
          </div>
        </header>

        {/* Real-time stats section */}
        <StatsSection todos={todos} />

        {/* Primary Interactive Columns */}
        <main id="primary-planner-feed" className="grid grid-cols-1 gap-6">
          
          {/* Section 1: Adding a task */}
          <TodoForm onAddTodo={handleAddTodo} />

          {/* Section 2: Organizing + Filtering */}
          <FiltersBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeCategories={activeCategories}
          />

          {/* Section 3: Sorted & Filtered Stack */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Tasks Queue ({sortedTodos.length})
              </h3>
              
              {/* Reset to Default Button */}
              <button
                id="reset-defaults-action"
                onClick={handleResetToDefaults}
                className="text-[10px] text-slate-400 hover:text-indigo-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title="Populate list with default high fidelity items"
              >
                <RefreshCcw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            {/* List with staggered animations */}
            <div id="todos-list-view" className="space-y-3.5">
              <AnimatePresence mode="popLayout">
                {sortedTodos.length > 0 ? (
                  sortedTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggleComplete={handleToggleTodo}
                      onDelete={handleDeleteTodo}
                      onEdit={handleOpenEditModal}
                      onUpdateSubtask={handleUpdateSubtask}
                      onAddSubtask={handleAddSubtaskInline}
                      onDeleteSubtask={handleDeleteSubtaskInline}
                    />
                  ))
                ) : (
                  // Elegant Empty State placeholder
                  <motion.div
                    id="empty-list-indicator"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-slate-100 rounded-2xl p-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4 border border-indigo-100/40">
                      <FilterX className="w-8 h-8 stroke-[1.8]" />
                    </div>
                    <h3 className="font-display font-bold text-slate-800 text-lg mb-1">No Objectives Match Query</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4 leading-relaxed font-sans">
                      Try clearing or adjusting your status toggles, query filters, or tag selections to locate missing actions.
                    </p>
                    <button
                      id="reset-empty-filters"
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                        setSelectedCategory(null);
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      Reset Active Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      {/* Structured footer credits */}
      <footer id="workspace-footer" className="text-center py-8 text-[11px] text-slate-400 font-mono tracking-wider border-t border-slate-100/50 mt-12">
        To-Do List Planner • Built with React & Tailwind CSS
      </footer>

      {/* Editing Dialog Modal */}
      <TodoModal
        isOpen={isEditModalOpen}
        todo={editingTodo}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        onSave={handleSaveEditedTodo}
      />
    </div>
  );
}

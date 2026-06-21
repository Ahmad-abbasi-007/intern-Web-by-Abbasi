/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TodoFilter, SortOption } from '../types';
import { Search, Filter, ArrowUpDown, X, Folder } from 'lucide-react';
import { getCategoryStyle, DEFAULT_CATEGORIES } from '../utils';

interface FiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: TodoFilter;
  setStatusFilter: (filter: TodoFilter) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  activeCategories: string[];
}

export default function FiltersBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  activeCategories,
}: FiltersBarProps) {
  // Combine custom active categories from user with standard defaults for chips
  const displayCategories = Array.from(
    new Set([...DEFAULT_CATEGORIES.map(c => c.name), ...activeCategories])
  ).filter(Boolean);

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || selectedCategory !== null;

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedCategory(null);
  };

  return (
    <div id="filters-container" className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 shadow-xs mb-6 space-y-4">
      {/* Top row: Search & Sorting */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-tasks-input"
            type="text"
            placeholder="Search tasks, descriptions, subtasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="relative flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider hidden sm:block">
            Sort:
          </label>
          <div className="relative w-full md:w-auto">
            <input htmlFor="sort-select" className="sr-only"></input>
            <select
              id="sort-select"
              value={sortBy}
              className="appearance-none w-full md:w-48 bg-slate-50/50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-sm text-slate-700 font-sans focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer"
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="dueDate-asc">Closest Due Date</option>
              <option value="priority-desc">Highest Priority</option>
              <option value="title-asc">Alphabetical (A-Z)</option>
            </select>
            <ArrowUpDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Middle row: Status Toggle & Reset Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-50">
        
        {/* Status filters */}
        <div id="status-filter-pills" className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
          <button
            id="filter-status-all"
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Tasks
          </button>
          <button
            id="filter-status-pending"
            onClick={() => setStatusFilter('pending')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Pending
          </button>
          <button
            id="filter-status-completed"
            onClick={() => setStatusFilter('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Force Clear Filters */}
        {hasActiveFilters && (
          <button
            id="clear-filters-btn"
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all cursor-pointer font-sans"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Bottom row: Category filter chips */}
      <div id="category-filter-chips" className="space-y-1.5">
        <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1">
          <Folder className="w-3 h-3 text-slate-300" />
          Filter by Category:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            id="filter-category-all"
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer ${
              selectedCategory === null
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          
          {displayCategories.map((cat) => {
            const style = getCategoryStyle(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? `${style.bg} ${style.text} ${style.border} ring-2 ring-indigo-500/20 font-semibold`
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

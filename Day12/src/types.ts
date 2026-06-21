/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Priority = 'low' | 'medium' | 'high';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: string;
  dueDate?: string;
  createdAt: string;
  subtasks: SubTask[];
}

export type TodoFilter = 'all' | 'pending' | 'completed';

export interface CategorySpec {
  name: string;
  color: string; // Tailwind color class for bg / text, e.g. 'bg-blue-50 text-blue-700 border-blue-200'
}

export type SortOption = 'createdAt-desc' | 'createdAt-asc' | 'dueDate-asc' | 'priority-desc' | 'title-asc';

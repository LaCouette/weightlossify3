import React from 'react';
import { Square, CheckSquare, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export type SortField = 'date' | 'weight' | 'calories' | 'steps';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface LogsTableHeaderProps {
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  onToggleSelectAll: () => void;
  allSelected: boolean;
}

export function LogsTableHeader({ sortConfig, onSort, onToggleSelectAll, allSelected }: LogsTableHeaderProps) {
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <button
            onClick={onToggleSelectAll}
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            {allSelected ? (
              <CheckSquare className="h-4 w-4" />
            ) : (
              <Square className="h-4 w-4" />
            )}
            <span>Select All</span>
          </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <button
            onClick={() => onSort('date')}
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <span>Date</span>
            {getSortIcon('date')}
          </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <button
            onClick={() => onSort('weight')}
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <span>Weight (kg)</span>
            {getSortIcon('weight')}
          </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <button
            onClick={() => onSort('calories')}
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <span>Calories</span>
            {getSortIcon('calories')}
          </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <button
            onClick={() => onSort('steps')}
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <span>Steps</span>
            {getSortIcon('steps')}
          </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}
import React from 'react';
import { Edit2, Save, X, Trash2, CheckSquare, Square, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { DailyLog } from '../../types';
import { LogsTableRow } from './LogsTableRow';
import { SortConfig } from '../../hooks/useSortLogs';

interface LogsTableProps {
  logs: DailyLog[];
  selectedLogs: Set<string>;
  editingLog: string | null;
  editValues: Partial<DailyLog>;
  sortConfig: SortConfig;
  onEdit: (log: DailyLog) => void;
  onSave: (logId: string) => Promise<void>;
  onCancel: () => void;
  onDelete: (logId: string) => Promise<void>;
  onSort: (field: 'date' | 'weight' | 'calories' | 'steps') => void;
  onToggleLogSelection: (logId: string) => void;
  onToggleAllSelection: () => void;
  onEditValuesChange: (updates: Partial<DailyLog>) => void;
}

export function LogsTable({
  logs,
  selectedLogs,
  editingLog,
  editValues,
  sortConfig,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onSort,
  onToggleLogSelection,
  onToggleAllSelection,
  onEditValuesChange
}: LogsTableProps) {
  const getSortIcon = (field: 'date' | 'weight' | 'calories' | 'steps') => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                onClick={onToggleAllSelection}
                className="flex items-center gap-2 hover:text-indigo-600"
              >
                {selectedLogs.size === logs.length ? (
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
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log) => (
            <LogsTableRow
              key={log.id}
              log={log}
              isSelected={selectedLogs.has(log.id)}
              isEditing={editingLog === log.id}
              editValues={editValues}
              onEdit={() => onEdit(log)}
              onSave={() => onSave(log.id)}
              onCancel={onCancel}
              onDelete={() => onDelete(log.id)}
              onToggleSelection={() => onToggleLogSelection(log.id)}
              onEditValuesChange={onEditValuesChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
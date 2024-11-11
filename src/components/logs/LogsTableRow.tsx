import React from 'react';
import { Edit2, Save, X, Trash2, CheckSquare, Square } from 'lucide-react';
import type { DailyLog } from '../../types';

interface LogsTableRowProps {
  log: DailyLog;
  isSelected: boolean;
  isEditing: boolean;
  editValues: Partial<DailyLog>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onToggleSelection: () => void;
  onEditValuesChange: (updates: Partial<DailyLog>) => void;
}

export function LogsTableRow({
  log,
  isSelected,
  isEditing,
  editValues,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onToggleSelection,
  onEditValuesChange
}: LogsTableRowProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatWeight = (weight: number | undefined): string => {
    if (typeof weight !== 'number') return '-';
    return weight.toFixed(1);
  };

  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-indigo-50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={onToggleSelection}
          className="text-gray-400 hover:text-indigo-600"
        >
          {isSelected ? (
            <CheckSquare className="h-5 w-5" />
          ) : (
            <Square className="h-5 w-5" />
          )}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(log.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {isEditing ? (
          <input
            type="number"
            value={editValues.weight || ''}
            onChange={(e) => onEditValuesChange({ weight: Number(e.target.value) })}
            className="w-24 px-2 py-1 border rounded focus:ring-1 focus:ring-indigo-500"
            step="0.1"
          />
        ) : (
          formatWeight(log.weight)
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {isEditing ? (
          <input
            type="number"
            value={editValues.calories || ''}
            onChange={(e) => onEditValuesChange({ calories: Number(e.target.value) })}
            className="w-24 px-2 py-1 border rounded focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          log.calories?.toLocaleString() || '-'
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {isEditing ? (
          <input
            type="number"
            value={editValues.steps || ''}
            onChange={(e) => onEditValuesChange({ steps: Number(e.target.value) })}
            className="w-24 px-2 py-1 border rounded focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          log.steps?.toLocaleString() || '-'
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="text-green-600 hover:text-green-700"
            >
              <Save className="h-5 w-5" />
            </button>
            <button
              onClick={onCancel}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="text-indigo-600 hover:text-indigo-700"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
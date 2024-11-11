import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useLogsStore } from '../stores/logsStore';
import type { DailyLog } from '../types';
import { LogsHeader } from './logs/LogsHeader';
import { LogsTableHeader, type SortConfig, type SortField } from './logs/LogsTableHeader';
import { LogRow } from './logs/LogRow';
import { LogsPagination } from './logs/LogsPagination';

const ITEMS_PER_PAGE = 30;

export function LogsHistory() {
  const { user } = useAuthStore();
  const { logs, fetchLogs, updateLog, deleteLog, bulkDeleteLogs } = useLogsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [editingLog, setEditingLog] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<DailyLog>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'date', direction: 'desc' });

  const sortLogs = (logsToSort: DailyLog[]): DailyLog[] => {
    return [...logsToSort].sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.field) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'weight':
          comparison = (a.weight || 0) - (b.weight || 0);
          break;
        case 'calories':
          comparison = (a.calories || 0) - (b.calories || 0);
          break;
        case 'steps':
          comparison = (a.steps || 0) - (b.steps || 0);
          break;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  };

  const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const sortedLogs = sortLogs(logs);
  const currentLogs = sortedLogs.slice(startIndex, endIndex);

  useEffect(() => {
    if (user?.uid) {
      fetchLogs(user.uid)
        .finally(() => setIsLoading(false));
    }
  }, [user?.uid]);

  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      direction: 
        prevConfig.field === field
          ? prevConfig.direction === 'asc'
            ? 'desc'
            : 'asc'
          : 'desc'
    }));
  };

  const handleEdit = (log: DailyLog) => {
    setEditingLog(log.id);
    setEditValues({
      weight: log.weight || undefined,
      calories: log.calories || undefined,
      steps: log.steps || undefined
    });
  };

  const handleSave = async (logId: string) => {
    if (!user?.uid) return;

    try {
      await updateLog(user.uid, logId, editValues);
      setEditingLog(null);
      setEditValues({});
    } catch (error) {
      console.error('Failed to update log:', error);
    }
  };

  const handleCancel = () => {
    setEditingLog(null);
    setEditValues({});
  };

  const handleDelete = async (logId: string) => {
    if (!user?.uid || !window.confirm('Are you sure you want to delete this log? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteLog(user.uid, logId);
    } catch (error) {
      console.error('Failed to delete log:', error);
    }
  };

  const handleBulkDelete = async () => {
    if (!user?.uid || selectedLogs.size === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedLogs.size} selected logs? This action cannot be undone.`)) {
      return;
    }

    try {
      await bulkDeleteLogs(user.uid, Array.from(selectedLogs));
      setSelectedLogs(new Set());
    } catch (error) {
      console.error('Failed to delete logs:', error);
    }
  };

  const toggleLogSelection = (logId: string) => {
    const newSelection = new Set(selectedLogs);
    if (newSelection.has(logId)) {
      newSelection.delete(logId);
    } else {
      newSelection.add(logId);
    }
    setSelectedLogs(newSelection);
  };

  const toggleAllSelection = () => {
    if (selectedLogs.size === currentLogs.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(currentLogs.map(log => log.id)));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LogsHeader
        selectedCount={selectedLogs.size}
        onBulkDelete={handleBulkDelete}
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <LogsTableHeader
              sortConfig={sortConfig}
              onSort={handleSort}
              onToggleSelectAll={toggleAllSelection}
              allSelected={selectedLogs.size === currentLogs.length}
            />
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLogs.map((log) => (
                <LogRow
                  key={log.id}
                  log={log}
                  isSelected={selectedLogs.has(log.id)}
                  isEditing={editingLog === log.id}
                  editValues={editValues}
                  onToggleSelect={() => toggleLogSelection(log.id)}
                  onEdit={() => handleEdit(log)}
                  onSave={() => handleSave(log.id)}
                  onCancel={handleCancel}
                  onDelete={() => handleDelete(log.id)}
                  onEditValueChange={(field, value) => 
                    setEditValues(prev => ({ ...prev, [field]: value }))
                  }
                />
              ))}
            </tbody>
          </table>
        </div>

        <LogsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={logs.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
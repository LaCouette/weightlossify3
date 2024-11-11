import { useState, useMemo } from 'react';
import type { DailyLog } from '../types';

export type SortField = 'date' | 'weight' | 'calories' | 'steps';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export function useSortLogs(logs: DailyLog[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'date',
    direction: 'desc'
  });

  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => {
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
  }, [logs, sortConfig]);

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

  return { sortedLogs, sortConfig, handleSort };
}
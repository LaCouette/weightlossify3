import React from 'react';
import type { DailyLog } from '../types';

interface ProgressChartProps {
  type: 'weight' | 'sleep';
  data: DailyLog[];
}

export function ProgressChart({ type, data }: ProgressChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available yet</p>
      </div>
    );
  }

  // For now, showing a placeholder. In a real app, you'd want to use a charting library
  return (
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
      <p className="text-gray-500">
        {type === 'weight' ? 'Weight' : 'Sleep'} data available for {data.length} days
      </p>
    </div>
  );
}
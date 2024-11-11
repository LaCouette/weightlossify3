import React from 'react';
import { CalendarDays, Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  dateRange: 'week' | 'month';
  onChange: (range: 'week' | 'month') => void;
  startDate: Date;
  endDate: Date;
}

export function DateRangeSelector({ dateRange, onChange, startDate, endDate }: DateRangeSelectorProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <button
          onClick={() => onChange('week')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            dateRange === 'week'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CalendarDays className="h-5 w-5 mr-2" />
          <span>Week</span>
        </button>
        <button
          onClick={() => onChange('month')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            dateRange === 'month'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="h-5 w-5 mr-2" />
          <span>Month</span>
        </button>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>{formatDate(startDate)}</span>
        <span>-</span>
        <span>{formatDate(endDate)}</span>
      </div>
    </div>
  );
}
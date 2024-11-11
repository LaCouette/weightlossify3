import React from 'react';
import { Utensils } from 'lucide-react';
import type { DailyLog } from '../../types';
import { calculateRemainingDays } from '../../utils/dateCalculations';

interface CaloriesMetricProps {
  logs: DailyLog[];
  dailyTarget: number;
  dateRange: 'week' | 'month';
  endDate: Date;
}

export function CaloriesMetric({ logs, dailyTarget, dateRange, endDate }: CaloriesMetricProps) {
  const caloriesLogs = logs.filter(log => log.calories);
  const totalCalories = caloriesLogs.reduce((sum, log) => sum + (log.calories || 0), 0);
  const averageCalories = caloriesLogs.length > 0
    ? Math.round(totalCalories / caloriesLogs.length)
    : 0;

  const daysInPeriod = dateRange === 'week' ? 7 : 30;
  const remainingDays = calculateRemainingDays(endDate);
  const totalTargetCalories = dailyTarget * daysInPeriod;
  const remainingCalories = totalTargetCalories - totalCalories;
  const averageRemainingCalories = remainingDays > 0
    ? Math.round(remainingCalories / remainingDays)
    : 0;

  const progressPercentage = (totalCalories / totalTargetCalories) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-50 rounded-lg">
          <Utensils className="h-6 w-6 text-orange-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Calories Summary</h2>
      </div>

      <div className="space-y-6">
        {/* Average Daily Intake */}
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {averageCalories.toLocaleString()} kcal
          </div>
          <div className="text-sm text-gray-500 mt-1">
            daily average from {caloriesLogs.length} log{caloriesLogs.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Period Progress</span>
            <span>{Math.min(100, progressPercentage).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progressPercentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{totalCalories.toLocaleString()} kcal consumed</span>
            <span>{totalTargetCalories.toLocaleString()} kcal target</span>
          </div>
        </div>

        {/* Remaining Calories */}
        {remainingDays > 0 && (
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm font-medium text-orange-800">
              Remaining for this {dateRange}:
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-orange-900">
                {remainingCalories.toLocaleString()} kcal
              </span>
              <span className="text-sm text-orange-700">
                ({averageRemainingCalories.toLocaleString()} kcal/day)
              </span>
            </div>
            <div className="text-sm text-orange-700 mt-1">
              {remainingDays} day{remainingDays !== 1 ? 's' : ''} remaining
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
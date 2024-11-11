import React from 'react';
import { Activity } from 'lucide-react';
import type { DailyLog } from '../../types';
import { calculateRemainingDays } from '../../utils/dateCalculations';

interface StepsMetricProps {
  logs: DailyLog[];
  dailyTarget: number;
  dateRange: 'week' | 'month';
  endDate: Date;
}

export function StepsMetric({ logs, dailyTarget, dateRange, endDate }: StepsMetricProps) {
  const stepsLogs = logs.filter(log => log.steps);
  const totalSteps = stepsLogs.reduce((sum, log) => sum + (log.steps || 0), 0);
  const averageSteps = stepsLogs.length > 0
    ? Math.round(totalSteps / stepsLogs.length)
    : 0;

  const daysInPeriod = dateRange === 'week' ? 7 : 30;
  const remainingDays = calculateRemainingDays(endDate);
  const totalTargetSteps = dailyTarget * daysInPeriod;
  const remainingSteps = totalTargetSteps - totalSteps;
  const averageRemainingSteps = remainingDays > 0
    ? Math.round(remainingSteps / remainingDays)
    : 0;

  const progressPercentage = (totalSteps / totalTargetSteps) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <Activity className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Steps Summary</h2>
      </div>

      <div className="space-y-6">
        {/* Average Daily Steps */}
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {averageSteps.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            daily average from {stepsLogs.length} log{stepsLogs.length !== 1 ? 's' : ''}
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
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progressPercentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{totalSteps.toLocaleString()} steps taken</span>
            <span>{totalTargetSteps.toLocaleString()} steps target</span>
          </div>
        </div>

        {/* Remaining Steps */}
        {remainingDays > 0 && (
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm font-medium text-green-800">
              Remaining for this {dateRange}:
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-900">
                {remainingSteps.toLocaleString()}
              </span>
              <span className="text-sm text-green-700">
                ({averageRemainingSteps.toLocaleString()}/day)
              </span>
            </div>
            <div className="text-sm text-green-700 mt-1">
              {remainingDays} day{remainingDays !== 1 ? 's' : ''} remaining
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
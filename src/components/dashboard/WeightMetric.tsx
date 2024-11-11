import React from 'react';
import { Scale, TrendingDown, TrendingUp } from 'lucide-react';
import type { DailyLog } from '../../types';

interface WeightMetricProps {
  currentWeight: number;
  targetWeight?: number;
  logs: DailyLog[];
  dateRange: 'week' | 'month';
}

export function WeightMetric({ currentWeight, targetWeight, logs, dateRange }: WeightMetricProps) {
  const weightLogs = logs
    .filter(log => typeof log.weight === 'number')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestLogWeight = weightLogs.length > 0 ? Number(weightLogs[0].weight) : Number(currentWeight);
  const oldestLogWeight = weightLogs.length > 0 ? Number(weightLogs[weightLogs.length - 1].weight) : Number(currentWeight);
  
  const weightChange = latestLogWeight - oldestLogWeight;
  const weightChangePercent = (weightChange / oldestLogWeight) * 100;

  const progressToTarget = targetWeight
    ? ((currentWeight - targetWeight) / (oldestLogWeight - targetWeight)) * 100
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Scale className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Weight Progress</h2>
      </div>

      <div className="space-y-6">
        {/* Current Weight */}
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {Number(latestLogWeight).toFixed(1)} kg
          </div>
          <div className="flex items-center gap-2 mt-2">
            {weightChange !== 0 && (
              <>
                {weightChange > 0 ? (
                  <TrendingUp className="h-5 w-5 text-red-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-green-500" />
                )}
                <span className={`text-sm font-medium ${
                  weightChange > 0 ? 'text-red-500' : 'text-green-500'
                }`}>
                  {Math.abs(weightChange).toFixed(1)} kg
                  ({Math.abs(weightChangePercent).toFixed(1)}%)
                </span>
                <span className="text-sm text-gray-500">
                  this {dateRange}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Target Progress */}
        {targetWeight && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress to target</span>
              <span>{Math.min(100, Math.max(0, progressToTarget)).toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progressToTarget))}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Target: {targetWeight} kg</span>
              <span className="text-gray-500">
                {Math.abs(latestLogWeight - targetWeight).toFixed(1)} kg to go
              </span>
            </div>
          </div>
        )}

        {/* Log Count */}
        <div className="text-sm text-gray-500">
          Based on {weightLogs.length} log{weightLogs.length !== 1 ? 's' : ''} this {dateRange}
        </div>
      </div>
    </div>
  );
}
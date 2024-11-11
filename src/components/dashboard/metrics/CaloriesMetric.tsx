import React from 'react';
import { Utensils } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { calculateDailyAverage, calculateRemainingMetric } from '../../../utils/metricCalculations';
import type { DailyLog } from '../../../types';

interface CaloriesMetricProps {
  logs: DailyLog[];
  targetCalories: number;
  daysLeft: number;
  totalDays: number;
}

export function CaloriesMetric({
  logs,
  targetCalories,
  daysLeft,
  totalDays
}: CaloriesMetricProps) {
  const caloriesLogs = logs
    .map(log => log.calories)
    .filter((calories): calories is number => typeof calories === 'number');

  const totalTarget = targetCalories * totalDays;
  const currentTotal = caloriesLogs.reduce((sum, calories) => sum + calories, 0);
  const average = calculateDailyAverage(caloriesLogs, logs.length);

  const { total, daily, isDeficit } = calculateRemainingMetric(
    totalTarget,
    currentTotal,
    daysLeft
  );

  const progress = (currentTotal / totalTarget) * 100;

  return (
    <MetricCard
      icon={Utensils}
      title="Calories"
      value={average.toFixed(0)}
      subtitle={`${daily.toFixed(0)} kcal/day remaining`}
      progress={progress}
    />
  );
}
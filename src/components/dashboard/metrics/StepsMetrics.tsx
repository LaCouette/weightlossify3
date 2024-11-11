import React from 'react';
import { Footprints } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { calculateDailyAverage, calculateRemainingMetric } from '../../../utils/metricCalculations';
import type { DailyLog } from '../../../types';

interface StepsMetricProps {
  logs: DailyLog[];
  targetSteps: number;
  daysLeft: number;
  totalDays: number;
}

export function StepsMetric({
  logs,
  targetSteps,
  daysLeft,
  totalDays
}: StepsMetricProps) {
  const stepsLogs = logs
    .map(log => log.steps)
    .filter((steps): steps is number => typeof steps === 'number');

  const totalTarget = targetSteps * totalDays;
  const currentTotal = stepsLogs.reduce((sum, steps) => sum + steps, 0);
  const average = calculateDailyAverage(stepsLogs, logs.length);

  const { total, daily, isDeficit } = calculateRemainingMetric(
    totalTarget,
    currentTotal,
    daysLeft
  );

  const progress = (currentTotal / totalTarget) * 100;

  return (
    <MetricCard
      icon={Footprints}
      title="Steps"
      value={average.toFixed(0)}
      subtitle={`${daily.toFixed(0)} steps/day remaining`}
      progress={progress}
    />
  );
}
import React from 'react';
import { Scale } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { calculateWeightChange } from '../../../utils/metricCalculations';
import type { DailyLog } from '../../../types';

interface WeightMetricProps {
  logs: DailyLog[];
  profileWeight: number;
  targetWeight?: number;
}

export function WeightMetric({ logs, profileWeight, targetWeight }: WeightMetricProps) {
  const latestLog = logs[0];
  const firstLog = logs[logs.length - 1];

  const currentWeight = latestLog?.weight || profileWeight;
  const startWeight = firstLog?.weight || profileWeight;

  const { change, percentage } = calculateWeightChange(currentWeight, startWeight);

  const progress = targetWeight
    ? ((profileWeight - currentWeight) / (profileWeight - targetWeight)) * 100
    : undefined;

  return (
    <MetricCard
      icon={Scale}
      title="Weight"
      value={`${currentWeight.toFixed(1)} kg`}
      subtitle={targetWeight ? `Target: ${targetWeight} kg` : undefined}
      change={logs.length > 1 ? { value: change, isPositive: change > 0 } : undefined}
      progress={progress}
    />
  );
}
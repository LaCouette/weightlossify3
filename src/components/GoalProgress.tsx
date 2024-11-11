import React from 'react';

interface GoalProgressProps {
  label: string;
  current: number;
  target: number;
  unit: string;
}

export function GoalProgress({ label, current, target, unit }: GoalProgressProps) {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-900 mb-4">{label}</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{current} {unit}</span>
          <span>{target} {unit}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
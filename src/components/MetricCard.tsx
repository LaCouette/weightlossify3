import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
}

export function MetricCard({ icon: Icon, label, value, change }: MetricCardProps) {
  const isPositive = change?.startsWith('+');
  const hasChange = typeof change !== 'undefined';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-indigo-600" />
          <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        </div>
        {hasChange && (
          <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
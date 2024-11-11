import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
}

export function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  change,
  progress
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        {change && (
          <span className={`text-sm font-medium ${
            change.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {change.isPositive ? '+' : ''}{change.value.toFixed(1)}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        {typeof progress === 'number' && (
          <div className="mt-4">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-500 text-right">
              {progress.toFixed(0)}%
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
import React from 'react';
import { Activity, Scale, Heart, Target } from 'lucide-react';
import { UserProfile } from '../../../types/profile';
import { calculateBMI, calculateBMR, getBMICategory } from '../../../utils/calculations';
import { motion } from 'framer-motion';

interface CalculatedMetricsProps {
  profile: UserProfile;
}

export function CalculatedMetrics({ profile }: CalculatedMetricsProps) {
  const bmi = calculateBMI(profile.currentWeight, profile.height);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(
    profile.currentWeight,
    profile.height,
    profile.age,
    profile.gender,
    profile.bodyFat
  );

  const getBmiColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'bg-blue-500';
      case 'Normal Weight':
        return 'bg-green-500';
      case 'Overweight':
        return 'bg-yellow-500';
      case 'Obese':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const metrics = [
    {
      icon: Scale,
      label: 'BMI',
      value: bmi.toFixed(1),
      subtext: bmiCategory,
      indicator: getBmiColor(bmiCategory)
    },
    {
      icon: Heart,
      label: 'BMR',
      value: Math.round(bmr).toLocaleString(),
      subtext: 'calories/day',
      indicator: 'bg-rose-500'
    },
    {
      icon: Target,
      label: 'Weight to Goal',
      value: profile.targetWeight 
        ? Math.abs(profile.currentWeight - profile.targetWeight).toFixed(1)
        : '-',
      subtext: 'kg remaining',
      indicator: 'bg-indigo-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="section-header">
        <div className="section-icon">
          <Activity className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="section-title text-shadow">Calculated Metrics</h2>
        <p className="section-description">
          Key metrics calculated based on your measurements
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="metric-card group"
            >
              <div className="metric-header">
                <div className="metric-icon">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="metric-title">{metric.label}</span>
              </div>
              <div className="flex items-end gap-3 mt-4">
                <div className="metric-value group-hover:text-indigo-600 transition-colors">
                  {metric.value}
                </div>
                <div className="h-8 w-1 rounded-full mb-1 opacity-75 transition-all group-hover:h-12 group-hover:opacity-100" 
                  style={{ backgroundColor: `var(--tw-${metric.indicator})` }} 
                />
              </div>
              <div className="metric-subtitle">{metric.subtext}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="info-box mt-8">
        <strong>Note:</strong> These metrics are automatically calculated based on your current measurements 
        and help us determine your optimal targets.
      </div>
    </motion.div>
  );
}
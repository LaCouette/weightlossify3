import React from 'react';
import { Target, Activity, Scale } from 'lucide-react';
import { UserProfile } from '../../../types/profile';
import { motion } from 'framer-motion';

interface DailyTargetsProps {
  profile: UserProfile;
  isEditing: boolean;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export function DailyTargets({
  profile,
  isEditing,
  isLoading,
  onChange,
  onSave,
  onCancel,
  onEdit
}: DailyTargetsProps) {
  const getCalorieAdjustment = () => {
    if (profile.primaryGoal === 'muscle_gain') {
      return `+${Math.round(profile.dailyCaloriesTarget * 0.075)} kcal surplus`;
    }
    if (profile.primaryGoal === 'weight_loss') {
      const deficit = profile.weeklyWeightGoal === '0.35' ? 350 : 600;
      return `-${deficit} kcal deficit`;
    }
    return 'maintenance';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="section-header">
        <div className="section-icon">
          <Target className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="section-title text-shadow">Daily Targets</h2>
        <p className="section-description">
          Your daily activity and nutrition targets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <Activity className="h-5 w-5 text-indigo-600" />
            </div>
            <span className="metric-title">Daily Steps Goal</span>
          </div>
          <div className="mt-4">
            <div className="metric-value">
              {profile.dailyStepsGoal?.toLocaleString() || '0'}
            </div>
            <div className="metric-subtitle">steps per day</div>
            <div className="progress-bar mt-4">
              <div 
                className="progress-value"
                style={{ width: `${Math.min((profile.dailyStepsGoal / 15000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <Scale className="h-5 w-5 text-indigo-600" />
            </div>
            <span className="metric-title">Daily Calories Target</span>
          </div>
          <div className="mt-4">
            <div className="metric-value">
              {profile.dailyCaloriesTarget?.toLocaleString() || '0'}
            </div>
            <div className="metric-subtitle">calories per day</div>
            <div className="text-sm font-medium text-indigo-600 mt-2">
              ({getCalorieAdjustment()})
            </div>
          </div>
        </div>
      </div>

      <div className="info-box mt-8">
        <strong>Note:</strong> These targets are automatically adjusted based on your selected goal 
        and activity level. Adjust them if needed, based on your progress and energy levels.
      </div>
    </motion.div>
  );
}
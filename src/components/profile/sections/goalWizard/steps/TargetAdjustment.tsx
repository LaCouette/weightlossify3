import React, { useState, useEffect } from 'react';
import { Activity, Scale } from 'lucide-react';
import { UserProfile } from '../../../../../types/profile';
import {
  calculateBMR,
  calculateBaseMaintenance,
  calculateNEAT,
  calculateRequiredSteps,
  calculateTargetCalories,
  getInitialRecommendation,
  MAX_STEPS,
  CALORIES_PER_STEP
} from '../../../../../utils/calorieCalculations';
import { roundSteps, roundCalories } from '../../../../../utils/roundingRules';

interface TargetAdjustmentProps {
  profile: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

export function TargetAdjustment({ profile, onChange }: TargetAdjustmentProps) {
  const isGain = profile.primaryGoal === 'muscle_gain';
  const isMaintenance = profile.primaryGoal === 'maintenance';
  
  const bmr = calculateBMR(
    profile.currentWeight,
    profile.height,
    profile.age,
    profile.gender,
    profile.bodyFat
  );
  
  const baseMaintenance = calculateBaseMaintenance(bmr);
  
  // Calculate target change based on selected goal
  const targetChange = (() => {
    if (isMaintenance) return 0;
    if (isGain) return Math.round(baseMaintenance * 0.075);
    return profile.weeklyWeightGoal === '0.35' ? -350 : -600;
  })();

  const maxCalories = roundCalories(
    Math.round(baseMaintenance * (isGain ? 1.7 : isMaintenance ? 1.3 : 1.5)),
    profile.primaryGoal
  );
  const minCalories = roundCalories(
    Math.round(baseMaintenance * (isGain ? 1.1 : isMaintenance ? 0.9 : 0.5)),
    profile.primaryGoal
  );

  // Get initial balanced recommendation
  const initialReco = getInitialRecommendation(baseMaintenance, targetChange, isGain);

  const [values, setValues] = useState({
    targetCalories: initialReco.calories,
    targetSteps: initialReco.steps
  });

  useEffect(() => {
    onChange({
      dailyCaloriesTarget: values.targetCalories,
      dailyStepsGoal: values.targetSteps
    });
  }, [values.targetCalories, values.targetSteps]);

  const neat = calculateNEAT(values.targetSteps);
  const totalMaintenance = baseMaintenance + neat;
  const currentChange = values.targetCalories - totalMaintenance;

  const handleCaloriesChange = (newCalories: number) => {
    const clampedCalories = roundCalories(
      Math.min(Math.max(newCalories, minCalories), maxCalories),
      profile.primaryGoal
    );
    
    const requiredSteps = calculateRequiredSteps(
      clampedCalories,
      baseMaintenance,
      targetChange
    );
    const clampedSteps = roundSteps(Math.min(Math.max(requiredSteps, 0), MAX_STEPS));

    setValues({
      targetCalories: clampedCalories,
      targetSteps: clampedSteps
    });
  };

  const handleStepsChange = (newSteps: number) => {
    const clampedSteps = roundSteps(Math.min(Math.max(newSteps, 0), MAX_STEPS));
    const newNeat = calculateNEAT(clampedSteps);
    const newTotalMaintenance = baseMaintenance + newNeat;
    const newCalories = calculateTargetCalories(
      newTotalMaintenance,
      targetChange,
      profile.primaryGoal
    );
    const clampedCalories = Math.min(Math.max(newCalories, minCalories), maxCalories);

    setValues({
      targetCalories: clampedCalories,
      targetSteps: clampedSteps
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Adjust Your Daily Targets</h3>
        <p className="text-sm text-gray-600">
          Fine-tune your daily calorie and step goals to match your preferences
        </p>
      </div>

      {/* Calories Slider */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-5 w-5 text-orange-600" />
          <h3 className="font-medium text-gray-900">Daily Calorie Target</h3>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {Math.round(values.targetCalories)}
            </div>
            <div className="text-sm text-gray-500">calories per day</div>
            {!isMaintenance && (
              <div className="text-sm text-orange-600 mt-1">
                ({isGain ? '+' : ''}{Math.round(currentChange)} kcal {isGain ? 'surplus' : 'deficit'})
              </div>
            )}
          </div>

          <div className="relative pt-6 pb-2">
            <input
              type="range"
              min={minCalories}
              max={maxCalories}
              value={values.targetCalories}
              onChange={(e) => handleCaloriesChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              step="50"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{minCalories}</span>
              <span>{maxCalories}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Slider */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-green-600" />
          <h3 className="font-medium text-gray-900">Daily Steps Target</h3>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {values.targetSteps.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">steps per day</div>
            <div className="text-sm text-green-600 mt-1">
              (+{Math.round(neat)} kcal from activity)
            </div>
          </div>

          <div className="relative pt-6 pb-2">
            <input
              type="range"
              min={0}
              max={MAX_STEPS}
              value={values.targetSteps}
              onChange={(e) => handleStepsChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              step="100"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>{MAX_STEPS.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <strong>Note:</strong> These targets are optimized for your selected goal of{' '}
        {isGain ? 'muscle gain' : isMaintenance ? 'maintenance' : 'weight loss'}.
        Adjust them based on your preferences and energy levels.
      </div>
    </div>
  );
}
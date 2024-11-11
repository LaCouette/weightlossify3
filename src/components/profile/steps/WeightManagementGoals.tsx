import React from 'react';
import { Scale, TrendingDown } from 'lucide-react';
import { calculateBMR } from '../../../utils/calculations';

interface WeightManagementGoalsProps {
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: string;
  bodyFat?: number;
  selectedGoal: 'moderate_loss' | 'aggressive_loss' | null;
  onSelect: (goal: 'moderate_loss' | 'aggressive_loss') => void;
}

export function WeightManagementGoals({
  currentWeight,
  targetWeight,
  height,
  age,
  gender,
  bodyFat,
  selectedGoal,
  onSelect
}: WeightManagementGoalsProps) {
  const bmr = calculateBMR(currentWeight, height, age, gender, bodyFat);
  const maintenanceCalories = Math.round(bmr * 1.1); // BMR + TEF (Thermic Effect of Food)
  const moderateDeficit = 350;
  const aggressiveDeficit = 600;
  
  const moderateWeeklyLoss = (moderateDeficit * 7) / 7700; // kg per week
  const aggressiveWeeklyLoss = (aggressiveDeficit * 7) / 7700; // kg per week

  const calculateTimeline = (weeklyLoss: number) => {
    const totalWeightToLose = currentWeight - targetWeight;
    const weeks = Math.ceil(totalWeightToLose / weeklyLoss);
    const months = Math.ceil(weeks / 4);
    return { weeks, months };
  };

  const moderateTimeline = calculateTimeline(moderateWeeklyLoss);
  const aggressiveTimeline = calculateTimeline(aggressiveWeeklyLoss);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Scale className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Select Your Plan</h3>
          <p className="text-sm text-gray-600">Choose a plan that matches your ambition and lifestyle</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Moderate Weight Loss */}
        <button
          type="button"
          onClick={() => onSelect('moderate_loss')}
          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
            selectedGoal === 'moderate_loss'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${
              selectedGoal === 'moderate_loss' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <TrendingDown className={`h-6 w-6 ${
                selectedGoal === 'moderate_loss' ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Moderate Weight Loss</h4>
              <p className="text-sm text-gray-600 mt-1">Steady, sustainable progress</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Daily Deficit</p>
                  <p className="text-lg font-semibold text-blue-600">{moderateDeficit} kcal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weekly Loss</p>
                  <p className="text-lg font-semibold text-blue-600">{moderateWeeklyLoss.toFixed(2)} kg</p>
                </div>
              </div>
              {selectedGoal === 'moderate_loss' && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-sm text-blue-700">
                      <strong>Expected Progress:</strong>
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {(moderateWeeklyLoss * 4).toFixed(1)} kg per month</li>
                      <li>• Reach your goal in approximately {moderateTimeline.weeks} weeks ({moderateTimeline.months} months)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </button>

        {/* Aggressive Weight Loss */}
        <button
          type="button"
          onClick={() => onSelect('aggressive_loss')}
          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
            selectedGoal === 'aggressive_loss'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${
              selectedGoal === 'aggressive_loss' ? 'bg-purple-100' : 'bg-gray-100'
            }`}>
              <TrendingDown className={`h-6 w-6 ${
                selectedGoal === 'aggressive_loss' ? 'text-purple-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Aggressive Weight Loss</h4>
              <p className="text-sm text-gray-600 mt-1">Faster results, requires more discipline</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Daily Deficit</p>
                  <p className="text-lg font-semibold text-purple-600">{aggressiveDeficit} kcal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weekly Loss</p>
                  <p className="text-lg font-semibold text-purple-600">{aggressiveWeeklyLoss.toFixed(2)} kg</p>
                </div>
              </div>
              {selectedGoal === 'aggressive_loss' && (
                <div className="mt-4 p-4 bg-purple-100 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-sm text-purple-700">
                      <strong>Expected Progress:</strong>
                    </p>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• {(aggressiveWeeklyLoss * 4).toFixed(1)} kg per month</li>
                      <li>• Reach your goal in approximately {aggressiveTimeline.weeks} weeks ({aggressiveTimeline.months} months)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </button>
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <strong>Note:</strong> These calculations are estimates based on your maintenance calories of {maintenanceCalories} kcal/day. 
        Adjust your intake based on your progress and how you feel.
      </div>
    </div>
  );
}
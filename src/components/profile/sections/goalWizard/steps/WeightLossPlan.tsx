import React, { useState } from 'react';
import { Scale, TrendingDown } from 'lucide-react';

interface WeightLossPlanProps {
  currentWeight: number;
  currentPlan?: string;
  onChange: (plan: string, targetWeight: number) => void;
}

export function WeightLossPlan({ currentWeight, currentPlan, onChange }: WeightLossPlanProps) {
  const [targetWeight, setTargetWeight] = useState<number>(
    Math.max(currentWeight - 20, currentWeight * 0.8)
  );
  const [selectedPlan, setSelectedPlan] = useState<'moderate_loss' | 'aggressive_loss'>(
    currentPlan === '0.35' ? 'moderate_loss' : 'aggressive_loss'
  );

  const handlePlanSelect = (plan: 'moderate_loss' | 'aggressive_loss') => {
    setSelectedPlan(plan);
    onChange(plan === 'moderate_loss' ? '0.35' : '0.6', targetWeight);
  };

  const handleTargetWeightChange = (value: number) => {
    const newValue = Math.min(Math.max(value, currentWeight * 0.6), currentWeight - 0.5);
    setTargetWeight(newValue);
    onChange(selectedPlan === 'moderate_loss' ? '0.35' : '0.6', newValue);
  };

  const calculateTimeline = (weeklyLoss: number) => {
    const totalWeightToLose = currentWeight - targetWeight;
    const weeks = Math.ceil(totalWeightToLose / weeklyLoss);
    const months = Math.ceil(weeks / 4);
    return { weeks, months };
  };

  const moderateTimeline = calculateTimeline(0.35);
  const aggressiveTimeline = calculateTimeline(0.6);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Scale className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold">Weight Loss Plan</h3>
        <p className="text-sm text-gray-600">
          Choose your preferred approach and set your target weight
        </p>
      </div>

      <div className="space-y-4">
        {/* Target Weight Selector */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-4">Target Weight</label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                {targetWeight.toFixed(1)} kg
              </span>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => handleTargetWeightChange(Number(e.target.value))}
                step="0.5"
                min={currentWeight * 0.6}
                max={currentWeight - 0.5}
                className="w-24 p-2 text-right border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="range"
              value={targetWeight}
              onChange={(e) => handleTargetWeightChange(Number(e.target.value))}
              step="0.5"
              min={currentWeight * 0.6}
              max={currentWeight - 0.5}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex justify-between text-sm text-gray-500">
              <span>{(currentWeight * 0.6).toFixed(1)} kg</span>
              <span>{(currentWeight - 0.5).toFixed(1)} kg</span>
            </div>

            <div className="mt-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              Total weight to lose: {(currentWeight - targetWeight).toFixed(1)} kg
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="space-y-4">
          {/* Moderate Loss Plan */}
          <button
            type="button"
            onClick={() => handlePlanSelect('moderate_loss')}
            className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
              selectedPlan === 'moderate_loss'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                selectedPlan === 'moderate_loss' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <TrendingDown className={`h-6 w-6 ${
                  selectedPlan === 'moderate_loss' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Moderate Weight Loss</h4>
                <p className="text-sm text-gray-600 mt-1">Steady, sustainable progress</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Weekly Loss</p>
                    <p className="text-lg font-semibold text-blue-600">0.35 kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ~{moderateTimeline.months} months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Aggressive Loss Plan */}
          <button
            type="button"
            onClick={() => handlePlanSelect('aggressive_loss')}
            className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
              selectedPlan === 'aggressive_loss'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                selectedPlan === 'aggressive_loss' ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <TrendingDown className={`h-6 w-6 ${
                  selectedPlan === 'aggressive_loss' ? 'text-purple-600' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Aggressive Weight Loss</h4>
                <p className="text-sm text-gray-600 mt-1">Faster results, requires more discipline</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Weekly Loss</p>
                    <p className="text-lg font-semibold text-purple-600">0.6 kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-lg font-semibold text-purple-600">
                      ~{aggressiveTimeline.months} months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FormData } from '../../../types/profile';
import { Ruler, Scale, Activity } from 'lucide-react';

interface Step2Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const workoutLevels = [
  {
    value: 'light',
    label: 'Light',
    description: '1-2 workouts/week'
  },
  {
    value: 'gym_bro',
    label: 'Gym Bro',
    description: '3-5 workouts/week'
  },
  {
    value: 'gym_rat',
    label: 'Gym Rat',
    description: '6+ workouts/week'
  }
];

export function Step2({ formData, onChange }: Step2Props) {
  const [heightDisplay, setHeightDisplay] = useState(formData.height?.toString() || '170');
  const [weightDisplay, setWeightDisplay] = useState(formData.currentWeight?.toString() || '70.0');

  const handleHeightChange = (value: string) => {
    setHeightDisplay(value);
    onChange({
      target: {
        name: 'height',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleWeightChange = (value: string) => {
    // Convert to number and round to nearest 0.5
    const numValue = Math.round(parseFloat(value) * 2) / 2;
    // Format to always show one decimal place
    const formattedValue = numValue.toFixed(1);
    setWeightDisplay(formattedValue);
    onChange({
      target: {
        name: 'currentWeight',
        value: formattedValue
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Physical Stats</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          These measurements help us calculate your energy needs and create appropriate goals for your journey.
        </p>
      </div>

      <div className="space-y-6">
        {/* Height Field */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Ruler className="h-5 w-5 text-blue-600" />
            </div>
            <label className="block font-bold text-gray-900">Height</label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">{heightDisplay} cm</span>
              <input
                type="number"
                value={heightDisplay}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="w-20 p-2 text-right border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                step="1"
                min="140"
                max="220"
              />
            </div>
            <input
              type="range"
              value={heightDisplay}
              onChange={(e) => handleHeightChange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              min="140"
              max="220"
              step="1"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>140 cm</span>
              <span>220 cm</span>
            </div>
          </div>
        </div>

        {/* Weight Field */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Scale className="h-5 w-5 text-orange-600" />
            </div>
            <label className="block font-bold text-gray-900">Current Weight</label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-600">{weightDisplay} kg</span>
              <input
                type="number"
                value={weightDisplay}
                onChange={(e) => handleWeightChange(e.target.value)}
                className="w-20 p-2 text-right border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                step="0.5"
                min="40"
                max="200"
              />
            </div>
            <input
              type="range"
              value={weightDisplay}
              onChange={(e) => handleWeightChange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              min="40"
              max="200"
              step="0.5"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>40 kg</span>
              <span>200 kg</span>
            </div>
          </div>
        </div>

        {/* Workout Activity Level Field */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <label className="block font-bold text-gray-900">Workouts Activity</label>
          </div>
          <div className="space-y-3">
            {workoutLevels.map(({ value, label, description }) => (
              <label
                key={value}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.activityLevel === value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-200'
                }`}
              >
                <input
                  type="radio"
                  name="activityLevel"
                  value={value}
                  checked={formData.activityLevel === value}
                  onChange={onChange}
                  className="sr-only"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`font-medium ${
                      formData.activityLevel === value ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {label}
                    </span>
                    <p className={`text-sm ${
                      formData.activityLevel === value ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.activityLevel === value
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.activityLevel === value && (
                      <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
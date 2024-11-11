import React, { useState, useEffect } from 'react';
import { FormData } from '../../../types/profile';
import { Target, Scale, Dumbbell, BarChart } from 'lucide-react';
import { BodyFatSelector } from './BodyFatSelector';
import { WeightManagementGoals } from './WeightManagementGoals';
import { calculateMuscleGainPotential } from '../../../utils/calculations';

interface Step3Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

type GoalType = 'weight_loss' | 'muscle_gain' | 'maintenance' | null;

export function Step3({ formData, onChange }: Step3Props) {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(formData.primaryGoal as GoalType || null);
  const [targetWeight, setTargetWeight] = useState<number>(
    Number(formData.targetWeight) || Number(formData.currentWeight) || 70
  );
  const [selectedPlan, setSelectedPlan] = useState<'moderate_loss' | 'aggressive_loss' | 'muscle_gain' | null>(
    formData.weeklyWeightGoal === '0.35' ? 'moderate_loss' :
    formData.weeklyWeightGoal === '0.6' ? 'aggressive_loss' :
    formData.primaryGoal === 'muscle_gain' ? 'muscle_gain' : null
  );

  const handleBodyFatSelect = (value: number) => {
    onChange({
      target: {
        name: 'bodyFat',
        value: value.toString()
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleGoalSelect = (goal: GoalType) => {
    setSelectedGoal(goal);
    setSelectedPlan(null); // Reset selected plan when changing goals
    onChange({
      target: {
        name: 'primaryGoal',
        value: goal || ''
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleTargetWeightChange = (value: number) => {
    const newValue = Number(value);
    if (!isNaN(newValue)) {
      setTargetWeight(newValue);
      onChange({
        target: {
          name: 'targetWeight',
          value: newValue.toString()
        }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handlePlanSelect = (plan: 'moderate_loss' | 'aggressive_loss' | 'muscle_gain') => {
    setSelectedPlan(plan);
    // Update form data with selected plan details
    onChange({
      target: {
        name: 'weeklyWeightGoal',
        value: plan === 'moderate_loss' ? '0.35' : plan === 'aggressive_loss' ? '0.6' : '0.5'
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const currentWeight = Number(formData.currentWeight) || 70;
  const minWeight = Math.max(40, currentWeight - 50);
  const maxWeight = currentWeight - 0.5;

  const goals = [
    {
      id: 'weight_loss' as const,
      title: 'Weight Loss',
      description: 'Lose weight sustainably',
      icon: Scale,
      color: 'blue'
    },
    {
      id: 'muscle_gain' as const,
      title: 'Muscle Gain',
      description: 'Build lean muscle mass',
      icon: Dumbbell,
      color: 'green'
    },
    {
      id: 'maintenance' as const,
      title: 'Maintenance',
      description: 'Maintain current weight',
      icon: BarChart,
      color: 'purple'
    }
  ];

  const muscleGainPotential = calculateMuscleGainPotential(
    Number(formData.age),
    Number(formData.bodyFat),
    Number(formData.height),
    formData.gender
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Set Your Goals</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Let's define what you want to achieve. Your goals help us create a personalized plan that's both effective and sustainable.
        </p>
      </div>

      <div className="space-y-8">
        <BodyFatSelector
          gender={formData.gender}
          selectedValue={Number(formData.bodyFat) || 0}
          onChange={handleBodyFatSelect}
        />

        {/* Primary Goal Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Target className="h-5 w-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-900">Select Your Goal</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;
              
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? `border-${goal.color}-500 bg-${goal.color}-50`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg inline-flex ${
                    isSelected ? `bg-${goal.color}-100` : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isSelected ? `text-${goal.color}-600` : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="mt-3">
                    <h4 className={`font-semibold ${
                      isSelected ? `text-${goal.color}-900` : 'text-gray-900'
                    }`}>
                      {goal.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {goal.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Weight Selection for Weight Loss */}
        {selectedGoal === 'weight_loss' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Scale className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Target Weight</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {Number(targetWeight).toFixed(1)} kg
                </span>
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => handleTargetWeightChange(Number(e.target.value))}
                  step="0.5"
                  min={minWeight}
                  max={maxWeight}
                  className="w-24 p-2 text-right border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="range"
                value={targetWeight}
                onChange={(e) => handleTargetWeightChange(Number(e.target.value))}
                step="0.5"
                min={minWeight}
                max={maxWeight}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-sm text-gray-500">
                <span>{minWeight.toFixed(1)} kg</span>
                <span>{maxWeight.toFixed(1)} kg</span>
              </div>

              <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                Total weight to lose: {(currentWeight - targetWeight).toFixed(1)} kg
              </div>
            </div>
          </div>
        )}

        {/* Weight Loss Options */}
        {selectedGoal === 'weight_loss' && targetWeight < currentWeight && (
          <WeightManagementGoals
            currentWeight={currentWeight}
            targetWeight={targetWeight}
            height={Number(formData.height)}
            age={Number(formData.age)}
            gender={formData.gender}
            bodyFat={Number(formData.bodyFat)}
            selectedGoal={selectedPlan}
            onSelect={handlePlanSelect}
          />
        )}

        {/* Muscle Gain Card */}
        {selectedGoal === 'muscle_gain' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <Dumbbell className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">Lean Muscle Growth Plan</h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Based on your current stats and training experience, here's your personalized muscle building plan.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Monthly Potential</h4>
                  <p className="text-sm text-green-700">
                    You can potentially gain {muscleGainPotential.monthlyGain.toFixed(1)}kg of lean muscle per month
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Yearly Potential</h4>
                  <p className="text-sm text-green-700">
                    Maximum muscle gain potential: {muscleGainPotential.yearlyGain.toFixed(1)}kg in the first year
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Optimized for Lean Gains</h4>
                <p className="text-sm text-green-700">
                  A 7.5% caloric surplus combined with progressive overload training for maximum muscle growth with minimal fat gain.
                </p>
                <div className="mt-4 text-sm text-green-700">
                  <strong>Note:</strong> These projections are based on your age ({formData.age}), current body fat ({formData.bodyFat}%), 
                  and training potential. Results may vary based on genetics, training intensity, and consistency.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Card */}
        {selectedGoal === 'maintenance' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <BarChart className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">Weight Maintenance Plan</h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                We'll help you maintain your current weight by finding your perfect balance of nutrition and activity.
              </p>

              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Balanced Approach</h4>
                <p className="text-sm text-purple-700">
                  Focus on maintaining your current weight while improving body composition through proper nutrition and exercise.
                </p>
                <div className="mt-4 text-sm text-purple-700">
                  <strong>Your Maintenance Zone:</strong> We'll help you stay within ±1kg of your current weight 
                  while potentially improving your body composition through proper training and nutrition.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
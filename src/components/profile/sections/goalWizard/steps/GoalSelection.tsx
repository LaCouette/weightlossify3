import React from 'react';
import { Target, Scale, Dumbbell, BarChart } from 'lucide-react';

interface GoalSelectionProps {
  currentGoal: string;
  onChange: (goal: 'weight_loss' | 'muscle_gain' | 'maintenance') => void;
}

export function GoalSelection({ currentGoal, onChange }: GoalSelectionProps) {
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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Target className="h-6 w-6 text-gray-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold">Select Your New Goal</h3>
        <p className="text-sm text-gray-600">
          Choose a new primary goal. This will help us adjust your targets accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = currentGoal === goal.id;
          
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onChange(goal.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? `border-${goal.color}-500 bg-${goal.color}-50`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  isSelected ? `bg-${goal.color}-100` : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    isSelected ? `text-${goal.color}-600` : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isSelected ? `text-${goal.color}-900` : 'text-gray-900'
                  }`}>
                    {goal.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {goal.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
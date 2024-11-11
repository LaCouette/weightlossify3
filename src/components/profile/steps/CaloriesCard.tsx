import { Scale } from 'lucide-react';

interface CaloriesCardProps {
  calories: number;
  change: number;
  minCalories: number;
  maxCalories: number;
  onChange: (calories: number) => void;
  isGain: boolean;
}

export function CaloriesCard({
  calories,
  change,
  minCalories,
  maxCalories,
  onChange,
  isGain
}: CaloriesCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-orange-50 rounded-lg">
          <Scale className="h-5 w-5 text-orange-600" />
        </div>
        <h3 className="font-bold text-gray-900">Daily Calorie Target</h3>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {Math.round(calories)}
          </div>
          <div className="text-sm text-gray-500">calories per day</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 mb-1">
            {Math.abs(Math.round(change))} cal
          </div>
          <div className="text-sm text-gray-500">{isGain ? 'surplus' : 'deficit'}</div>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min={minCalories}
          max={maxCalories}
          value={calories}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Min: {minCalories}</span>
          <span>Max: {maxCalories}</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
        <strong>Note:</strong> {isGain 
          ? "This is your target daily calorie intake to support muscle growth while minimizing fat gain. Combine with strength training for optimal results."
          : "This is your target daily calorie intake to achieve your weight loss goal while maintaining a healthy and sustainable deficit."}
      </div>
    </div>
  );
}
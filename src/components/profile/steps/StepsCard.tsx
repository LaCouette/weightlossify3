import { Footprints } from 'lucide-react';

interface StepsCardProps {
  steps: number;
  calories: number;
  minSteps: number;
  maxSteps: number;
  onChange: (steps: number) => void;
  isGain: boolean;
}

export function StepsCard({
  steps,
  calories,
  minSteps,
  maxSteps,
  onChange,
  isGain
}: StepsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <Footprints className="h-5 w-5 text-green-600" />
        </div>
        <h3 className="font-bold text-gray-900">Daily Steps Target</h3>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-green-600 mb-1">
            {steps.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">steps per day</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 mb-1">
            +{Math.round(calories)} cal
          </div>
          <div className="text-sm text-gray-500">burned</div>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min={minSteps}
          max={maxSteps}
          value={steps}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Min: {minSteps.toLocaleString()}</span>
          <span>Max: {maxSteps.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
        <strong>Note:</strong> {isGain 
          ? "For muscle gain, we recommend moderate activity to support recovery while maintaining general fitness."
          : "Your daily step goal helps create a calorie deficit through activity. This is combined with your dietary changes to reach your target deficit."}
      </div>
    </div>
  );
}
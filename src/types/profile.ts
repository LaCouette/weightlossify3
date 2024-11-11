export interface FormData {
  // Step 1
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  
  // Step 2
  height: number;
  currentWeight: number;
  activityLevel: string;
  
  // Step 3
  primaryGoal: string;
  targetWeight?: number;
  weeklyWeightGoal?: number;
  secondaryGoal: string;
  
  // Step 4
  dailyStepGoal: number;
  dailyCalorieTarget: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

export const defaultFormData: FormData = {
  name: '',
  gender: '',
  age: 0,
  height: 0,
  currentWeight: 0,
  activityLevel: '',
  primaryGoal: '',
  secondaryGoal: '',
  dailyStepGoal: 0,
  dailyCalorieTarget: 0,
  proteinPercentage: 0,
  carbsPercentage: 0,
  fatsPercentage: 0
};
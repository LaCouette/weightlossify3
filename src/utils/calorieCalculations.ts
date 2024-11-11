// Constants
export const CALORIES_PER_KG = 7700;
export const CALORIES_PER_STEP = 0.045;
export const MAX_STEPS = 40000;
export const MIN_STEPS = 0;

import { roundSteps, roundCalories } from './roundingRules';

// Workout calories based on height ranges
export const WORKOUT_CALORIES: { [key: string]: number } = {
  '150-160': 150,
  '160-170': 175,
  '170-180': 200,
  '180-190': 225,
  '190-200': 250
};

// Weekly workouts by activity level
export const WEEKLY_WORKOUTS: { [key: string]: number } = {
  'light': 1.5, // average of 1-2 workouts
  'gym_bro': 4, // average of 3-5 workouts
  'gym_rat': 6.5 // average of 6-7 workouts
};

// Get calories burned per workout based on height
export function getWorkoutCalories(height: number): number {
  if (height < 150) return 150;
  if (height > 200) return 250;
  
  const range = `${Math.floor(height / 10) * 10}-${Math.floor(height / 10) * 10 + 10}`;
  return WORKOUT_CALORIES[range] || 200; // default to 200 if range not found
}

// Calculate weekly calories from workouts
export function calculateWorkoutCalories(height: number, activityLevel: string): number {
  const caloriesPerWorkout = getWorkoutCalories(height);
  const weeklyWorkouts = WEEKLY_WORKOUTS[activityLevel] || 0;
  return Math.round(caloriesPerWorkout * weeklyWorkouts);
}

// BMR calculation using Katch-McArdle Formula when body fat is available
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: string,
  bodyFat?: number
): number {
  if (typeof bodyFat === 'number' && !isNaN(bodyFat)) {
    // Katch-McArdle Formula
    const leanBodyMass = weight * (1 - bodyFat / 100);
    return 370 + (21.6 * leanBodyMass);
  } else {
    // Mifflin-St Jeor Equation as fallback
    const baseBMR = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
  }
}

export function calculateBaseMaintenance(bmr: number): number {
  return Math.round(bmr * 1.1); // BMR + TEF (Thermic Effect of Food)
}

export function calculateNEAT(steps: number): number {
  return Math.round(steps * CALORIES_PER_STEP);
}

export function calculateDailySurplusOrDeficit(weeklyWeightGoal: number, isGain: boolean): number {
  // For muscle gain, we use monthly goals, so convert weekly values
  const weeklyChange = isGain ? (weeklyWeightGoal / 4) : weeklyWeightGoal;
  const dailyChange = Math.round((weeklyChange * CALORIES_PER_KG) / 7);
  return isGain ? dailyChange : -dailyChange; // Positive for surplus, negative for deficit
}

export function calculateRequiredSteps(
  targetCalories: number,
  baseMaintenance: number,
  targetChange: number
): number {
  const requiredNEAT = targetCalories - targetChange - baseMaintenance;
  return roundSteps(Math.round(requiredNEAT / CALORIES_PER_STEP));
}

export function calculateTargetCalories(
  totalMaintenance: number,
  targetChange: number,
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance'
): number {
  return roundCalories(Math.round(totalMaintenance + targetChange), goal);
}

export function getInitialRecommendation(
  baseMaintenance: number,
  targetChange: number,
  isGain: boolean
) {
  // For muscle gain, we want more calories and moderate activity
  // For weight loss, we want a balanced approach between diet and activity
  const activityRatio = isGain ? 0.2 : 0.3; // 20% from activity for gains, 30% for loss
  const dietaryChange = Math.round(targetChange * (1 - activityRatio));
  const activityChange = targetChange - dietaryChange;

  // Calculate initial steps
  const baseSteps = isGain ? 7500 : 10000; // Lower base steps for muscle gain
  const additionalSteps = Math.round(Math.abs(activityChange) / CALORIES_PER_STEP);
  const requiredSteps = roundSteps(baseSteps + (isGain ? -additionalSteps : additionalSteps));

  // Calculate initial calorie target
  const neat = calculateNEAT(requiredSteps);
  const totalMaintenance = baseMaintenance + neat;
  const targetCalories = calculateTargetCalories(
    totalMaintenance, 
    targetChange,
    isGain ? 'muscle_gain' : 'weight_loss'
  );

  return {
    calories: targetCalories,
    steps: requiredSteps
  };
}
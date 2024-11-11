export interface DailyLog {
  id: string;
  date: string;
  weight?: number | null;
  calories?: number | null;
  steps?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
  height: number;
  currentWeight: number;
  bodyFat?: number;
  activityLevel: 'light' | 'gym_bro' | 'gym_rat';
  primaryGoal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  targetWeight?: number;
  weeklyWeightGoal?: string;
  dailyStepsGoal: number;
  dailyCaloriesTarget: number;
  createdAt: Date;
  updatedAt: Date;
  setupCompleted: boolean;
}
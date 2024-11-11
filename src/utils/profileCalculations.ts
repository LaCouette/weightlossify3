// Basic Calculations
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string
): number => {
  if (!weight || !height || !age) return 0;
  
  // Mifflin-St Jeor Formula
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  if (!bmr) return 0;
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9
  };

  const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2;
  return Math.round(bmr * multiplier);
};

export const calculateBMI = (weight: number, height: number): number => {
  if (!weight || !height) return 0;
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

// Weight and Body Composition Calculations
export const calculateIdealWeights = (height: number) => {
  if (!height) return { hamwi: 0, devine: 0, robinson: 0, miller: 0 };
  
  return {
    hamwi: Number((48.0 + 2.7 * ((height - 152.4) / 2.54)).toFixed(1)),
    devine: Number((50.0 + 2.3 * ((height - 152.4) / 2.54)).toFixed(1)),
    robinson: Number((52 + 1.9 * ((height - 152.4) / 2.54)).toFixed(1)),
    miller: Number((56.2 + 1.41 * ((height - 152.4) / 2.54)).toFixed(1))
  };
};

export const calculateMuscularPotential = (height: number) => {
  if (!height) return { bf5: 0, bf10: 0, bf15: 0 };
  
  // Martin Berkhan's Formula:
  // Competition weight (5-6% body fat) = height in cm - 100
  const competitionWeight = height - 100;
  
  // Calculate weights at different body fat levels
  // At 5% body fat (competition condition)
  const bf5 = Number(competitionWeight.toFixed(1));
  
  // At 10% body fat (add ~5% to competition weight)
  const bf10 = Number((competitionWeight * 1.05).toFixed(1));
  
  // At 15% body fat (add ~10% to competition weight)
  const bf15 = Number((competitionWeight * 1.10).toFixed(1));
  
  return { bf5, bf10, bf15 };
};

// BMI Categories and Classifications
export const getBMICategory = (bmi: number): string => {
  if (!bmi || bmi < 0) return 'Unknown';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const getBMIColor = (bmi: number): string => {
  if (!bmi || bmi < 0) return 'text-gray-600';
  if (bmi < 18.5) return 'text-blue-600';
  if (bmi < 25) return 'text-green-600';
  if (bmi < 30) return 'text-yellow-600';
  return 'text-red-600';
};

// Comprehensive Profile Calculations
export const calculateFullProfile = (formData: {
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: string;
}) => {
  const { weight, height, age, gender, activityLevel } = formData;
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const bmi = calculateBMI(weight, height);
  const idealWeights = calculateIdealWeights(height);
  const muscularPotential = calculateMuscularPotential(height);

  return {
    bmr,
    tdee,
    bmi,
    bmiCategory: getBMICategory(bmi),
    idealWeights,
    muscularPotential,
    weeklyCalories: tdee * 7,
  };
};

// Macronutrient Calculations
export const calculateMacros = (calories: number, ratio: 'moderate' | 'low' | 'high') => {
  if (!calories) return { protein: 0, fats: 0, carbs: 0 };

  const ratios = {
    moderate: { protein: 0.30, fats: 0.35, carbs: 0.35 },
    low: { protein: 0.40, fats: 0.40, carbs: 0.20 },
    high: { protein: 0.30, fats: 0.20, carbs: 0.50 }
  };

  const selected = ratios[ratio];
  return {
    protein: Math.round((calories * selected.protein) / 4), // 4 calories per gram of protein
    fats: Math.round((calories * selected.fats) / 9),      // 9 calories per gram of fat
    carbs: Math.round((calories * selected.carbs) / 4)     // 4 calories per gram of carbs
  };
};
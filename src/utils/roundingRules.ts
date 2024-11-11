export function roundSteps(steps: number): number {
    return Math.ceil(steps / 100) * 100;
  }
  
  export function roundCalories(calories: number, goal: 'weight_loss' | 'muscle_gain' | 'maintenance'): number {
    if (goal === 'muscle_gain') {
      // Round up to nearest 50 for muscle gain
      return Math.ceil(calories / 50) * 50;
    } else {
      // Round down to nearest 50 for weight loss and maintenance
      return Math.floor(calories / 50) * 50;
    }
  }
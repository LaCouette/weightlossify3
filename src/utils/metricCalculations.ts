export function calculateDailyAverage(values: number[], totalDays: number): number {
    if (values.length === 0 || totalDays === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / totalDays;
  }
  
  export function calculateWeightChange(
    currentWeight: number,
    startWeight: number
  ): { change: number; percentage: number } {
    const change = currentWeight - startWeight;
    const percentage = (change / startWeight) * 100;
    return { change, percentage };
  }
  
  export function formatMetricValue(value: number, precision: number = 1): string {
    return value.toFixed(precision);
  }
  
  export function calculateRemainingMetric(
    target: number,
    current: number,
    daysLeft: number
  ): {
    total: number;
    daily: number;
    isDeficit: boolean;
  } {
    const remaining = target - current;
    const daily = remaining / daysLeft;
    return {
      total: Math.abs(remaining),
      daily: Math.abs(daily),
      isDeficit: remaining < 0
    };
  }
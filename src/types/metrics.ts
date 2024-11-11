export interface MetricSummary {
    current: number;
    target: number;
    average: number;
    remaining: {
      total: number;
      daily: number;
      isDeficit: boolean;
    };
    progress: number;
  }
  
  export interface DateRange {
    startDate: Date;
    endDate: Date;
    daysLeft: number;
  }
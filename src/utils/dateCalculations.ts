export function calculateDateRange(range: 'week' | 'month'): { startDate: Date; endDate: Date } {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);
  
    const startDate = new Date(now);
    if (range === 'week') {
      // Set to Monday of current week
      const day = startDate.getDay();
      const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
      startDate.setDate(diff);
    } else {
      // Set to first day of current month
      startDate.setDate(1);
    }
    startDate.setHours(0, 0, 0, 0);
  
    return { startDate, endDate };
  }
  
  export function calculateRemainingDays(range: 'week' | 'month'): number {
    const now = new Date();
    const endDate = new Date(now);
  
    if (range === 'week') {
      // Calculate days until Sunday
      const daysUntilSunday = 7 - now.getDay();
      return daysUntilSunday === 0 ? 7 : daysUntilSunday;
    } else {
      // Calculate days until end of month
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return lastDay.getDate() - now.getDate() + 1;
    }
  }
  
  export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
  
  export function isToday(date: string): boolean {
    const today = new Date();
    const checkDate = new Date(date);
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  }
  
  export function getTomorrowDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }
  
  export function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
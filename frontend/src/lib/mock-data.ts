export interface PredictionRecord {
  id: number;
  timestamp: string;
  date: string;
  age: string;
  restingBP: string;
  cholesterol: string;
  maxHeartRate: string;
  fastingBS: boolean;
  chestPainType: string;
  result: "high" | "low";
}

export const mockHistory: PredictionRecord[] = [
  { id: 1, timestamp: "09:15 AM", date: "2026-04-07", age: "62", restingBP: "145", cholesterol: "289", maxHeartRate: "120", fastingBS: true, chestPainType: "asymptomatic", result: "high" },
  { id: 2, timestamp: "10:30 AM", date: "2026-04-07", age: "45", restingBP: "120", cholesterol: "210", maxHeartRate: "165", fastingBS: false, chestPainType: "typical", result: "low" },
  { id: 3, timestamp: "11:45 AM", date: "2026-04-06", age: "58", restingBP: "138", cholesterol: "260", maxHeartRate: "130", fastingBS: true, chestPainType: "atypical", result: "high" },
  { id: 4, timestamp: "02:00 PM", date: "2026-04-06", age: "39", restingBP: "115", cholesterol: "195", maxHeartRate: "172", fastingBS: false, chestPainType: "non-anginal", result: "low" },
  { id: 5, timestamp: "03:20 PM", date: "2026-04-05", age: "71", restingBP: "160", cholesterol: "310", maxHeartRate: "105", fastingBS: true, chestPainType: "asymptomatic", result: "high" },
  { id: 6, timestamp: "04:10 PM", date: "2026-04-05", age: "50", restingBP: "125", cholesterol: "220", maxHeartRate: "155", fastingBS: false, chestPainType: "typical", result: "low" },
  { id: 7, timestamp: "09:00 AM", date: "2026-04-04", age: "67", restingBP: "150", cholesterol: "275", maxHeartRate: "118", fastingBS: true, chestPainType: "atypical", result: "high" },
  { id: 8, timestamp: "10:45 AM", date: "2026-04-04", age: "42", restingBP: "118", cholesterol: "200", maxHeartRate: "168", fastingBS: false, chestPainType: "non-anginal", result: "low" },
];

export const mockVitalsProgression = [
  { day: "Mon", heartRate: 142, bloodPressure: 130, cholesterol: 220 },
  { day: "Tue", heartRate: 138, bloodPressure: 128, cholesterol: 225 },
  { day: "Wed", heartRate: 145, bloodPressure: 135, cholesterol: 218 },
  { day: "Thu", heartRate: 135, bloodPressure: 125, cholesterol: 230 },
  { day: "Fri", heartRate: 150, bloodPressure: 140, cholesterol: 215 },
  { day: "Sat", heartRate: 132, bloodPressure: 122, cholesterol: 235 },
  { day: "Sun", heartRate: 140, bloodPressure: 132, cholesterol: 222 },
];

export const mockRiskDistribution = [
  { name: "High Risk", value: 35, fill: "hsl(0 72% 55%)" },
  { name: "Low Risk", value: 65, fill: "hsl(152 55% 42%)" },
];

export const mockMonthlyPredictions = [
  { month: "Jan", high: 12, low: 28 },
  { month: "Feb", high: 15, low: 25 },
  { month: "Mar", high: 10, low: 30 },
  { month: "Apr", high: 18, low: 22 },
  { month: "May", high: 8, low: 32 },
  { month: "Jun", high: 14, low: 26 },
];

export const mockHeartRateTrend = [
  { time: "8AM", rate: 72 },
  { time: "9AM", rate: 85 },
  { time: "10AM", rate: 110 },
  { time: "11AM", rate: 95 },
  { time: "12PM", rate: 88 },
  { time: "1PM", rate: 78 },
  { time: "2PM", rate: 92 },
  { time: "3PM", rate: 105 },
  { time: "4PM", rate: 98 },
  { time: "5PM", rate: 82 },
];

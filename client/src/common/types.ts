export interface Metrics {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  date?: string;
  dish?: string;
  email?: string;
  name?: string;
  _id?: string;
}

export interface MetricsObject {
  name: string;
  metricsInfo: Metrics;
  // standard: Metrics;
  // current: Metrics;
}

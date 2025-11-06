export interface LimitConfig {
  windowMs: number;       // Məsələn: 60000 (1 dəqiqə)
  maxRequests: number;    // Məsələn: 100
}

export interface UsageRecord {
  count: number;
  timestamp: number;
}

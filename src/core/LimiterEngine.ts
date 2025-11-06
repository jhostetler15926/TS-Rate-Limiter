import { LimitConfig, UsageRecord } from './types';

export class LimiterEngine {
  private config: LimitConfig;

  constructor(config: LimitConfig) {
    this.config = config;
  }

  public isAllowed(record: UsageRecord): boolean {
    const now = Date.now();
    const withinWindow = now - record.timestamp < this.config.windowMs;
    return !withinWindow || record.count < this.config.maxRequests;
  }

  public updateRecord(record: UsageRecord): UsageRecord {
    const now = Date.now();
    const withinWindow = now - record.timestamp < this.config.windowMs;

    if (!withinWindow) {
      return { count: 1, timestamp: now };
    }

    return { count: record.count + 1, timestamp: record.timestamp };
  }
}

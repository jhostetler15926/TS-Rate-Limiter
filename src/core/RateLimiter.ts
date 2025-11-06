import { LimiterEngine } from './LimiterEngine';
import { LimitConfig, UsageRecord } from './types';
import { RedisAdapter } from '../adapters/RedisAdapter';

export class RateLimiter {
  private adapter: RedisAdapter;
  private engine: LimiterEngine;

  constructor(config: LimitConfig, adapter: RedisAdapter) {
    this.adapter = adapter;
    this.engine = new LimiterEngine(config);
  }

  public async consume(ip: string, endpoint: string): Promise<boolean> {
    const key = `${ip}:${endpoint}`;
    const record = await this.adapter.getUsage(key);
    const allowed = this.engine.isAllowed(record);

    if (!allowed) return false;

    const updated = this.engine.updateRecord(record);
    await this.adapter.setUsage(key, updated);
    return true;
  }

  public async reset(ip: string, endpoint: string): Promise<void> {
    const key = `${ip}:${endpoint}`;
    await this.adapter.resetUsage(key);
  }
}

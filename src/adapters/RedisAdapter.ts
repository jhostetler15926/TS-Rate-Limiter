import Redis from 'ioredis';
import { UsageRecord } from '../core/types';

export class RedisAdapter {
  private client: Redis;

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  public async getUsage(key: string): Promise<UsageRecord> {
    const raw = await this.client.get(key);
    if (!raw) return { count: 0, timestamp: Date.now() };
    return JSON.parse(raw);
  }

  public async setUsage(key: string, record: UsageRecord): Promise<void> {
    await this.client.set(key, JSON.stringify(record));
  }

  public async resetUsage(key: string): Promise<void> {
    await this.client.del(key);
  }
}

import { UsageRecord } from '../core/types';

export class MemoryAdapter {
  private store: Map<string, UsageRecord> = new Map();

  public async getUsage(key: string): Promise<UsageRecord> {
    return this.store.get(key) || { count: 0, timestamp: Date.now() };
  }

  public async setUsage(key: string, record: UsageRecord): Promise<void> {
    this.store.set(key, record);
  }

  public async resetUsage(key: string): Promise<void> {
    this.store.delete(key);
  }
}

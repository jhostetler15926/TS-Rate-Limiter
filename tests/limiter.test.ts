import { LimiterEngine } from '../src/core/LimiterEngine';
import { LimitConfig, UsageRecord } from '../src/core/types';

describe('LimiterEngine', () => { 
  const config: LimitConfig = { windowMs: 60000, maxRequests: 5 };
  const engine = new LimiterEngine(config);

  it('should allow request if count is below limit', () => {
    const record: UsageRecord = { count: 3, timestamp: Date.now() };
    expect(engine.isAllowed(record)).toBe(true);
  });

  it('should block request if count exceeds limit', () => {
    const record: UsageRecord = { count: 6, timestamp: Date.now() };
    expect(engine.isAllowed(record)).toBe(false);
  });

  it('should reset record if window expired', () => {
    const oldRecord: UsageRecord = {
      count: 10,
      timestamp: Date.now() - 120000,
    };
    const updated = engine.updateRecord(oldRecord);
    expect(updated.count).toBe(1);
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RedisAdapter_1 = require("../src/adapters/RedisAdapter");
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const adapter = new RedisAdapter_1.RedisAdapter(redisUrl);
const testKey = 'test:redis';
describe('RedisAdapter', () => {
    it('should set and get usage record', async () => {
        const record = { count: 2, timestamp: Date.now() };
        await adapter.setUsage(testKey, record);
        const fetched = await adapter.getUsage(testKey);
        expect(fetched.count).toBe(2);
    });
    it('should reset usage record', async () => {
        await adapter.resetUsage(testKey);
        const fetched = await adapter.getUsage(testKey);
        expect(fetched.count).toBe(0);
    });
});

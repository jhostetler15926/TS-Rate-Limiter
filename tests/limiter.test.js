"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LimiterEngine_1 = require("../src/core/LimiterEngine");
describe('LimiterEngine', () => {
    const config = { windowMs: 60000, maxRequests: 5 };
    const engine = new LimiterEngine_1.LimiterEngine(config);
    it('should allow request if count is below limit', () => {
        const record = { count: 3, timestamp: Date.now() };
        expect(engine.isAllowed(record)).toBe(true);
    });
    it('should block request if count exceeds limit', () => {
        const record = { count: 6, timestamp: Date.now() };
        expect(engine.isAllowed(record)).toBe(false);
    });
    it('should reset record if window expired', () => {
        const oldRecord = {
            count: 10,
            timestamp: Date.now() - 120000,
        };
        const updated = engine.updateRecord(oldRecord);
        expect(updated.count).toBe(1);
    });
});

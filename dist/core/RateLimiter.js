"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
const LimiterEngine_1 = require("./LimiterEngine");
class RateLimiter {
    constructor(config, adapter) {
        this.adapter = adapter;
        this.engine = new LimiterEngine_1.LimiterEngine(config);
    }
    async consume(ip, endpoint) {
        const key = `${ip}:${endpoint}`;
        const record = await this.adapter.getUsage(key);
        const allowed = this.engine.isAllowed(record);
        if (!allowed)
            return false;
        const updated = this.engine.updateRecord(record);
        await this.adapter.setUsage(key, updated);
        return true;
    }
    async reset(ip, endpoint) {
        const key = `${ip}:${endpoint}`;
        await this.adapter.resetUsage(key);
    }
}
exports.RateLimiter = RateLimiter;

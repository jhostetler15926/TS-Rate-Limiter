"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimiterEngine = void 0;
class LimiterEngine {
    constructor(config) {
        this.config = config;
    }
    isAllowed(record) {
        const now = Date.now();
        const withinWindow = now - record.timestamp < this.config.windowMs;
        return !withinWindow || record.count < this.config.maxRequests;
    }
    updateRecord(record) {
        const now = Date.now();
        const withinWindow = now - record.timestamp < this.config.windowMs;
        if (!withinWindow) {
            return { count: 1, timestamp: now };
        }
        return { count: record.count + 1, timestamp: record.timestamp };
    }
}
exports.LimiterEngine = LimiterEngine;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapter = void 0;
class MemoryAdapter {
    constructor() {
        this.store = new Map();
    }
    async getUsage(key) {
        return this.store.get(key) || { count: 0, timestamp: Date.now() };
    }
    async setUsage(key, record) {
        this.store.set(key, record);
    }
    async resetUsage(key) {
        this.store.delete(key);
    }
}
exports.MemoryAdapter = MemoryAdapter;

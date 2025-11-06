"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisAdapter = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisAdapter {
    constructor(redisUrl) {
        this.client = new ioredis_1.default(redisUrl);
    }
    async getUsage(key) {
        const raw = await this.client.get(key);
        if (!raw)
            return { count: 0, timestamp: Date.now() };
        return JSON.parse(raw);
    }
    async setUsage(key, record) {
        await this.client.set(key, JSON.stringify(record));
    }
    async resetUsage(key) {
        await this.client.del(key);
    }
}
exports.RedisAdapter = RedisAdapter;

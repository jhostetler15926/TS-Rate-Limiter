"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = showStats;
const RedisAdapter_1 = require("../../adapters/RedisAdapter");
const banner_1 = require("../utils/banner");
async function showStats(redisUrl, key) {
    (0, banner_1.printBanner)();
    const adapter = new RedisAdapter_1.RedisAdapter(redisUrl);
    const usage = await adapter.getUsage(key);
    console.log(`🔍 Key: ${key}`);
    console.log(`📊 Count: ${usage.count}`);
    console.log(`⏱ Timestamp: ${new Date(usage.timestamp).toLocaleString()}`);
}

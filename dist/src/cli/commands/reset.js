"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetLimit = resetLimit;
const RedisAdapter_1 = require("../../adapters/RedisAdapter");
const banner_1 = require("../utils/banner");
async function resetLimit(redisUrl, key) {
    (0, banner_1.printBanner)();
    const adapter = new RedisAdapter_1.RedisAdapter(redisUrl);
    await adapter.resetUsage(key);
    console.log(`✅ Limit reset for key: ${key}`);
}

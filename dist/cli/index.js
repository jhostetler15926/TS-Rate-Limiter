"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("./commands/stats");
const reset_1 = require("./commands/reset");
const args = process.argv.slice(2);
const command = args[0];
const key = args[1];
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
if (!command || !key) {
    console.log('Usage: stats <key> | reset <key>');
    process.exit(1);
}
if (command === 'stats') {
    (0, stats_1.showStats)(redisUrl, key);
}
else if (command === 'reset') {
    (0, reset_1.resetLimit)(redisUrl, key);
}
else {
    console.log(`Unknown command: ${command}`);
}

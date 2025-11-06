"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const expressLimiter_1 = require("../src/middleware/expressLimiter");
const RateLimiter_1 = require("../src/core/RateLimiter");
const RedisAdapter_1 = require("../src/adapters/RedisAdapter");
const configLoader_1 = require("../src/config/configLoader");
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const adapter = new RedisAdapter_1.RedisAdapter(redisUrl);
const config = (0, configLoader_1.loadConfig)();
const limiter = new RateLimiter_1.RateLimiter(config, adapter);
const app = (0, express_1.default)();
app.use((0, expressLimiter_1.expressLimiter)(limiter));
app.get('/test', (req, res) => res.send('OK'));
describe('ExpressLimiter middleware', () => {
    it('should allow request under limit', async () => {
        const res = await (0, supertest_1.default)(app).get('/test');
        expect(res.status).toBe(200);
    });
    it('should block request over limit', async () => {
        for (let i = 0; i < config.maxRequests; i++) {
            await (0, supertest_1.default)(app).get('/test');
        }
        const res = await (0, supertest_1.default)(app).get('/test');
        expect(res.status).toBe(429);
    });
});

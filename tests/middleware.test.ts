import request from 'supertest';
import express from 'express';
import { expressLimiter } from '../src/middleware/expressLimiter';
import { RateLimiter } from '../src/core/RateLimiter';
import { RedisAdapter } from '../src/adapters/RedisAdapter';
import { loadConfig } from '../src/config/configLoader';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const adapter = new RedisAdapter(redisUrl);
const config = loadConfig();
const limiter = new RateLimiter(config, adapter);

const app = express();
app.use(expressLimiter(limiter));
app.get('/test', (req, res) => res.send('OK'));

describe('ExpressLimiter middleware', () => {
  it('should allow request under limit', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
  });

  it('should block request over limit', async () => {
    for (let i = 0; i < config.maxRequests; i++) {
      await request(app).get('/test');
    }
    const res = await request(app).get('/test');
    expect(res.status).toBe(429);
  });
});

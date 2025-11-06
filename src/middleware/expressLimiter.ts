import { Request, Response, NextFunction } from 'express';
import { RateLimiter } from '../core/RateLimiter';

export const expressLimiter = (limiter: RateLimiter) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip: string = req.ip || req.connection.remoteAddress || 'unknown';
    const endpoint: string = typeof req.path === 'string' ? req.path : '/unknown';

    try {
      const allowed = await limiter.consume(ip, endpoint);
      if (!allowed) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      next();
    } catch (err) {
      console.error('Rate limiter error:', err);
      return res.status(500).json({ error: 'Internal rate limiter error' });
    }
  };
};

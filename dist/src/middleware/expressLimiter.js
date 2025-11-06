"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLimiter = void 0;
const expressLimiter = (limiter) => {
    return async (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const endpoint = typeof req.path === 'string' ? req.path : '/unknown';
        try {
            const allowed = await limiter.consume(ip, endpoint);
            if (!allowed) {
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }
            next();
        }
        catch (err) {
            console.error('Rate limiter error:', err);
            return res.status(500).json({ error: 'Internal rate limiter error' });
        }
    };
};
exports.expressLimiter = expressLimiter;

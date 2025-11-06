"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLimiter = void 0;
const expressLimiter = (limiter) => {
    return async (req, res, next) => {
        const ip = req.ip;
        const endpoint = req.path;
        const allowed = await limiter.consume(ip, endpoint);
        if (!allowed) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }
        next();
    };
};
exports.expressLimiter = expressLimiter;

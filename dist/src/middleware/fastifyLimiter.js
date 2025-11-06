"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyLimiter = void 0;
const fastifyLimiter = (limiter) => {
    return (fastify, opts, done) => {
        fastify.addHook('onRequest', async (request, reply) => {
            const ip = request.ip;
            const endpoint = request.routerPath || request.url;
            const allowed = await limiter.consume(ip, endpoint);
            if (!allowed) {
                reply.status(429).send({ error: 'Rate limit exceeded' });
            }
        });
        done();
    };
};
exports.fastifyLimiter = fastifyLimiter;

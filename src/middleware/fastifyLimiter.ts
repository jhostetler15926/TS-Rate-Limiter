import { FastifyPluginCallback } from 'fastify';
import { RateLimiter } from '../core/RateLimiter';

export const fastifyLimiter = (limiter: RateLimiter): FastifyPluginCallback => {
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

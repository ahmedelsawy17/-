import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    await prisma.$queryRaw`SELECT 1`;
    const redisState = await app.redis.ping();

    return {
      ok: true,
      db: 'up',
      redis: redisState === 'PONG' ? 'up' : 'down',
      ts: new Date().toISOString(),
    };
  });
}

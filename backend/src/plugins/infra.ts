import type { FastifyInstance } from 'fastify';
import jwt from '@fastify/jwt';
import websocket from '@fastify/websocket';
import multipart from '@fastify/multipart';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
    queues: {
      notifications: Queue;
    };
  }
}

export async function registerInfra(app: FastifyInstance) {
  const redis = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });

  app.decorate('redis', redis);
  app.decorate('queues', {
    notifications: new Queue('notifications', { connection: redis }),
  });

  await app.register(jwt, {
    secret: env.JWT_ACCESS_SECRET,
    sign: { expiresIn: env.ACCESS_TOKEN_TTL },
  });

  await app.register(websocket);
  await app.register(multipart, {
    limits: {
      fileSize: 1024 * 1024 * 500,
      files: 1,
    },
  });

  app.addHook('onClose', async () => {
    await app.queues.notifications.close();
    await redis.quit();
    await prisma.$disconnect();
  });
}

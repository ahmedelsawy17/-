import 'dotenv/config';
import Fastify from 'fastify';
import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import { env } from './config/env';
import { registerInfra } from './plugins/infra';
import { authRoutes } from './routes/auth';
import { healthRoutes } from './routes/health';
import { adminRoutes } from './routes/admin';
import { wsRoutes } from './ws/routes';
import { startQueueWorkers } from './queues/workers';

export async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true, credentials: true });
  await app.register(cookie);
  await app.register(rateLimit, { max: 250, timeWindow: '1 minute' });

  await registerInfra(app);

  app.register(async (instance) => {
    instance.get('/uploads/:file', async (request, reply) => {
      const { file } = request.params as { file: string };
      const safeFile = path.basename(file);
      const fullPath = path.join(process.cwd(), 'backend', 'uploads', safeFile);
      await access(fullPath);
      reply.type('video/mp4');
      return reply.send(createReadStream(fullPath));
    });
  });

  await app.register(healthRoutes, { prefix: '/api/health' });
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(adminRoutes, { prefix: '/api/admin' });
  await app.register(wsRoutes);

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    const err = error as { statusCode?: number; message?: string };
    reply.status(err.statusCode ?? 500).send({ message: err.message || 'Internal server error' });
  });

  return app;
}

async function start() {
  const app = await buildServer();
  startQueueWorkers();
  await app.listen({ port: env.PORT, host: '0.0.0.0' });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});

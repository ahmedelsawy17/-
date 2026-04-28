import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';

const redis = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });

export function startQueueWorkers() {
  const worker = new Worker(
    'notifications',
    async (job) => {
      if (job.name === 'welcome-email') {
        // Placeholder for email provider integration.
        console.log('Queue: welcome-email', job.data);
      }
    },
    { connection: redis },
  );

  worker.on('failed', (job, error) => {
    console.error('Job failed', job?.id, error.message);
  });

  return worker;
}

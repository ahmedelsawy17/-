import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';

type AuthPayload = {
  sub: string;
  role?: string;
};

async function requireAdmin(app: FastifyInstance, request: FastifyRequest) {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.slice('Bearer '.length);
  const payload = app.jwt.verify<AuthPayload>(token);

  if (payload.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  return payload;
}

export async function adminRoutes(app: FastifyInstance) {
  app.get('/students', async (request, reply) => {
    try {
      await requireAdmin(app, request);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      return reply.status(message === 'Forbidden' ? 403 : 401).send({ message });
    }

    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        enrollments: {
          select: {
            id: true,
            progress: true,
            course: { select: { id: true, title: true } },
          },
        },
      },
    });

    return reply.send({ totalStudents: students.length, students });
  });

  app.get('/stats', async (request, reply) => {
    try {
      await requireAdmin(app, request);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      return reply.status(message === 'Forbidden' ? 403 : 401).send({ message });
    }

    const [studentsCount, instructorsCount, adminsCount, coursesCount, videosCount] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'INSTRUCTOR' } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.course.count(),
      prisma.videoAsset.count(),
    ]);

    const recentEnrollments = await prisma.enrollment.findMany({
      take: 12,
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    });

    const enrollmentByDay = recentEnrollments.reduce<Record<string, number>>((acc, item) => {
      const day = item.createdAt.toISOString().slice(0, 10);
      acc[day] = (acc[day] ?? 0) + 1;
      return acc;
    }, {});

    return reply.send({
      counters: { studentsCount, instructorsCount, adminsCount, coursesCount, videosCount },
      enrollmentByDay,
    });
  });

  app.get('/videos', async (request, reply) => {
    try {
      await requireAdmin(app, request);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      return reply.status(message === 'Forbidden' ? 403 : 401).send({ message });
    }

    const videos = await prisma.videoAsset.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return reply.send({ total: videos.length, videos });
  });

  app.post('/videos/upload', async (request, reply) => {
    try {
      await requireAdmin(app, request);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      return reply.status(message === 'Forbidden' ? 403 : 401).send({ message });
    }

    const parts = request.parts();
    let fileBuffer: Buffer | null = null;
    let fileExt = '.mp4';
    let title = '';
    let description = '';
    let priceCents = 0;

    for await (const part of parts) {
      if (part.type === 'file') {
        fileExt = path.extname(part.filename || '.mp4') || '.mp4';
        fileBuffer = await part.toBuffer();
      } else {
        if (part.fieldname === 'title') title = String(part.value ?? '');
        if (part.fieldname === 'description') description = String(part.value ?? '');
        if (part.fieldname === 'priceCents') priceCents = Number(part.value ?? 0);
      }
    }

    if (!fileBuffer || !title || !Number.isFinite(priceCents) || priceCents < 0) {
      return reply.status(400).send({ message: 'Invalid upload payload' });
    }

    const filename = `${Date.now()}-${randomUUID()}${fileExt}`;
    const uploadsDir = path.join(process.cwd(), 'backend', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    const fullPath = path.join(uploadsDir, filename);
    await writeFile(fullPath, fileBuffer);

    const video = await prisma.videoAsset.create({
      data: {
        title,
        description: description || null,
        fileUrl: `/uploads/${filename}`,
        priceCents,
      },
    });

    return reply.status(201).send({ video });
  });

  app.patch('/videos/:id/price', async (request, reply) => {
    try {
      await requireAdmin(app, request);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      return reply.status(message === 'Forbidden' ? 403 : 401).send({ message });
    }

    const params = request.params as { id: string };
    const body = request.body as { priceCents?: number };

    if (!Number.isFinite(body.priceCents) || (body.priceCents ?? 0) < 0) {
      return reply.status(400).send({ message: 'Invalid price' });
    }

    const video = await prisma.videoAsset.update({
      where: { id: params.id },
      data: { priceCents: body.priceCents as number },
    });

    return reply.send({ video });
  });
}

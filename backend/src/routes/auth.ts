import type { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createUser, findUserByEmail, issueTokens, revokeRefreshToken, rotateRefreshToken, verifyPassword } from '../services/auth';

const signupSchema = z.object({ fullName: z.string().min(2), email: z.string().email(), password: z.string().min(8) });
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
const refreshSchema = z.object({ refreshToken: z.string().min(32), userId: z.string().uuid() });

type AuthPayload = {
  sub: string;
  email: string;
  fullName: string;
  role: string;
};

async function requireAuth(app: FastifyInstance, request: FastifyRequest) {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  const token = authHeader.slice('Bearer '.length);
  return app.jwt.verify<AuthPayload>(token);
}

export async function authRoutes(app: FastifyInstance) {
  app.get('/me', async (request, reply) => {
    try {
      const payload = await requireAuth(app, request);
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, fullName: true, email: true, role: true },
      });
      if (!user) return reply.status(401).send({ message: 'User not found' });
      return reply.send({ user });
    } catch (error) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
  });

  app.post('/signup', async (request, reply) => {
    const body = signupSchema.parse(request.body);
    const existing = await findUserByEmail(body.email);
    if (existing) return reply.status(409).send({ message: 'Email already exists' });

    const user = await createUser(body.fullName, body.email, body.password);
    const tokens = await issueTokens(app, user);

    await app.queues.notifications.add('welcome-email', { userId: user.id, email: user.email });

    return reply.status(201).send({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, ...tokens });
  });

  app.post('/login', async (request, reply) => {
    const body = loginSchema.parse(request.body);
    const user = await findUserByEmail(body.email);
    if (!user) return reply.status(401).send({ message: 'Invalid credentials' });

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) return reply.status(401).send({ message: 'Invalid credentials' });

    const tokens = await issueTokens(app, user);
    return reply.send({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, ...tokens });
  });

  app.post('/refresh', async (request, reply) => {
    const body = refreshSchema.parse(request.body);
    const user = await prisma.user.findUnique({ where: { id: body.userId } });
    if (!user) return reply.status(401).send({ message: 'Invalid refresh token' });

    const newRefreshToken = await rotateRefreshToken(app, user.id, body.refreshToken);
    if (!newRefreshToken) return reply.status(401).send({ message: 'Invalid refresh token' });

    const accessToken = app.jwt.sign({ sub: user.id, email: user.email, fullName: user.fullName, role: user.role });
    return reply.send({ accessToken, refreshToken: newRefreshToken, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } });
  });

  app.post('/logout', async (request, reply) => {
    const body = refreshSchema.parse(request.body);
    await revokeRefreshToken(app, body.userId, body.refreshToken);
    return reply.status(204).send();
  });
}


import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';

function sha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function createUser(fullName: string, email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 12);
  return prisma.user.create({
    data: { fullName, email: email.toLowerCase(), passwordHash },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function issueTokens(app: FastifyInstance, user: { id: string; email: string; fullName: string; role: string }) {
  const accessToken = app.jwt.sign({ sub: user.id, email: user.email, fullName: user.fullName, role: user.role });
  const refreshToken = crypto.randomBytes(48).toString('hex');
  const tokenHash = sha256(refreshToken);
  const ttlSeconds = env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60;
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

  await prisma.refreshToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  await app.redis.setex(`refresh:${user.id}:${tokenHash}`, ttlSeconds, '1');
  return { accessToken, refreshToken };
}

export async function rotateRefreshToken(app: FastifyInstance, userId: string, currentRefreshToken: string) {
  const currentHash = sha256(currentRefreshToken);
  const key = `refresh:${userId}:${currentHash}`;
  const exists = await app.redis.get(key);
  if (!exists) return null;

  await app.redis.del(key);
  await prisma.refreshToken.deleteMany({ where: { userId, tokenHash: currentHash } });

  const refreshToken = crypto.randomBytes(48).toString('hex');
  const newHash = sha256(refreshToken);
  const ttlSeconds = env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60;
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

  await prisma.refreshToken.create({ data: { userId, tokenHash: newHash, expiresAt } });
  await app.redis.setex(`refresh:${userId}:${newHash}`, ttlSeconds, '1');

  return refreshToken;
}

export async function revokeRefreshToken(app: FastifyInstance, userId: string, refreshToken: string) {
  const hash = sha256(refreshToken);
  await app.redis.del(`refresh:${userId}:${hash}`);
  await prisma.refreshToken.deleteMany({ where: { userId, tokenHash: hash } });
}

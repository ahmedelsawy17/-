# Platform Upgrade Notes

## Implemented now
- Fastify backend with JWT auth + refresh token rotation.
- Prisma ORM integrated with PostgreSQL.
- Redis cache/session support.
- PgBouncer added to Docker Compose.
- BullMQ queue (notifications) + worker scaffold.
- WebSocket endpoint at `/api/ws`.
- i18n in frontend (Arabic/English) and API integration.
- Kubernetes/Terraform/Prometheus scaffolds.
- Next.js App Router migration scaffold in `next-app/`.

## Run order
1. `npm run docker:up`
2. `npx prisma generate`
3. `npx prisma db push`
4. `npm run dev:backend`
5. `npm run dev`

## Important
- Current UI app remains Vite to preserve your existing platform.
- `next-app/` is a migration path for Next.js API Routes + App Router.

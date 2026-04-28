# Platform Project

## Run locally after cloning from GitHub

### 1) Requirements
- Node.js 20+
- Docker Desktop

### 2) Clone
```bash
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_NAME>
```

### 3) Setup environment
Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

On PowerShell:
```powershell
Copy-Item .env.example .env
```

Then edit `.env` and set real secrets for:
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

### 4) Install dependencies
```bash
npm install
```

### 5) Start Docker services (Postgres, PgBouncer, Redis)
```bash
npm run docker:up
```

### 6) Setup Prisma
```bash
npm run prisma:generate
npm run prisma:push
```

### 7) Run backend + frontend
Frontend:
```bash
npm run dev
```

Backend (new terminal):
```bash
npm run dev:backend
```

App URL: `http://localhost:3000`
API URL: `http://localhost:4000`

## Stop services
```bash
npm run docker:down
```
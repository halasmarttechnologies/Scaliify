# Scaliify

HR consultancy and technology advisory platform. Includes a marketing website, an interactive HR Tool Finder assessment, and a backend scoring API.

## Prerequisites

- **Node.js** 20+
- **PostgreSQL** 15+ (for backend API and tool finder submissions)
- **npm** 10+ (uses npm workspaces)

## Quick Start

```bash
# Install all dependencies (frontend, backend, shared)
npm install

# Set up environment variables
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Push database schema and seed tool data
npm run db:push
npm run db:seed

# Start frontend dev server (http://localhost:3000)
npm run dev

# Start backend API server (http://localhost:5000) in a second terminal
npm run dev:backend
```

## Monorepo Structure

```
scaliify/
├── frontend/          Next.js 16 App Router (React 19, Tailwind CSS 4, shadcn/ui)
│   ├── src/
│   │   ├── app/           Pages and layouts (App Router)
│   │   ├── components/    UI components organized by feature
│   │   ├── data/          Static data (tool finder questions)
│   │   ├── hooks/         Custom React hooks
│   │   └── lib/           API client, utilities
│   └── public/            Static assets (images, avatars)
├── backend/           Express 4 API (TypeScript, Drizzle ORM)
│   └── src/
│       ├── db/            Schema, migrations, seeds
│       ├── routes/        API route handlers
│       ├── schemas/       Zod validation schemas
│       └── services/      Business logic (recommendation engine)
├── shared/            @scaliify/shared — types, constants, Zod schemas
│   └── src/               Shared between frontend and backend
└── package.json       Workspace root
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend dev server |
| `npm run dev:backend` | Start backend API server |
| `npm run build` | Build frontend + backend for production |
| `npm run test` | Run frontend tests (Vitest) |
| `npm run test:backend` | Run backend tests (Vitest) |
| `npm run test:all` | Run all tests (frontend + backend + security) |
| `npm run lint:frontend` | Lint frontend with ESLint |
| `npm run db:push` | Push Drizzle schema to PostgreSQL |
| `npm run db:seed` | Seed tool catalog data |
| `npm run db:studio` | Open Drizzle Studio (DB GUI) |
| `npm run db:migrate` | Run database migrations |

## Key Features

- **HR Tool Finder** — 9-step guided assessment that scores 20+ HR platforms against company size, region, payroll model, and feature needs. Powered by a weighted scoring engine with 8 dimensions.
- **Client-side fallback** — Tool recommendations work even when the backend is unreachable, using an in-browser scoring approximation.
- **Session persistence** — Assessment progress is saved to localStorage and verified against PostgreSQL on reload.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Framer Motion, shadcn/ui |
| Backend | Express 4, TypeScript, Drizzle ORM |
| Database | PostgreSQL 15+ |
| Validation | Zod (shared schemas between frontend and backend) |
| Testing | Vitest (unit), Playwright (e2e) |

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL | `http://localhost:5000` |

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | API server port (default: 5000) |

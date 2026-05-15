# devflow-api

Backend API service for the DevFlow platform, built with NestJS, PostgreSQL, and Drizzle ORM.

## Tech stack

- **Runtime** — Node.js
- **Framework** — NestJS 11
- **Database** — PostgreSQL via `postgres-js` + Drizzle ORM
- **Language** — TypeScript 6
- **Package manager** — pnpm
- **Testing** — Vitest
- **Linting** — ESLint 10 (flat config) + Prettier

## Getting started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL instance (local or remote)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/buildwithella/devflow-api.git
cd devflow-api

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env and set DATABASE_URL
```

### Environment variables

| Variable       | Description                             | Required                    |
| -------------- | --------------------------------------- | --------------------------- |
| `NODE_ENV`     | `development` \| `production` \| `test` | No (default: `development`) |
| `PORT`         | Port the server listens on              | No (default: `3000`)        |
| `DATABASE_URL` | PostgreSQL connection string            | Yes                         |

### Running the server

```bash
# Development (watch mode)
pnpm start:dev

# Production build then run
pnpm build
pnpm start:prod
```

### API

All routes are versioned under `/api/v1`.

| Method | Path             | Description    |
| ------ | ---------------- | -------------- |
| `GET`  | `/api/v1/health` | Liveness check |

## Database

Drizzle Kit is used for schema management and migrations.

```bash
pnpm db:generate   # generate migrations from schema changes
pnpm db:migrate    # apply pending migrations
pnpm db:studio     # open Drizzle Studio in the browser
```

Table definitions live in `src/database/schema/`. Add a new file per domain and re-export it from `src/database/schema/index.ts`.

## Project structure

```
src/
├── main.ts                  # bootstrap (global pipe, versioning, CORS)
├── app.module.ts
├── app.controller.ts        # health check
├── config/
│   └── config.module.ts     # env validation with Joi
├── database/
│   ├── database.module.ts   # global module
│   ├── database.service.ts  # Drizzle + postgres-js client
│   └── schema/              # table definitions
└── common/
    ├── constants/
    └── utils/               # pick, omit, emptyToUndefined
```

## Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `pnpm start:dev`  | Run with tsx watch (hot reload) |
| `pnpm build`      | Compile to `dist/`              |
| `pnpm start:prod` | Run compiled output             |
| `pnpm test`       | Run test suite                  |
| `pnpm test:watch` | Run tests in watch mode         |
| `pnpm test:cov`   | Run tests with coverage         |
| `pnpm lint`       | Lint and auto-fix               |
| `pnpm format`     | Format with Prettier            |

## License

MIT

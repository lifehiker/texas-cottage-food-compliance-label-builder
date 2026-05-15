# Texas Cottage Food Compliance & Label Builder

Texas-specific SaaS for home bakers, candy makers, and farmers market vendors who need compliant labels, booth signs, allergen statements, reusable product records, and QR-linked ingredient pages.

## Stack

- Next.js 16 App Router
- TypeScript + Tailwind CSS v4
- Prisma + SQLite local fallback
- NextAuth v5 with credentials auth and optional Google OAuth
- Stripe with safe local billing fallback
- Resend with logged no-op fallback
- `@react-pdf/renderer` for printable exports

## Local Setup

Install dependencies, generate Prisma, apply the schema, and seed local demo data:

```bash
npm install
npm run prisma:generate
npm run prisma:push
npm run seed
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

Default local admin account after seeding:

- Email: `local-admin@example.com`
- Password: `texascottage123`

## Environment

The app is designed to run without third-party credentials for local verification.

- `DATABASE_URL` defaults to local SQLite.
- Leave Stripe keys blank to use local simulated plan upgrades.
- Leave Google OAuth blank to hide Google sign-in.
- Leave `RESEND_API_KEY` blank to log email sends instead of delivering them.

See `.env.example` for the full variable list.

## Build

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Docker image:

```bash
docker build .
```

## Deployment Notes

- `next.config.ts` uses `output: "standalone"` for container deployment.
- The production Dockerfile builds the standalone server and copies only files that exist in this repo.
- Coolify can run the resulting container with the same environment variables used locally, swapping in production secrets where available.
- If Stripe, Google OAuth, or Resend credentials are absent, the app stays operational by falling back to local plan simulation, credentials auth only, and logged no-op email delivery.

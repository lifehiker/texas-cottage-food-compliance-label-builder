# Forge PRD Tasks

Last updated: 2026-05-15 after Prisma config migration, rebuild verification, standalone runtime verification, live smoke tests, and route/API audit.

## Foundation
- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Inspect the existing codebase before editing.
- [x] Confirm App Router structure under `src/app`.
- [x] Confirm `next.config.ts` uses `output: "standalone"`.
- [x] Migrate Prisma seed config from deprecated `package.json#prisma` to `prisma.config.ts`.
- [x] Avoid `next/font/google`; use CSS/system fonts only.
- [x] Keep third-party SDK initialization out of module scope for Stripe and Resend call sites.
- [x] Verify build does not depend on network-only resources.
- [x] Normalize local SQLite runtime paths so standalone output and Prisma CLI use the same database file.

## Data Model
- [x] `User` model.
- [x] `Account` model.
- [x] `Session` model.
- [x] `VerificationToken` model.
- [x] `Subscription` model.
- [x] `Product` model with ingredient/allergen/business/public-page fields.
- [x] `ExportRecord` model.
- [x] `SiteSetting` model.
- [x] Prisma schema uses local SQLite fallback.
- [x] Prisma seed creates local admin, subscription, banner, and reusable templates.

## Auth
- [x] NextAuth v5 setup.
- [x] Trust deployed hosts for Auth.js runtime requests.
- [x] Prisma adapter wiring.
- [x] Credentials login flow.
- [x] Registration API with password hashing.
- [x] Optional Google OAuth guarded by env presence.
- [x] Session includes `user.id`, `user.role`, and `user.plan`.
- [x] Login/register UI.
- [x] Protected app layout redirects unauthenticated users.
- [x] Admin-only page guard.

## User-Facing Pages
- [x] `/`
- [x] `/pricing`
- [x] `/login`
- [x] `/app`
- [x] `/app/products/new`
- [x] `/app/products/[id]`
- [x] `/app/products/[id]/edit`
- [x] `/app/admin`
- [x] `/p/[publicSlug]`

## Marketing / SEO Pages
- [x] `/texas-cottage-food-law`
- [x] `/texas-cottage-food-label-template`
- [x] `/texas-cottage-food-sign-requirements`
- [x] `/texas-home-bakery-label`
- [x] `/ingredient-label-for-homemade-candy-texas`
- [x] `/freeze-dried-candy-label-template-texas`
- [x] `/texas-fudge-label-requirements`
- [x] `/allergen-statement-generator-texas-cottage-food`
- [x] `/where-can-you-sell-cottage-food-in-texas`
- [x] Shared marketing layout with header, footer, and update banner.
- [x] Metadata coverage for homepage, pricing, login, and long-tail pages.
- [x] FAQ JSON-LD on long-tail pages.
- [x] SoftwareApplication JSON-LD on homepage.
- [x] `robots.ts`
- [x] `sitemap.ts`
- [x] Internal-link CTAs from marketing content into generator and pricing flows.

## API / Server Actions
- [x] `src/app/api/auth/[...nextauth]/route.ts`
- [x] `src/app/api/register/route.ts`
- [x] `src/app/api/products/route.ts`
- [x] `src/app/api/products/[id]/route.ts` `PATCH`
- [x] `src/app/api/products/[id]/route.ts` `DELETE`
- [x] `src/app/api/products/[id]/duplicate/route.ts`
- [x] `src/app/api/products/[id]/public-page/route.ts`
- [x] `src/app/api/export/label/[id]/route.tsx`
- [x] `src/app/api/export/sign/[id]/route.tsx`
- [x] `src/app/api/stripe/checkout/route.ts`
- [x] `src/app/api/stripe/portal/route.ts`
- [x] `src/app/api/webhooks/stripe/route.ts`
- [x] `src/app/app/admin/page.tsx` server action for update-banner saves.

## Core Workflows
- [x] Live product form with ingredient and allergen inputs.
- [x] Texas-specific label generation.
- [x] Texas-specific booth sign generation.
- [x] Allergen statement generation.
- [x] Saved product create flow.
- [x] Saved product edit flow.
- [x] Saved product delete flow.
- [x] Saved product duplicate flow.
- [x] Reusable template library display.
- [x] Template-to-generator prefill flow.
- [x] Plan-aware product saving gates.
- [x] Plan-aware export gates.
- [x] Public ingredient/disclosure page generation for Pro.
- [x] Export history recording.
- [x] Admin-editable update banner.

## Billing / Email / Storage Integrations Or Safe Fallbacks
- [x] Stripe checkout with local-plan fallback when Stripe keys are absent.
- [x] Stripe billing portal with local redirect fallback.
- [x] Runtime billing redirects derive the request origin instead of hard-coding `localhost`.
- [x] Stripe webhook no-op fallback when webhook secret is absent.
- [x] Resend helper with logged no-op fallback.
- [x] Analytics helper with safe local behavior.
- [x] Public-page flow works without third-party storage.
- [x] Google OAuth hidden unless credentials exist.

## Deployment / Docker
- [x] Production Dockerfile for standalone Next.js output.
- [x] Dockerfile copies only directories/files that exist in this repo.
- [x] Dockerfile includes `next-env.d.ts` for clean container TypeScript builds.
- [x] Prisma CLI config is file-based and no longer emits the Prisma 7 deprecation warning during deploy-time seeding.
- [x] `.dockerignore`
- [x] README deployment notes updated for real app behavior.
- [x] Standalone runtime uses the generated `server.js` entrypoint successfully.
- [ ] `docker build .` verified if daemon access is available.

## Verification
- [x] `npm install`
- [x] Normalize unreadable local package permissions that blocked `next build` from reading installed dependencies.
- [x] `npm run seed`
- [x] `npm run build`
- [x] `npm run lint`
- [x] Start dev server successfully.
- [x] Smoke-test `/api/auth/session` to confirm no `UntrustedHost` runtime failure.
- [x] Smoke-test standalone `node .next/standalone/server.js`.
- [x] Smoke-test anonymous marketing routes.
- [x] Smoke-test auth redirect to `/login`.
- [x] Smoke-test registration flow.
- [x] Smoke-test credentials login flow.
- [x] Smoke-test local paid-plan fallback via checkout route.
- [x] Smoke-test product create flow.
- [x] Smoke-test product duplicate flow.
- [x] Smoke-test public-page generation flow.
- [x] Smoke-test public ingredient route.
- [x] Smoke-test label PDF export route.
- [x] Smoke-test sign PDF export route.
- [x] Create `FORGE_COMPLETION_AUDIT.md`.
- [x] Create `HUMAN_INPUT_NEEDED.md` for optional external integrations.

## Phase Status
- [x] Foundation
- [x] Data/Auth
- [x] Core workflows
- [x] Secondary workflows
- [x] Marketing/pages
- [x] Deployment
- [x] QA

## Remaining Constraint
- [ ] The Docker CLI is installed here, but the daemon socket is not accessible in this environment, so `docker build .` could not be executed locally despite the Dockerfile being prepared for standalone output.

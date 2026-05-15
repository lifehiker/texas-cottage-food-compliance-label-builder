# Forge Completion Audit

Last updated: 2026-05-15 after deployment runtime fixes, standalone runtime hardening, and verification.

## Product Goal
- Texas-specific workflow for cottage-food operators: implemented across [src/app/(marketing)/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/(marketing)/page.tsx), [src/components/product-form.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/product-form.tsx), [src/lib/compliance/generate-label.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/compliance/generate-label.ts), and [src/lib/compliance/generate-booth-sign.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/compliance/generate-booth-sign.ts).

## Data Model
- Prisma schema for users, auth, subscriptions, products, export history, and site settings: [prisma/schema.prisma](/opt/forge-builds/texas-cottage-food-compliance-label-builder/prisma/schema.prisma).
- Local seed data for admin, templates, and banner: [prisma/seed.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/prisma/seed.ts).
- Shared Prisma client with local SQLite fallback and standalone-safe SQLite path normalization: [src/lib/prisma.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/prisma.ts), [.env.example](/opt/forge-builds/texas-cottage-food-compliance-label-builder/.env.example).

## Auth
- NextAuth configuration, trusted-host runtime handling, session shaping, optional Google provider, and credentials auth: [src/lib/auth-helpers.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/auth-helpers.ts), [src/auth.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/auth.ts), [src/app/api/auth/[...nextauth]/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/auth/[...nextauth]/route.ts).
- Registration route with password hashing, default subscription creation, analytics, and email fallback: [src/app/api/register/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/register/route.ts).
- Auth UI and protected dashboard layout: [src/components/auth-forms.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/auth-forms.tsx), [src/app/app/layout.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/app/layout.tsx).

## Marketing / SEO
- Homepage, pricing, and long-tail marketing routes: [src/app/(marketing)](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/(marketing)).
- Shared reusable marketing page renderer with FAQ JSON-LD and worked examples: [src/components/marketing-page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/marketing-page.tsx).
- Metadata helpers: [src/lib/seo.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/seo.ts).
- Sitemap and robots: [src/app/sitemap.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/sitemap.ts), [src/app/robots.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/robots.ts).

## Core App Pages
- Dashboard overview, product list, export history, template library: [src/app/app/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/app/page.tsx).
- New-product generator with template-prefill flow and plan usage messaging: [src/app/app/products/new/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/app/products/new/page.tsx), [src/components/template-library.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/template-library.tsx).
- Product detail, export actions, duplicate/delete actions, and public-page generation: [src/app/app/products/[id]/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/app/products/[id]/page.tsx), [src/components/product-actions.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/product-actions.tsx).
- Product edit flow: [src/app/app/products/[id]/edit/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/app/products/[id]/edit/page.tsx).
- Public ingredient/disclosure route: [src/app/p/[publicSlug]/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/p/[publicSlug]/page.tsx).
- Admin update-banner editor: [src/app/app/admin/page.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/app/admin/page.tsx).

## Core Workflow Logic
- Product persistence, plan enforcement, duplication, slug generation, and form-value normalization: [src/lib/product-data.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/product-data.ts).
- Product validation: [src/lib/validation/product.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/validation/product.ts).
- Label preview UI: [src/components/label-preview.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/label-preview.tsx).
- Booth sign preview UI: [src/components/booth-sign-preview.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/booth-sign-preview.tsx).
- Compliance checklist panel: [src/components/checklist-panel.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/components/checklist-panel.tsx).

## APIs / Server Paths
- Product create: [src/app/api/products/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/products/route.ts).
- Product update/delete: [src/app/api/products/[id]/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/products/[id]/route.ts).
- Product duplicate: [src/app/api/products/[id]/duplicate/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/products/[id]/duplicate/route.ts).
- Public-page generation: [src/app/api/products/[id]/public-page/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/products/[id]/public-page/route.ts).
- Label PDF export: [src/app/api/export/label/[id]/route.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/export/label/[id]/route.tsx).
- Booth-sign PDF export: [src/app/api/export/sign/[id]/route.tsx](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/export/sign/[id]/route.tsx).
- Stripe checkout, portal, and webhook fallbacks: [src/app/api/stripe/checkout/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/stripe/checkout/route.ts), [src/app/api/stripe/portal/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/stripe/portal/route.ts), [src/app/api/webhooks/stripe/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/webhooks/stripe/route.ts).

## Billing / Email / Fallback Behavior
- Plan entitlements: [src/lib/billing/entitlements.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/billing/entitlements.ts), [src/lib/constants.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/constants.ts).
- Stripe lazy initialization and price lookup: [src/lib/stripe.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/stripe.ts).
- Request-origin aware absolute URL generation for billing redirects and return URLs: [src/lib/utils.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/utils.ts), [src/app/api/stripe/checkout/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/stripe/checkout/route.ts), [src/app/api/stripe/portal/route.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/app/api/stripe/portal/route.ts).
- Resend lazy initialization with no-op fallback: [src/lib/email.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/email.ts).
- Analytics safe fallback: [src/lib/analytics.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/analytics.ts).
- Update-banner persistence fallback through DB-backed site settings: [src/lib/site-settings.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/site-settings.ts).
- Update-banner read path gracefully falls back when the SQLite file or `SiteSetting` table is unavailable during first boot or prerender: [src/lib/site-settings.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/site-settings.ts).

## Deployment
- Standalone Next.js config: [next.config.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/next.config.ts).
- Production Dockerfile with standalone output and trusted-host runtime env: [Dockerfile](/opt/forge-builds/texas-cottage-food-compliance-label-builder/Dockerfile).
- Docker ignore file: [.dockerignore](/opt/forge-builds/texas-cottage-food-compliance-label-builder/.dockerignore).
- Local/deploy documentation: [README.md](/opt/forge-builds/texas-cottage-food-compliance-label-builder/README.md).
- Deployment/runtime hardening for host trust, request-origin billing redirects, and standalone SQLite path resolution: [src/lib/auth-helpers.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/auth-helpers.ts), [src/lib/utils.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/utils.ts), [src/lib/prisma.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/prisma.ts).

## Verification Performed
- `npm run build`: passed on 2026-05-15.
- `npm run lint`: passed on 2026-05-15.
- `npm run seed`: passed on 2026-05-15.
- `npm run dev`: started successfully on 2026-05-15 at `http://localhost:3000`.
- `node .next/standalone/server.js`: started successfully on 2026-05-15 at `http://127.0.0.1:3100`.
- `/api/auth/session`: returned `200` with `null` while unauthenticated, confirming the production `UntrustedHost` failure path is fixed locally.
- Standalone runtime smoke checks: `/` returned `200`, and `/api/auth/session` returned `200` with the production-style host header plus `X-Forwarded-Proto: https`.
- Anonymous smoke checks: `/`, `/pricing`, `/login`, `/texas-cottage-food-law`, `/texas-cottage-food-label-template`, `/texas-cottage-food-sign-requirements`, `/where-can-you-sell-cottage-food-in-texas` all returned `200`.
- Protected-route smoke check: `/app` redirected to `/login?next=/app` when unauthenticated.
- Authenticated smoke flow:
  - Registered a new user through `/api/register`.
  - Logged in through NextAuth credentials callback.
  - Upgraded via local Stripe fallback through `/api/stripe/checkout`.
  - Created a product through `/api/products`.
  - Duplicated the product through `/api/products/[id]/duplicate`.
  - Generated a public ingredient page through `/api/products/[id]/public-page`.
  - Loaded the resulting `/p/[publicSlug]` route with `200`.
  - Exported label and booth-sign PDFs with `200`.

## Intentionally Deferred External-Credential Items
- Real Stripe checkout, billing portal, and webhooks require Stripe account credentials and price IDs. The app still runs without them because the billing routes fall back to local plan upgrades and local billing redirects.
- Real Google OAuth requires Google client credentials. The app still runs without them because credentials login remains available and the Google button is hidden when env vars are absent.
- Real email delivery requires a Resend API key and a verified sender domain. The app still runs without them because registration email sends degrade to a logged no-op.
- Docker image build was not executed here because Docker daemon access was denied in this environment. The Dockerfile was still hardened for a standalone build and the app’s normal production build passed locally.

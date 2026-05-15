# Human Input Needed

Core app functionality does not require additional credentials. The app builds, starts, and works locally with SQLite plus safe fallbacks.

These items are only needed if you want the external integrations to run in live production mode instead of fallback mode:

## Stripe
- Provide `STRIPE_SECRET_KEY`
- Provide `STRIPE_WEBHOOK_SECRET`
- Provide `STRIPE_STARTER_PRICE_ID`
- Provide `STRIPE_PRO_PRICE_ID`
- Provide `STRIPE_ANNUAL_PRICE_ID`
- After adding them, point your Stripe webhook endpoint at `/api/webhooks/stripe`.

## Google OAuth
- Provide `GOOGLE_CLIENT_ID`
- Provide `GOOGLE_CLIENT_SECRET`
- Add the production callback URL for NextAuth in Google Cloud.

## Resend Email
- Provide `RESEND_API_KEY`
- Replace the placeholder sender in [src/lib/email.ts](/opt/forge-builds/texas-cottage-food-compliance-label-builder/src/lib/email.ts) with a verified sending domain/address you control.

## NextAuth Production Settings
- Provide a production `AUTH_SECRET` or `NEXTAUTH_SECRET` value.
- Provide the correct production app URL in `NEXT_PUBLIC_APP_URL`, `AUTH_URL`, or `NEXTAUTH_URL` so canonical metadata, sitemap URLs, and auth callbacks use your real domain.

## Docker Verification
- Docker is installed in this environment, but the daemon socket was not accessible here, so `docker build .` could not be run from this session.
- If you have Docker access, run `docker build .` from the repo root to verify the container image on your target machine.

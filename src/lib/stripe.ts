import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeClient;
}

export function getPriceIdForPlan(plan: string) {
  switch (plan) {
    case "STARTER":
      return process.env.STRIPE_STARTER_PRICE_ID;
    case "PRO":
      return process.env.STRIPE_PRO_PRICE_ID;
    case "ANNUAL":
      return process.env.STRIPE_ANNUAL_PRICE_ID;
    default:
      return null;
  }
}

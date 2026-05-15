import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { absoluteUrl } from "@/lib/utils";
import { getPriceIdForPlan, getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { plan } = (await request.json()) as { plan?: "STARTER" | "PRO" | "ANNUAL" };
  if (!plan) {
    return NextResponse.json({ error: "Plan is required." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: { plan, source: "LOCAL", status: "ACTIVE" },
      create: { userId: session.user.id, plan, source: "LOCAL", status: "ACTIVE" },
    });

    return NextResponse.json({ url: absoluteUrl("/app?upgrade=local") });
  }

  const priceId = getPriceIdForPlan(plan);
  if (!priceId) {
    return NextResponse.json({ error: "Stripe price ID missing for selected plan." }, { status: 400 });
  }

  const checkout = await stripe.checkout.sessions.create({
    customer_email: session.user.email || undefined,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: absoluteUrl("/app?upgrade=success"),
    cancel_url: absoluteUrl("/pricing?upgrade=cancelled"),
    metadata: {
      userId: session.user.id,
      plan,
    },
  });

  return NextResponse.json({ url: checkout.url });
}

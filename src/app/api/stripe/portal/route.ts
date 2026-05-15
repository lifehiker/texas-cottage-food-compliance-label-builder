import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { absoluteUrl } from "@/lib/utils";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const stripe = getStripe();
  if (!stripe || !subscription?.stripeCustomerId) {
    return NextResponse.json({ url: absoluteUrl("/pricing?billing=local") });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: absoluteUrl("/app"),
  });

  return NextResponse.json({ url: portal.url });
}

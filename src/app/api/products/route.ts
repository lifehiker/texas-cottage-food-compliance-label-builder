import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canSaveProducts } from "@/lib/billing/entitlements";
import { ensureUserSubscription, enforceProductLimit, getUserPlan, saveProduct } from "@/lib/product-data";
import { productSchema } from "@/lib/validation/product";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const plan = await getUserPlan(session.user.id);
  await ensureUserSubscription(session.user.id);

  if (!canSaveProducts(plan)) {
    return NextResponse.json({ error: "Upgrade to Starter or Pro to save products." }, { status: 403 });
  }

  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid product input." }, { status: 400 });
  }

  try {
    await enforceProductLimit(session.user.id, plan);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Product limit reached." },
      { status: 403 },
    );
  }

  const product = await saveProduct({
    userId: session.user.id,
    input: parsed.data,
  });

  return NextResponse.json({ product });
}

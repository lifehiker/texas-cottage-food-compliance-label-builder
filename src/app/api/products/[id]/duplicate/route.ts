import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canSaveProducts } from "@/lib/billing/entitlements";
import { prisma } from "@/lib/prisma";
import { duplicateProduct, enforceProductLimit, getUserPlan } from "@/lib/product-data";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const plan = await getUserPlan(session.user.id);
  if (!canSaveProducts(plan)) {
    return NextResponse.json({ error: "Upgrade to Starter or Pro to duplicate saved products." }, { status: 403 });
  }

  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  try {
    await enforceProductLimit(session.user.id, plan);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Product limit reached." },
      { status: 403 },
    );
  }

  const copy = await duplicateProduct(session.user.id, product);
  return NextResponse.json({ product: copy });
}

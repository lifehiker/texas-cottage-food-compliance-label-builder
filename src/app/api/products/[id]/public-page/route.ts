import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { canUsePublicPages } from "@/lib/billing/entitlements";
import { prisma } from "@/lib/prisma";
import { createPublicSlug, getUserPlan } from "@/lib/product-data";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const plan = await getUserPlan(session.user.id);
  if (!canUsePublicPages(plan)) {
    redirect("/pricing");
  }

  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!product) {
    redirect("/app");
  }

  const updated = await prisma.product.update({
    where: { id: product.id },
    data: {
      publicSlug: createPublicSlug(product.name),
      isPublic: true,
    },
  });

  redirect(`/app/products/${updated.id}`);
}

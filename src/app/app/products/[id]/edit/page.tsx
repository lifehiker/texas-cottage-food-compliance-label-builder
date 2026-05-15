import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ProductForm } from "@/components/product-form";
import { canSaveProducts } from "@/lib/billing/entitlements";
import { prisma } from "@/lib/prisma";
import { getUserPlan, toProductFormValues } from "@/lib/product-data";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id, userId: session?.user.id },
  });

  if (!session?.user || !product) {
    notFound();
  }

  const plan = await getUserPlan(session.user.id);

  return (
    <ProductForm
      allowSave={canSaveProducts(plan)}
      mode="edit"
      submitUrl={`/api/products/${product.id}`}
      initialValues={toProductFormValues(product)}
    />
  );
}

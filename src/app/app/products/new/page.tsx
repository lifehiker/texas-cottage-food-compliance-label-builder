import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/product-form";
import { TemplateLibrary } from "@/components/template-library";
import { Surface } from "@/components/ui";
import { canSaveProducts } from "@/lib/billing/entitlements";
import { prisma } from "@/lib/prisma";
import { getUserPlan, toProductFormValues } from "@/lib/product-data";
import { PLAN_DETAILS } from "@/lib/constants";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/app/products/new");
  }

  const { template: selectedTemplateId } = await searchParams;
  const [plan, templates, savedProductCount, selectedTemplate] = await Promise.all([
    getUserPlan(session.user.id),
    prisma.product.findMany({
      where: { isTemplate: true },
      orderBy: { name: "asc" },
    }),
    prisma.product.count({
      where: { userId: session.user.id, isTemplate: false },
    }),
    selectedTemplateId
      ? prisma.product.findFirst({
          where: { id: selectedTemplateId, isTemplate: true },
        })
      : Promise.resolve(null),
  ]);
  const productLimit = PLAN_DETAILS[plan].productLimit;

  return (
    <div className="space-y-6">
      <Surface className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Plan and usage</p>
        <p className="mt-2 text-sm leading-7 text-muted">
          {canSaveProducts(plan)
            ? productLimit === null
              ? `You are on ${PLAN_DETAILS[plan].name}. Saved product count: ${savedProductCount}.`
              : `You are on ${PLAN_DETAILS[plan].name}. Saved products: ${savedProductCount} of ${productLimit}.`
            : "You are on the Free plan. The live preview works, but saving products is locked until you upgrade to Starter or Pro."}
        </p>
        {selectedTemplate ? (
          <p className="mt-2 text-sm leading-7 text-muted">
            Starting from <span className="font-semibold text-foreground">{selectedTemplate.name}</span>. Review the ingredient order, allergens, and net quantity before saving.
          </p>
        ) : null}
      </Surface>
      <ProductForm
        allowSave={canSaveProducts(plan)}
        initialValues={selectedTemplate ? toProductFormValues(selectedTemplate) : undefined}
        mode="create"
        submitUrl="/api/products"
      />
      <TemplateLibrary savedTemplates={templates} />
    </div>
  );
}

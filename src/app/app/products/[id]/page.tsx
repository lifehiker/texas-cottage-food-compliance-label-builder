import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { BoothSignPreview } from "@/components/booth-sign-preview";
import { LabelPreview } from "@/components/label-preview";
import { DeleteProductButton, DuplicateProductButton } from "@/components/product-actions";
import { Button, Surface } from "@/components/ui";
import { canUsePublicPages } from "@/lib/billing/entitlements";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/product-data";

export default async function ProductDetailPage({
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
    <div className="space-y-6">
      <Surface className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">{product.category || "Product"}</p>
            <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
            <p className="mt-3 text-sm text-muted">{product.businessName} • {product.netQuantity || "Net quantity not set"}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" href={`/api/export/label/${product.id}`}>
              Export label PDF
            </Button>
            <Button variant="outline" href={`/api/export/sign/${product.id}`}>
              Export sign PDF
            </Button>
            <Button href={`/app/products/${product.id}/edit`}>
              Edit product
            </Button>
            <DuplicateProductButton productId={product.id} />
          </div>
        </div>
      </Surface>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <LabelPreview
          product={{
            name: product.name,
            category: product.category || undefined,
            description: product.description || undefined,
            ingredients: product.ingredients as never,
            allergens: product.allergens as never,
            netQuantity: product.netQuantity || undefined,
            businessName: product.businessName,
            businessAddress: product.businessAddress,
            contactEmail: product.contactEmail || undefined,
            contactPhone: product.contactPhone || undefined,
            notes: product.notes || undefined,
          }}
        />
        <BoothSignPreview
          product={{
            name: product.name,
            category: product.category || undefined,
            description: product.description || undefined,
            ingredients: product.ingredients as never,
            allergens: product.allergens as never,
            netQuantity: product.netQuantity || undefined,
            businessName: product.businessName,
            businessAddress: product.businessAddress,
            contactEmail: product.contactEmail || undefined,
            contactPhone: product.contactPhone || undefined,
            notes: product.notes || undefined,
          }}
        />
      </div>

      <Surface className="p-6">
        <h2 className="text-2xl font-semibold">Public ingredient page</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          Pro users can publish a QR-linked ingredient and disclosure page for any saved product.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {canUsePublicPages(plan) ? (
            <>
              <form action={`/api/products/${product.id}/public-page`} method="post">
                <Button type="submit">{product.publicSlug ? "Regenerate public link" : "Generate public link"}</Button>
              </form>
              {product.publicSlug ? (
                <Link className="text-sm font-semibold text-brand-deep" href={`/p/${product.publicSlug}`}>
                  Open public page →
                </Link>
              ) : null}
            </>
          ) : (
            <Button href="/pricing">
              Upgrade to Pro
            </Button>
          )}
        </div>
      </Surface>

      <Surface className="p-6">
        <h2 className="text-2xl font-semibold">Product management</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          Duplicate this SKU before changing flavors, or remove it if you no longer sell it.
        </p>
        <div className="mt-5">
          <DeleteProductButton productId={product.id} />
        </div>
      </Surface>
    </div>
  );
}

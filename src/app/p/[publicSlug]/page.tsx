import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TEXAS_DISCLOSURE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { SourceNotice } from "@/components/source-notice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ publicSlug: string }>;
}): Promise<Metadata> {
  const { publicSlug } = await params;
  const product = await prisma.product.findFirst({
    where: { publicSlug, isPublic: true },
    select: { name: true, businessName: true },
  });

  if (!product) {
    return {
      title: "Public ingredient page",
    };
  }

  return {
    title: `${product.name} ingredients`,
    description: `Public ingredient and allergen page for ${product.name} from ${product.businessName}.`,
  };
}

export default async function PublicIngredientPage({
  params,
}: {
  params: Promise<{ publicSlug: string }>;
}) {
  const { publicSlug } = await params;
  const product = await prisma.product.findFirst({
    where: { publicSlug, isPublic: true },
  });

  if (!product) {
    notFound();
  }

  const ingredients = product.ingredients as Array<{ name: string; subIngredients?: string }>;
  const allergens = product.allergens as string[];

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-border bg-white/70 p-8 shadow-[0_20px_50px_rgba(61,38,27,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Public ingredient page</p>
        <h1 className="mt-2 text-4xl font-semibold">{product.name}</h1>
        <p className="mt-3 text-sm text-muted">
          Produced by {product.businessName} • Updated {formatDate(product.updatedAt)}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            {ingredients
              .map((item) => (item.subIngredients ? `${item.name} (${item.subIngredients})` : item.name))
              .join(", ")}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Allergens</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{allergens.length ? allergens.join(", ") : "No major allergens selected."}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Producer details</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            {product.businessName}
            <br />
            {product.businessAddress}
            {product.contactEmail ? (
              <>
                <br />
                {product.contactEmail}
              </>
            ) : null}
            {product.contactPhone ? (
              <>
                <br />
                {product.contactPhone}
              </>
            ) : null}
          </p>
        </div>
        <div className="mt-8">
          <div className="mb-6 rounded-3xl border border-brand/15 bg-[rgba(255,242,222,0.55)] p-5 text-sm leading-7 text-muted">
            <p className="font-semibold text-foreground">Texas disclosure</p>
            <p className="mt-2">{TEXAS_DISCLOSURE}</p>
          </div>
          <SourceNotice />
        </div>
      </div>
    </div>
  );
}

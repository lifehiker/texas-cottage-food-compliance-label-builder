import slugify from "slugify";
import type { Product, PlanTier, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateBoothSign } from "@/lib/compliance/generate-booth-sign";
import { generateLabel } from "@/lib/compliance/generate-label";
import { PLAN_DETAILS } from "@/lib/constants";
import type { ProductSchemaInput, ProductSchemaValues } from "@/lib/validation/product";

export async function ensureUserSubscription(userId: string) {
  return prisma.subscription.upsert({
    where: { userId },
    update: {},
    create: { userId, plan: "FREE" },
  });
}

export async function getUserPlan(userId: string): Promise<PlanTier> {
  const subscription = await ensureUserSubscription(userId);
  return subscription.plan;
}

export async function enforceProductLimit(userId: string, plan: PlanTier) {
  const limit = PLAN_DETAILS[plan].productLimit;

  if (limit === null) {
    return;
  }

  const productCount = await prisma.product.count({
    where: { userId, isTemplate: false },
  });

  if (productCount >= limit) {
    throw new Error(`Your ${PLAN_DETAILS[plan].name} plan allows ${limit} saved products.`);
  }
}

export async function saveProduct({
  userId,
  input,
  productId,
}: {
  userId: string;
  input: ProductSchemaValues;
  productId?: string;
}) {
  const payload: Prisma.ProductUncheckedCreateInput | Prisma.ProductUncheckedUpdateInput = {
    userId,
    name: input.name,
    category: input.category,
    description: input.description,
    ingredients: input.ingredients,
    allergens: input.allergens,
    netQuantity: input.netQuantity,
    businessName: input.businessName,
    businessAddress: input.businessAddress,
    contactEmail: input.contactEmail || null,
    contactPhone: input.contactPhone || null,
    notes: input.notes || null,
    labelText: generateLabel(input),
    boothSignText: generateBoothSign(input),
  };

  if (productId) {
    const existing = await prisma.product.findFirst({
      where: { id: productId, userId },
    });

    if (!existing) {
      throw new Error("Product not found.");
    }

    return prisma.product.update({
      where: { id: productId },
      data: payload,
    });
  }

  return prisma.product.create({
    data: payload as Prisma.ProductUncheckedCreateInput,
  });
}

export async function duplicateProduct(userId: string, product: Product) {
  return prisma.product.create({
    data: {
      userId,
      name: `${product.name} Copy`,
      category: product.category,
      description: product.description,
      ingredients: product.ingredients as Prisma.InputJsonValue,
      allergens: product.allergens as Prisma.InputJsonValue,
      netQuantity: product.netQuantity,
      businessName: product.businessName,
      businessAddress: product.businessAddress,
      contactEmail: product.contactEmail,
      contactPhone: product.contactPhone,
      notes: product.notes,
      labelText: product.labelText,
      boothSignText: product.boothSignText,
      isTemplate: false,
    },
  });
}

export function createPublicSlug(name: string) {
  return `${slugify(name, { lower: true, strict: true })}-${Math.random().toString(36).slice(2, 8)}`;
}

export function toProductFormValues(
  product: Pick<
    Product,
    | "name"
    | "category"
    | "description"
    | "ingredients"
    | "allergens"
    | "netQuantity"
    | "businessName"
    | "businessAddress"
    | "contactEmail"
    | "contactPhone"
    | "notes"
  >,
): ProductSchemaInput {
  return {
    name: product.name,
    category: product.category || "",
    description: product.description || "",
    ingredients: product.ingredients as ProductSchemaInput["ingredients"],
    allergens: product.allergens as ProductSchemaInput["allergens"],
    netQuantity: product.netQuantity || "",
    businessName: product.businessName,
    businessAddress: product.businessAddress,
    contactEmail: product.contactEmail || "",
    contactPhone: product.contactPhone || "",
    notes: product.notes || "",
  };
}

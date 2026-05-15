import { TEXAS_DISCLOSURE } from "@/lib/constants";
import type { ProductInput } from "@/lib/types";

export function generateBoothSign(product: ProductInput) {
  return [
    product.businessName || "Your business name",
    product.businessAddress || "Your Texas address",
    product.contactEmail || product.contactPhone
      ? [product.contactEmail, product.contactPhone].filter(Boolean).join(" • ")
      : null,
    "",
    TEXAS_DISCLOSURE,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

import { TEXAS_DISCLOSURE } from "@/lib/constants";
import type { IngredientItem, ProductInput } from "@/lib/types";
import { generateAllergenStatement } from "./generate-allergen-statement";

function formatIngredient(ingredient: IngredientItem) {
  if (ingredient.subIngredients?.trim()) {
    return `${ingredient.name} (${ingredient.subIngredients.trim()})`;
  }

  return ingredient.name;
}

export function generateLabel(product: ProductInput) {
  const ingredientList = product.ingredients
    .filter((ingredient) => ingredient.name.trim())
    .map(formatIngredient)
    .join(", ");

  const lines = [
    product.name.trim(),
    product.netQuantity?.trim() ? `Net Wt: ${product.netQuantity.trim()}` : null,
    ingredientList ? `Ingredients: ${ingredientList}` : "Ingredients: Add your ingredient list.",
    generateAllergenStatement(product.allergens),
    `Produced by ${product.businessName.trim()}`,
    product.businessAddress.trim(),
    product.contactEmail?.trim() || product.contactPhone?.trim()
      ? [product.contactEmail?.trim(), product.contactPhone?.trim()].filter(Boolean).join(" • ")
      : null,
    TEXAS_DISCLOSURE,
  ];

  return lines.filter(Boolean).join("\n");
}

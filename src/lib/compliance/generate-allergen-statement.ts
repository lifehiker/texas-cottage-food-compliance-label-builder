export function generateAllergenStatement(allergens: string[]) {
  if (!allergens.length) {
    return "Contains: No major allergens selected.";
  }

  return `Contains: ${allergens.join(", ")}.`;
}

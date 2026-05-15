export type IngredientItem = {
  name: string;
  subIngredients?: string;
};

export type ProductInput = {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  ingredients: IngredientItem[];
  allergens: string[];
  netQuantity?: string;
  businessName: string;
  businessAddress: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
};

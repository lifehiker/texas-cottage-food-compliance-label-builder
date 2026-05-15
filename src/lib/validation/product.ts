import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  subIngredients: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.string().optional(),
  description: z.string().optional(),
  ingredients: z.array(ingredientSchema).min(1, "Add at least one ingredient"),
  allergens: z.array(z.string()).default([]),
  netQuantity: z.string().optional(),
  businessName: z.string().min(2, "Business name is required"),
  businessAddress: z.string().min(5, "Business address is required"),
  contactEmail: z.string().email("Enter a valid email").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

export type ProductSchemaInput = z.input<typeof productSchema>;
export type ProductSchemaValues = z.output<typeof productSchema>;

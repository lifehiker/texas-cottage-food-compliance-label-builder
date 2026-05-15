"use client";

import { useState, useTransition } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@prisma/client";
import { COMMON_ALLERGENS, PRODUCT_CATEGORIES } from "@/lib/constants";
import type { ProductInput } from "@/lib/types";
import { productSchema, type ProductSchemaInput } from "@/lib/validation/product";
import { LabelPreview } from "@/components/label-preview";
import { BoothSignPreview } from "@/components/booth-sign-preview";
import { ChecklistPanel } from "@/components/checklist-panel";
import { Button, Surface } from "@/components/ui";

type ProductFormProps = {
  initialValues?: ProductSchemaInput;
  submitUrl: string;
  mode: "create" | "edit";
  onSaved?: (product: Product) => void;
  allowSave: boolean;
};

const fallbackValues: ProductSchemaInput = {
  name: "Salted Pecan Blondies",
  category: "Bakery",
  description: "",
  ingredients: [{ name: "Flour" }, { name: "Brown sugar" }, { name: "Butter" }],
  allergens: ["Wheat", "Milk"],
  netQuantity: "8 oz (227 g)",
  businessName: "Hill Country Oven Co.",
  businessAddress: "123 Market Square, Austin, TX 78701",
  contactEmail: "hello@hillcountryoven.com",
  contactPhone: "",
  notes: "",
};

export function ProductForm({
  initialValues,
  submitUrl,
  mode,
  onSaved,
  allowSave,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const form = useForm<ProductSchemaInput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || fallbackValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const values = useWatch({ control: form.control });
  const previewValues: ProductInput = {
    name: values.name || fallbackValues.name,
    category: values.category || fallbackValues.category,
    description: values.description || fallbackValues.description,
    ingredients: values.ingredients?.length
      ? values.ingredients.map((ingredient) => ({
          name: ingredient?.name || "",
          subIngredients: ingredient?.subIngredients || "",
        }))
      : fallbackValues.ingredients,
    allergens: values.allergens || [],
    netQuantity: values.netQuantity || fallbackValues.netQuantity,
    businessName: values.businessName || fallbackValues.businessName,
    businessAddress: values.businessAddress || fallbackValues.businessAddress,
    contactEmail: values.contactEmail || fallbackValues.contactEmail,
    contactPhone: values.contactPhone || fallbackValues.contactPhone,
    notes: values.notes || fallbackValues.notes,
  };

  async function onSubmit(input: ProductSchemaInput) {
    if (!allowSave) {
      setMessage("Upgrade to Starter or Pro to save products. Preview still works below.");
      return;
    }

    startTransition(async () => {
      const response = await fetch(submitUrl, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Unable to save product.");
        return;
      }

      setMessage("Product saved.");
      onSaved?.(data.product as Product);
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Surface className="p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Generator</p>
          <h2 className="mt-2 text-2xl font-semibold">
            {mode === "create" ? "Build a new compliant product record" : "Edit product"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Enter product details, ingredients, allergens, and business information. The previews update in real time.
          </p>
        </div>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Product name" error={form.formState.errors.name?.message}>
              <input className="input" {...form.register("name")} />
            </Field>
            <Field label="Category">
              <select className="input" {...form.register("category")}>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea className="input min-h-24" {...form.register("description")} />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Ingredients</h3>
                <p className="text-sm text-muted">Reorder manually based on predominance. The app formats the list but does not verify recipe order.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ name: "", subIngredients: "" })}
              >
                Add ingredient
              </Button>
            </div>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <input
                    className="input"
                    placeholder="Ingredient"
                    {...form.register(`ingredients.${index}.name`)}
                  />
                  <input
                    className="input"
                    placeholder="Sub-ingredients (optional)"
                    {...form.register(`ingredients.${index}.subIngredients`)}
                  />
                  <Button type="button" variant="ghost" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Allergens</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {COMMON_ALLERGENS.map((allergen) => (
                <label key={allergen} className="flex items-center gap-3 rounded-2xl border border-border/80 bg-white/50 px-4 py-3 text-sm">
                  <input
                    type="checkbox"
                    value={allergen}
                    checked={values.allergens?.includes(allergen) || false}
                    onChange={(event) => {
                      const next = new Set(values.allergens || []);
                      if (event.target.checked) {
                        next.add(allergen);
                      } else {
                        next.delete(allergen);
                      }
                      form.setValue("allergens", [...next]);
                    }}
                  />
                  {allergen}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Net quantity">
              <input className="input" {...form.register("netQuantity")} />
            </Field>
            <Field label="Business name" error={form.formState.errors.businessName?.message}>
              <input className="input" {...form.register("businessName")} />
            </Field>
          </div>

          <Field label="Business address" error={form.formState.errors.businessAddress?.message}>
            <input className="input" {...form.register("businessAddress")} />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Contact email">
              <input className="input" {...form.register("contactEmail")} />
            </Field>
            <Field label="Contact phone">
              <input className="input" {...form.register("contactPhone")} />
            </Field>
          </div>

          <Field label="Internal notes">
            <textarea className="input min-h-24" {...form.register("notes")} />
          </Field>

          <div className="flex flex-col gap-3 border-t border-border/70 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted">{message || "Paid plans can save products, generate repeated exports, and publish QR ingredient pages."}</p>
            <Button disabled={isPending} type="submit">
              {mode === "create" ? "Save product" : "Update product"}
            </Button>
          </div>
        </form>
      </Surface>

      <div className="space-y-6">
        <LabelPreview product={previewValues} />
        <BoothSignPreview product={previewValues} />
        <ChecklistPanel />
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-700">{error}</span> : null}
    </label>
  );
}

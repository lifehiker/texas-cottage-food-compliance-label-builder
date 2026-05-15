import type { Product } from "@prisma/client";
import Link from "next/link";
import { templateProducts } from "@/lib/marketing-pages";
import { Button, Surface } from "@/components/ui";

type TemplateCard = {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  actionHref: string;
};

export function TemplateLibrary({
  savedTemplates,
  title = "Reusable template library",
  detailHref = "/app/products/new",
}: {
  savedTemplates?: Product[];
  title?: string;
  detailHref?: string;
}) {
  const cards: TemplateCard[] = savedTemplates?.length
    ? savedTemplates.map((template) => ({
        id: template.id,
        name: template.name,
        category: template.category || "Template",
        ingredients: (template.ingredients as Array<{ name: string }>).map((item) => item.name),
        actionHref: `${detailHref}?template=${template.id}`,
      }))
    : templateProducts.map((template) => ({
        id: template.name,
        name: template.name,
        category: template.category || "Template",
        ingredients: template.ingredients.map((item) => item.name),
        actionHref: detailHref,
      }));

  return (
    <Surface className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Templates</p>
      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        Start from bakery, candy, fudge, or freeze-dried candy structures and then adjust ingredient order, allergens, and net weight for each SKU.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {cards.map((template) => (
          <div key={template.id} className="rounded-[24px] border border-border/80 bg-white/55 p-5">
            <p className="text-sm font-semibold text-brand-deep">{template.category}</p>
            <h3 className="mt-2 text-xl font-semibold">{template.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{template.ingredients.join(", ")}</p>
            <div className="mt-4">
              <Button href={template.actionHref} variant="outline">
                Use this template
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Link className="mt-5 inline-block text-sm font-semibold text-brand-deep" href={detailHref}>
        Open generator and build from these examples →
      </Link>
    </Surface>
  );
}

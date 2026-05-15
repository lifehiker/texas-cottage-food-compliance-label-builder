import type { ProductInput } from "@/lib/types";
import { generateLabel } from "@/lib/compliance/generate-label";
import { Surface } from "@/components/ui";

export function LabelPreview({ product }: { product: ProductInput }) {
  return (
    <Surface className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Label preview</p>
          <h3 className="text-xl font-semibold">Texas product label</h3>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-deep">
          Review final wording against current Texas law
        </span>
      </div>
      <pre className="min-h-72 whitespace-pre-wrap rounded-[24px] bg-[#fffdf9] p-6 text-sm leading-7 text-foreground">
        {generateLabel(product)}
      </pre>
    </Surface>
  );
}

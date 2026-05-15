import type { ProductInput } from "@/lib/types";
import { generateBoothSign } from "@/lib/compliance/generate-booth-sign";
import { Surface } from "@/components/ui";

export function BoothSignPreview({ product }: { product: ProductInput }) {
  return (
    <Surface className="p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Booth sign</p>
        <h3 className="text-xl font-semibold">Disclosure sign preview</h3>
      </div>
      <div className="rounded-[24px] border border-brand/15 bg-[linear-gradient(135deg,#fffdf9,#ffe7c8)] p-8 text-center shadow-inner">
        {generateBoothSign(product)
          .split("\n")
          .map((line) => (
            <p
              key={line || "blank"}
              className="whitespace-pre-wrap text-balance text-base leading-8 text-brand-deep first:text-2xl first:font-black"
            >
              {line || "\u00A0"}
            </p>
          ))}
      </div>
    </Surface>
  );
}

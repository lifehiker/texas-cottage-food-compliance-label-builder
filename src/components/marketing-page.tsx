import Link from "next/link";
import { marketingPages } from "@/lib/marketing-pages";
import { SourceNotice } from "@/components/source-notice";
import { LabelPreview } from "@/components/label-preview";
import { BoothSignPreview } from "@/components/booth-sign-preview";
import { ChecklistPanel } from "@/components/checklist-panel";
import { Button, Surface } from "@/components/ui";

export function MarketingPage({ pageKey }: { pageKey: keyof typeof marketingPages }) {
  const page = marketingPages[pageKey];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="container-shell py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep">{page.eyebrow}</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance">{page.title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">{page.intro}</p>
          <ul className="space-y-4 text-sm leading-7 text-muted">
            {page.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button href="/app/products/new">
              Build a product
            </Button>
            <Button variant="outline" href="/pricing">
              Save and export with paid plans
            </Button>
          </div>
          <SourceNotice />
        </div>
        <div className="space-y-6">
          <LabelPreview product={page.exampleProduct} />
          <BoothSignPreview product={page.exampleProduct} />
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Surface className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">{page.exampleTitle}</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
            <p>
              Use this example as a starting structure, then move into the app dashboard when you need saved products, repeated exports, or public ingredient pages for QR codes.
            </p>
            <p>
              This page is intentionally practical: plain-English rules, a worked example, and a clear path into a generator instead of a long legal summary with no output.
            </p>
            <Link href="/app/products/new" className="font-semibold text-brand-deep">
              Open the full generator →
            </Link>
          </div>
        </Surface>
        <ChecklistPanel />
      </div>

      <div className="mt-12">
        <Surface className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">FAQ</p>
          <div className="mt-5 grid gap-4">
            {page.faq.map((item) => (
              <div key={item.question} className="rounded-3xl border border-border/80 bg-white/60 p-5">
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}

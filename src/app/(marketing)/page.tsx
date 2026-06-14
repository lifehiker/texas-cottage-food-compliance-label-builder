import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { ChecklistPanel } from "@/components/checklist-panel";
import { LabelPreview } from "@/components/label-preview";
import { BoothSignPreview } from "@/components/booth-sign-preview";
import { PricingCards } from "@/components/pricing-cards";
import { SourceNotice } from "@/components/source-notice";
import { TemplateLibrary } from "@/components/template-library";
import { Button, Surface } from "@/components/ui";
import { marketingPages } from "@/lib/marketing-pages";

export const metadata: Metadata = {
  title: "Texas Cottage Food Label Generator and Compliance Workflow",
  description:
    "Generate Texas cottage food labels, booth signs, allergen statements, and reusable product records for home bakers and market vendors.",
};

export default async function HomePage() {
  let session = null;
  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
    session = await Promise.race([auth(), timeout]);
  } catch {
    // auth() can throw on transient DB or NextAuth errors; fall back to unauthenticated UI
  }
  const example = marketingPages.label.exampleProduct;
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Texas Cottage Food Compliance & Label Builder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Starter monthly" },
      { "@type": "Offer", price: "39", priceCurrency: "USD", name: "Pro monthly" },
    ],
  };

  return (
    <div className="container-shell py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <section className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep">Texas-specific workflow</p>
          <h1 className="max-w-3xl text-6xl font-semibold tracking-tight text-balance">
            Generate compliant Texas cottage food labels, booth signs, and reusable product records.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            Built for home bakers, candy makers, and market vendors who do not need another blank design tool. Draft the wording, save your products, export PDFs, and publish QR-linked ingredient pages when you upgrade.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/app/products/new">
              Start the free generator
            </Button>
            <Button variant="outline" href="/texas-cottage-food-law">
              Read the Texas law summary
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Label generator", "Draft required wording, ingredient lists, and allergen statements."],
              ["Booth signs", "Print a reusable market disclosure sign with business details."],
              ["Saved catalog", "Keep your repeat SKUs ready for the next event."],
            ].map(([title, description]) => (
              <Surface key={title} className="p-5">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
              </Surface>
            ))}
          </div>
          <SourceNotice />
        </div>
        <div className="space-y-6">
          <LabelPreview product={example} />
          <BoothSignPreview product={example} />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <TemplateLibrary title="Start from bakery, candy, fudge, or freeze-dried candy examples." />
        <ChecklistPanel />
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Pricing</p>
            <h2 className="mt-2 text-3xl font-semibold">Free to test. Paid when you need repeat output.</h2>
          </div>
          <Link href="/pricing" className="text-sm font-semibold text-brand-deep">
            Full pricing →
          </Link>
        </div>
        <PricingCards currentPlan={session?.user?.plan} signedIn={Boolean(session?.user)} />
      </section>
    </div>
  );
}

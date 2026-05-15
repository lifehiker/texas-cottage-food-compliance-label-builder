import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/80 py-10 text-sm text-muted">
      <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">Texas Cottage Food Compliance & Label Builder</p>
          <p>Workflow assistance for home bakers, candy makers, and farmers market vendors.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/texas-cottage-food-law">Law summary</Link>
          <Link href="/texas-cottage-food-label-template">Label template</Link>
          <Link href="/texas-cottage-food-sign-requirements">Booth signs</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}

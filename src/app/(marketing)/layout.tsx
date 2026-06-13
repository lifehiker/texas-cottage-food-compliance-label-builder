import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UpdateBanner } from "@/components/update-banner";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense fallback={<div className="min-h-11 border-b border-brand/15 bg-brand-deep" />}>
        <UpdateBanner />
      </Suspense>
      <Suspense fallback={<div className="min-h-18 border-b border-border/80 bg-[rgba(251,244,234,0.88)]" />}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

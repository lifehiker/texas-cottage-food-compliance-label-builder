import type { Metadata } from "next";
import { auth } from "@/auth";
import { PricingCards } from "@/components/pricing-cards";
import { SourceNotice } from "@/components/source-notice";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Texas cottage food label builder pricing for free previews, saved product catalogs, repeated exports, and public ingredient pages.",
};

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="container-shell py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep">Pricing</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Choose the plan that matches your selling frequency.</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
        Free is for trying the workflow. Starter and Pro are for sellers who repeatedly print labels, signs, and ingredient pages throughout market season.
      </p>
      <div className="mt-8">
        <PricingCards currentPlan={session?.user.plan} signedIn={Boolean(session?.user)} />
      </div>
      <div className="mt-8">
        <SourceNotice />
      </div>
    </div>
  );
}

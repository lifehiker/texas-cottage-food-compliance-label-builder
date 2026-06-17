import type { Metadata } from "next";
import { auth } from "@/auth";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("freeze");

export default async function FreezeDriedCandyPage() {
  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
    await Promise.race([auth(), timeout]);
  } catch {
    // auth() can throw on transient DB or NextAuth errors; fall back to unauthenticated UI
  }

  return <MarketingPage pageKey="freeze" />;
}

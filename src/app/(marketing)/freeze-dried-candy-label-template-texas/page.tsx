import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("freeze");

export default function FreezeDriedCandyPage() {
  return <MarketingPage pageKey="freeze" />;
}

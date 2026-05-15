import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("fudge");

export default function TexasFudgeLabelRequirementsPage() {
  return <MarketingPage pageKey="fudge" />;
}

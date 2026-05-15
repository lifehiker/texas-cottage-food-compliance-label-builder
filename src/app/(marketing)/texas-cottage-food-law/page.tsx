import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("law");

export default function TexasCottageFoodLawPage() {
  return <MarketingPage pageKey="law" />;
}

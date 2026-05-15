import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("label");

export default function TexasCottageFoodLabelTemplatePage() {
  return <MarketingPage pageKey="label" />;
}

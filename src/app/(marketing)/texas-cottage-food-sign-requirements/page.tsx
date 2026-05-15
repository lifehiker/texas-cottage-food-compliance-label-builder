import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("sign");

export default function TexasCottageFoodSignRequirementsPage() {
  return <MarketingPage pageKey="sign" />;
}

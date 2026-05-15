import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("venue");

export default function WhereCanYouSellPage() {
  return <MarketingPage pageKey="venue" />;
}

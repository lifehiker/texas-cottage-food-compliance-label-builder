import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("allergen");

export default function AllergenStatementGeneratorPage() {
  return <MarketingPage pageKey="allergen" />;
}

import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("candy");

export default function IngredientLabelCandyPage() {
  return <MarketingPage pageKey="candy" />;
}

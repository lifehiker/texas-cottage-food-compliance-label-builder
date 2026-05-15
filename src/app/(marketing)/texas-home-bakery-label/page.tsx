import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { getMarketingMetadata } from "@/lib/seo";

export const metadata: Metadata = getMarketingMetadata("bakery");

export default function TexasHomeBakeryLabelPage() {
  return <MarketingPage pageKey="bakery" />;
}

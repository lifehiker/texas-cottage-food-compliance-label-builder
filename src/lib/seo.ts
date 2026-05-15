import type { Metadata } from "next";
import { marketingPages } from "@/lib/marketing-pages";
import { absoluteUrl } from "@/lib/utils";

const siteName = "Texas Cottage Food Compliance & Label Builder";
const defaultDescription =
  "Create compliant Texas cottage food labels, allergen statements, booth signs, and reusable product records for home bakery and market sales.";

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    openGraph: {
      type: "website",
      siteName,
      url: absoluteUrl("/"),
      title: siteName,
      description: defaultDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: defaultDescription,
    },
  };
}

export function getMarketingMetadata(pageKey: keyof typeof marketingPages): Metadata {
  const page = marketingPages[pageKey];
  const title = `${page.keyword} | Free Texas Template, Rules, and Label Generator`;
  const url = absoluteUrl(`/${page.slug}`);

  return {
    title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      siteName,
      title,
      description: page.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
    },
  };
}

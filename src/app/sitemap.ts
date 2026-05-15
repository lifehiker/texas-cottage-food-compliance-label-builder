import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

const routes = [
  "/",
  "/pricing",
  "/login",
  "/texas-cottage-food-law",
  "/texas-cottage-food-label-template",
  "/texas-cottage-food-sign-requirements",
  "/texas-home-bakery-label",
  "/ingredient-label-for-homemade-candy-texas",
  "/freeze-dried-candy-label-template-texas",
  "/texas-fudge-label-requirements",
  "/allergen-statement-generator-texas-cottage-food",
  "/where-can-you-sell-cottage-food-in-texas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
  }));
}

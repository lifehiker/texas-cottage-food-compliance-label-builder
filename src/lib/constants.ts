export const TEXAS_DISCLOSURE =
  "Made in a cottage food operation that is not subject to Texas food safety regulations.";

export const COMMON_ALLERGENS = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soy",
] as const;

export const PRODUCT_CATEGORIES = [
  "Bakery",
  "Candy",
  "Fudge",
  "Freeze-dried candy",
  "Snack mix",
  "Jams and preserves",
  "Other",
] as const;

export const PLAN_DETAILS = {
  FREE: {
    name: "Free",
    monthlyPrice: "$0",
    description: "Preview generators and unlock one authenticated export.",
    productLimit: 0,
    canUsePublicPages: false,
    unlimitedExports: false,
  },
  STARTER: {
    name: "Starter",
    monthlyPrice: "$19",
    description: "Save up to 10 products and export as often as you need.",
    productLimit: 10,
    canUsePublicPages: false,
    unlimitedExports: true,
  },
  PRO: {
    name: "Pro",
    monthlyPrice: "$39",
    description: "Unlimited products, QR ingredient pages, and export history.",
    productLimit: null,
    canUsePublicPages: true,
    unlimitedExports: true,
  },
  ANNUAL: {
    name: "Annual Starter",
    monthlyPrice: "$79/year",
    description: "Starter features billed annually for seasonal sellers.",
    productLimit: 10,
    canUsePublicPages: false,
    unlimitedExports: true,
  },
} as const;

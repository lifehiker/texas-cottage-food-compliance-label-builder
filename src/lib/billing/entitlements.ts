import type { PlanTier } from "@prisma/client";
import { PLAN_DETAILS } from "@/lib/constants";

export function getEntitlements(plan: PlanTier) {
  return PLAN_DETAILS[plan];
}

export function canSaveProducts(plan: PlanTier) {
  return plan !== "FREE";
}

export function canUsePublicPages(plan: PlanTier) {
  return PLAN_DETAILS[plan].canUsePublicPages;
}

export function hasUnlimitedExports(plan: PlanTier) {
  return PLAN_DETAILS[plan].unlimitedExports;
}

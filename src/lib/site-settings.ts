import { prisma } from "@/lib/prisma";

const DEFAULT_BANNER =
  "Texas sellers should review the latest state guidance before printing. This builder helps operationalize common wording, not replace legal review.";

export async function getUpdateBanner() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "updateBanner" },
  });

  return setting?.value || DEFAULT_BANNER;
}

export async function setUpdateBanner(value: string) {
  return prisma.siteSetting.upsert({
    where: { key: "updateBanner" },
    update: { value },
    create: { key: "updateBanner", value },
  });
}

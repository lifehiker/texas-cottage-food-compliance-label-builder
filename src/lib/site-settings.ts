import { prisma } from "@/lib/prisma";

const DEFAULT_BANNER =
  "Texas sellers should review the latest state guidance before printing. This builder helps operationalize common wording, not replace legal review.";

function isPrismaUnavailable(error: unknown) {
  return (
    error instanceof Error &&
    (error.message.includes("Unable to open the database file") ||
      error.message.includes("The table `main.SiteSetting` does not exist"))
  );
}

export async function getUpdateBanner() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "updateBanner" },
    });

    return setting?.value || DEFAULT_BANNER;
  } catch (error) {
    if (isPrismaUnavailable(error)) {
      return DEFAULT_BANNER;
    }

    throw error;
  }
}

export async function setUpdateBanner(value: string) {
  return prisma.siteSetting.upsert({
    where: { key: "updateBanner" },
    update: { value },
    create: { key: "updateBanner", value },
  });
}

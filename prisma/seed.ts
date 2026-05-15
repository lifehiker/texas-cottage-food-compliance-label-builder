import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { templateProducts } from "@/lib/marketing-pages";
import { generateBoothSign } from "@/lib/compliance/generate-booth-sign";
import { generateLabel } from "@/lib/compliance/generate-label";

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL || "local-admin@example.com").toLowerCase();

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Local Admin",
      role: "ADMIN",
      passwordHash: await bcrypt.hash("texascottage123", 10),
    },
  });

  await prisma.subscription.upsert({
    where: { userId: admin.id },
    update: { plan: "PRO", source: "LOCAL" },
    create: { userId: admin.id, plan: "PRO", source: "LOCAL" },
  });

  await prisma.siteSetting.upsert({
    where: { key: "updateBanner" },
    update: {},
    create: {
      key: "updateBanner",
      value:
        "Texas sellers should review the latest state guidance before printing. This builder helps operationalize common wording, not replace legal review.",
    },
  });

  for (const template of templateProducts) {
    const existing = await prisma.product.findFirst({
      where: { userId: admin.id, name: template.name, isTemplate: true },
    });

    if (!existing) {
      await prisma.product.create({
        data: {
          userId: admin.id,
          name: template.name,
          category: template.category,
          description: template.description,
          ingredients: template.ingredients,
          allergens: template.allergens,
          netQuantity: template.netQuantity,
          businessName: template.businessName,
          businessAddress: template.businessAddress,
          contactEmail: template.contactEmail,
          contactPhone: template.contactPhone,
          notes: template.notes,
          labelText: generateLabel(template),
          boothSignText: generateBoothSign(template),
          isTemplate: true,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

import { Document, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasUnlimitedExports } from "@/lib/billing/entitlements";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/product-data";

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 12, color: "#221813" },
  title: { fontSize: 18, marginBottom: 12, fontWeight: 700 },
  box: { border: "1 solid #c2562d", borderRadius: 12, padding: 18 },
  line: { marginBottom: 6 },
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const plan = await getUserPlan(session.user.id);
  const exportCount = await prisma.exportRecord.count({
    where: { userId: session.user.id },
  });

  if (!hasUnlimitedExports(plan) && exportCount >= 1) {
    return NextResponse.json({ error: "Free accounts get one authenticated export. Upgrade to export more." }, { status: 403 });
  }

  const pdf = await renderToBuffer(
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Texas Cottage Food Label</Text>
        <View style={styles.box}>
          {(product.labelText || "").split("\n").map((line) => (
            <Text key={line} style={styles.line}>
              {line}
            </Text>
          ))}
        </View>
      </Page>
    </Document>,
  );

  await prisma.exportRecord.create({
    data: {
      userId: session.user.id,
      productId: product.id,
      type: "LABEL",
      success: true,
    },
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${product.name}-label.pdf"`,
    },
  });
}

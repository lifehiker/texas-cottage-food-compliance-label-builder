import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { productSchema } from "@/lib/validation/product";
import { prisma } from "@/lib/prisma";
import { saveProduct } from "@/lib/product-data";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { id } = await params;
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid product input." }, { status: 400 });
  }

  const product = await saveProduct({
    userId: session.user.id,
    productId: id,
    input: parsed.data,
  });

  return NextResponse.json({ product });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.product.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import { sendTransactionalEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { ensureUserSubscription } from "@/lib/product-data";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!body.email || !body.password || body.password.length < 8) {
    return NextResponse.json({ error: "Email and an 8-character password are required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: body.email.toLowerCase() },
  });

  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email: body.email.toLowerCase(),
      name: body.name || body.email.split("@")[0],
      passwordHash: await bcrypt.hash(body.password, 10),
      role:
        body.email.toLowerCase() === (process.env.ADMIN_EMAIL || "local-admin@example.com").toLowerCase()
          ? "ADMIN"
          : "USER",
    },
  });

  await ensureUserSubscription(user.id);
  await trackServerEvent("user_registered", { userId: user.id, email: user.email });

  if (user.email) {
    await sendTransactionalEmail({
      to: user.email,
      subject: "Your Texas cottage food workspace is ready",
      html: `
        <p>Welcome to Texas Cottage Food Compliance &amp; Label Builder.</p>
        <p>Your free account is ready. You can start drafting labels, booth signs, and product records now.</p>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}

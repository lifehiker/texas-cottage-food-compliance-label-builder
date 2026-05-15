import { Resend } from "resend";

export async function sendTransactionalEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email:no-op]", { to, subject });
    return { delivered: false, provider: "noop" } as const;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Texas Cottage Food Builder <onboarding@example.com>",
    to,
    subject,
    html,
  });

  return { delivered: true, provider: "resend" } as const;
}

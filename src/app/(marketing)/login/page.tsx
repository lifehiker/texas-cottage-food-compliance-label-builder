import type { Metadata } from "next";
import { AuthForms } from "@/components/auth-forms";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to save Texas cottage food product records, export labels and booth signs, and manage your compliance workspace.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="container-shell py-16">
      <AuthForms
        googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)}
        next={next ?? "/app"}
      />
    </div>
  );
}

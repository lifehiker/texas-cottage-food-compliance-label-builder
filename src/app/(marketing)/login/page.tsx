import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForms } from "@/components/auth-forms";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to save Texas cottage food product records, export labels and booth signs, and manage your compliance workspace.",
};

export default function LoginPage() {
  return (
    <div className="container-shell py-16">
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <AuthForms googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)} />
      </Suspense>
    </div>
  );
}

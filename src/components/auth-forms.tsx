"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Surface } from "@/components/ui";

export function AuthForms({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const name = String(formData.get("name") || "");
    const next = params.get("next") || "/app";

    startTransition(async () => {
      if (mode === "register") {
        const registerResponse = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        const registerData = await registerResponse.json();
        if (!registerResponse.ok) {
          setMessage(registerData.error || "Unable to create account.");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Incorrect email or password.");
        return;
      }

      router.push(next);
      router.refresh();
    });
  }

  return (
    <Surface className="mx-auto w-full max-w-lg p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Access the app</p>
        <h1 className="mt-2 text-3xl font-semibold">Sign in or create an account</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Free accounts can test the workflow and unlock one authenticated export. Paid plans add saved products, repeated exports, and public ingredient pages.
        </p>
      </div>
      <div className="mb-6 flex gap-3">
        <Button variant={mode === "login" ? "primary" : "outline"} onClick={() => setMode("login")}>
          Log in
        </Button>
        <Button variant={mode === "register" ? "primary" : "outline"} onClick={() => setMode("register")}>
          Create account
        </Button>
      </div>
      <form action={handleSubmit} className="space-y-4">
        {mode === "register" ? <input className="input" name="name" placeholder="Business or owner name" /> : null}
        <input className="input" name="email" type="email" placeholder="Email" required />
        <input className="input" name="password" type="password" placeholder="Password" minLength={8} required />
        <Button className="w-full" disabled={isPending} type="submit">
          {mode === "login" ? "Log in" : "Create account"}
        </Button>
      </form>
      {googleEnabled ? (
        <Button
          className="mt-4 w-full"
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: params.get("next") || "/app" })}
        >
          Continue with Google
        </Button>
      ) : (
        <p className="mt-4 text-sm text-muted">Google sign-in appears automatically when OAuth credentials are configured.</p>
      )}
      {message ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
    </Surface>
  );
}

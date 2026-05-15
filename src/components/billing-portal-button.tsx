"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export function BillingPortalButton() {
  const router = useRouter();

  async function openPortal() {
    const response = await fetch("/api/stripe/portal", { method: "POST" });
    const data = (await response.json()) as { url?: string; error?: string };

    if (data.url) {
      router.push(data.url);
      router.refresh();
      return;
    }

    window.alert(data.error || "Unable to open billing portal.");
  }

  return (
    <Button variant="outline" onClick={openPortal}>
      Manage billing
    </Button>
  );
}

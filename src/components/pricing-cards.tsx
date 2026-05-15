"use client";

import { useRouter } from "next/navigation";
import { PLAN_DETAILS } from "@/lib/constants";
import { Button, Surface } from "@/components/ui";

export function PricingCards({
  currentPlan,
  signedIn,
}: {
  currentPlan?: string;
  signedIn: boolean;
}) {
  const router = useRouter();

  async function handleCheckout(plan: string) {
    if (!signedIn) {
      router.push(`/login?next=/pricing&plan=${plan}`);
      return;
    }

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const data = (await response.json()) as { url?: string; error?: string };

    if (data.url) {
      router.push(data.url);
      router.refresh();
      return;
    }

    window.alert(data.error || "Unable to continue to checkout.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {Object.entries(PLAN_DETAILS).map(([key, value]) => (
        <Surface
          key={key}
          className={`flex flex-col gap-5 p-6 ${key === "PRO" ? "border-brand/40 bg-[rgba(255,242,222,0.92)]" : ""}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">{value.name}</p>
            <h3 className="mt-3 text-3xl font-semibold">{value.monthlyPrice}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{value.description}</p>
          </div>
          <ul className="space-y-3 text-sm text-muted">
            <li>{value.productLimit === null ? "Unlimited products" : `${value.productLimit} saved products`}</li>
            <li>{value.unlimitedExports ? "Unlimited label and sign exports" : "One authenticated export"}</li>
            <li>{value.canUsePublicPages ? "QR-linked public ingredient pages" : "No public QR ingredient pages"}</li>
          </ul>
          <div className="mt-auto">
            {currentPlan === key ? (
              <Button className="w-full" variant="secondary" disabled>
                Current plan
              </Button>
            ) : key === "FREE" ? (
              <Button className="w-full" variant="outline" onClick={() => router.push("/app/products/new")}>
                Try generator
              </Button>
            ) : (
              <Button className="w-full" onClick={() => handleCheckout(key)}>
                Choose {value.name}
              </Button>
            )}
          </div>
        </Surface>
      ))}
    </div>
  );
}

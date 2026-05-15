"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export function DuplicateProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      variant="outline"
      onClick={() =>
        startTransition(async () => {
          const response = await fetch(`/api/products/${productId}/duplicate`, { method: "POST" });
          const data = (await response.json()) as { product?: { id: string }; error?: string };

          if (!response.ok || !data.product) {
            window.alert(data.error || "Unable to duplicate product.");
            return;
          }

          router.push(`/app/products/${data.product.id}`);
          router.refresh();
        })
      }
    >
      Duplicate
    </Button>
  );
}

export function DeleteProductButton({
  productId,
  redirectTo = "/app",
}: {
  productId: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <Button
        disabled={isPending}
        variant="ghost"
        onClick={() => {
          if (!window.confirm("Delete this product? This cannot be undone.")) {
            return;
          }

          startTransition(async () => {
            const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
            const data = (await response.json()) as { ok?: boolean; error?: string };

            if (!response.ok || !data.ok) {
              setError(data.error || "Unable to delete product.");
              return;
            }

            router.push(redirectTo);
            router.refresh();
          });
        }}
      >
        Delete product
      </Button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

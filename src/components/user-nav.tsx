"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui";

export function UserNav() {
  return (
    <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
      Sign out
    </Button>
  );
}

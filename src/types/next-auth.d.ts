import type { DefaultSession } from "next-auth";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      plan: "FREE" | "STARTER" | "PRO" | "ANNUAL";
    } & DefaultSession["user"];
  }

  interface User {
    role: "USER" | "ADMIN";
    plan?: "FREE" | "STARTER" | "PRO" | "ANNUAL";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN";
    plan?: "FREE" | "STARTER" | "PRO" | "ANNUAL";
  }
}

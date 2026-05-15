import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth-helpers";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

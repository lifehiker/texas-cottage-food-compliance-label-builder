import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui";
import { UserNav } from "@/components/user-nav";

const navLinks = [
  { href: "/texas-cottage-food-label-template", label: "Label generator" },
  { href: "/texas-cottage-food-sign-requirements", label: "Booth signs" },
  { href: "/where-can-you-sell-cottage-food-in-texas", label: "Venue rules" },
  { href: "/pricing", label: "Pricing" },
];

export async function SiteHeader() {
  let session = null;
  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
    session = await Promise.race([auth(), timeout]);
  } catch {
    // auth() can throw on transient DB or NextAuth errors; fall back to unauthenticated UI
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-[rgba(251,244,234,0.88)] backdrop-blur">
      <div className="container-shell flex min-h-18 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-sm font-black text-white">
            TX
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-deep">Texas Cottage Food</p>
            <p className="text-sm text-muted">Compliance & label builder</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Button variant="ghost" href="/app">
                Dashboard
              </Button>
              <UserNav />
            </>
          ) : (
            <>
              <Button variant="ghost" href="/login">
                Log in
              </Button>
              <Button href="/app/products/new">
                Start free
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

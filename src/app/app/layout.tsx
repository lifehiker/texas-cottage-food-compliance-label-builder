import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { UpdateBanner } from "@/components/update-banner";
import { BillingPortalButton } from "@/components/billing-portal-button";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/app");
  }

  return (
    <>
      <UpdateBanner />
      <SiteHeader />
      <div className="container-shell flex flex-1 gap-6 py-10 lg:flex-row">
        <aside className="card-surface hidden h-fit w-72 rounded-[28px] p-5 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Dashboard</p>
          <nav className="mt-5 space-y-2 text-sm text-muted">
            <Link className="block rounded-2xl px-3 py-2 hover:bg-white/60 hover:text-foreground" href="/app">
              Overview
            </Link>
            <Link className="block rounded-2xl px-3 py-2 hover:bg-white/60 hover:text-foreground" href="/app/products/new">
              New product
            </Link>
            <Link className="block rounded-2xl px-3 py-2 hover:bg-white/60 hover:text-foreground" href="/pricing">
              Plans
            </Link>
            {session.user.role === "ADMIN" ? (
              <Link className="block rounded-2xl px-3 py-2 hover:bg-white/60 hover:text-foreground" href="/app/admin">
                Update banner
              </Link>
            ) : null}
          </nav>
          <div className="mt-6 rounded-3xl border border-border/80 bg-white/60 p-4">
            <p className="text-sm font-semibold">Current plan: {session.user.plan}</p>
            <p className="mt-2 text-sm text-muted">Starter unlocks saved products. Pro adds public ingredient pages and export history.</p>
            <div className="mt-4">
              <BillingPortalButton />
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TemplateLibrary } from "@/components/template-library";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/product-data";
import { Surface, Button } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/app");
  }

  const userId = session.user.id;
  const [plan, products, exports, templates] = await Promise.all([
    getUserPlan(userId),
    prisma.product.findMany({
      where: { userId, isTemplate: false },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.exportRecord.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.product.findMany({
      where: { isTemplate: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <Surface className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Overview</p>
        <h1 className="mt-2 text-3xl font-semibold">Your Texas compliance workspace</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Build product labels, booth signs, ingredient pages, and repeatable records for the next market day. Your current plan is <span className="font-semibold text-foreground">{plan}</span>.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/app/products/new">
            New product
          </Button>
          <Button variant="outline" href="/pricing">
            Upgrade plan
          </Button>
        </div>
      </Surface>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Surface className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Saved products</h2>
            <Button variant="ghost" href="/app/products/new">
              Add product
            </Button>
          </div>
          <div className="space-y-4">
            {products.length ? (
              products.map((product) => (
                <div key={product.id} className="rounded-[24px] border border-border/80 bg-white/60 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brand-deep">{product.category || "Product"}</p>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="mt-2 text-sm text-muted">Updated {formatDate(product.updatedAt)}</p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" href={`/app/products/${product.id}`}>
                        View
                      </Button>
                      <Button href={`/app/products/${product.id}/edit`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-border bg-white/45 p-6 text-sm text-muted">
                No saved products yet. Create one from the generator or upgrade from Free if you are still previewing only.
              </div>
            )}
          </div>
        </Surface>

        <Surface className="p-6">
          <h2 className="text-2xl font-semibold">Recent exports</h2>
          <div className="mt-5 space-y-3">
            {exports.length ? (
              exports.map((record) => (
                <div key={record.id} className="rounded-2xl border border-border/70 bg-white/55 p-4 text-sm">
                  <p className="font-semibold">{record.type} export</p>
                  <p className="mt-1 text-muted">{record.product?.name || "Product"} • {formatDate(record.createdAt)}</p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-border bg-white/45 p-4 text-sm text-muted">
                Exports will appear here after you generate PDFs.
              </p>
            )}
          </div>
          <div className="mt-5 rounded-2xl border border-brand/15 bg-white/65 p-4 text-sm leading-7 text-muted">
            Need QR-linked ingredient pages? Upgrade to Pro, then open any product and generate a public share link.
          </div>
        </Surface>
      </div>

      <TemplateLibrary
        savedTemplates={templates}
        title="Template library for repeat market SKUs"
      />
    </div>
  );
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { setUpdateBanner, getUpdateBanner } from "@/lib/site-settings";
import { Button, Surface } from "@/components/ui";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/app");
  }

  const banner = await getUpdateBanner();

  async function saveBanner(formData: FormData) {
    "use server";

    const nextBanner = String(formData.get("banner") || "");
    await setUpdateBanner(nextBanner);
  }

  return (
    <Surface className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Admin</p>
      <h1 className="mt-2 text-3xl font-semibold">Update notice banner</h1>
      <form action={saveBanner} className="mt-6 space-y-4">
        <textarea className="input min-h-32" defaultValue={banner} name="banner" />
        <Button type="submit">Save banner</Button>
      </form>
    </Surface>
  );
}

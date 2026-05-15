import { getUpdateBanner } from "@/lib/site-settings";

export async function UpdateBanner() {
  const banner = await getUpdateBanner();

  return (
    <div className="border-b border-brand/15 bg-brand-deep text-[13px] text-white">
      <div className="container-shell flex min-h-11 items-center justify-center py-2 text-center">
        {banner}
      </div>
    </div>
  );
}

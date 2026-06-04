import { getUpdateBanner } from "@/lib/site-settings";

const DEFAULT_BANNER =
  "Texas sellers should review the latest state guidance before printing. This builder helps operationalize common wording, not replace legal review.";

export async function UpdateBanner() {
  let banner: string | null | undefined;
  try {
    banner = await getUpdateBanner();
  } catch {
    banner = DEFAULT_BANNER;
  }

  return (
    <div className="border-b border-brand/15 bg-brand-deep text-[13px] text-white">
      <div className="container-shell flex min-h-11 items-center justify-center py-2 text-center">
        {banner}
      </div>
    </div>
  );
}

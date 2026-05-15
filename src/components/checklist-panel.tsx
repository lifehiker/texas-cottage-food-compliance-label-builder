import { launchChecklist } from "@/lib/marketing-pages";
import { Surface } from "@/components/ui";

export function ChecklistPanel() {
  return (
    <Surface className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-deep">Checklist</p>
      <h3 className="mt-2 text-xl font-semibold">Texas market prep checklist</h3>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
        {launchChecklist.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Surface>
  );
}

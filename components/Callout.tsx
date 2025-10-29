import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "success" | "warning";

const VARIANT_STYLES: Record<CalloutVariant, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-500/50 dark:bg-sky-950/40 dark:text-sky-100",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-100"
};

type CalloutProps = {
  title?: string;
  variant?: CalloutVariant;
  children: ReactNode;
  className?: string;
};

export function Callout({ title, variant = "info", children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "not-prose space-y-2 rounded-lg border border-l-4 border-l-current px-4 py-3 text-sm shadow-sm",
        VARIANT_STYLES[variant],
        className
      )}
      role="note"
    >
      {title ? <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3> : null}
      <div className="space-y-1 leading-relaxed">{children}</div>
    </aside>
  );
}

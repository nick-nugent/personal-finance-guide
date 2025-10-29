import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RuleOfThumbProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function RuleOfThumb({ title, children, className }: RuleOfThumbProps) {
  return (
    <section
      className={cn(
        "not-prose space-y-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm text-muted-foreground shadow-sm",
        className
      )}
      aria-label="Rule of thumb"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Rule of Thumb</p>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}

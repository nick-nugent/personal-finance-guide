import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/Callout";
import { RuleOfThumb } from "@/components/RuleOfThumb";
import { resolveSources, type SourceId } from "@/data/sources";
import { cn } from "@/lib/utils";

type MDXPageProps = {
  title: string;
  lastReviewed: string;
  sourceIds: SourceId[];
  children: ReactNode;
  className?: string;
};

export const mdxComponents: MDXComponents = {
  Callout,
  RuleOfThumb
};

function formatLastReviewed(value: string) {
  try {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) {
      return value;
    }
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
  } catch (error) {
    console.warn("Unable to format last reviewed date:", error);
    return value;
  }
}

export function MDXPage({ title, lastReviewed, sourceIds, children, className }: MDXPageProps) {
  const sources = resolveSources(sourceIds);

  return (
    <main className={cn("mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-10", className)}>
      <article className="prose prose-slate mx-auto w-full max-w-none dark:prose-invert prose-headings:scroll-mt-24">
        <header className="not-prose mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Topic</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
          <p className="text-sm text-muted-foreground">Last reviewed: {formatLastReviewed(lastReviewed)}</p>
        </header>
        <div className="prose prose-slate max-w-none dark:prose-invert">{children}</div>
      </article>
      {sources.length > 0 ? (
        <section className="space-y-4 rounded-xl border border-border bg-muted/40 p-6">
          <header>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Sources</h2>
            <p className="text-sm text-muted-foreground">Explore the canonical references behind this guidance.</p>
          </header>
          <ul className="space-y-3">
            {sources.map((source) => (
              <li key={source.id} className="space-y-1">
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-primary underline-offset-4 hover:underline"
                >
                  {source.title}
                </a>
                <p className="text-sm text-muted-foreground">{source.blurb}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

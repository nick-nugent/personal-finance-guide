import { Metadata } from "next";

import { FlowchartTabsSection } from "./FlowchartTabs";

export const metadata: Metadata = {
  title: "Personal Finance Flowchart",
  description:
    "Follow the r/personalfinance-inspired roadmap to prioritize savings, debt payoff, and investing steps."
};

export default function FlowchartPage() {
  return (
    <main className="flex min-h-screen flex-col gap-8 bg-muted/30 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Flowchart</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Plan your next move in the personal finance priority order
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          Explore each step, open the drawer to learn more, and mark milestones as you work through the classic
          r/personalfinance flowchart.
        </p>
      </div>
      <div className="mx-auto w-full max-w-6xl flex-1">
        <FlowchartTabsSection />
      </div>
    </main>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4 py-24 text-center">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
          Personal Finance Guide
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Take charge of your money with confidence
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Build a clear roadmap for your financial goals. Start exploring the
          interactive flowchart soon to understand every step of your journey.
        </p>
        <Button asChild className="mt-4" aria-label="Go to Flowchart">
          <Link href="/flowchart">Go to Flowchart</Link>
        </Button>
      </div>
    </main>
  );
}

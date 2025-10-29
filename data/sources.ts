export type SourceId = "rpf" | "bogleheads" | "cfpb";

export type Source = {
  id: SourceId;
  title: string;
  href: string;
  blurb: string;
};

export const SOURCES: Source[] = [
  {
    id: "rpf",
    title: "r/personalfinance Wiki",
    href: "https://www.reddit.com/r/personalfinance/wiki/index/",
    blurb: "Community-driven playbook for tackling money goals in a sensible order."
  },
  {
    id: "bogleheads",
    title: "Bogleheads® Wiki",
    href: "https://www.bogleheads.org/wiki/Main_Page",
    blurb: "Evidence-based investing guidance focused on diversification and keeping costs low."
  },
  {
    id: "cfpb",
    title: "Consumer Financial Protection Bureau",
    href: "https://www.consumerfinance.gov/consumer-tools/",
    blurb: "U.S. government resource for unbiased financial education and actionable tools."
  }
];

export const SOURCES_BY_ID: Record<SourceId, Source> = SOURCES.reduce(
  (acc, source) => {
    acc[source.id] = source;
    return acc;
  },
  {} as Record<SourceId, Source>
);

export function resolveSources(ids: SourceId[]) {
  return ids
    .map((id) => SOURCES_BY_ID[id])
    .filter((source): source is Source => Boolean(source));
}

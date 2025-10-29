export type TabId =
  | "budgeting"
  | "debt"
  | "investing"
  | "safety-net"
  | "milestones"
  | "glossary"
  | "tools";

export type SectionTab = {
  id: TabId;
  label: string;
  anchor: string;
  blurb: string;
  topicSlug?: string;
};

export const SECTION_TABS: SectionTab[] = [
  {
    id: "budgeting",
    label: "Budgeting",
    anchor: "budgeting",
    blurb:
      "Dial in cash flow, track expenses, and build a plan so every dollar has a job before it leaves your account.",
    topicSlug: "start-here"
  },
  {
    id: "debt",
    label: "Debt",
    anchor: "debt",
    blurb: "Prioritize high-interest balances and choose payoff tactics to stay motivated without sacrificing essentials.",
    topicSlug: "debt-basics"
  },
  {
    id: "investing",
    label: "Investing",
    anchor: "investing",
    blurb:
      "Automate contributions, capture employer matches, and lean on diversified, low-cost index funds for long-term growth.",
    topicSlug: "investing-basics"
  },
  {
    id: "safety-net",
    label: "Safety Net",
    anchor: "safety-net",
    blurb:
      "Protect against surprises with emergency savings, insurance coverage, and buffers that keep your plan on track."
  },
  {
    id: "milestones",
    label: "Milestones",
    anchor: "milestones",
    blurb: "Celebrate the checkpoints that prove your plan is working and outline what comes next once they are met."
  },
  {
    id: "glossary",
    label: "Glossary",
    anchor: "glossary",
    blurb: "Demystify the jargon with quick definitions for the accounts, acronyms, and rules that appear throughout the guide."
  },
  {
    id: "tools",
    label: "Tools",
    anchor: "tools",
    blurb:
      "Keep a toolbox of calculators, checklists, and templates to revisit as your financial life evolves."
  }
];

export const NODE_SECTION_MAP: Record<string, TabId> = {
  start: "budgeting",
  "emergency-fund": "safety-net",
  "401k-match": "investing",
  "high-interest-debt": "debt",
  ira: "milestones",
  hsa: "tools",
  taxable: "glossary"
};

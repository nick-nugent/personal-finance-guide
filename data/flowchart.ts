export type FlowchartLink = {
  title: string;
  href: string;
};

export type FlowchartNode = {
  id: string;
  title: string;
  summary: string;
  links: FlowchartLink[];
  position: {
    x: number;
    y: number;
  };
};

export type FlowchartEdge = {
  id: string;
  source: string;
  target: string;
};

export const flowchartNodes: FlowchartNode[] = [
  {
    id: "start",
    title: "Start",
    summary: "Confirm your income, expenses, and minimum debt payments so you know what you can save each month.",
    links: [
      {
        title: "r/personalfinance Wiki: Budgeting",
        href: "https://www.reddit.com/r/personalfinance/wiki/budgeting/"
      },
      {
        title: "CFPB: Track your spending",
        href: "https://www.consumerfinance.gov/consumer-tools/budgeting/"
      }
    ],
    position: { x: 0, y: 0 }
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund",
    summary: "Build an emergency fund of at least $1,000 while covering minimum payments on all debts.",
    links: [
      {
        title: "r/personalfinance Wiki: Emergency Funds",
        href: "https://www.reddit.com/r/personalfinance/wiki/emergency_fund/"
      },
      {
        title: "Investopedia: Emergency Fund 101",
        href: "https://www.investopedia.com/terms/e/emergency_fund.asp"
      }
    ],
    position: { x: 0, y: 170 }
  },
  {
    id: "401k-match",
    title: "401(k) Match",
    summary: "Contribute enough to capture the full employer match in your workplace retirement plan.",
    links: [
      {
        title: "r/personalfinance Wiki: Employer Plans",
        href: "https://www.reddit.com/r/personalfinance/wiki/401k/"
      },
      {
        title: "Fidelity: Understanding 401(k) matches",
        href: "https://www.fidelity.com/viewpoints/retirement/understanding-401k-company-match"
      }
    ],
    position: { x: 0, y: 340 }
  },
  {
    id: "high-interest-debt",
    title: "High-Interest Debt",
    summary: "Aggressively pay down credit cards and other high-interest debt after securing your match.",
    links: [
      {
        title: "r/personalfinance Wiki: Debt",
        href: "https://www.reddit.com/r/personalfinance/wiki/debt/"
      },
      {
        title: "NerdWallet: Debt payoff strategies",
        href: "https://www.nerdwallet.com/article/finance/debt-payoff-guide"
      }
    ],
    position: { x: 0, y: 510 }
  },
  {
    id: "ira",
    title: "IRA",
    summary: "Maximize contributions to a Roth or Traditional IRA depending on eligibility and tax situation.",
    links: [
      {
        title: "r/personalfinance Wiki: IRAs",
        href: "https://www.reddit.com/r/personalfinance/wiki/ira/"
      },
      {
        title: "IRS: IRA contribution limits",
        href: "https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras"
      }
    ],
    position: { x: 0, y: 680 }
  },
  {
    id: "hsa",
    title: "HSA",
    summary: "If eligible for a High Deductible Health Plan, max out your Health Savings Account for triple tax advantages.",
    links: [
      {
        title: "r/personalfinance Wiki: HSAs",
        href: "https://www.reddit.com/r/personalfinance/wiki/health_insurance/#wiki_hsa"
      },
      {
        title: "Fidelity: Getting started with HSAs",
        href: "https://www.fidelity.com/viewpoints/personal-finance/hsa-basics"
      }
    ],
    position: { x: 0, y: 850 }
  },
  {
    id: "taxable",
    title: "Taxable Investing",
    summary: "Invest extra savings in a taxable brokerage account once tax-advantaged priorities are met.",
    links: [
      {
        title: "r/personalfinance Wiki: Investing",
        href: "https://www.reddit.com/r/personalfinance/wiki/investing/"
      },
      {
        title: "Bogleheads: Investing from taxable accounts",
        href: "https://www.bogleheads.org/wiki/Tax-efficient_fund_placement"
      }
    ],
    position: { x: 0, y: 1020 }
  }
];

export const flowchartEdges: FlowchartEdge[] = [
  { id: "start-emergency-fund", source: "start", target: "emergency-fund" },
  { id: "emergency-fund-401k-match", source: "emergency-fund", target: "401k-match" },
  { id: "401k-match-high-interest-debt", source: "401k-match", target: "high-interest-debt" },
  { id: "high-interest-debt-ira", source: "high-interest-debt", target: "ira" },
  { id: "ira-hsa", source: "ira", target: "hsa" },
  { id: "hsa-taxable", source: "hsa", target: "taxable" }
];

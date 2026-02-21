import type { Challenge } from "@/lib/types";

export const executiveSummary =
  "The core challenge here is building a multi-tenant analytics pipeline that ingests messy real-world CSV data from multiple retail stores and transforms it into actionable insights — fast. The system needs to handle inconsistent data formats gracefully while keeping each store's data isolated and secure.";

export const challenges: Challenge[] = [
  {
    id: "multi-tenant",
    title: "Multi-Tenant Data Isolation",
    description:
      "Each store needs its own data silo while sharing the same application infrastructure. One store must never see another store's inventory or revenue data.",
    visualizationType: "architecture",
    outcome:
      "Secure per-tenant data isolation with zero cross-tenant data leakage — using row-level security policies",
  },
  {
    id: "csv-parsing",
    title: "Handling Inconsistent CSV Formats",
    description:
      "Every store exports inventory data differently — different column names, date formats, number formats, missing fields. The system needs to normalize all of this automatically.",
    visualizationType: "flow",
    outcome:
      "Automated CSV normalization handles 95%+ of format variations without manual intervention",
  },
  {
    id: "top-bottom-ranking",
    title: "Top N / Bottom N SKU Rankings",
    description:
      "Ranking SKUs across stores isn't just sorting by revenue — it needs to account for velocity, margin, stock levels, and seasonal trends to surface truly actionable insights.",
    visualizationType: "before-after",
    outcome:
      "Multi-factor ranking that surfaces products needing action, not just highest revenue items",
  },
  {
    id: "ai-summaries",
    title: "AI Executive Summary Generation",
    description:
      "Turn raw inventory data into board-ready executive summaries using OpenAI. The challenge is structuring prompts that produce consistent, insightful output regardless of data volume.",
    visualizationType: "flow",
    outcome:
      "One-click executive summaries that save 2-3 hours of manual report writing per store per month",
  },
  {
    id: "stripe-billing",
    title: "Subscription Billing with Stripe",
    description:
      "Tiered pricing that scales with usage — store count and SKU limits need to sync with Stripe subscriptions, with graceful handling of upgrades, downgrades, and failed payments.",
    visualizationType: "tech-stack",
    outcome:
      "Automated billing lifecycle from signup to renewal with zero manual invoice processing",
  },
];

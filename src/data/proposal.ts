import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who builds SaaS MVPs that ship in weeks, not months",
  bio: "I build MVPs and production apps that solve real operational problems — SaaS platforms, AI-powered dashboards, and data analytics tools. My approach: understand the business need, build something that works, and ship it fast.",
  approach: [
    {
      title: "Understand the Problem",
      description:
        "Deep-read the requirements, map out the data model, identify the riskiest technical pieces first",
    },
    {
      title: "Build a Working Demo",
      description:
        "Ship a live demo within days — eliminates ambiguity faster than any spec doc",
    },
    {
      title: "Ship the MVP",
      description:
        "Production-ready first version with clean multi-tenant architecture, ready to extend",
    },
    {
      title: "Iterate Based on Feedback",
      description:
        "Short feedback cycles — you see progress every few days, no surprises",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: [
        "TypeScript",
        "React 19",
        "Next.js 16",
        "Tailwind CSS 4",
        "shadcn/ui",
        "Recharts",
      ],
    },
    {
      name: "Backend & APIs",
      skills: [
        "Node.js",
        "PostgreSQL",
        "REST APIs",
        "Stripe API",
        "OpenAI API",
        "CSV Processing",
      ],
    },
    {
      name: "SaaS Architecture",
      skills: [
        "Multi-Tenant Design",
        "Row-Level Security",
        "Subscription Billing",
        "PDF Generation",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "data-intel",
    title: "Data Intelligence Platform",
    description:
      "Unified analytics dashboard aggregating data across multiple sources with visualization and insight generation",
    outcome: "Aggregates data from 5+ sources into actionable dashboards",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    url: "https://data-intelligence-platform-sandy.vercel.app",
    relevance: "Similar analytics dashboard and data processing pipeline",
  },
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description:
      "Multi-module SaaS with asset tracking, work orders, preventive maintenance, and analytics dashboard",
    outcome:
      "6-module SaaS managing 500+ assets with maintenance scheduling",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance:
      "Multi-tenant SaaS architecture with complex data relationships",
  },
  {
    id: "dealer-hub",
    title: "DealerHub — Automotive SaaS",
    description:
      "Multi-tenant dealership platform with inventory management, AI-powered lead scoring, and revenue tracking",
    outcome:
      "Multi-module SaaS managing 187+ vehicles and $892K monthly revenue",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    url: "https://dealer-platform-neon.vercel.app",
    relevance: "Multi-tenant architecture with inventory analytics",
  },
  {
    id: "creator-economy",
    title: "Creator Economy Platform",
    description:
      "Livestreaming platform with Stripe Connect payments — end-to-end payment flow from viewer tip to creator payout",
    outcome: "End-to-end Stripe Connect payment integration",
    tech: ["Next.js", "TypeScript", "Stripe Connect"],
    relevance: "Stripe payment integration and subscription billing",
  },
];

import {
  Shield,
  FileSpreadsheet,
  BarChart3,
  Brain,
  CreditCard,
  ArrowRight,
  CheckCircle,
  XCircle,
  Layers,
  Database,
  Globe,
  Server,
} from "lucide-react";
import { challenges, executiveSummary } from "@/data/challenges";

/* ── Visualization: Multi-Tenant Architecture ── */
function MultiTenantArchitecture() {
  return (
    <div className="space-y-3">
      {/* Tenants row */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-1.5">
          <div className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
            <Globe className="mb-1 mx-auto h-4 w-4" />
            Store A
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
            <Globe className="mb-1 mx-auto h-4 w-4" />
            Store B
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
            <Globe className="mb-1 mx-auto h-4 w-4" />
            Store C
          </div>
        </div>
      </div>

      {/* Arrows down */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="h-4 w-px bg-border" />
          <ArrowRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
        </div>
      </div>

      {/* API + Auth layer */}
      <div className="mx-auto max-w-md rounded-lg border-2 border-[color:var(--warning)] bg-[color:var(--warning)]/10 px-5 py-3 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[color:var(--warning-foreground)]">
          <Server className="h-4 w-4" />
          API Layer + Auth Middleware
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          JWT verification &bull; Tenant ID injection &bull; Request scoping
        </p>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="h-4 w-px bg-border" />
          <ArrowRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
        </div>
      </div>

      {/* RLS Layer */}
      <div className="mx-auto max-w-md rounded-lg border-2 border-[color:var(--destructive)] bg-[color:var(--destructive)]/10 px-5 py-3 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          <Shield className="h-4 w-4 text-[color:var(--destructive)]" />
          Row-Level Security (RLS)
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Policies filter every query by <code className="font-mono text-xs bg-muted rounded px-1">tenant_id</code> — zero cross-tenant leakage
        </p>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="h-4 w-px bg-border" />
          <ArrowRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
        </div>
      </div>

      {/* Database */}
      <div className="mx-auto max-w-md rounded-lg border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10 px-5 py-3 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          <Database className="h-4 w-4 text-primary" />
          Shared PostgreSQL Database
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Single DB, shared tables, per-row tenant isolation
        </p>
      </div>
    </div>
  );
}

/* ── Visualization: CSV Parsing Flow ── */
function CSVParsingFlow() {
  const steps = [
    { label: "Raw CSV Upload", highlight: false },
    { label: "Format Detection", highlight: true },
    { label: "Column Mapping", highlight: false },
    { label: "Data Validation", highlight: false },
    { label: "Normalization", highlight: false },
    { label: "Clean Data", highlight: false },
  ];

  return (
    <div className="space-y-3">
      {/* Desktop flow (horizontal) */}
      <div className="hidden md:flex items-center justify-between gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1">
            <div
              className={`rounded-lg border px-3 py-2.5 text-center text-xs font-medium ${
                step.highlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile flow (vertical) */}
      <div className="flex md:hidden flex-col items-center gap-1.5">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center gap-1.5">
            <div
              className={`rounded-lg border px-4 py-2.5 text-center text-xs font-medium w-48 ${
                step.highlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-primary font-medium">
          <FileSpreadsheet className="h-3 w-3" />
          Format Detection
        </span>{" "}
        uses header heuristics + pattern matching to auto-map 30+ known CSV layouts
      </p>
    </div>
  );
}

/* ── Visualization: Before / After ── */
function BeforeAfterComparison() {
  const before = [
    "Sort by revenue only",
    "Misses low-margin high-sellers",
    "No seasonal context",
    "Static monthly rankings",
  ];

  const after = [
    "Multi-factor scoring",
    "Revenue \u00d7 margin \u00d7 velocity",
    "Seasonal trend adjustment",
    "Real-time ranking updates",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Before */}
      <div className="rounded-lg bg-[color:var(--destructive)]/10 border border-[color:var(--destructive)]/20 p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--destructive)]">
          <XCircle className="h-4 w-4" />
          Before: Naive Sorting
        </div>
        <ul className="space-y-2">
          {before.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--destructive)]/60" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div className="rounded-lg bg-[color:var(--success)]/10 border border-[color:var(--success)]/20 p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--success)]">
          <CheckCircle className="h-4 w-4" />
          After: Multi-Factor Ranking
        </div>
        <ul className="space-y-2">
          {after.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--success)]/60" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Visualization: AI Summary Flow ── */
function AISummaryFlow() {
  const steps = [
    { label: "Store Data", highlight: false },
    { label: "Data Aggregation", highlight: false },
    { label: "Prompt Engineering", highlight: true },
    { label: "OpenAI API", highlight: true },
    { label: "Structured Output", highlight: false },
    { label: "PDF Report", highlight: false },
  ];

  return (
    <div className="space-y-3">
      {/* Desktop flow */}
      <div className="hidden md:flex items-center justify-between gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1">
            <div
              className={`rounded-lg border px-3 py-2.5 text-center text-xs font-medium ${
                step.highlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile flow */}
      <div className="flex md:hidden flex-col items-center gap-1.5">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center gap-1.5">
            <div
              className={`rounded-lg border px-4 py-2.5 text-center text-xs font-medium w-48 ${
                step.highlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-primary font-medium">
          <Brain className="h-3 w-3" />
          Prompt Engineering
        </span>{" "}
        uses structured templates with inventory KPIs to generate consistent, actionable summaries
      </p>
    </div>
  );
}

/* ── Visualization: Stripe Billing Tech Stack ── */
function StripeTechStack() {
  const layers = [
    {
      label: "Frontend",
      tech: "Next.js + React",
      desc: "Pricing page, checkout flow, billing portal",
      accent: true,
    },
    {
      label: "API",
      tech: "Next.js API Routes",
      desc: "Webhook handlers, subscription sync",
      accent: false,
    },
    {
      label: "Payments",
      tech: "Stripe SDK",
      desc: "Checkout sessions, customer portal, invoicing",
      accent: true,
    },
    {
      label: "Database",
      tech: "PostgreSQL",
      desc: "Subscription status, usage tracking, plan limits",
      accent: false,
    },
  ];

  return (
    <div className="space-y-2">
      {layers.map((layer) => (
        <div
          key={layer.label}
          className={`flex items-center gap-4 rounded-lg border px-4 py-3 ${
            layer.accent ? "bg-primary/5 border-primary/15" : "bg-card border-border"
          }`}
        >
          <div className="w-20 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {layer.label}
            </span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="min-w-0 flex-1">
            <span className="text-sm font-semibold">{layer.tech}</span>
            <span className="ml-2 text-xs text-muted-foreground">
              — {layer.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Icon map per challenge ── */
const challengeIcons: Record<string, React.ReactNode> = {
  "multi-tenant": <Shield className="h-5 w-5 text-primary" />,
  "csv-parsing": <FileSpreadsheet className="h-5 w-5 text-primary" />,
  "top-bottom-ranking": <BarChart3 className="h-5 w-5 text-primary" />,
  "ai-summaries": <Brain className="h-5 w-5 text-primary" />,
  "stripe-billing": <CreditCard className="h-5 w-5 text-primary" />,
};

/* ── Visualization map ── */
const visualizations: Record<string, React.ReactNode> = {
  "multi-tenant": <MultiTenantArchitecture />,
  "csv-parsing": <CSVParsingFlow />,
  "top-bottom-ranking": <BeforeAfterComparison />,
  "ai-summaries": <AISummaryFlow />,
  "stripe-billing": <StripeTechStack />,
};

/* ── Page ── */
export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">My Approach</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the key technical challenges in this project
          </p>
        </div>

        {/* Executive summary */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {executiveSummary}
          </p>
        </div>

        {/* Challenge cards */}
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="rounded-xl bg-gradient-to-br from-accent/5 to-background shadow-lg border border-primary/10 p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Title + icon */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  {challengeIcons[challenge.id]}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{challenge.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {challenge.description}
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="rounded-lg border border-border/60 bg-card/50 p-4">
                {visualizations[challenge.id]}
              </div>

              {/* Outcome */}
              {challenge.outcome && (
                <div className="flex items-start gap-2 pt-2 border-t border-border">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--success)]" />
                  <p className="text-sm font-medium text-[color:var(--success)]">
                    {challenge.outcome}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Closer */}
        <div className="text-center py-8 border-t border-border space-y-2">
          <p className="text-lg font-semibold">
            Ready to discuss the approach?
          </p>
          <p className="text-sm text-muted-foreground">
            Let&apos;s talk through how these solutions apply to your specific
            setup.
          </p>
        </div>
      </div>
    </div>
  );
}

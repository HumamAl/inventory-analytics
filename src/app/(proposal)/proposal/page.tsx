import { ExternalLink, Sparkles, Code2, Rocket, MessageSquare } from "lucide-react";
import { profile, portfolioProjects } from "@/data/proposal";

const stepIcons = [Sparkles, Code2, Rocket, MessageSquare];

const socialProofStats = [
  { label: "Projects shipped", value: "50+" },
  { label: "Industries served", value: "15+" },
  { label: "Demo turnaround", value: "< 48hr" },
];

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Section 1 — Hero */}
        <section className="text-center py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Sparkles className="h-3 w-3" />
            Built this demo for your project
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {profile.tagline}
          </p>

          {/* Social proof stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {socialProofStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8 leading-relaxed max-w-2xl mx-auto">
            {profile.bio}
          </p>
        </section>

        {/* Section 2 — Proof of Work */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Relevant Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className="rounded-xl bg-gradient-to-br from-accent/5 to-background shadow-lg border border-primary/10 p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "400ms",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1.5">
                  {project.description}
                </p>
                <p className="text-sm text-primary font-medium mt-3">
                  {project.outcome}
                </p>
                {project.relevance && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="font-medium">Why this is relevant:</span>{" "}
                    {project.relevance}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — How I Work */}
        <section>
          <h2 className="text-xl font-semibold mb-6">How I Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.approach.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl border bg-card shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    animationDuration: "400ms",
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <p className="text-sm font-semibold">{step.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Typical MVP: 2-3 weeks from kickoff to production
          </p>
        </section>

        {/* Section 4 — Skills Grid */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile.skillCategories.map((category, index) => (
              <div
                key={category.name}
                className="rounded-xl border bg-card p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationDuration: "400ms",
                }}
              >
                <h3 className="text-sm font-semibold mb-3">{category.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — CTA */}
        <section className="rounded-xl bg-primary/5 border border-primary/20 text-center py-10 px-6">
          <h2 className="text-xl font-semibold">
            Let&apos;s build this together
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            This demo covers the full feature set — multi-tenant stores, CSV
            upload, Top N/Bottom N rankings, AI summaries, and Stripe billing. I
            can have the production version scoped and started within days.
          </p>
          <p className="text-sm font-medium text-primary mt-6">— Humam</p>
        </section>
      </div>
    </div>
  );
}

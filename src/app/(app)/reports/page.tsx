"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Lightbulb,
  Target,
  Trophy,
  AlertTriangle,
  FileDown,
  RefreshCw,
  Loader2,
  Sparkles,
  Calendar,
} from "lucide-react";
import { aiSummaries, stores } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";

export default function ReportsPage() {
  const storesWithSummaries = stores.filter((s) =>
    aiSummaries.some((a) => a.storeId === s.id)
  );
  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    storesWithSummaries[0]?.id ?? ""
  );
  const [generating, setGenerating] = useState(false);
  const [pdfMessage, setPdfMessage] = useState(false);

  const summary = aiSummaries.find((s) => s.storeId === selectedStoreId);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 2000);
  };

  const handleDownloadPdf = () => {
    setPdfMessage(true);
    setTimeout(() => setPdfMessage(false), 3000);
  };

  const sections = summary
    ? [
        {
          title: "Key Insights",
          icon: Lightbulb,
          items: summary.keyInsights,
          iconColor: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "Recommendations",
          icon: Target,
          items: summary.recommendations,
          iconColor: "text-[color:var(--success)]",
          bgColor: "bg-[color:var(--success)]/10",
        },
        {
          title: "Top Performers",
          icon: Trophy,
          items: summary.topPerformers,
          iconColor: "text-[color:var(--warning)]",
          bgColor: "bg-[color:var(--warning)]/10",
        },
        {
          title: "Risk Items",
          icon: AlertTriangle,
          items: summary.riskItems,
          iconColor: "text-destructive",
          bgColor: "bg-destructive/10",
        },
      ]
    : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground">
          AI-generated executive summaries and insights
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder="Select a store..." />
          </SelectTrigger>
          <SelectContent>
            {storesWithSummaries.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDownloadPdf}
            disabled={!summary}
            className="gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download PDF
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={generating || !selectedStoreId}
            className="gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Generate New Summary
              </>
            )}
          </Button>
        </div>
      </div>

      {pdfMessage && (
        <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 animate-in fade-in slide-in-from-top-2">
          <FileDown className="h-4 w-4" />
          PDF download simulated — in production this would generate a full report.
        </div>
      )}

      {summary && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-lg">
                      Executive Summary — {summary.storeName}
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(summary.generatedAt)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {summary.summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, sIndex) => {
              const SectionIcon = section.icon;
              return (
                <Card
                  key={section.title}
                  className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${sIndex * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <div
                        className={`h-7 w-7 rounded-md ${section.bgColor} flex items-center justify-center`}
                      >
                        <SectionIcon className={`h-3.5 w-3.5 ${section.iconColor}`} />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm"
                        >
                          <SectionIcon
                            className={`h-4 w-4 mt-0.5 shrink-0 ${section.iconColor}`}
                          />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {!summary && selectedStoreId && (
        <div className="text-center py-12 text-muted-foreground">
          <Sparkles className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No summary available</p>
          <p className="text-sm">
            Click &quot;Generate New Summary&quot; to create an AI report for this
            store.
          </p>
        </div>
      )}
    </div>
  );
}

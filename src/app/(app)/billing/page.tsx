"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  Star,
  CreditCard,
  Receipt,
  Store,
  Package,
  Sparkles,
  Zap,
} from "lucide-react";
import { subscriptionPlans, invoices } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";

const invoiceStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  paid: {
    label: "Paid",
    className:
      "bg-[color:var(--success)]/10 text-[color:var(--success)] hover:bg-[color:var(--success)]/20",
  },
  pending: {
    label: "Pending",
    className:
      "bg-[color:var(--warning)]/10 text-[color:var(--warning)] hover:bg-[color:var(--warning)]/20",
  },
  overdue: {
    label: "Overdue",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
};

const currentPlanTier = "professional";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState(currentPlanTier);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment history
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan, index) => {
          const isCurrentPlan = plan.tier === currentPlanTier;
          const isHighlighted = plan.highlighted;

          return (
            <Card
              key={plan.id}
              className={`relative shadow-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in slide-in-from-bottom-2 ${
                isHighlighted
                  ? "border-primary shadow-md ring-1 ring-primary/20"
                  : "hover:border-primary/30"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4 pt-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {isCurrentPlan && (
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      Current Plan
                    </Badge>
                  )}
                </div>
                <div className="pt-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /{plan.interval}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Store className="h-3.5 w-3.5" />
                    <span>
                      {plan.storeLimit >= 9999
                        ? "Unlimited"
                        : `Up to ${plan.storeLimit}`}{" "}
                      stores
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-3.5 w-3.5" />
                    <span>
                      {plan.skuLimit >= 99999
                        ? "Unlimited"
                        : plan.skuLimit.toLocaleString()}{" "}
                      SKUs per store
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>
                      {plan.aiSummaries === "unlimited"
                        ? "Unlimited"
                        : plan.aiSummaries}{" "}
                      AI summaries/mo
                    </span>
                  </div>
                </div>

                <Separator />

                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isCurrentPlan ? "outline" : isHighlighted ? "default" : "outline"}
                  className="w-full mt-2 gap-2"
                  disabled={isCurrentPlan}
                  onClick={() => setSelectedPlan(plan.tier)}
                >
                  {isCurrentPlan ? (
                    "Current Plan"
                  ) : plan.tier === "enterprise" ? (
                    <>
                      <Zap className="h-4 w-4" />
                      Upgrade to Enterprise
                    </>
                  ) : plan.tier === "starter" ? (
                    "Downgrade"
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Upgrade
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Invoice History</h2>
        </div>

        <div className="rounded-xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Store</TableHead>
                <TableHead className="hidden sm:table-cell">Plan</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => {
                const status = invoiceStatusConfig[invoice.status];
                return (
                  <TableRow
                    key={invoice.id}
                    className="animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {invoice.id.toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.storeName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {invoice.plan}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {formatDate(invoice.date)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Package,
  Store,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  dashboardStats,
  revenueData,
  categoryPerformance,
  skus,
} from "@/data/mock-data";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/formatters";

const kpiCards = [
  {
    title: "Total SKUs",
    value: formatNumber(dashboardStats.totalSKUs),
    icon: Package,
    change: "+342",
    changeType: "up" as const,
    description: "Across all stores",
  },
  {
    title: "Active Stores",
    value: dashboardStats.activeStores.toString(),
    icon: Store,
    change: "+2",
    changeType: "up" as const,
    description: "Currently reporting",
  },
  {
    title: "Monthly Revenue",
    value: formatCurrency(dashboardStats.monthlyRevenue),
    icon: DollarSign,
    change: "+5.1%",
    changeType: "up" as const,
    description: "MRR from subscriptions",
  },
  {
    title: "Avg Margin",
    value: formatPercent(dashboardStats.avgMargin),
    icon: TrendingUp,
    change: "+1.2%",
    changeType: "up" as const,
    description: "Across all categories",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          {typeof entry.value === "number" && entry.value > 100
            ? formatCurrency(entry.value)
            : entry.value}
        </p>
      ))}
    </div>
  );
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          {entry.name === "Revenue"
            ? formatCurrency(entry.value)
            : entry.name === "Margin"
              ? formatPercent(entry.value)
              : formatNumber(entry.value)}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [chartTab, setChartTab] = useState("revenue");

  const topSkus = skus.filter((s) => s.rank === "top").slice(0, 5);
  const bottomSkus = skus.filter((s) => s.rank === "bottom").slice(0, 5);

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Showing data for February 2026
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, index) => (
          <Card
            key={card.title}
            className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {card.value}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                {card.changeType === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--success)]" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={`text-xs font-medium ${
                    card.changeType === "up"
                      ? "text-[color:var(--success)]"
                      : "text-destructive"
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {card.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs value={chartTab} onValueChange={setChartTab}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <TabsList>
            <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
            <TabsTrigger value="categories">
              Category Performance
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="revenue" className="mt-4">
          <Card className="rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">
                Revenue Trend — Last 6 Months
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Comparing current vs previous year subscription revenue
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(0.58 0.18 75)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(0.58 0.18 75)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorPrevious"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(0.65 0.14 95)"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(0.65 0.14 95)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      dataKey="month"
                      className="text-xs"
                      tick={{ fill: "oklch(0.556 0 0)" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "oklch(0.556 0 0)" }}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="This Year"
                      stroke="oklch(0.58 0.18 75)"
                      strokeWidth={2.5}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="previousRevenue"
                      name="Last Year"
                      stroke="oklch(0.65 0.14 95)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#colorPrevious)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <Card className="rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">
                Category Performance
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Revenue and units sold across all 8 product categories
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryPerformance}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      dataKey="category"
                      className="text-xs"
                      tick={{ fill: "oklch(0.556 0 0)" }}
                    />
                    <YAxis
                      yAxisId="left"
                      className="text-xs"
                      tick={{ fill: "oklch(0.556 0 0)" }}
                      tickFormatter={(v) =>
                        v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
                      }
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      className="text-xs"
                      tick={{ fill: "oklch(0.556 0 0)" }}
                      tickFormatter={(v) =>
                        v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`
                      }
                    />
                    <Tooltip content={<BarTooltip />} />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="revenue"
                      name="Revenue"
                      fill="oklch(0.58 0.18 75)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="units"
                      name="Units Sold"
                      fill="oklch(0.65 0.14 95)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top & Bottom SKUs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Performers */}
        <Card className="rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Performers</CardTitle>
              <Badge className="bg-[color:var(--success)] text-[color:var(--success-foreground)]">
                Top 5
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Highest-selling SKUs across all stores
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSkus.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both flex items-center justify-between rounded-lg border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.storeName} &middot; {item.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pl-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {formatCurrency(item.revenue)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatNumber(item.unitsSold)} units
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {formatPercent(item.margin)}
                      </span>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-[color:var(--success)]" />
                      ) : item.trend === "down" ? (
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      ) : (
                        <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Performers */}
        <Card className="rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Underperformers
              </CardTitle>
              <Badge variant="destructive">Bottom 5</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              SKUs with lowest sales velocity — review or discontinue
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bottomSkus.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both flex items-center justify-between rounded-lg border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.storeName} &middot; {item.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pl-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {formatCurrency(item.revenue)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatNumber(item.unitsSold)} units
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {formatPercent(item.margin)}
                      </span>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-[color:var(--success)]" />
                      ) : item.trend === "down" ? (
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      ) : (
                        <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

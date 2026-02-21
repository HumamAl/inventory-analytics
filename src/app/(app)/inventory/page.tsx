"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
} from "lucide-react";
import { skus } from "@/data/mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";
import type { SKURank } from "@/lib/types";

type SortKey = "revenue" | "unitsSold" | "margin";
type TabFilter = "top" | "bottom" | "all";

const rankVariant: Record<SKURank, "default" | "destructive" | "secondary"> = {
  top: "default",
  bottom: "destructive",
  mid: "secondary",
};

export default function InventoryPage() {
  const [tab, setTab] = useState<TabFilter>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("revenue");

  const filteredAndSorted = useMemo(() => {
    let result = [...skus];

    // Tab filter
    if (tab !== "all") {
      result = result.filter((s) => s.rank === tab);
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.sku.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => b[sortBy] - a[sortBy]);

    return result;
  }, [tab, search, sortBy]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="text-sm text-muted-foreground">
          Top N / Bottom N SKU rankings across all stores
        </p>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as TabFilter)}
      >
        <TabsList>
          <TabsTrigger value="all">All SKUs</TabsTrigger>
          <TabsTrigger value="top">Top Performers</TabsTrigger>
          <TabsTrigger value="bottom">Bottom Performers</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by SKU name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Sort by Revenue</SelectItem>
            <SelectItem value="unitsSold">Sort by Units Sold</SelectItem>
            <SelectItem value="margin">Sort by Margin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSorted.length} SKUs
      </p>

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden lg:table-cell">Store</TableHead>
              <TableHead className="text-right">Units Sold</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Margin</TableHead>
              <TableHead className="text-right hidden md:table-cell">Stock</TableHead>
              <TableHead className="w-[70px] text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.map((item, index) => {
              const lowStock = item.stockLevel < item.reorderPoint;
              return (
                <TableRow
                  key={item.id}
                  className="animate-in fade-in slide-in-from-bottom-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <Badge
                      variant={rankVariant[item.rank]}
                      className={
                        item.rank === "top"
                          ? "bg-[color:var(--success)]/10 text-[color:var(--success)] hover:bg-[color:var(--success)]/20"
                          : ""
                      }
                    >
                      {item.rank === "top"
                        ? "Top"
                        : item.rank === "bottom"
                          ? "Low"
                          : "Mid"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.sku}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {item.category}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                    {item.storeName}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(item.unitsSold)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.revenue)}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    {formatPercent(item.margin)}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <div className="flex items-center justify-end gap-1">
                      {lowStock && (
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                      )}
                      <span className={lowStock ? "text-destructive font-medium" : ""}>
                        {formatNumber(item.stockLevel)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-[color:var(--success)] mx-auto" />
                    ) : item.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-destructive mx-auto" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No SKUs found</p>
          <p className="text-sm">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

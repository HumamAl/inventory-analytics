"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  User,
  Package,
  DollarSign,
  Calendar,
  Search,
  Store as StoreIcon,
} from "lucide-react";
import { stores } from "@/data/mock-data";
import { formatCurrency, formatNumber, formatRelativeDate } from "@/lib/formatters";
import type { StoreStatus } from "@/lib/types";

const statusConfig: Record<StoreStatus, { label: string; variant: "default" | "destructive" | "outline" | "secondary" }> = {
  active: { label: "Active", variant: "default" },
  inactive: { label: "Inactive", variant: "destructive" },
  onboarding: { label: "Onboarding", variant: "secondary" },
};

const tierConfig: Record<string, { label: string; className: string }> = {
  starter: { label: "Starter", className: "border-border text-muted-foreground" },
  professional: { label: "Professional", className: "bg-primary text-primary-foreground" },
  enterprise: { label: "Enterprise", className: "bg-gradient-to-r from-primary to-primary/70 text-primary-foreground" },
};

export default function StoresPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      search === "" ||
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Stores</h1>
        <p className="text-sm text-muted-foreground">
          Manage your retail store locations
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stores by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredStores.length} of {stores.length} stores
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStores.map((store, index) => {
          const status = statusConfig[store.status];
          const tier = tierConfig[store.tier];

          return (
            <Card
              key={store.id}
              className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <StoreIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{store.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {store.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge
                    variant={status.variant}
                    className={
                      store.status === "active"
                        ? "bg-[color:var(--success)]/10 text-[color:var(--success)] hover:bg-[color:var(--success)]/20"
                        : store.status === "onboarding"
                          ? "bg-[color:var(--warning)]/10 text-[color:var(--warning)] hover:bg-[color:var(--warning)]/20"
                          : ""
                    }
                  >
                    {status.label}
                  </Badge>
                  <Badge variant="outline" className={tier.className}>
                    {tier.label}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    <span className="truncate">{store.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-3.5 w-3.5" />
                    <span>{formatNumber(store.skuCount)} SKUs</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>{formatCurrency(store.totalRevenue)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {store.lastUpload
                        ? formatRelativeDate(store.lastUpload)
                        : "No uploads"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <StoreIcon className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No stores found</p>
          <p className="text-sm">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

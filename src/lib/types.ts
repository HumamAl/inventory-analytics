import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  outcome: string;
  tech: string[];
  url?: string;
  relevance?: string;
}

// ── Domain Types ──

export type StoreStatus = "active" | "inactive" | "onboarding";
export type SubscriptionTier = "starter" | "professional" | "enterprise";
export type UploadStatus = "completed" | "processing" | "failed" | "pending";
export type SKURank = "top" | "bottom" | "mid";

export interface Store {
  id: string;
  name: string;
  location: string;
  owner: string;
  status: StoreStatus;
  tier: SubscriptionTier;
  skuCount: number;
  totalRevenue: number;
  lastUpload: string;
  joinedDate: string;
}

export interface SKU {
  id: string;
  sku: string;
  name: string;
  category: string;
  storeId: string;
  storeName: string;
  unitsSold: number;
  revenue: number;
  costPerUnit: number;
  margin: number;
  stockLevel: number;
  reorderPoint: number;
  rank: SKURank;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  skuCount: number;
  totalRevenue: number;
  totalUnitsSold: number;
  avgMargin: number;
  topSku: string;
}

export interface CSVUpload {
  id: string;
  storeId: string;
  storeName: string;
  fileName: string;
  rowCount: number;
  skusProcessed: number;
  errors: number;
  status: UploadStatus;
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
}

export interface AISummary {
  id: string;
  storeId: string;
  storeName: string;
  generatedAt: string;
  summary: string;
  keyInsights: string[];
  recommendations: string[];
  topPerformers: string[];
  riskItems: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  interval: "month" | "year";
  features: string[];
  storeLimit: number;
  skuLimit: number;
  aiSummaries: number | "unlimited";
  highlighted?: boolean;
}

export interface Invoice {
  id: string;
  storeId: string;
  storeName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  plan: string;
}

export interface DashboardStats {
  totalSKUs: number;
  activeStores: number;
  monthlyRevenue: number;
  avgMargin: number;
  topPerformerName: string;
  uploadsThisMonth: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  previousRevenue: number;
}

export interface CategoryPerformance {
  category: string;
  revenue: number;
  units: number;
  margin: number;
}

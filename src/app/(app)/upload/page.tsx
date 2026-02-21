"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  File,
  X,
} from "lucide-react";
import { csvUploads, stores } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import { formatNumber } from "@/lib/formatters";
import type { UploadStatus } from "@/lib/types";

const statusConfig: Record<
  UploadStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-[color:var(--success)]/10 text-[color:var(--success)] hover:bg-[color:var(--success)]/20",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    className:
      "bg-[color:var(--warning)]/10 text-[color:var(--warning)] hover:bg-[color:var(--warning)]/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-secondary text-secondary-foreground",
  },
};

export default function UploadPage() {
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const activeStores = stores.filter((s) => s.status === "active");

  const handleUploadClick = () => {
    if (!selectedFile) {
      setSelectedFile("inventory_update_feb20.csv");
    } else {
      setSelectedFile(null);
      setUploadComplete(false);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedStore) return;
    setUploading(true);
    setUploadComplete(false);
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CSV Upload</h1>
        <p className="text-sm text-muted-foreground">
          Upload inventory data for your stores
        </p>
      </div>

      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select a store..." />
              </SelectTrigger>
              <SelectContent>
                {activeStores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            onClick={handleUploadClick}
            className="relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 group"
          >
            {!selectedFile ? (
              <>
                <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="font-medium text-foreground">
                  Drag & drop CSV file or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  .csv files up to 10MB
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{selectedFile}</p>
                  <p className="text-sm text-muted-foreground">245 KB</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setUploadComplete(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="flex items-center gap-3">
              <Button
                onClick={handleUpload}
                disabled={!selectedStore || uploading}
                className="gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload CSV
                  </>
                )}
              </Button>
              {uploadComplete && (
                <div className="flex items-center gap-2 text-sm text-[color:var(--success)]">
                  <CheckCircle2 className="h-4 w-4" />
                  Upload completed successfully
                </div>
              )}
              {!selectedStore && !uploading && (
                <p className="text-sm text-muted-foreground">
                  Select a store to upload
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Upload History</h2>
        <div className="rounded-xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Rows</TableHead>
                <TableHead className="text-right hidden md:table-cell">Errors</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
                <TableHead className="text-right hidden md:table-cell">Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {csvUploads.map((upload, index) => {
                const config = statusConfig[upload.status];
                const StatusIcon = config.icon;
                return (
                  <TableRow
                    key={upload.id}
                    className="animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium">
                      {upload.storeName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <File className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{upload.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      {formatNumber(upload.rowCount)}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {upload.errors > 0 ? (
                        <span className="text-[color:var(--warning)] font-medium">
                          {upload.errors}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={config.className}>
                        <StatusIcon
                          className={`h-3 w-3 mr-1 ${
                            upload.status === "processing"
                              ? "animate-spin"
                              : ""
                          }`}
                        />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                      {formatDate(upload.uploadedAt)}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell text-muted-foreground text-sm">
                      {upload.fileSize}
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

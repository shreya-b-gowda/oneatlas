import React from "react";
import Link from "next/link";
import { AIModel } from "@/types";
import { formatTokens, formatPricing, formatDate } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/common/Table";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { ArrowRight, Clock } from "lucide-react";

export interface RecentReleasesTableProps {
  models: AIModel[];
}

export const RecentReleasesTable: React.FC<RecentReleasesTableProps> = ({ models }) => {
  // Sort by release date descending
  const sorted = [...models]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" /> Recently Released & Updated Models
        </h2>
        <Link href="/models?sort=releaseDate">
          <span className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition">
            View Chronology <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>AI Lab</TableHead>
            <TableHead>Context Window</TableHead>
            <TableHead>Input / 1M</TableHead>
            <TableHead>Output / 1M</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((model) => (
            <TableRow key={model.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-white text-xs hover:text-blue-400 transition">
                    <Link href={`/models/${model.id}`}>{model.name}</Link>
                  </div>
                  {model.isTrending && (
                    <Badge variant="green" size="sm">Trending</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs text-slate-300">{model.labName}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs font-mono text-slate-300">
                  {formatTokens(model.contextWindow)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-xs font-mono text-emerald-400">
                  {formatPricing(model.inputPricePerM)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-xs font-mono text-emerald-400">
                  {formatPricing(model.outputPricePerM)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-slate-400">{formatDate(model.releaseDate)}</span>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/models/${model.id}`}>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Inspect
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

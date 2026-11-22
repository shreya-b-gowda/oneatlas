import React from "react";
import Link from "next/link";
import { formatTokens, formatPricing } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/common/Table";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { RankedModelItem } from "./LeaderboardPodium";
import { Trophy, ArrowRight } from "lucide-react";

export interface LeaderboardTableProps {
  rankedModels: RankedModelItem[];
  metricLabel: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  rankedModels,
  metricLabel,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">Rank</TableHead>
          <TableHead>Model & AI Lab</TableHead>
          <TableHead>License</TableHead>
          <TableHead>{metricLabel} Score</TableHead>
          <TableHead>Context Window</TableHead>
          <TableHead>Input Price / 1M</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rankedModels.map(({ rank, model, score }) => {
          const isTopThree = rank <= 3;

          return (
            <TableRow key={model.id}>
              {/* Rank Badge */}
              <TableCell className="text-center font-bold">
                <div className="flex items-center justify-center">
                  {rank === 1 ? (
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs">
                      <Trophy className="w-3.5 h-3.5" />
                    </span>
                  ) : rank === 2 ? (
                    <span className="w-7 h-7 rounded-full bg-slate-400/20 text-slate-200 border border-slate-400/30 flex items-center justify-center text-xs">
                      2
                    </span>
                  ) : rank === 3 ? (
                    <span className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/30 flex items-center justify-center text-xs">
                      3
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">#{rank}</span>
                  )}
                </div>
              </TableCell>

              {/* Model & Lab */}
              <TableCell>
                <div>
                  <Link
                    href={`/models/${model.id}`}
                    className="font-semibold text-white text-xs hover:text-blue-400 transition"
                  >
                    {model.name}
                  </Link>
                  <p className="text-[11px] text-slate-400">{model.labName}</p>
                </div>
              </TableCell>

              {/* License */}
              <TableCell>
                <Badge
                  variant={model.modelType === "Open Source" ? "amber" : "purple"}
                  size="sm"
                >
                  {model.modelType}
                </Badge>
              </TableCell>

              {/* Score Bar */}
              <TableCell>
                <div className="space-y-1 w-36">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white font-mono">
                      {score.toFixed(1)}%
                    </span>
                    {isTopThree && (
                      <span className="text-[10px] text-amber-400 font-semibold">
                        Top {rank}
                      </span>
                    )}
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        rank === 1
                          ? "bg-amber-400"
                          : rank <= 3
                          ? "bg-blue-400"
                          : "bg-indigo-500"
                      }`}
                      style={{ width: `${Math.min(100, score)}%` }}
                    />
                  </div>
                </div>
              </TableCell>

              {/* Context Window */}
              <TableCell>
                <span className="text-xs font-mono text-slate-300">
                  {formatTokens(model.contextWindow)}
                </span>
              </TableCell>

              {/* Input Price */}
              <TableCell>
                <span className="text-xs font-mono text-emerald-400">
                  {formatPricing(model.inputPricePerM)}
                </span>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <Link href={`/models/${model.id}`}>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                    Inspect <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

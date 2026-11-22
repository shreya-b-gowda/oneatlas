import React from "react";
import { BenchmarkScore } from "@/types";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";

export interface BenchmarkScoreCardProps {
  benchmark: BenchmarkScore;
}

export const BenchmarkScoreCard: React.FC<BenchmarkScoreCardProps> = ({ benchmark }) => {
  const percentage = Math.round((benchmark.score / benchmark.maxScore) * 100);

  const categoryColors = {
    Reasoning: "blue",
    Coding: "purple",
    Mathematics: "green",
    "General Knowledge": "amber",
  } as const;

  return (
    <Card className="border-slate-800 bg-[#0E1526]/80 p-4">
      <CardContent className="p-0 space-y-2.5">
        <div className="flex items-center justify-between">
          <Badge
            variant={categoryColors[benchmark.category] || "default"}
            size="sm"
          >
            {benchmark.category}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">{benchmark.name}</span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-xl font-extrabold text-white font-mono">
            {benchmark.score.toFixed(1)}%
          </span>
          <span className="text-[10px] text-slate-500">Max: {benchmark.maxScore}%</span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

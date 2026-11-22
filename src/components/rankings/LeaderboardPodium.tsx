import React from "react";
import Link from "next/link";
import { AIModel } from "@/types";
import { formatPricing, formatTokens } from "@/lib/utils";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Trophy, Medal, Award, ArrowRight } from "lucide-react";

export interface RankedModelItem {
  rank: number;
  model: AIModel;
  score: number;
}

export interface LeaderboardPodiumProps {
  rankedModels: RankedModelItem[];
  metricName: string;
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({
  rankedModels,
  metricName,
}) => {
  const topThree = rankedModels.slice(0, 3);
  if (topThree.length < 3) return null;

  // Visual arrangement: [Rank 2 (Silver), Rank 1 (Gold), Rank 3 (Bronze)]
  const [first, second, third] = [topThree[0], topThree[1], topThree[2]];

  const podiumConfig = [
    {
      item: second,
      rank: 2,
      title: "2nd Place",
      badgeColor: "purple" as const,
      icon: <Medal className="w-5 h-5 text-slate-300" />,
      height: "h-auto md:translate-y-4",
      glow: "border-slate-700 bg-slate-900/80",
    },
    {
      item: first,
      rank: 1,
      title: "1st Place (Champion)",
      badgeColor: "amber" as const,
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      height: "h-auto md:-translate-y-2",
      glow: "border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-[#111827] to-[#111827] shadow-xl shadow-amber-500/10",
    },
    {
      item: third,
      rank: 3,
      title: "3rd Place",
      badgeColor: "blue" as const,
      icon: <Award className="w-5 h-5 text-amber-600" />,
      height: "h-auto md:translate-y-6",
      glow: "border-slate-800 bg-slate-900/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 pb-6">
      {podiumConfig.map(({ item, rank, title, badgeColor, icon, height, glow }) => (
        <Card
          key={item.model.id}
          hover
          className={`p-5 flex flex-col justify-between border ${glow} ${height} transition-all duration-200`}
        >
          <div className="space-y-3">
            {/* Top Rank Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {title}
                </span>
              </div>
              <Badge variant={badgeColor} size="sm">
                Rank #{rank}
              </Badge>
            </div>

            {/* Model Info */}
            <div>
              <Link href={`/models/${item.model.id}`}>
                <h3 className="text-base font-extrabold text-white hover:text-blue-400 transition">
                  {item.model.name}
                </h3>
              </Link>
              <p className="text-xs text-slate-400 font-medium">{item.model.labName}</p>
            </div>

            {/* Score Display */}
            <div className="p-3 rounded-xl bg-[#0E1526] border border-slate-800">
              <span className="text-[11px] text-slate-400">{metricName} Performance:</span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {item.score.toFixed(1)}%
              </div>
            </div>

            {/* Specs Summary */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>{formatTokens(item.model.contextWindow)} context</span>
              <span className="font-mono text-emerald-400">
                {formatPricing(item.model.inputPricePerM)}/1M
              </span>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800/80">
            <Link href={`/models/${item.model.id}`}>
              <span className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-end gap-1 transition">
                Inspect Specs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

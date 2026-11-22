import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/common/Card";

export interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  className,
}) => {
  return (
    <Card className={cn("p-5 border-slate-800/80 bg-[#111827]/80 hover:border-slate-700/80 transition-all", className)}>
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">{label}</span>
          <div className="p-2 rounded-lg bg-slate-800/70 text-blue-400 border border-slate-700/50">
            {icon}
          </div>
        </div>

        <div>
          <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
          <div className="flex items-center gap-2 mt-1">
            {trend && (
              <span
                className={cn(
                  "text-[11px] font-semibold px-1.5 py-0.5 rounded",
                  trendPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                )}
              >
                {trend}
              </span>
            )}
            {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

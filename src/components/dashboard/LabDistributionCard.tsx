import React from "react";
import Link from "next/link";
import { AILab, AIModel } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/common/Card";
import { Building2, ArrowRight } from "lucide-react";

export interface LabDistributionProps {
  labs: AILab[];
  models: AIModel[];
}

export const LabDistributionCard: React.FC<LabDistributionProps> = ({ labs, models }) => {
  return (
    <Card className="border-slate-800 bg-[#111827]/80">
      <CardHeader className="pb-3 border-b-slate-800/80">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" /> AI Labs Breakdown
          </CardTitle>
          <Link href="/labs">
            <span className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition">
              All Labs <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <CardDescription>
          Pioneering institutions developing the foundation weights.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        {labs.map((lab) => {
          const modelCount = models.filter((m) => m.labId === lab.id).length;
          const percentage = models.length > 0 ? Math.round((modelCount / models.length) * 100) : 0;

          return (
            <div key={lab.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{lab.name}</span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {modelCount} {modelCount === 1 ? "model" : "models"} ({percentage}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

import React from "react";
import Link from "next/link";
import { AIModel } from "@/types";
import { formatTokens, formatPricing } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { ArrowRight, Layers, DollarSign, Sparkles } from "lucide-react";

export interface FeaturedModelsGridProps {
  models: AIModel[];
}

export const FeaturedModelsGrid: React.FC<FeaturedModelsGridProps> = ({ models }) => {
  const featured = models.filter((m) => m.isFeatured).slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Frontier & Featured Models
          </h2>
          <p className="text-xs text-slate-400">High-conviction foundation models leading modern benchmarks.</p>
        </div>
        <Link href="/models">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View All {models.length} Models
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((model) => (
          <Card
            key={model.id}
            hover
            className="flex flex-col justify-between border-slate-800 bg-[#111827]/80 hover:border-blue-500/40 transition group"
          >
            <CardHeader className="p-4 pb-2 border-b-0 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={model.modelType === "Open Source" ? "amber" : "purple"}>
                  {model.modelType}
                </Badge>
                <span className="text-[11px] font-medium text-slate-400">{model.labName}</span>
              </div>
              <CardTitle className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                {model.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-1 space-y-3 flex-1">
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {model.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-blue-400" /> Context
                  </span>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">
                    {formatTokens(model.contextWindow)}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" /> In / 1M
                  </span>
                  <p className="text-xs font-semibold text-emerald-400 mt-0.5 font-mono">
                    {formatPricing(model.inputPricePerM)}
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex gap-1">
                {model.modalities.slice(0, 2).map((mod) => (
                  <span
                    key={mod}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium"
                  >
                    {mod}
                  </span>
                ))}
              </div>
              <Link href={`/models/${model.id}`}>
                <Button variant="ghost" size="sm" className="text-xs p-1 h-7">
                  Details <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

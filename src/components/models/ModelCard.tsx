import React from "react";
import Link from "next/link";
import { AIModel } from "@/types";
import { formatTokens, formatPricing, formatDate } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { 
  Layers, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

export interface ModelCardProps {
  model: AIModel;
  onCompareToggle?: (model: AIModel) => void;
  isComparing?: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  onCompareToggle,
  isComparing = false,
}) => {
  return (
    <Card
      hover
      className="flex flex-col justify-between border-slate-800 bg-[#111827]/90 hover:border-blue-500/40 transition-all duration-200 group"
    >
      <CardHeader className="p-5 pb-3 space-y-2 border-b-slate-800/60">
        <div className="flex items-center justify-between">
          <Badge
            variant={model.modelType === "Open Source" ? "amber" : "purple"}
            size="sm"
          >
            {model.modelType}
          </Badge>
          <span className="text-xs font-medium text-slate-400">{model.labName}</span>
        </div>

        <div>
          <Link href={`/models/${model.id}`}>
            <CardTitle className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {model.name}
            </CardTitle>
          </Link>
          <span className="text-[11px] font-mono text-slate-500">{model.slug}</span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-1 space-y-4 flex-1">
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {model.description}
        </p>

        {/* Technical Specs Matrix */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#0E1526] border border-slate-800/80">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-400" /> Context Window
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-0.5">
              {formatTokens(model.contextWindow)} tokens
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0E1526] border border-slate-800/80">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" /> Pricing (1M in/out)
            </span>
            <p className="text-xs font-semibold text-emerald-400 mt-0.5 font-mono">
              {formatPricing(model.inputPricePerM)} / {formatPricing(model.outputPricePerM)}
            </p>
          </div>
        </div>

        {/* Modalities & Release Date */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
          <div className="flex flex-wrap gap-1">
            {model.modalities.map((mod) => (
              <span
                key={mod}
                className="px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300 font-medium text-[10px]"
              >
                {mod}
              </span>
            ))}
          </div>
          <span className="text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(model.releaseDate)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        {onCompareToggle ? (
          <Button
            variant={isComparing ? "primary" : "outline"}
            size="sm"
            onClick={() => onCompareToggle(model)}
            className="text-xs h-8"
          >
            {isComparing ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected
              </span>
            ) : (
              "+ Compare"
            )}
          </Button>
        ) : (
          <span />
        )}

        <Link href={`/models/${model.id}`}>
          <Button variant="ghost" size="sm" className="text-xs h-8" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Inspect
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

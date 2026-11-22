import React from "react";
import Link from "next/link";
import { AILab, AIModel } from "@/types";
import { formatTokens, formatPricing } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Building2, MapPin, Calendar, ExternalLink, Cpu, ArrowRight } from "lucide-react";

export interface LabCardProps {
  lab: AILab;
  models: AIModel[];
}

export const LabCard: React.FC<LabCardProps> = ({ lab, models }) => {
  const labModels = models.filter((m) => m.labId === lab.id);

  return (
    <Card hover className="border-slate-800 bg-[#111827]/80 flex flex-col justify-between">
      <CardHeader className="p-5 pb-3 space-y-2 border-b-slate-800/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white tracking-tight">
                {lab.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" /> {lab.headquarters}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" /> Founded {lab.foundedYear}
                </span>
              </div>
            </div>
          </div>

          <Badge variant="blue" size="sm">
            {labModels.length} {labModels.length === 1 ? "Model" : "Models"}
          </Badge>
        </div>

        <CardDescription className="text-xs text-slate-400 leading-relaxed pt-1">
          {lab.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-3 space-y-3 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-purple-400" /> Foundation Models Catalog
        </span>

        <div className="space-y-1.5">
          {labModels.map((model) => (
            <Link
              key={model.id}
              href={`/models/${model.id}`}
              className="p-2.5 rounded-lg bg-[#0E1526] hover:bg-[#131c33] border border-slate-800 flex items-center justify-between text-xs transition group"
            >
              <div>
                <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition">
                  {model.name}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>{formatTokens(model.contextWindow)} ctx</span>
                  <span>•</span>
                  <span className="text-emerald-400">{formatPricing(model.inputPricePerM)}/1M in</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <a
          href={lab.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition"
        >
          <span>Official Website</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <Link href={`/models?search=${encodeURIComponent(lab.name)}`}>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            Filter Models
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

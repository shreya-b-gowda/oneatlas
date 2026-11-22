import React from "react";
import Link from "next/link";
import { Provider, AIModel } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Server, Activity, Clock, ExternalLink, Cpu } from "lucide-react";

export interface ProviderCardProps {
  provider: Provider;
  models: AIModel[];
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, models }) => {
  // Find all models hosted by this provider
  const hostedModels = models.filter((m) =>
    m.providers.some((p) => p.providerId === provider.id || p.providerSlug === provider.slug)
  );

  return (
    <Card hover className="border-slate-800 bg-[#111827]/80 flex flex-col justify-between">
      <CardHeader className="p-5 pb-3 space-y-2 border-b-slate-800/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white tracking-tight">
                {provider.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Activity className="w-3 h-3" /> {provider.uptimePercentage}% SLA
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono text-slate-300">
                  <Clock className="w-3 h-3 text-slate-500" /> ~{provider.avgLatencyMs} ms
                </span>
              </div>
            </div>
          </div>

          <Badge variant={provider.isHost ? "purple" : "blue"} size="sm">
            {provider.isHost ? "First-Party" : "Cloud Host"}
          </Badge>
        </div>

        <CardDescription className="text-xs text-slate-400 leading-relaxed pt-1">
          {provider.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-3 space-y-3 flex-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-blue-400" /> Supported Endpoints
          </span>
          <span className="text-slate-400 font-mono">
            {hostedModels.length} models
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {hostedModels.map((m) => (
            <Link key={m.id} href={`/models/${m.id}`}>
              <span className="px-2 py-1 rounded bg-[#0E1526] hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition cursor-pointer">
                {m.name}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition"
        >
          <span>Provider Console</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <Link href={`/models?search=${encodeURIComponent(provider.name.split(" ")[0])}`}>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            View Endpoints
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

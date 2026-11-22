import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockModels } from "@/data/mockData";
import { formatTokens, formatPricing, formatDate } from "@/lib/utils";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/common/Table";
import { TokenCostCalculator } from "@/components/models/TokenCostCalculator";
import { BenchmarkScoreCard } from "@/components/models/BenchmarkScoreCard";
import { 
  ArrowLeft, 
  Layers, 
  DollarSign, 
  Cpu, 
  Calendar, 
  Scale, 
  Building2, 
  Server, 
  Trophy 
} from "lucide-react";

export function generateStaticParams() {
  return mockModels.map((model) => ({
    id: model.id,
  }));
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = mockModels.find((m) => m.id === id || m.slug === id);

  if (!model) {
    notFound();
  }

  const relatedModels = mockModels.filter(
    (m) => m.labId === model.labId && m.id !== model.id
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-20">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/models">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="text-xs text-slate-400 hover:text-white"
          >
            Back to Models
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Link href={`/compare?models=${model.id}`}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Scale className="w-4 h-4" />}
              className="text-xs"
            >
              Compare This Model
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-[#0E1526] to-[#0B0F19] p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={model.modelType === "Open Source" ? "amber" : "purple"}
                size="md"
              >
                {model.modelType}
              </Badge>
              <Link href="/labs" className="hover:underline">
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {model.labName}
                </span>
              </Link>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Released {formatDate(model.releaseDate)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {model.name}
            </h1>
            <p className="font-mono text-xs text-slate-400">{model.slug}</p>
            <p className="text-sm text-slate-300 leading-relaxed pt-1">
              {model.description}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              Modalities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {model.modalities.map((mod) => (
                <Badge key={mod} variant="blue" size="sm">
                  {mod}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-800 bg-[#111827]/80">
          <CardContent className="p-0 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Context Window
            </span>
            <p className="text-xl font-bold text-white font-mono">
              {formatTokens(model.contextWindow)}
            </p>
            <p className="text-[10px] text-slate-500">Total token capacity</p>
          </CardContent>
        </Card>

        <Card className="p-4 border-slate-800 bg-[#111827]/80">
          <CardContent className="p-0 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> Max Output Tokens
            </span>
            <p className="text-xl font-bold text-white font-mono">
              {formatTokens(model.maxOutputTokens)}
            </p>
            <p className="text-[10px] text-slate-500">Per single completion</p>
          </CardContent>
        </Card>

        <Card className="p-4 border-slate-800 bg-[#111827]/80">
          <CardContent className="p-0 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Input Price
            </span>
            <p className="text-xl font-bold text-emerald-400 font-mono">
              {formatPricing(model.inputPricePerM)}
            </p>
            <p className="text-[10px] text-slate-500">Per 1 Million tokens</p>
          </CardContent>
        </Card>

        <Card className="p-4 border-slate-800 bg-[#111827]/80">
          <CardContent className="p-0 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Output Price
            </span>
            <p className="text-xl font-bold text-emerald-400 font-mono">
              {formatPricing(model.outputPricePerM)}
            </p>
            <p className="text-[10px] text-slate-500">Per 1 Million tokens</p>
          </CardContent>
        </Card>
      </div>

      {/* Verified Scientific Benchmarks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" /> Verified Standard Benchmarks
          </h2>
          <span className="text-xs text-slate-400">
            MMLU, HumanEval, GSM8K, and GPQA scientific evaluations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {model.benchmarks.map((b) => (
            <BenchmarkScoreCard key={b.id} benchmark={b} />
          ))}
        </div>
      </div>

      {/* Interactive Workload Cost Estimator */}
      <TokenCostCalculator
        inputPricePerM={model.inputPricePerM}
        outputPricePerM={model.outputPricePerM}
        modelName={model.name}
      />

      {/* Available Inference Providers Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" /> Available Inference Providers
            </h2>
            <p className="text-xs text-slate-400">
              Hosting options, real-time latencies, and token endpoints for {model.name}.
            </p>
          </div>
          <Link href="/providers">
            <Button variant="ghost" size="sm" className="text-xs">
              View All Providers
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Input Rate / 1M</TableHead>
              <TableHead>Output Rate / 1M</TableHead>
              <TableHead>Avg Latency</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {model.providers.map((provider) => (
              <TableRow key={provider.providerId}>
                <TableCell>
                  <span className="font-semibold text-white text-xs">
                    {provider.providerName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-emerald-400">
                    {formatPricing(provider.inputPricePerM)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-emerald-400">
                    {formatPricing(provider.outputPricePerM)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-slate-300">
                    {provider.latencyMs} ms
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={provider.availability === "High" ? "green" : "amber"}
                    size="sm"
                    dot
                  >
                    {provider.availability} Availability
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Related Models from Same Lab */}
      {relatedModels.length > 0 && (
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Other Models from {model.labName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedModels.map((rel) => (
              <Link
                key={rel.id}
                href={`/models/${rel.id}`}
                className="p-3.5 rounded-xl border border-slate-800 bg-[#111827]/70 hover:bg-[#111827] hover:border-slate-700 transition flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition">
                    {rel.name}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {formatTokens(rel.contextWindow)} ctx • {formatPricing(rel.inputPricePerM)}/1M
                  </p>
                </div>
                <span className="text-xs text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

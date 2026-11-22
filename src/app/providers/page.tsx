"use client";

import React, { useState, useMemo } from "react";
import { mockProviders, mockModels } from "@/data/mockData";
import { ProviderCard } from "@/components/directory/ProviderCard";
import { Input } from "@/components/common/Input";
import { EmptyState } from "@/components/common/EmptyState";
import { Server, Search, Activity, Zap } from "lucide-react";

export default function ProvidersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProviders = useMemo(() => {
    if (!searchQuery.trim()) return mockProviders;
    const q = searchQuery.toLowerCase().trim();
    return mockProviders.filter(
      (provider) =>
        provider.name.toLowerCase().includes(q) ||
        provider.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Aggregate telemetry
  const avgLatency = Math.round(
    mockProviders.reduce((acc, p) => acc + p.avgLatencyMs, 0) / mockProviders.length
  );
  const minLatency = Math.min(...mockProviders.map((p) => p.avgLatencyMs));

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-1.5">
            <Server className="w-3.5 h-3.5" />
            <span>Inference Cloud Networks</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Inference Providers & Endpoints
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cloud infrastructure hosting foundation models with real-world latency benchmarks and uptime SLA telemetry.
          </p>
        </div>

        <div className="max-w-xs w-full">
          <Input
            placeholder="Search providers (e.g. Groq, Together)..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            className="w-full bg-[#0E1526]"
          />
        </div>
      </div>

      {/* Provider Telemetry Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Host Networks</p>
            <p className="text-xl font-bold text-white">{mockProviders.length} Providers</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Average Network Latency</p>
            <p className="text-xl font-bold text-white font-mono">{avgLatency} ms (Min: {minLatency} ms)</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Average Global SLA</p>
            <p className="text-xl font-bold text-white font-mono">99.94% Uptime</p>
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      {filteredProviders.length === 0 ? (
        <EmptyState
          title="No Inference Providers Matched"
          description={`We couldn't find any provider networks matching "${searchQuery}".`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              models={mockModels}
            />
          ))}
        </div>
      )}
    </div>
  );
}

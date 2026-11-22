"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Cpu, 
  Building2, 
  Server, 
  Layers, 
  DollarSign, 
  Search, 
  ArrowRight,
  Scale,
  Trophy
} from "lucide-react";
import { mockModels, mockLabs, getStatistics } from "@/data/mockData";
import { formatTokens, formatPricing } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/StatCard";
import { FeaturedModelsGrid } from "@/components/dashboard/FeaturedModelsGrid";
import { RecentReleasesTable } from "@/components/dashboard/RecentReleasesTable";
import { LabDistributionCard } from "@/components/dashboard/LabDistributionCard";
import { QuickCompareBanner } from "@/components/dashboard/QuickCompareBanner";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const stats = getStatistics();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/models?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/models");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome & Global Search Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[11px] font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>AI Model Intelligence Platform</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Executive Telemetry & Discovery
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time cataloging of foundation models, token economics, and benchmarks.
          </p>
        </div>

        {/* Global Search Bar on Dashboard */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
          <Input
            placeholder="Search any model (e.g., Claude, DeepSeek, Llama)..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            className="w-full bg-[#0E1526]"
          />
          <Button type="submit" variant="primary" size="sm" className="shrink-0">
            Search
          </Button>
        </form>
      </div>

      {/* Telemetry Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <StatCard
          label="Tracked Models"
          value={stats.totalModels}
          subtitle="Frontier & OSS"
          trend="+3 New"
          icon={<Cpu className="w-4 h-4" />}
        />
        <StatCard
          label="AI Research Labs"
          value={stats.totalLabs}
          subtitle="Global creators"
          trend="Active"
          icon={<Building2 className="w-4 h-4" />}
        />
        <StatCard
          label="Inference Providers"
          value={stats.totalProviders}
          subtitle="Cloud networks"
          trend="99.9% Up"
          icon={<Server className="w-4 h-4" />}
        />
        <StatCard
          label="Max Context Limit"
          value={formatTokens(stats.maxContextWindow)}
          subtitle="Gemini 1.5 Pro"
          trend="Record"
          icon={<Layers className="w-4 h-4" />}
        />
        <StatCard
          label="Lowest Input Cost"
          value={formatPricing(stats.lowestPricePerM)}
          subtitle="Per 1M Tokens"
          trend="Disruptive"
          icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
        />
      </div>

      {/* Featured Frontier Models Grid */}
      <FeaturedModelsGrid models={mockModels} />

      {/* Quick Compare Callout Banner */}
      <QuickCompareBanner />

      {/* Two-Column Intelligence Section: Recent Releases + AI Labs Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <RecentReleasesTable models={mockModels} />
        </div>
        <div>
          <LabDistributionCard labs={mockLabs} models={mockModels} />
        </div>
      </div>

      {/* Quick Navigation Hub */}
      <div className="pt-6 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Explore OneAtlas Intelligence Modules
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/models"
            className="p-4 rounded-xl border border-slate-800 bg-[#111827]/60 hover:bg-[#111827] hover:border-slate-700 transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Explore Models
                </p>
                <p className="text-[11px] text-slate-400">Search, filter & sort catalog</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/compare"
            className="p-4 rounded-xl border border-slate-800 bg-[#111827]/60 hover:bg-[#111827] hover:border-slate-700 transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">
                  Model Comparator
                </p>
                <p className="text-[11px] text-slate-400">3-way side-by-side matrix</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/rankings"
            className="p-4 rounded-xl border border-slate-800 bg-[#111827]/60 hover:bg-[#111827] hover:border-slate-700 transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                  Rankings & Benchmarks
                </p>
                <p className="text-[11px] text-slate-400">MMLU, HumanEval & Math</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/providers"
            className="p-4 rounded-xl border border-slate-800 bg-[#111827]/60 hover:bg-[#111827] hover:border-slate-700 transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  Inference Providers
                </p>
                <p className="text-[11px] text-slate-400">Latencies & availability</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

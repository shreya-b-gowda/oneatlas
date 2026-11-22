"use client";

import React, { useState, useMemo } from "react";
import { mockLabs, mockModels } from "@/data/mockData";
import { LabCard } from "@/components/directory/LabCard";
import { Input } from "@/components/common/Input";
import { EmptyState } from "@/components/common/EmptyState";
import { Building2, Search, Sparkles, Globe } from "lucide-react";

export default function LabsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabs = useMemo(() => {
    if (!searchQuery.trim()) return mockLabs;
    const q = searchQuery.toLowerCase().trim();
    return mockLabs.filter(
      (lab) =>
        lab.name.toLowerCase().includes(q) ||
        lab.description.toLowerCase().includes(q) ||
        lab.headquarters.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>AI Research Institutions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            AI Labs & Organizations Directory
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore the frontier institutions, foundation weights, and architecture creators.
          </p>
        </div>

        <div className="max-w-xs w-full">
          <Input
            placeholder="Search labs by name or location..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            className="w-full bg-[#0E1526]"
          />
        </div>
      </div>

      {/* Directory Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Tracked Labs</p>
            <p className="text-xl font-bold text-white">{mockLabs.length} Global Labs</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Research Hubs</p>
            <p className="text-xl font-bold text-white">US, Europe & Asia</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Frontier Models</p>
            <p className="text-xl font-bold text-white">{mockModels.length} Tracked Weights</p>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      {filteredLabs.length === 0 ? (
        <EmptyState
          title="No AI Labs Matched Your Search"
          description={`We couldn't find any AI research organizations matching "${searchQuery}".`}
          actionLabel="Clear Search"
          onAction={() => setSearchQuery("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} lab={lab} models={mockModels} />
          ))}
        </div>
      )}
    </div>
  );
}

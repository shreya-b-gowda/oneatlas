"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockModels } from "@/data/mockData";
import { AIModel } from "@/types";
import { ComparisonSelector } from "@/components/compare/ComparisonSelector";
import { ComparisonMatrix } from "@/components/compare/ComparisonMatrix";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { 
  Scale, 
  RotateCcw, 
  Sparkles, 
  Zap 
} from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initial models from URL (default to Claude 3.5 Sonnet and GPT-4o if empty)
  const initialIds = useMemo(() => {
    const query = searchParams.get("models");
    if (query) {
      return query.split(",").filter((id) => mockModels.some((m) => m.id === id));
    }
    return ["model-claude-3-5-sonnet", "model-gpt-4o"];
  }, [searchParams]);

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  const selectedModels = useMemo(() => {
    return selectedIds
      .map((id) => mockModels.find((m) => m.id === id))
      .filter(Boolean) as AIModel[];
  }, [selectedIds]);

  const handleAddModel = (modelId: string) => {
    if (selectedIds.length >= 3) return;
    if (!selectedIds.includes(modelId)) {
      const updated = [...selectedIds, modelId];
      setSelectedIds(updated);
      router.replace(`/compare?models=${updated.join(",")}`);
    }
  };

  const handleRemoveModel = (modelId: string) => {
    const updated = selectedIds.filter((id) => id !== modelId);
    setSelectedIds(updated);
    if (updated.length > 0) {
      router.replace(`/compare?models=${updated.join(",")}`);
    } else {
      router.replace("/compare");
    }
  };

  const handleApplyPreset = (modelIds: string[]) => {
    setSelectedIds(modelIds);
    router.replace(`/compare?models=${modelIds.join(",")}`);
  };

  const handleClearAll = () => {
    setSelectedIds([]);
    router.replace("/compare");
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-semibold mb-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Model Comparator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Multi-Model Intelligence Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluate context windows, token economics, and scientific benchmarks side-by-side.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs text-slate-400 hover:text-white self-start sm:self-auto"
          >
            Clear Selection
          </Button>
        )}
      </div>

      {/* Preset Evaluation Clusters */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#111827]/70 space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Quick Benchmark Presets
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleApplyPreset([
                "model-claude-3-5-sonnet",
                "model-gpt-4o",
                "model-deepseek-r1",
              ])
            }
            className="text-xs"
          >
            Frontier Reasoning Triad (Claude vs GPT-4o vs DeepSeek R1)
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleApplyPreset([
                "model-deepseek-v3",
                "model-gemini-1-5-flash",
                "model-llama-3-3-70b",
              ])
            }
            className="text-xs"
          >
            Ultra-Budget & Throughput (DeepSeek V3 vs Flash vs Llama 3.3)
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleApplyPreset([
                "model-gemini-1-5-pro",
                "model-claude-3-5-sonnet",
                "model-openai-o1",
              ])
            }
            className="text-xs"
          >
            High Context Champions (2M vs 200k tokens)
          </Button>
        </div>
      </div>

      {/* Interactive Model Selection Slots */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Selected Models: <strong className="text-white">{selectedModels.length} / 3</strong>
          </span>
          <span className="text-slate-500">Pick up to three models simultaneously</span>
        </div>

        <ComparisonSelector
          allModels={mockModels}
          selectedModels={selectedModels}
          onAddModel={handleAddModel}
          onRemoveModel={handleRemoveModel}
        />
      </div>

      {/* Comparison Matrix or Empty State */}
      {selectedModels.length < 2 ? (
        <EmptyState
          title="Select at least 2 models to compare"
          description="Use the selection slots above or click one of the quick presets to analyze context retention, token pricing, and benchmark scores side-by-side."
          actionLabel="Load Frontier Reasoning Presets"
          onAction={() =>
            handleApplyPreset([
              "model-claude-3-5-sonnet",
              "model-gpt-4o",
              "model-deepseek-r1",
            ])
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Side-by-Side Specifications & Differences
            </h2>
            <span className="text-xs text-slate-400">
              Highlighted cells represent best-in-class performance.
            </span>
          </div>

          <ComparisonMatrix models={selectedModels} />
        </div>
      )}
    </div>
  );
}

export default function ModelComparisonPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading comparator...</div>}>
      <CompareContent />
    </Suspense>
  );
}

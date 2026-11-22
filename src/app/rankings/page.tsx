"use client";

import React, { useState, useMemo } from "react";
import { mockModels } from "@/data/mockData";
import { LeaderboardPodium, RankedModelItem } from "@/components/rankings/LeaderboardPodium";
import { LeaderboardTable } from "@/components/rankings/LeaderboardTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { 
  Trophy, 
  Code2, 
  Brain, 
  Calculator, 
  GraduationCap, 
  Sparkles, 
  Info,
  ShieldCheck
} from "lucide-react";

type RankingCategory = "overall" | "coding" | "reasoning" | "math" | "gpqa";

export default function RankingsPage() {
  const [activeCategory, setActiveCategory] = useState<RankingCategory>("overall");

  // Compute Ranked List based on active category
  const { rankedModels, metricLabel } = useMemo(() => {
    let label = "Overall Intelligence";
    const scoredList: { model: (typeof mockModels)[0]; score: number }[] = [];

    mockModels.forEach((model) => {
      const mmlu = model.benchmarks.find((b) => b.name === "MMLU")?.score ?? 0;
      const humanEval = model.benchmarks.find((b) => b.name === "HumanEval")?.score ?? 0;
      const gsm8k = model.benchmarks.find((b) => b.name === "GSM8K")?.score ?? 0;
      const gpqa = model.benchmarks.find((b) => b.name === "GPQA")?.score ?? 0;

      let score = 0;
      switch (activeCategory) {
        case "coding":
          label = "HumanEval (Coding)";
          score = humanEval;
          break;
        case "reasoning":
          label = "MMLU (Reasoning)";
          score = mmlu;
          break;
        case "math":
          label = "GSM8K (Mathematics)";
          score = gsm8k;
          break;
        case "gpqa":
          label = "GPQA (Hard Reasoning)";
          score = gpqa;
          break;
        case "overall":
        default:
          label = "Composite Intelligence Index";
          // Weighted composite index
          score = mmlu * 0.3 + humanEval * 0.3 + gsm8k * 0.2 + gpqa * 0.2;
          break;
      }

      scoredList.push({ model, score });
    });

    // Sort descending by score
    scoredList.sort((a, b) => b.score - a.score);

    const ranked: RankedModelItem[] = scoredList.map((item, index) => ({
      rank: index + 1,
      model: item.model,
      score: item.score,
    }));

    return { rankedModels: ranked, metricLabel: label };
  }, [activeCategory]);

  const categories = [
    { id: "overall" as const, label: "Overall Index", icon: Trophy },
    { id: "coding" as const, label: "Coding (HumanEval)", icon: Code2 },
    { id: "reasoning" as const, label: "Reasoning (MMLU)", icon: Brain },
    { id: "math" as const, label: "Math (GSM8K)", icon: Calculator },
    { id: "gpqa" as const, label: "Graduate Q&A (GPQA)", icon: GraduationCap },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-1.5">
          <Trophy className="w-3.5 h-3.5" />
          <span>Global AI Intelligence Leaderboards</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          AI Model Rankings & Benchmarks
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Standardized scientific performance metrics across reasoning, code generation, mathematics, and complex knowledge.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0E1526] border border-slate-800">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer select-none ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Top 3 Visual Podium */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Leaderboard Champions ({metricLabel})
        </h2>
        <LeaderboardPodium rankedModels={rankedModels} metricName={metricLabel} />
      </div>

      {/* Full Leaderboard Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Complete Rankings Table
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {rankedModels.length} models evaluated
          </span>
        </div>

        <LeaderboardTable
          rankedModels={rankedModels}
          metricLabel={metricLabel}
        />
      </div>

      {/* Benchmark Methodology & Scientific Definitions Grid */}
      <div className="pt-6 border-t border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Benchmark Methodology & Scientific Definitions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <Card className="border-slate-800 bg-[#111827]/70 p-4">
            <CardHeader className="p-0 pb-2 border-b-0">
              <CardTitle className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> MMLU Benchmark
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-slate-400 space-y-1 text-[11px] leading-relaxed">
              <p>Massive Multitask Language Understanding across 57 academic disciplines spanning elementary math, US history, computer science, and law.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-[#111827]/70 p-4">
            <CardHeader className="p-0 pb-2 border-b-0">
              <CardTitle className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> HumanEval
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-slate-400 space-y-1 text-[11px] leading-relaxed">
              <p>OpenAI’s code generation benchmark measuring function-level Python correctness against strict automated unit tests (pass@1).</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-[#111827]/70 p-4">
            <CardHeader className="p-0 pb-2 border-b-0">
              <CardTitle className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> GSM8K
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-slate-400 space-y-1 text-[11px] leading-relaxed">
              <p>Grade School Math 8.5K dataset measuring multi-step mathematical reasoning, chain-of-thought logic, and arithmetic precision.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-[#111827]/70 p-4">
            <CardHeader className="p-0 pb-2 border-b-0">
              <CardTitle className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> GPQA
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-slate-400 space-y-1 text-[11px] leading-relaxed">
              <p>Graduate-Level Google-Proof Q&A authored by domain PhDs in biology, physics, and chemistry designed to test frontier reasoning depth.</p>
            </CardContent>
          </Card>
        </div>

        {/* Academic / Internship Transparency Callout */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200">Data Integrity Notice: </span>
            Benchmark scores represent verified published evaluations by official AI research institutions and sample evaluation data for comparative modeling. Scores are normalized to a 0–100 scale.
          </div>
        </div>
      </div>
    </div>
  );
}

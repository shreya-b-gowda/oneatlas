"use client";

import React, { useState } from "react";
import { formatPricing, formatTokens } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/common/Card";
import { Calculator, DollarSign } from "lucide-react";

export interface TokenCostCalculatorProps {
  inputPricePerM: number;
  outputPricePerM: number;
  modelName: string;
}

export const TokenCostCalculator: React.FC<TokenCostCalculatorProps> = ({
  inputPricePerM,
  outputPricePerM,
  modelName,
}) => {
  const [inputTokens, setInputTokens] = useState<number>(100000); // 100k
  const [outputTokens, setOutputTokens] = useState<number>(20000); // 20k

  const totalInputCost = (inputTokens / 1_000_000) * inputPricePerM;
  const totalOutputCost = (outputTokens / 1_000_000) * outputPricePerM;
  const totalCost = totalInputCost + totalOutputCost;

  const presets = [
    { label: "10k Prompt / 2k Gen", inTok: 10000, outTok: 2000 },
    { label: "100k Context / 20k Gen", inTok: 100000, outTok: 20000 },
    { label: "500k Document / 50k Gen", inTok: 500000, outTok: 50000 },
    { label: "1M Heavy Load / 100k Gen", inTok: 1000000, outTok: 100000 },
  ];

  return (
    <Card className="border-slate-800 bg-[#111827]/90">
      <CardHeader className="pb-3 border-b-slate-800/80">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" /> Workload Cost Estimator
          </CardTitle>
          <span className="text-[11px] font-mono text-slate-400">
            Rates per 1M: {formatPricing(inputPricePerM)} in / {formatPricing(outputPricePerM)} out
          </span>
        </div>
        <CardDescription>
          Simulate real-world API token expenditures for {modelName}.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-5">
        {/* Quick Presets */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setInputTokens(preset.inTok);
                setOutputTokens(preset.outTok);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                inputTokens === preset.inTok && outputTokens === preset.outTok
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Sliders / Number Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Input Tokens (Prompt):</span>
              <span className="font-mono text-white font-semibold">{formatTokens(inputTokens)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="2000000"
              step="5000"
              value={inputTokens}
              onChange={(e) => setInputTokens(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 text-right font-mono">
              Input Subtotal: ${totalInputCost.toFixed(4)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Output Tokens (Completion):</span>
              <span className="font-mono text-white font-semibold">{formatTokens(outputTokens)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="1000"
              value={outputTokens}
              onChange={(e) => setOutputTokens(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 text-right font-mono">
              Output Subtotal: ${totalOutputCost.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Total Cost Highlight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Estimated Total Cost per Run</p>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
                ${totalCost.toFixed(4)}
              </p>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 max-w-[140px] text-right">
            Based on {formatTokens(inputTokens + outputTokens)} total tokens processed
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

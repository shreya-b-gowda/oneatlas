import React from "react";
import Link from "next/link";
import { Scale, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export const QuickCompareBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-purple-950/50 p-6 md:p-8 backdrop-blur-md shadow-xl">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-400" /> 3-Way Model Intelligence Matrix
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Compare Models Side-by-Side
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Evaluate context retention, token pricing per 1M, and verified benchmark scores across Claude 3.5 Sonnet, GPT-4o, and DeepSeek R1 in real-time.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Token Pricing
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Context Limits
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> MMLU & HumanEval
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <Link href="/compare">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Scale className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Launch Comparator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Link from "next/link";
import { AIModel } from "@/types";
import { formatTokens, formatPricing, formatDate } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/common/Table";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Trophy, ArrowRight } from "lucide-react";

export interface ComparisonMatrixProps {
  models: AIModel[];
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ models }) => {
  if (models.length === 0) return null;

  // Compute Winning Metrics
  const maxContext = Math.max(...models.map((m) => m.contextWindow));
  const minInputPrice = Math.min(...models.map((m) => m.inputPricePerM));
  const minOutputPrice = Math.min(...models.map((m) => m.outputPricePerM));

  // Compute Winning Benchmark Scores
  const benchmarkCategories = ["MMLU", "HumanEval", "GSM8K", "GPQA"];
  const bestBenchmarks: Record<string, number> = {};

  benchmarkCategories.forEach((cat) => {
    const scores = models
      .map((m) => m.benchmarks.find((b) => b.name === cat)?.score ?? 0)
      .filter((s) => s > 0);
    if (scores.length > 0) {
      bestBenchmarks[cat] = Math.max(...scores);
    }
  });

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Evaluation Metric</TableHead>
            {models.map((model) => (
              <TableHead key={model.id} className="text-center font-bold text-white text-xs">
                {model.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Creator / AI Lab */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">AI Research Lab</TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center">
                <span className="text-xs text-slate-200">{m.labName}</span>
              </TableCell>
            ))}
          </TableRow>

          {/* License / Model Type */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">Model License</TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center">
                <Badge
                  variant={m.modelType === "Open Source" ? "amber" : "purple"}
                  size="sm"
                >
                  {m.modelType}
                </Badge>
              </TableCell>
            ))}
          </TableRow>

          {/* Context Window */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">
              Context Window (tokens)
            </TableCell>
            {models.map((m) => {
              const isBest = m.contextWindow === maxContext && models.length > 1;
              return (
                <TableCell
                  key={m.id}
                  className={`text-center font-mono text-xs ${
                    isBest
                      ? "bg-blue-600/10 text-blue-300 font-bold border-x border-blue-500/30"
                      : "text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{formatTokens(m.contextWindow)}</span>
                    {isBest && (
                      <Badge variant="blue" size="sm">
                        Largest
                      </Badge>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>

          {/* Input Price */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">
              Input Token Price / 1M
            </TableCell>
            {models.map((m) => {
              const isBest = m.inputPricePerM === minInputPrice && models.length > 1;
              return (
                <TableCell
                  key={m.id}
                  className={`text-center font-mono text-xs ${
                    isBest
                      ? "bg-emerald-600/10 text-emerald-300 font-bold border-x border-emerald-500/30"
                      : "text-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{formatPricing(m.inputPricePerM)}</span>
                    {isBest && (
                      <Badge variant="green" size="sm">
                        Cheapest
                      </Badge>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>

          {/* Output Price */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">
              Output Token Price / 1M
            </TableCell>
            {models.map((m) => {
              const isBest = m.outputPricePerM === minOutputPrice && models.length > 1;
              return (
                <TableCell
                  key={m.id}
                  className={`text-center font-mono text-xs ${
                    isBest
                      ? "bg-emerald-600/10 text-emerald-300 font-bold border-x border-emerald-500/30"
                      : "text-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{formatPricing(m.outputPricePerM)}</span>
                    {isBest && (
                      <Badge variant="green" size="sm">
                        Cheapest
                      </Badge>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>

          {/* Max Output Tokens */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">
              Max Completion Tokens
            </TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center font-mono text-xs text-slate-300">
                {formatTokens(m.maxOutputTokens)}
              </TableCell>
            ))}
          </TableRow>

          {/* Supported Modalities */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">Modalities</TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center">
                <div className="flex justify-center gap-1 flex-wrap">
                  {m.modalities.map((mod) => (
                    <span
                      key={mod}
                      className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </TableCell>
            ))}
          </TableRow>

          {/* Benchmark Evaluations Header */}
          <TableRow className="bg-slate-900/90">
            <TableCell
              colSpan={models.length + 1}
              className="text-xs font-bold uppercase tracking-wider text-amber-400 py-2.5"
            >
              Scientific Benchmark Scores
            </TableCell>
          </TableRow>

          {/* Benchmarks Rows */}
          {benchmarkCategories.map((benchmarkName) => (
            <TableRow key={benchmarkName}>
              <TableCell className="font-semibold text-slate-300">
                {benchmarkName} Score
              </TableCell>
              {models.map((m) => {
                const b = m.benchmarks.find((item) => item.name === benchmarkName);
                const isBest =
                  b &&
                  b.score === bestBenchmarks[benchmarkName] &&
                  models.length > 1;

                return (
                  <TableCell
                    key={m.id}
                    className={`text-center font-mono text-xs ${
                      isBest
                        ? "bg-amber-600/10 text-amber-300 font-bold border-x border-amber-500/30"
                        : "text-slate-300"
                    }`}
                  >
                    {b ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <span>{b.score.toFixed(1)}%</span>
                        {isBest && (
                          <Trophy className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-600">N/A</span>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {/* Available Providers Count */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">
              Hosting Providers
            </TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center text-xs text-slate-300">
                {m.providers.length} {m.providers.length === 1 ? "provider" : "providers"}
              </TableCell>
            ))}
          </TableRow>

          {/* Release Date */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">Release Date</TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center text-xs text-slate-400">
                {formatDate(m.releaseDate)}
              </TableCell>
            ))}
          </TableRow>

          {/* Action Row */}
          <TableRow>
            <TableCell className="font-semibold text-slate-300">Deep Inspection</TableCell>
            {models.map((m) => (
              <TableCell key={m.id} className="text-center">
                <Link href={`/models/${m.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    rightIcon={<ArrowRight className="w-3 h-3" />}
                  >
                    Inspect
                  </Button>
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

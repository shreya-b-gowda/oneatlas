import React from "react";
import Link from "next/link";
import { AIModel } from "@/types";
import { formatTokens, formatPricing, formatDate } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/common/Table";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface ModelTableProps {
  models: AIModel[];
  onCompareToggle?: (model: AIModel) => void;
  selectedCompareIds?: string[];
}

export const ModelTable: React.FC<ModelTableProps> = ({
  models,
  onCompareToggle,
  selectedCompareIds = [],
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Model & Identifier</TableHead>
          <TableHead>AI Lab</TableHead>
          <TableHead>License</TableHead>
          <TableHead>Context Window</TableHead>
          <TableHead>Input Price / 1M</TableHead>
          <TableHead>Output Price / 1M</TableHead>
          <TableHead>Modalities</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => {
          const isComparing = selectedCompareIds.includes(model.id);

          return (
            <TableRow key={model.id}>
              {/* Model Name */}
              <TableCell>
                <div>
                  <Link
                    href={`/models/${model.id}`}
                    className="font-semibold text-white text-xs hover:text-blue-400 transition"
                  >
                    {model.name}
                  </Link>
                  <p className="text-[10px] font-mono text-slate-500">{model.slug}</p>
                </div>
              </TableCell>

              {/* Lab */}
              <TableCell>
                <span className="text-xs text-slate-300">{model.labName}</span>
              </TableCell>

              {/* License */}
              <TableCell>
                <Badge
                  variant={model.modelType === "Open Source" ? "amber" : "purple"}
                  size="sm"
                >
                  {model.modelType}
                </Badge>
              </TableCell>

              {/* Context */}
              <TableCell>
                <span className="text-xs font-mono text-slate-200">
                  {formatTokens(model.contextWindow)}
                </span>
              </TableCell>

              {/* Input Price */}
              <TableCell>
                <span className="text-xs font-mono text-emerald-400">
                  {formatPricing(model.inputPricePerM)}
                </span>
              </TableCell>

              {/* Output Price */}
              <TableCell>
                <span className="text-xs font-mono text-emerald-400">
                  {formatPricing(model.outputPricePerM)}
                </span>
              </TableCell>

              {/* Modalities */}
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {model.modalities.map((mod) => (
                    <span
                      key={mod}
                      className="px-1 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* Release Date */}
              <TableCell>
                <span className="text-xs text-slate-400">
                  {formatDate(model.releaseDate)}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  {onCompareToggle && (
                    <Button
                      variant={isComparing ? "primary" : "outline"}
                      size="sm"
                      onClick={() => onCompareToggle(model)}
                      className="h-7 text-xs px-2"
                    >
                      {isComparing ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        "+ Compare"
                      )}
                    </Button>
                  )}
                  <Link href={`/models/${model.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

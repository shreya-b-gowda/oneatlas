import React from "react";
import { AIModel } from "@/types";
import { formatPricing, formatTokens } from "@/lib/utils";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Plus, X, Layers, DollarSign } from "lucide-react";

export interface ComparisonSelectorProps {
  allModels: AIModel[];
  selectedModels: AIModel[];
  onAddModel: (modelId: string) => void;
  onRemoveModel: (modelId: string) => void;
}

export const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({
  allModels,
  selectedModels,
  onAddModel,
  onRemoveModel,
}) => {
  const maxSlots = 3;
  const availableModels = allModels.filter(
    (m) => !selectedModels.some((sm) => sm.id === m.id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Render active selected models */}
      {selectedModels.map((model) => (
        <Card
          key={model.id}
          className="relative p-5 border-blue-500/30 bg-[#111827]/90 shadow-md group"
        >
          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemoveModel(model.id)}
            className="absolute top-3 right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label={`Remove ${model.name} from comparison`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant={model.modelType === "Open Source" ? "amber" : "purple"}
                size="sm"
              >
                {model.modelType}
              </Badge>
              <span className="text-xs text-slate-400">{model.labName}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {model.name}
              </h3>
              <p className="font-mono text-[11px] text-slate-500">{model.slug}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-xs">
              <div className="p-2 rounded bg-[#0E1526] border border-slate-800">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-blue-400" /> Context
                </span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {formatTokens(model.contextWindow)}
                </p>
              </div>

              <div className="p-2 rounded bg-[#0E1526] border border-slate-800">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> In / 1M
                </span>
                <p className="font-semibold text-emerald-400 mt-0.5 font-mono">
                  {formatPricing(model.inputPricePerM)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Render Empty Add Slots */}
      {Array.from({ length: maxSlots - selectedModels.length }).map((_, index) => (
        <Card
          key={`empty-slot-${index}`}
          className="border-dashed border-slate-800 bg-[#111827]/40 p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[170px]"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
            <Plus className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-300">
              Add Model Slot ({selectedModels.length + index + 1}/{maxSlots})
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Select another model to evaluate differences
            </p>
          </div>

          {availableModels.length > 0 && (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onAddModel(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className="text-xs bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer max-w-[200px]"
            >
              <option value="" disabled>
                + Choose a model...
              </option>
              {availableModels.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#111827]">
                  {m.name} ({m.labName})
                </option>
              ))}
            </select>
          )}
        </Card>
      ))}
    </div>
  );
};

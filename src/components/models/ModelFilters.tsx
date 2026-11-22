import React from "react";
import { ModelType } from "@/types";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { FilterGroup } from "@/components/common/FilterGroup";
import { Search, RotateCcw } from "lucide-react";

export interface ModelFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLabs: string[];
  onLabsChange: (labs: string[]) => void;
  selectedModalities: string[];
  onModalitiesChange: (mods: string[]) => void;
  selectedModelType: "All" | ModelType;
  onModelTypeChange: (type: "All" | ModelType) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onReset: () => void;
  totalResults: number;
}

const labOptions = [
  { id: "Anthropic", label: "Anthropic" },
  { id: "OpenAI", label: "OpenAI" },
  { id: "Google DeepMind", label: "Google DeepMind" },
  { id: "Meta AI", label: "Meta AI" },
  { id: "DeepSeek", label: "DeepSeek" },
  { id: "Mistral AI", label: "Mistral AI" },
];

const modalityOptions = [
  { id: "Text", label: "Text" },
  { id: "Vision", label: "Vision" },
  { id: "Audio", label: "Audio" },
  { id: "Code", label: "Code" },
];

export const ModelFilters: React.FC<ModelFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedLabs,
  onLabsChange,
  selectedModalities,
  onModalitiesChange,
  selectedModelType,
  onModelTypeChange,
  sortBy,
  onSortByChange,
  onReset,
}) => {
  return (
    <div className="p-5 rounded-xl border border-slate-800 bg-[#111827]/90 space-y-5">
      {/* Search Input */}
      <Input
        label="Search Catalog"
        placeholder="Search name, lab, or provider..."
        leftIcon={<Search className="w-4 h-4 text-slate-400" />}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onClear={() => onSearchChange("")}
      />

      {/* Sort Select */}
      <Select
        label="Sort By"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        options={[
          { value: "popular", label: "Popular & Featured" },
          { value: "inputPriceAsc", label: "Input Price: Low to High" },
          { value: "inputPriceDesc", label: "Input Price: High to Low" },
          { value: "outputPriceAsc", label: "Output Price: Low to High" },
          { value: "outputPriceDesc", label: "Output Price: High to Low" },
          { value: "contextWindow", label: "Context Window: Largest" },
          { value: "releaseDate", label: "Release Date: Newest" },
        ]}
      />

      {/* Model License / Type */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-300">
          Model License
        </label>
        <div className="grid grid-cols-3 gap-1 bg-[#0E1526] p-1 rounded-lg border border-slate-800">
          {(["All", "Proprietary", "Open Source"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onModelTypeChange(type)}
              className={`py-1 text-[11px] font-medium rounded-md transition cursor-pointer ${
                selectedModelType === type
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Modality Filter */}
      <FilterGroup
        title="Modalities"
        options={modalityOptions}
        selectedValues={selectedModalities}
        onChange={onModalitiesChange}
      />

      {/* Labs Filter */}
      <FilterGroup
        title="AI Research Labs"
        options={labOptions}
        selectedValues={selectedLabs}
        onChange={onLabsChange}
      />

      {/* Reset Action */}
      <div className="pt-2 border-t border-slate-800/80">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="w-full text-xs"
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};

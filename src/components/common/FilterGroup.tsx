import React from "react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroupProps {
  title?: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  multiSelect = true,
  className,
}) => {
  const handleToggle = (id: string) => {
    if (multiSelect) {
      if (selectedValues.includes(id)) {
        onChange(selectedValues.filter((v) => v !== id));
      } else {
        onChange([...selectedValues, id]);
      }
    } else {
      if (selectedValues.includes(id)) {
        onChange([]);
      } else {
        onChange([id]);
      }
    }
  };

  return (
    <div className={cn("space-y-2.5", className)}>
      {title && (
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </h4>
      )}
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleToggle(option.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer select-none",
                isSelected
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-500"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              )}
            >
              <span>{option.label}</span>
              {typeof option.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] px-1 rounded",
                    isSelected ? "bg-blue-700 text-blue-100" : "bg-slate-800 text-slate-500"
                  )}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

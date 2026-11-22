import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "circle" | "tableRow";
  count?: number;
}

export const LoadingSkeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "text",
  count = 1,
  ...props
}) => {
  const getSkeletonItem = (index: number) => {
    switch (variant) {
      case "circle":
        return (
          <div
            key={index}
            className={cn("w-10 h-10 rounded-full bg-slate-800/80 animate-pulse", className)}
            {...props}
          />
        );
      case "card":
        return (
          <div
            key={index}
            className={cn("p-5 rounded-xl border border-slate-800 bg-[#111827] space-y-4 animate-pulse", className)}
            {...props}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-slate-800 rounded w-1/3" />
                <div className="h-3 bg-slate-800/60 rounded w-1/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-800/80 rounded w-full" />
              <div className="h-3 bg-slate-800/50 rounded w-5/6" />
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-slate-800/60">
              <div className="h-3 bg-slate-800 rounded w-16" />
              <div className="h-3 bg-slate-800 rounded w-12" />
            </div>
          </div>
        );
      case "tableRow":
        return (
          <div
            key={index}
            className={cn("flex items-center justify-between p-4 border-b border-slate-800/60 animate-pulse", className)}
            {...props}
          >
            <div className="flex items-center gap-3 w-1/3">
              <div className="w-6 h-6 rounded bg-slate-800" />
              <div className="h-4 bg-slate-800 rounded w-3/4" />
            </div>
            <div className="h-4 bg-slate-800 rounded w-20" />
            <div className="h-4 bg-slate-800 rounded w-24" />
            <div className="h-4 bg-slate-800 rounded w-16" />
          </div>
        );
      case "text":
      default:
        return (
          <div
            key={index}
            className={cn("h-4 bg-slate-800/80 rounded animate-pulse w-full", className)}
            {...props}
          />
        );
    }
  };

  return (
    <div className="space-y-2.5 w-full">
      {Array.from({ length: count }).map((_, i) => getSkeletonItem(i))}
    </div>
  );
};

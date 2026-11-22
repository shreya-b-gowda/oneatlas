import React from "react";
import { Button } from "@/components/common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 border-t border-slate-800/80 text-xs text-slate-400 select-none">
      <div>
        Showing <span className="font-semibold text-slate-200">{startItem}</span> to{" "}
        <span className="font-semibold text-slate-200">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-200">{totalItems}</span> models
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 px-2.5 text-xs"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
        </Button>

        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-md font-medium text-xs transition cursor-pointer ${
                  isCurrent
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 px-2.5 text-xs"
        >
          Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

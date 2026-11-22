"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mockModels } from "@/data/mockData";
import { AIModel, ModelType, Modality } from "@/types";
import { ModelCard } from "@/components/models/ModelCard";
import { ModelTable } from "@/components/models/ModelTable";
import { ModelFilters } from "@/components/models/ModelFilters";
import { Pagination } from "@/components/models/Pagination";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/common/Button";
import { 
  Cpu, 
  LayoutGrid, 
  List, 
  Scale, 
  X, 
  Sparkles,
  SlidersHorizontal 
} from "lucide-react";

function ModelsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL search query initial value
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "popular";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedModelType, setSelectedModelType] = useState<"All" | ModelType>("All");
  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const PAGE_SIZE = 6;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleLabsChange = (labs: string[]) => {
    setSelectedLabs(labs);
    setCurrentPage(1);
  };

  const handleModalitiesChange = (mods: string[]) => {
    setSelectedModalities(mods);
    setCurrentPage(1);
  };

  const handleModelTypeChange = (type: "All" | ModelType) => {
    setSelectedModelType(type);
    setCurrentPage(1);
  };

  const handleSortByChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Filtering & Sorting Logic
  const filteredAndSortedModels = useMemo(() => {
    return mockModels
      .filter((model) => {
        // Search Filter (name, lab, slug, description, provider)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = model.name.toLowerCase().includes(q);
          const matchesLab = model.labName.toLowerCase().includes(q);
          const matchesSlug = model.slug.toLowerCase().includes(q);
          const matchesDesc = model.description.toLowerCase().includes(q);
          const matchesProvider = model.providers.some((p) =>
            p.providerName.toLowerCase().includes(q)
          );

          if (!matchesName && !matchesLab && !matchesSlug && !matchesDesc && !matchesProvider) {
            return false;
          }
        }

        // Lab Filter
        if (selectedLabs.length > 0 && !selectedLabs.includes(model.labName)) {
          return false;
        }

        // Modality Filter
        if (
          selectedModalities.length > 0 &&
          !selectedModalities.every((mod) =>
            model.modalities.includes(mod as Modality)
          )
        ) {
          return false;
        }

        // Model License Type Filter
        if (selectedModelType !== "All" && model.modelType !== selectedModelType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "inputPriceAsc":
            return a.inputPricePerM - b.inputPricePerM;
          case "inputPriceDesc":
            return b.inputPricePerM - a.inputPricePerM;
          case "outputPriceAsc":
            return a.outputPricePerM - b.outputPricePerM;
          case "outputPriceDesc":
            return b.outputPricePerM - a.outputPricePerM;
          case "contextWindow":
            return b.contextWindow - a.contextWindow;
          case "releaseDate":
            return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
          case "popular":
          default:
            // Featured/trending first, then release date
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }
      });
  }, [searchQuery, selectedLabs, selectedModalities, selectedModelType, sortBy]);

  // Paginated Slice
  const totalItems = filteredAndSortedModels.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const paginatedModels = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedModels.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedModels, currentPage]);

  // Handle Comparison Selection (Max 3)
  const handleCompareToggle = (model: AIModel) => {
    if (selectedCompareIds.includes(model.id)) {
      setSelectedCompareIds(selectedCompareIds.filter((id) => id !== model.id));
    } else {
      if (selectedCompareIds.length >= 3) {
        alert("You can compare a maximum of 3 models simultaneously.");
        return;
      }
      setSelectedCompareIds([...selectedCompareIds, model.id]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLabs([]);
    setSelectedModalities([]);
    setSelectedModelType("All");
    setSortBy("popular");
    router.push("/models");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto pb-24">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>OneAtlas Discovery Matrix</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Explore AI Models
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter by context limits, input/output pricing, modalities, and providers.
          </p>
        </div>

        {/* View Toggle & Mobile Filter Trigger */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden text-xs"
            leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
          >
            Filters
          </Button>

          <div className="flex items-center p-1 rounded-lg bg-[#0E1526] border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Model Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <ModelFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedLabs={selectedLabs}
            onLabsChange={handleLabsChange}
            selectedModalities={selectedModalities}
            onModalitiesChange={handleModalitiesChange}
            selectedModelType={selectedModelType}
            onModelTypeChange={handleModelTypeChange}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
            onReset={handleResetFilters}
            totalResults={totalItems}
          />
        </div>

        {/* Mobile Filters Dropdown / Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden p-4 rounded-xl border border-slate-800 bg-[#111827] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Filter Parameters
              </span>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ModelFilters
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedLabs={selectedLabs}
              onLabsChange={handleLabsChange}
              selectedModalities={selectedModalities}
              onModalitiesChange={handleModalitiesChange}
              selectedModelType={selectedModelType}
              onModelTypeChange={handleModelTypeChange}
              sortBy={sortBy}
              onSortByChange={handleSortByChange}
              onReset={handleResetFilters}
              totalResults={totalItems}
            />
          </div>
        )}

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-5">
          {/* Active Filter Indicators Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredAndSortedModels.length}</strong> matching models
            </span>
            {(searchQuery || selectedLabs.length > 0 || selectedModalities.length > 0 || selectedModelType !== "All") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredAndSortedModels.length === 0 ? (
            <EmptyState
              title="No Models Matched Your Criteria"
              description="Try clearing your search query or selecting fewer modality and lab filters to expand your results."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onCompareToggle={handleCompareToggle}
                  isComparing={selectedCompareIds.includes(model.id)}
                />
              ))}
            </div>
          ) : (
            <ModelTable
              models={paginatedModels}
              onCompareToggle={handleCompareToggle}
              selectedCompareIds={selectedCompareIds}
            />
          )}

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Floating Comparison Tray */}
      {selectedCompareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl p-3 px-5 rounded-2xl border border-blue-500/40 bg-[#0E1526]/95 backdrop-blur-md shadow-2xl shadow-black/80 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {selectedCompareIds.length} of 3 Models Selected
              </p>
              <p className="text-[11px] text-slate-400">
                Ready for side-by-side technical evaluation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCompareIds([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </Button>
            <Link href={`/compare?models=${selectedCompareIds.join(",")}`}>
              <Button variant="primary" size="sm" className="text-xs" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Compare Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExploreModelsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading catalog...</div>}>
      <ModelsContent />
    </Suspense>
  );
}

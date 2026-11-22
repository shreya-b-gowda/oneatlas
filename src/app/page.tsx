"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Modal } from "@/components/common/Modal";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/common/Table";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { FilterGroup } from "@/components/common/FilterGroup";
import { formatTokens, formatPricing } from "@/lib/utils";

export default function DesignSystemShowcasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("Claude 3.5 Sonnet");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [selectedModalities, setSelectedModalities] = useState<string[]>(["Text", "Vision"]);
  const [activeTab, setActiveTab] = useState<"components" | "states">("components");

  const filterOptions = [
    { id: "Text", label: "Text", count: 24 },
    { id: "Vision", label: "Vision", count: 18 },
    { id: "Audio", label: "Audio", count: 6 },
    { id: "Code", label: "Code Execution", count: 12 },
    { id: "Embedding", label: "Embedding", count: 8 },
  ];

  return (
    <div className="p-6 md:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-[#0E1526] to-[#0B0F19] p-6 md:p-8 shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 2: Enterprise UI/UX Design System Active</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ONE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">ATLAS</span> Design System
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Developer-first aesthetic inspired by Linear, OpenRouter, and modern AI infrastructure.
            Every component below is strictly typed with TypeScript, fully responsive, and styled with Tailwind CSS design tokens.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Test Modal Component
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab(activeTab === "components" ? "states" : "components")}
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Toggle View: {activeTab === "components" ? "Show Async States" : "Show Components"}
            </Button>
          </div>
        </div>
      </div>

      {activeTab === "components" ? (
        <div className="space-y-10">
          {/* Section 1: Buttons & Badges */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Interactive Buttons & Badges</h2>
                <p className="text-xs text-slate-400">Reusable button variants, sizes, icon slots, and status badges.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Button Variants */}
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Primary, secondary, outline, ghost, and danger with active hover states.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                  <Button variant="danger" size="sm">Danger</Button>
                  <Button variant="primary" size="sm" isLoading>Loading</Button>
                </CardContent>
              </Card>

              {/* Badges Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Modality Badges</CardTitle>
                  <CardDescription>Pills with optional animated status dots for model tags and states.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2.5 items-center">
                  <Badge variant="blue" dot>Multimodal</Badge>
                  <Badge variant="purple">Reasoning</Badge>
                  <Badge variant="green" dot>Available</Badge>
                  <Badge variant="amber">Open Weights</Badge>
                  <Badge variant="red">Deprecated</Badge>
                  <Badge variant="default">Text Only</Badge>
                  <Badge variant="outline">200k Context</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 2: Form Controls & Filters */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Inputs, Selects & Faceted Filters</h2>
                <p className="text-xs text-slate-400">Standard form inputs and multi-select filter groups.</p>
              </div>
            </div>

            <Card>
              <CardContent className="space-y-6 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Model Search Input"
                    placeholder="Search by model name or provider..."
                    leftIcon={<Search className="w-4 h-4" />}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClear={() => setSearchValue("")}
                  />

                  <Select
                    label="Sorting Metric"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    options={[
                      { value: "popular", label: "Most Popular & Featured" },
                      { value: "contextWindow", label: "Largest Context Window" },
                      { value: "inputPriceAsc", label: "Input Price: Low to High" },
                      { value: "outputPriceAsc", label: "Output Price: Low to High" },
                      { value: "releaseDate", label: "Release Date (Newest First)" },
                    ]}
                  />
                </div>

                {/* Filter Group Component */}
                <FilterGroup
                  title="Filter by Supported Modalities"
                  options={filterOptions}
                  selectedValues={selectedModalities}
                  onChange={setSelectedModalities}
                />
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Data Table Showcase */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Responsive Data Table</h2>
                <p className="text-xs text-slate-400">Dense layout for exploring frontier models with pricing and tokens.</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Provider / Lab</TableHead>
                  <TableHead>Context Window</TableHead>
                  <TableHead>Input / 1M</TableHead>
                  <TableHead>Output / 1M</TableHead>
                  <TableHead>Modalities</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                        C
                      </div>
                      <div>
                        <p className="font-semibold text-white text-xs">Claude 3.5 Sonnet</p>
                        <p className="text-[11px] text-slate-500">claude-3-5-sonnet-20241022</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-300">Anthropic</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="blue">{formatTokens(200000)} tokens</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-emerald-400">{formatPricing(3.0)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-emerald-400">{formatPricing(15.0)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant="outline">Text</Badge>
                      <Badge variant="outline">Vision</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        G
                      </div>
                      <div>
                        <p className="font-semibold text-white text-xs">GPT-4o</p>
                        <p className="text-[11px] text-slate-500">gpt-4o-2024-08-06</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-300">OpenAI</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="blue">{formatTokens(128000)} tokens</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-emerald-400">{formatPricing(2.5)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-emerald-400">{formatPricing(10.0)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant="outline">Text</Badge>
                      <Badge variant="outline">Vision</Badge>
                      <Badge variant="outline">Audio</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-white text-xs">Gemini 1.5 Pro</p>
                        <p className="text-[11px] text-slate-500">gemini-1.5-pro-002</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-300">Google DeepMind</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="purple">{formatTokens(2000000)} tokens</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-emerald-400">{formatPricing(1.25)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-emerald-400">{formatPricing(5.0)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant="outline">Text</Badge>
                      <Badge variant="outline">Vision</Badge>
                      <Badge variant="outline">Audio</Badge>
                      <Badge variant="outline">Video</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </div>
      ) : (
        /* Asynchronous States: Skeletons, Empty, Error */
        <div className="space-y-8">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-white">Loading Skeleton Shimmers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
            </div>
            <LoadingSkeleton variant="tableRow" count={3} />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-bold text-white mb-3">Empty State Pattern</h3>
              <EmptyState
                title="No Models Found"
                description="We couldn't find any AI models matching your filter criteria. Try resetting your search parameters."
                actionLabel="Clear Filters"
                onAction={() => alert("Filters reset!")}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-3">Error State Pattern</h3>
              <ErrorState
                title="Database Connection Timeout"
                message="Unable to reach PostgreSQL cluster on Neon. Ensure connection pool is active."
                onRetry={() => alert("Retrying connection...")}
              />
            </div>
          </section>
        </div>
      )}

      {/* Accessible Interactive Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Model Inspector"
        description="This modal demonstrates accessible dialog behavior with ESC key listener and outside click dismiss."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Confirm Action
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            You are inspecting <strong className="text-white">Claude 3.5 Sonnet</strong>.
            This modal is built with zero external heavy libraries, respects screen reader roles (<code className="text-blue-400">role=&quot;dialog&quot;</code>), locks body scrolling when open, and restores it on unmount.
          </p>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <p className="font-semibold text-slate-200">Engineering Internship Tip:</p>
            <p className="text-slate-400">
              Modals should always be trapped within a React Portal or positioned with high z-index and fixed overlays to avoid CSS stacking context clipping issues.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

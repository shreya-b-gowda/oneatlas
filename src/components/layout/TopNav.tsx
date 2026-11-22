"use client";

import React from "react";
import { Menu, Search, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";

export interface TopNavProps {
  onToggleMobileMenu: () => void;
  onOpenSearch?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onToggleMobileMenu,
  onOpenSearch,
}) => {
  return (
    <header className="h-16 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Menu Trigger + Breadcrumb Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="text-slate-500">Workspace</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> OneAtlas Intelligence Engine
          </span>
        </div>
      </div>

      {/* Center: Global Search Input / Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#0E1526] hover:bg-[#11192e] border border-slate-800 text-xs text-slate-400 transition group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
            <span>Search models, labs, providers...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900 text-[10px] font-mono text-slate-400">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right: Operational Status & Action */}
      <div className="flex items-center gap-3">
        {/* Status Pill */}
        <div className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>Operational</span>
        </div>

        <LinkButton />
      </div>
    </header>
  );
};

const LinkButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden sm:inline-flex text-xs"
      onClick={() => window.open("/models", "_self")}
    >
      Browse Models
    </Button>
  );
};

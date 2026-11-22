"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Cpu,
  Scale,
  Trophy,
  Building2,
  Server,
  Zap,
  Code2,
  Database,
  X
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Explore Models", href: "/models", icon: Cpu, badge: "Catalog" },
  { label: "Model Comparator", href: "/compare", icon: Scale, badge: "3-Way" },
  { label: "Rankings & Benchmarks", href: "/rankings", icon: Trophy, badge: "Live" },
  { label: "AI Labs Directory", href: "/labs", icon: Building2 },
  { label: "Inference Providers", href: "/providers", icon: Server },
];

export interface SidebarProps {
  onCloseMobile?: () => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile, isMobile = false }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col bg-[#0B0F19] border-r border-slate-800/80 text-slate-300 h-full select-none",
        isMobile ? "w-72 p-4" : "w-64 p-5"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group transition"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-base">ONE</span>
              <span className="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-base">ATLAS</span>
            </div>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">AI Intelligence</p>
          </div>
        </Link>

        {isMobile && onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Platform
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group",
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm shadow-blue-500/10"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                    isActive
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-slate-800 text-slate-500 group-hover:text-slate-400"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Database & Infrastructure Status Footer */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Database className="w-3.5 h-3.5 text-blue-400" /> PostgreSQL
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-500">Prisma Schema v1.0 Ready</p>
        </div>

        <div className="flex items-center justify-between px-1 text-slate-400 text-xs">
          <span className="text-[11px]">Internship Final Year</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
};

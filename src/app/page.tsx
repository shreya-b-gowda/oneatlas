import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Scale, 
  Trophy, 
  Building2, 
  Server 
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-[#0B0F19] text-slate-100">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OneAtlas Phase 1 Initialized & Verified</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            ONE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">ATLAS</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The next-generation AI Model Discovery and Intelligence Platform. Evaluate token economics, context windows, and real-world benchmark metrics.
          </p>
        </div>

        {/* Verification Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
          <div className="p-5 rounded-xl border border-slate-800 bg-[#111827]/80 hover:border-slate-700 transition">
            <div className="flex items-center gap-3 mb-3 text-blue-400">
              <Cpu className="w-5 h-5" />
              <h3 className="font-semibold text-white">Next.js App Router</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Configured with TypeScript strict mode, React Server Components, and optimized Turbopack routing.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#111827]/80 hover:border-slate-700 transition">
            <div className="flex items-center gap-3 mb-3 text-purple-400">
              <Layers className="w-5 h-5" />
              <h3 className="font-semibold text-white">Tailwind CSS & Theme</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dark navy charcoal palette with professional blue/violet accents and custom utility functions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#111827]/80 hover:border-slate-700 transition">
            <div className="flex items-center gap-3 mb-3 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-semibold text-white">Environment Ready</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All dependencies installed, type contracts validated, and zero build warnings or font bottlenecks.
            </p>
          </div>
        </div>

        {/* Planned Navigation Preview */}
        <div className="pt-8 border-t border-slate-800/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Platform Modules Architecture
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" /> Models Catalog
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-400" /> Model Comparator
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Leaderboards
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> AI Labs
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" /> Providers
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { AlertTriangle, Home, Cpu } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-5">
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/5">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">404 – Page Not Found</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The page or intelligence resource you are looking for does not exist in the OneAtlas platform. It may have been moved or unlisted.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/models">
          <Button variant="outline" size="md" leftIcon={<Cpu className="w-4 h-4" />}>
            Browse Models Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
}

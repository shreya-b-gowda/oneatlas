import Link from "next/link";
import { Button } from "@/components/common/Button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function ModelNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">Model Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md">
        The requested AI model identifier does not exist in the OneAtlas intelligence catalog. It may have been unlisted or renamed.
      </p>
      <Link href="/models">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Models Catalog
        </Button>
      </Link>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-10 text-center rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-red-300/80 max-w-md mt-1.5 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCw className="w-3.5 h-3.5" />}
          className="mt-5"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

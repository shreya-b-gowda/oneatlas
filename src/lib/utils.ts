import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names with Tailwind CSS class resolution.
 * Prevents conflicting Tailwind utility classes (e.g., 'px-2' vs 'px-4').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats large token numbers (e.g., 128000 -> "128k", 2000000 -> "2M")
 */
export function formatTokens(num: number): string {
  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}M`;
  }
  if (num >= 1_000) {
    const formatted = (num / 1_000).toFixed(0);
    return `${formatted}k`;
  }
  return num.toLocaleString();
}

/**
 * Formats monetary rates per 1M tokens (e.g., 2.5 -> "$2.50 / 1M")
 */
export function formatPricing(price: number): string {
  if (price === 0) return "Free";
  if (price < 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
}

/**
 * Human-readable date formatter
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

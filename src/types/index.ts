export type Modality = "Text" | "Vision" | "Audio" | "Embedding" | "Code";

export type ModelType = "Proprietary" | "Open Source";

export type BenchmarkCategory = "Reasoning" | "Coding" | "Mathematics" | "General Knowledge";

export interface BenchmarkScore {
  id: string;
  name: string;
  category: BenchmarkCategory;
  score: number;
  maxScore: number;
  description?: string;
}

export interface ProviderPricing {
  providerId: string;
  providerName: string;
  providerSlug: string;
  inputPricePerM: number;
  outputPricePerM: number;
  latencyMs: number;
  availability: "High" | "Normal" | "Degraded";
  apiEndpoint?: string;
}

export interface AILab {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  foundedYear: number;
  headquarters: string;
  logoUrl?: string;
  totalModels: number;
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  supportedModelsCount: number;
  avgLatencyMs: number;
  uptimePercentage: number;
  isHost: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  slug: string;
  labId: string;
  labName: string;
  description: string;
  contextWindow: number;
  maxOutputTokens: number;
  inputPricePerM: number;
  outputPricePerM: number;
  modelType: ModelType;
  modalities: Modality[];
  releaseDate: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  benchmarks: BenchmarkScore[];
  providers: ProviderPricing[];
}

export interface FilterState {
  searchQuery: string;
  selectedLabs: string[];
  selectedModalities: Modality[];
  selectedModelType: "All" | ModelType;
  maxInputPrice?: number;
  minContextWindow?: number;
  sortBy: "popular" | "contextWindow" | "inputPriceAsc" | "inputPriceDesc" | "outputPriceAsc" | "outputPriceDesc" | "releaseDate";
}

export interface ModelStatistics {
  totalModels: number;
  totalLabs: number;
  totalProviders: number;
  maxContextWindow: number;
  lowestPricePerM: number;
}

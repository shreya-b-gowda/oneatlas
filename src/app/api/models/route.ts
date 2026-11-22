import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockModels } from "@/data/mockData";
import { Modality, BenchmarkCategory } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const lab = searchParams.get("lab") || "";
    const modality = searchParams.get("modality") || "";
    const modelType = searchParams.get("modelType") || "";
    const sort = searchParams.get("sort") || "popular";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") || "6", 10)));

    let modelsData = [];
    let dataSource = "database";

    try {
      // Attempt to query PostgreSQL database via Prisma
      const dbModels = await prisma.model.findMany({
        where: {
          AND: [
            search
              ? {
                  OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                  ],
                }
              : {},
            lab ? { lab: { name: { equals: lab, mode: "insensitive" } } } : {},
            modelType && modelType !== "All" ? { modelType: { equals: modelType } } : {},
          ],
        },
        include: {
          lab: true,
          benchmarks: true,
          providers: {
            include: { provider: true },
          },
        },
      });

      if (dbModels && dbModels.length > 0) {
        modelsData = dbModels.map((m) => ({
          id: m.id,
          name: m.name,
          slug: m.slug,
          labId: m.labId,
          labName: m.lab.name,
          description: m.description,
          contextWindow: m.contextWindow,
          maxOutputTokens: m.maxOutputTokens,
          inputPricePerM: m.inputPricePerM,
          outputPricePerM: m.outputPricePerM,
          modelType: m.modelType as "Proprietary" | "Open Source",
          modalities: m.modalities as unknown as Modality[],
          releaseDate: m.releaseDate,
          isFeatured: m.isFeatured,
          isTrending: m.isTrending,
          benchmarks: m.benchmarks.map((b) => ({
            id: b.id,
            name: b.name,
            category: b.category as unknown as BenchmarkCategory,
            score: b.score,
            maxScore: b.maxScore,
          })),
          providers: m.providers.map((p) => ({
            providerId: p.providerId,
            providerName: p.provider.name,
            providerSlug: p.provider.slug,
            inputPricePerM: p.inputPricePerM,
            outputPricePerM: p.outputPricePerM,
            latencyMs: p.latencyMs,
            availability: p.availability as "High" | "Normal" | "Degraded",
          })),
        }));
      } else {
        throw new Error("No database records; using fallback");
      }
    } catch {
      // Graceful fallback to static structured dataset
      dataSource = "fallback-dataset";
      modelsData = [...mockModels];
    }

    // Apply In-Memory Filtering (ensures identical behavior across data sources)
    const filtered = modelsData.filter((m) => {
      if (search) {
        const matchesName = m.name.toLowerCase().includes(search);
        const matchesLab = m.labName.toLowerCase().includes(search);
        const matchesSlug = m.slug.toLowerCase().includes(search);
        const matchesDesc = m.description.toLowerCase().includes(search);
        if (!matchesName && !matchesLab && !matchesSlug && !matchesDesc) return false;
      }
      if (lab && m.labName.toLowerCase() !== lab.toLowerCase()) return false;
      if (modality && !m.modalities.some((mod: string) => mod.toLowerCase() === modality.toLowerCase())) return false;
      if (modelType && modelType !== "All" && m.modelType.toLowerCase() !== modelType.toLowerCase()) return false;
      return true;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
      switch (sort) {
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
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
    });

    // Pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      success: true,
      source: dataSource,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
      data: paginated,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve models";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

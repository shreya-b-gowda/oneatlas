import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockModels } from "@/data/mockData";
import { Modality, BenchmarkCategory } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let model = null;
    let dataSource = "database";

    try {
      const dbModel = await prisma.model.findFirst({
        where: {
          OR: [{ id: id }, { slug: id }],
        },
        include: {
          lab: true,
          benchmarks: true,
          providers: {
            include: { provider: true },
          },
        },
      });

      if (dbModel) {
        model = {
          id: dbModel.id,
          name: dbModel.name,
          slug: dbModel.slug,
          labId: dbModel.labId,
          labName: dbModel.lab.name,
          description: dbModel.description,
          contextWindow: dbModel.contextWindow,
          maxOutputTokens: dbModel.maxOutputTokens,
          inputPricePerM: dbModel.inputPricePerM,
          outputPricePerM: dbModel.outputPricePerM,
          modelType: dbModel.modelType as "Proprietary" | "Open Source",
          modalities: dbModel.modalities as unknown as Modality[],
          releaseDate: dbModel.releaseDate,
          isFeatured: dbModel.isFeatured,
          isTrending: dbModel.isTrending,
          benchmarks: dbModel.benchmarks.map((b) => ({
            id: b.id,
            name: b.name,
            category: b.category as unknown as BenchmarkCategory,
            score: b.score,
            maxScore: b.maxScore,
          })),
          providers: dbModel.providers.map((p) => ({
            providerId: p.providerId,
            providerName: p.provider.name,
            providerSlug: p.provider.slug,
            inputPricePerM: p.inputPricePerM,
            outputPricePerM: p.outputPricePerM,
            latencyMs: p.latencyMs,
            availability: p.availability as "High" | "Normal" | "Degraded",
          })),
        };
      } else {
        throw new Error("Model not found in database");
      }
    } catch {
      dataSource = "fallback-dataset";
      model = mockModels.find((m) => m.id === id || m.slug === id) || null;
    }

    if (!model) {
      return NextResponse.json(
        { success: false, error: `Model with ID or slug '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      source: dataSource,
      data: model,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch model profile";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

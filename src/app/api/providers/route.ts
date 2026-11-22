import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockProviders } from "@/data/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";

    let providersData = [];
    let dataSource = "database";

    try {
      const dbProviders = await prisma.provider.findMany({
        where: search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        include: {
          models: {
            include: { model: true },
          },
        },
      });

      if (dbProviders && dbProviders.length > 0) {
        providersData = dbProviders.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          website: p.website,
          supportedModelsCount: p.models.length || p.supportedModelsCount,
          avgLatencyMs: p.avgLatencyMs,
          uptimePercentage: p.uptimePercentage,
          isHost: p.isHost,
        }));
      } else {
        throw new Error("No database providers found");
      }
    } catch {
      dataSource = "fallback-dataset";
      providersData = search
        ? mockProviders.filter(
            (p) =>
              p.name.toLowerCase().includes(search) ||
              p.description.toLowerCase().includes(search)
          )
        : [...mockProviders];
    }

    return NextResponse.json({
      success: true,
      source: dataSource,
      count: providersData.length,
      data: providersData,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve providers";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

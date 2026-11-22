import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockLabs } from "@/data/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";

    let labsData = [];
    let dataSource = "database";

    try {
      const dbLabs = await prisma.aILab.findMany({
        where: search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { headquarters: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        include: {
          models: true,
        },
      });

      if (dbLabs && dbLabs.length > 0) {
        labsData = dbLabs.map((l) => ({
          id: l.id,
          name: l.name,
          slug: l.slug,
          description: l.description,
          website: l.website,
          foundedYear: l.foundedYear,
          headquarters: l.headquarters,
          totalModels: l.models.length,
        }));
      } else {
        throw new Error("No database labs found");
      }
    } catch {
      dataSource = "fallback-dataset";
      labsData = search
        ? mockLabs.filter(
            (l) =>
              l.name.toLowerCase().includes(search) ||
              l.description.toLowerCase().includes(search) ||
              l.headquarters.toLowerCase().includes(search)
          )
        : [...mockLabs];
    }

    return NextResponse.json({
      success: true,
      source: dataSource,
      count: labsData.length,
      data: labsData,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve AI labs";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

import { PrismaClient } from "@prisma/client";
import { mockLabs, mockProviders, mockModels } from "../src/data/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 [Prisma Seed] Starting OneAtlas database seeding...");

  // 1. Seed AI Labs
  console.log("📦 Seeding AI Labs...");
  for (const lab of mockLabs) {
    await prisma.aILab.upsert({
      where: { id: lab.id },
      update: {
        name: lab.name,
        slug: lab.slug,
        description: lab.description,
        website: lab.website,
        foundedYear: lab.foundedYear,
        headquarters: lab.headquarters,
      },
      create: {
        id: lab.id,
        name: lab.name,
        slug: lab.slug,
        description: lab.description,
        website: lab.website,
        foundedYear: lab.foundedYear,
        headquarters: lab.headquarters,
      },
    });
  }

  // 2. Seed Inference Providers
  console.log("⚡ Seeding Inference Providers...");
  for (const provider of mockProviders) {
    await prisma.provider.upsert({
      where: { id: provider.id },
      update: {
        name: provider.name,
        slug: provider.slug,
        description: provider.description,
        website: provider.website,
        supportedModelsCount: provider.supportedModelsCount,
        avgLatencyMs: provider.avgLatencyMs,
        uptimePercentage: provider.uptimePercentage,
        isHost: provider.isHost,
      },
      create: {
        id: provider.id,
        name: provider.name,
        slug: provider.slug,
        description: provider.description,
        website: provider.website,
        supportedModelsCount: provider.supportedModelsCount,
        avgLatencyMs: provider.avgLatencyMs,
        uptimePercentage: provider.uptimePercentage,
        isHost: provider.isHost,
      },
    });
  }

  // 3. Seed Models & Relationships
  console.log("🧠 Seeding AI Models, Benchmarks & Endpoints...");
  for (const model of mockModels) {
    await prisma.model.upsert({
      where: { id: model.id },
      update: {
        name: model.name,
        slug: model.slug,
        labId: model.labId,
        description: model.description,
        contextWindow: model.contextWindow,
        maxOutputTokens: model.maxOutputTokens,
        inputPricePerM: model.inputPricePerM,
        outputPricePerM: model.outputPricePerM,
        modelType: model.modelType,
        modalities: model.modalities,
        releaseDate: model.releaseDate,
        isFeatured: model.isFeatured ?? false,
        isTrending: model.isTrending ?? false,
      },
      create: {
        id: model.id,
        name: model.name,
        slug: model.slug,
        labId: model.labId,
        description: model.description,
        contextWindow: model.contextWindow,
        maxOutputTokens: model.maxOutputTokens,
        inputPricePerM: model.inputPricePerM,
        outputPricePerM: model.outputPricePerM,
        modelType: model.modelType,
        modalities: model.modalities,
        releaseDate: model.releaseDate,
        isFeatured: model.isFeatured ?? false,
        isTrending: model.isTrending ?? false,
      },
    });

    // Seed Benchmarks for model
    for (const benchmark of model.benchmarks) {
      await prisma.benchmark.create({
        data: {
          id: `${model.id}-${benchmark.id}-${benchmark.name.toLowerCase()}`,
          modelId: model.id,
          name: benchmark.name,
          category: benchmark.category,
          score: benchmark.score,
          maxScore: benchmark.maxScore,
        },
      });
    }

    // Seed ModelProvider relationships
    for (const provider of model.providers) {
      await prisma.modelProvider.upsert({
        where: {
          modelId_providerId: {
            modelId: model.id,
            providerId: provider.providerId,
          },
        },
        update: {
          inputPricePerM: provider.inputPricePerM,
          outputPricePerM: provider.outputPricePerM,
          latencyMs: provider.latencyMs,
          availability: provider.availability,
        },
        create: {
          modelId: model.id,
          providerId: provider.providerId,
          inputPricePerM: provider.inputPricePerM,
          outputPricePerM: provider.outputPricePerM,
          latencyMs: provider.latencyMs,
          availability: provider.availability,
        },
      });
    }
  }

  console.log("✅ [Prisma Seed] Database successfully seeded with foundation intelligence records!");
}

main()
  .catch((e) => {
    console.error("❌ [Prisma Seed Error]:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

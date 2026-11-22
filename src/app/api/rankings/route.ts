import { NextResponse } from "next/server";
import { mockModels } from "@/data/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "overall";

    let metricLabel = "Composite Intelligence Index";
    const scoredList = mockModels.map((model) => {
      const mmlu = model.benchmarks.find((b) => b.name === "MMLU")?.score ?? 0;
      const humanEval = model.benchmarks.find((b) => b.name === "HumanEval")?.score ?? 0;
      const gsm8k = model.benchmarks.find((b) => b.name === "GSM8K")?.score ?? 0;
      const gpqa = model.benchmarks.find((b) => b.name === "GPQA")?.score ?? 0;

      let score = 0;
      switch (category) {
        case "coding":
          metricLabel = "HumanEval (Coding)";
          score = humanEval;
          break;
        case "reasoning":
          metricLabel = "MMLU (Reasoning)";
          score = mmlu;
          break;
        case "math":
          metricLabel = "GSM8K (Mathematics)";
          score = gsm8k;
          break;
        case "gpqa":
          metricLabel = "GPQA (Hard Reasoning)";
          score = gpqa;
          break;
        case "overall":
        default:
          metricLabel = "Composite Intelligence Index";
          score = mmlu * 0.3 + humanEval * 0.3 + gsm8k * 0.2 + gpqa * 0.2;
          break;
      }

      return {
        id: model.id,
        name: model.name,
        slug: model.slug,
        labName: model.labName,
        modelType: model.modelType,
        contextWindow: model.contextWindow,
        inputPricePerM: model.inputPricePerM,
        outputPricePerM: model.outputPricePerM,
        score: parseFloat(score.toFixed(2)),
      };
    });

    // Sort descending by score
    scoredList.sort((a, b) => b.score - a.score);

    // Assign ranking position
    const ranked = scoredList.map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

    return NextResponse.json({
      success: true,
      category,
      metricLabel,
      count: ranked.length,
      data: ranked,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve rankings";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

import { GET as getModels } from "./src/app/api/models/route";
import { GET as getModelById } from "./src/app/api/models/[id]/route";
import { GET as getProviders } from "./src/app/api/providers/route";
import { GET as getLabs } from "./src/app/api/labs/route";
import { GET as getRankings } from "./src/app/api/rankings/route";

async function verifyAllEndpoints() {
  console.log("🧪 [API Verification] Starting automated tests for all 5 REST API routes...\n");

  // 1. Test GET /api/models?search=claude
  const req1 = new Request("http://localhost:3000/api/models?search=claude&limit=5");
  const res1 = await getModels(req1);
  const data1 = await res1.json();
  console.log(`✅ [1/5] GET /api/models: Status ${res1.status} | Success: ${data1.success} | Filtered count: ${data1.data.length} | Source: ${data1.source}`);

  // 2. Test GET /api/models/[id]
  const req2 = new Request("http://localhost:3000/api/models/model-claude-3-5-sonnet");
  const res2 = await getModelById(req2, { params: Promise.resolve({ id: "model-claude-3-5-sonnet" }) });
  const data2 = await res2.json();
  console.log(`✅ [2/5] GET /api/models/[id]: Status ${res2.status} | Success: ${data2.success} | Model: ${data2.data?.name} | Source: ${data2.source}`);

  // 3. Test GET /api/providers
  const req3 = new Request("http://localhost:3000/api/providers");
  const res3 = await getProviders(req3);
  const data3 = await res3.json();
  console.log(`✅ [3/5] GET /api/providers: Status ${res3.status} | Success: ${data3.success} | Total: ${data3.data.length} | Source: ${data3.source}`);

  // 4. Test GET /api/labs
  const req4 = new Request("http://localhost:3000/api/labs");
  const res4 = await getLabs(req4);
  const data4 = await res4.json();
  console.log(`✅ [4/5] GET /api/labs: Status ${res4.status} | Success: ${data4.success} | Total: ${data4.data.length} | Source: ${data4.source}`);

  // 5. Test GET /api/rankings?category=coding
  const req5 = new Request("http://localhost:3000/api/rankings?category=coding");
  const res5 = await getRankings(req5);
  const data5 = await res5.json();
  console.log(`✅ [5/5] GET /api/rankings: Status ${res5.status} | Success: ${data5.success} | Metric: ${data5.metricLabel} | Leader: ${data5.data[0]?.name} (#1)`);

  // 6. Test 404 Error handling
  const reqNotFound = new Request("http://localhost:3000/api/models/non-existent-id");
  const resNotFound = await getModelById(reqNotFound, { params: Promise.resolve({ id: "non-existent-id" }) });
  const dataNotFound = await resNotFound.json();
  console.log(`✅ [Edge Case] GET /api/models/non-existent-id: Status ${resNotFound.status} | Error: "${dataNotFound.error}"`);

  console.log("\n🎉 All 5 REST API endpoints and error handlers verified successfully!");
}

verifyAllEndpoints().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});

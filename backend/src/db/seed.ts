import { db, schema } from "./index.js";
import { initialToolsData } from "./seeds/tools.seed.js";

export async function runSeed() {
  console.log("🌱 Starting HR Tools seed process...");
  try {
    for (const tool of initialToolsData) {
      await db
        .insert(schema.tools)
        .values(tool)
        .onConflictDoUpdate({
          target: schema.tools.id,
          set: {
            name: tool.name,
            shortDescription: tool.shortDescription,
            fullDescription: tool.fullDescription,
            category: tool.category,
            categoryLabel: tool.categoryLabel,
            badge: tool.badge,
            features: tool.features,
            regions: tool.regions,
            integrations: tool.integrations,
            strengths: tool.strengths,
            limitations: tool.limitations,
            websiteUrl: tool.websiteUrl,
            updatedAt: new Date(),
          },
        });
    }
    console.log(`✅ Successfully seeded ${initialToolsData.length} HR tools into database!`);
  } catch (error) {
    console.error("❌ Database seeding error:", error);
  } finally {
    process.exit(0);
  }
}

// Auto-run if executed directly
runSeed();

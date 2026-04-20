import { openai } from "@/lib/openai";
import { vectorIndex } from "@/lib/vector";

/**
 * Retrieve the top-K most relevant resume/project chunks for a query.
 * Uses cosine similarity on text-embedding-3-small (1536-d).
 */
export async function retrieveContext(query: string, k = 6) {
  // 1. Embed the user question
  const { data } = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  // 2. Vector search in Upstash
  const results = await vectorIndex.query({
    vector: data[0].embedding,
    topK: k,
    includeMetadata: true,
  });

  // 3. Filter low-confidence matches (tune threshold on eval set)
  return results
    .filter((r) => (r.score ?? 0) > 0.5)
    .map((r) => ({
      text: (r.metadata?.text as string) ?? "",
      source: (r.metadata?.source as string) ?? "",
      score: r.score ?? 0,
    }));
}

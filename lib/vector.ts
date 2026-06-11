import { Index } from "@upstash/vector";

// Lazy singleton so `next build` does not require the Upstash credentials.
// Upstash Vector is serverless, works on Vercel Edge, free tier covers this site.
let index: Index | null = null;

export function getVectorIndex(): Index {
  if (!index) {
    index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
    });
  }
  return index;
}

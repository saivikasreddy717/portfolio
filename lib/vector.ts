import { Index } from "@upstash/vector";

// Upstash Vector — serverless, works on Vercel Edge, free tier covers this site
export const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

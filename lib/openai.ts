import OpenAI from "openai";

// Lazy singleton: the OpenAI SDK throws at construction when OPENAI_API_KEY
// is absent, which breaks `next build` in environments without secrets.
// Deferring construction to first use keeps builds secret-free.
let client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

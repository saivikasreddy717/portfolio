// Edge runtime: low latency, cheap, perfect for streaming LLM responses
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { retrieveContext } from "@/lib/rag/retrieve";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { ratelimit } from "@/lib/ratelimit";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  // Rate limit by IP to prevent abuse on the free tier
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response("Rate limit exceeded. Try again in a minute.", { status: 429 });
  }

  const { messages } = await req.json();

  // Use the latest user message as the retrieval query
  const lastUser =
    [...messages].reverse().find((m: { role: string }) => m.role === "user")?.content ?? "";

  // RAG: retrieve relevant chunks from Upstash Vector
  const context = await retrieveContext(lastUser, 6);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // cheap + fast; bump to gpt-4o for deeper questions
    temperature: 0.3,
    stream: true,
    messages: [
      { role: "system", content: buildSystemPrompt(context) },
      ...messages,
    ],
  });

  // Cast needed: openai@4.104 ships `Stream<ChatCompletionChunk>` whose inferred
  // type doesn't narrow against `ai@3.4`'s `AsyncIterable<AzureChatCompletions>`.
  // Runtime shape is correct; this is a pure TypeScript declaration mismatch.
  return new StreamingTextResponse(OpenAIStream(response as never));
}

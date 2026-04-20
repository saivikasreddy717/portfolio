/**
 * Ingestion pipeline — runs locally, not in production.
 * Reads all content/*.md files, chunks them by heading,
 * embeds with text-embedding-3-small, and upserts to Upstash Vector.
 *
 * Run with: `pnpm ingest`
 * Re-run any time you edit content/resume.md or add projects.
 */
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { Index } from "@upstash/vector";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

/**
 * Heading-aware chunker. Splits markdown on ## and ### boundaries,
 * keeps each chunk between ~60 and ~800 chars for good retrieval precision.
 */
function chunkMarkdown(md: string, source: string) {
  const sections = md.split(/\n(?=##+ )/);
  const chunks: { id: string; text: string; source: string }[] = [];

  sections.forEach((sec, i) => {
    const clean = sec.trim();
    if (clean.length < 60) return;

    if (clean.length <= 800) {
      chunks.push({ id: `${source}-${i}`, text: clean, source });
    } else {
      // Further split by paragraph for overly long sections
      const paras = clean.split(/\n\n+/);
      let buf = "";
      paras.forEach((p, j) => {
        if ((buf + p).length > 600 && buf) {
          chunks.push({ id: `${source}-${i}-${j}`, text: buf.trim(), source });
          buf = p;
        } else {
          buf += (buf ? "\n\n" : "") + p;
        }
      });
      if (buf.trim()) {
        chunks.push({ id: `${source}-${i}-final`, text: buf.trim(), source });
      }
    }
  });

  return chunks;
}

async function walkContent(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walkContent(p)));
    else if (e.name.endsWith(".md")) files.push(p);
  }
  return files;
}

async function main() {
  const files = await walkContent("content");
  console.log(`Found ${files.length} markdown files`);

  const allChunks: { id: string; text: string; source: string }[] = [];
  for (const file of files) {
    const raw = await fs.readFile(file, "utf-8");
    const source = path.basename(file, ".md");
    allChunks.push(...chunkMarkdown(raw, source));
  }
  console.log(`Created ${allChunks.length} chunks`);

  // Wipe old vectors so re-runs don't leave stale data
  await index.reset();
  console.log("Index reset");

  const BATCH = 50;
  for (let i = 0; i < allChunks.length; i += BATCH) {
    const batch = allChunks.slice(i, i + BATCH);

    // OpenAI accepts batch embeddings — one API call per 50 chunks
    const { data } = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: batch.map((c) => c.text),
    });

    await index.upsert(
      batch.map((c, j) => ({
        id: c.id,
        vector: data[j].embedding,
        metadata: { source: c.source, text: c.text },
      }))
    );
    console.log(`Upserted ${Math.min(i + BATCH, allChunks.length)}/${allChunks.length}`);
  }

  console.log("Ingestion complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

# Portfolio — Sai Vikas Reddy Yeddulamala

Modern AI/ML portfolio with a streaming RAG chatbot trained on my resume.

## Stack
- **Framework:** Next.js 14 (App Router, Edge Runtime)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **LLM:** OpenAI GPT-4o-mini (chat) + text-embedding-3-small (RAG)
- **Vector DB:** Upstash Vector
- **Rate limiting:** Upstash Redis
- **Hosting:** Vercel (free tier)

---

## Setup — first time

### 1. Install Node.js 20 LTS
Download from [nodejs.org](https://nodejs.org/en/download) and install. Restart your terminal after.

### 2. Install pnpm
```bash
npm install -g pnpm
```

### 3. Install dependencies
```bash
cd "C:/Users/saivi/Projects/Portfolio"
pnpm install
```

### 4. Provision free services

**Upstash** (vector DB + rate limiting — both free):
1. Sign up at [upstash.com](https://upstash.com) with GitHub
2. Create a **Vector database** → dimensions `1536`, metric `cosine`, region near you. Copy URL + token.
3. Create a **Redis database** → same region. Copy URL + token.

**OpenAI** (embeddings + chat):
1. Sign up at [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Set a monthly hard limit (`$5` is plenty — expect ~$0.50/month)

### 5. Create `.env.local`
Copy `.env.local.example` to `.env.local` and paste in the 5 values:

```bash
cp .env.local.example .env.local
# then edit .env.local
```

### 6. Ingest your resume into the vector DB
```bash
pnpm ingest
```
You should see chunks upserted. Re-run any time you edit `content/resume.md`.

### 7. Run locally
```bash
pnpm dev
```
Open http://localhost:3000

---

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
# Create a new repo on github.com named "portfolio"
git remote add origin git@github.com:<YOUR_HANDLE>/portfolio.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Add New → Project** → select your `portfolio` repo
3. Framework: **Next.js** (auto-detected)
4. **Environment Variables** → paste all 5 values from `.env.local`
5. Click **Deploy**

~90 seconds later you'll have a live URL like `your-project.vercel.app`.

### 3. (Optional) Custom domain
- Buy a domain (Porkbun / Namecheap — ~$10/year)
- Vercel → Project → Settings → Domains → Add
- Update `metadataBase` in `app/layout.tsx` to match, then push

---

## Editing content

All your data lives in two files:

| File | What it controls |
|---|---|
| `content/profile.ts` | Name, role, metrics, pillars, skills, experience, roadmap — all structured data on the site |
| `content/resume.md` | Source-of-truth markdown that feeds the RAG chatbot |

**Workflow:**
1. Edit either file
2. If `resume.md` changed, run `pnpm ingest` to refresh the vector DB
3. Commit + push → Vercel auto-redeploys

---

## Adding a new project later

When a side project is ready:

1. Create `content/projects/<slug>.md` with this structure:
   ```markdown
   # <Project Title>

   ## Problem
   ...

   ## Solution
   ...

   ## Architecture
   ...

   ## Stack
   ...

   ## Results
   ...
   ```
2. Run `pnpm ingest` → chatbot instantly knows the project
3. Optionally add a card to `profile.roadmap` or build a `/projects` page

---

## File map

```
app/
  layout.tsx              Root layout, fonts, SEO metadata, JSON-LD
  page.tsx                Composes all sections
  globals.css             Tailwind + design tokens
  api/chat/route.ts       Edge-runtime RAG endpoint (streaming)

components/
  sections/               One file per landing page section
  ui/Chatbot.tsx          Floating AI assistant

content/
  profile.ts              Structured data (edit for hero, skills, etc.)
  resume.md               Raw markdown for RAG ingestion

lib/
  openai.ts               OpenAI client
  vector.ts               Upstash Vector client
  ratelimit.ts            Per-IP rate limiting
  rag/
    retrieve.ts           Embed + search pipeline
    prompt.ts             System prompt template

scripts/
  ingest.ts               Chunks + embeds + upserts (run locally)

public/
  resume.pdf              Direct resume download (add this file!)
```

---


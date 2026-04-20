# Claude Instructions for this project

## Security — NEVER do these

- **NEVER read `.env`, `.env.local`, `.env.production`, or any dotenv file**
- **NEVER read files containing API keys, tokens, or secrets**
- If debugging environment variable issues, describe what to look for and ask the user to check it themselves — do not read the file directly
- If a fix requires knowing an env var *name* (not its value), check `next.config.ts` or source files that reference `process.env.*` instead

## Project overview

Next.js 14 App Router portfolio site for Sai Vikas Reddy Yeddulamala (AI/ML Engineer).
Single source of truth: `content/profile.ts`
Deployment: Vercel (auto-deploy on push to main)

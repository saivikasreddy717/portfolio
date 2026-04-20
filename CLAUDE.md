# Claude Instructions for this project

## Security - NEVER do these

- **NEVER read `.env`, `.env.local`, `.env.production`, or any dotenv file**
- **NEVER read files containing API keys, tokens, or secrets**
- If debugging environment variable issues, describe what to look for and ask the user to check it themselves - do not read the file directly
- If a fix requires knowing an env var *name* (not its value), check `next.config.ts` or source files that reference `process.env.*` instead

## Writing rules - STRICTLY enforced

- **NEVER use em dashes ( — ) anywhere: not in code, not in comments, not in strings, not in JSX, not in content files, not in markdown**
- Replace em dashes with: a comma, a colon, a period, or rewrite the sentence
- This applies to ALL files in this project without exception

## Project overview

Next.js 14 App Router portfolio site for Sai Vikas Reddy Yeddulamala (AI/ML Engineer).
Single source of truth: `content/profile.ts`
Deployment: Vercel (auto-deploy on push to main)

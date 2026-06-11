import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Lazy singleton: Redis.fromEnv() throws when the Upstash env vars are
// absent, which breaks `next build` in environments without secrets.
let limiter: Ratelimit | null = null;

// 10 messages per IP per minute, enough for real use, blocks abuse
export function getRatelimit(): Ratelimit {
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "portfolio-chat",
    });
  }
  return limiter;
}

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 10 messages per IP per minute — enough for real use, blocks abuse
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
  prefix: "portfolio-chat",
});

"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";
import Counter from "@/components/fx/Counter";

/**
 * Telemetry: the metrics wall rendered as a monitoring dashboard. Numbers
 * count up, each card carries a deterministic sparkline of its "history".
 */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Sparkline({ seed, down }: { seed: number; down: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const rand = mulberry32(seed * 7919 + 13);
    const N = 26;
    const pts: number[] = [];
    let v = down ? 0.82 : 0.2;
    for (let i = 0; i < N; i++) {
      v += (down ? -1 : 1) * (0.5 / N) + (rand() - 0.5) * 0.16;
      v = Math.min(Math.max(v, 0.05), 0.95);
      pts.push(v);
    }
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = (i / (N - 1)) * W;
      const y = H - 2 - p * (H - 4);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = `hsla(${accent} / 0.75)`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = `hsla(${accent} / 0.07)`;
    ctx.fill();
    // terminal dot
    const lastY = H - 2 - pts[N - 1] * (H - 4);
    ctx.beginPath();
    ctx.arc(W - 1.5, lastY, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${accent} / 1)`;
    ctx.fill();
  }, [inView, seed, down]);

  return <canvas ref={ref} className="h-8 w-full" aria-hidden="true" />;
}

export default function MetricsWall() {
  return (
    <Epoch
      n={1}
      name="telemetry"
      id="telemetry"
      title={
        <>
          Production telemetry, <span className="gradient-text">live from real systems</span>.
        </>
      }
      sub="Every number below shipped to production at Cardinal Health or TCS and survived contact with real users, auditors, and on-call rotations."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {profile.headlineMetrics.map((m, i) => {
          const down = /latency|stockout/i.test(m.label);
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="panel panel-hover rounded-md p-4 md:p-5 group"
            >
              <div className="flex items-center justify-between hud-label">
                <span>sig/{String(i).padStart(2, "0")}</span>
                <span className="flex items-center gap-1.5 text-[hsl(var(--good))]">
                  <span className="h-1 w-1 rounded-full bg-[hsl(var(--good))] animate-pulse" />
                  ok
                </span>
              </div>
              <div className="mt-3 text-3xl md:text-[2.6rem] leading-none font-semibold tracking-tight text-white group-hover:text-glow transition-all duration-300">
                <Counter value={m.value} />
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-wider text-[hsl(var(--muted))]">
                {m.label}
              </div>
              <div className="mt-3">
                <Sparkline seed={i + 1} down={down} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Core-stack ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="marquee-track mt-6 panel rounded-md overflow-hidden"
      >
        <div className="flex items-center">
          <div className="hud-label shrink-0 border-r border-white/10 px-4 py-3 bg-[hsl(var(--surface))]">
            core stack
          </div>
          <div className="relative flex-1 overflow-hidden py-3">
            <div className="marquee flex w-max gap-8 px-6 font-mono text-xs text-white/60">
              {[...profile.coreStack, ...profile.coreStack].map((tech, i) => (
                <span key={`${tech}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-[hsl(var(--accent))]">▸</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Epoch>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * TrainingHUD: a fixed mission-control panel that treats the visitor's scroll
 * as a training run. Progress = scroll depth, loss decays as you read, epochs
 * map to page sections. At the bottom of the page the run converges and the
 * model emits its verdict.
 */

type EpochInfo = { index: number; name: string; total: number };

export default function TrainingHUD() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loss, setLoss] = useState(2.31);
  const [step, setStep] = useState(0);
  const [epoch, setEpoch] = useState<EpochInfo>({ index: 0, name: "init", total: 8 });
  const [runId, setRunId] = useState("0000");

  useEffect(() => {
    setRunId(Math.floor(1000 + Math.random() * 9000).toString());
  }, []);

  // Track which epoch section is on screen.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-epoch]"));
    if (sections.length === 0) return;
    const total = sections.length - 1; // hero is epoch 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          setEpoch({
            index: Number(el.dataset.epoch ?? 0),
            name: el.dataset.name ?? "",
            total,
          });
        }
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Scroll -> progress, loss, step. Sampled through rAF to stay cheap.
  useEffect(() => {
    let raf = 0;
    let lastSample = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      const noisy =
        2.31 * Math.exp(-3.6 * p) +
        0.012 +
        Math.sin(p * 47) * 0.02 * (1 - p) * Math.random();
      setProgress(p);
      setLoss(noisy);
      setStep(Math.round(p * 14096));
      setVisible(window.scrollY > 160);
      const now = performance.now();
      if (now - lastSample > 90) {
        lastSample = now;
        const hist = historyRef.current;
        hist.push(noisy);
        if (hist.length > 64) hist.shift();
        drawCurve();
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const drawCurve = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = 176;
      const H = 36;
      if (canvas.width !== W * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const hist = historyRef.current;
      if (hist.length < 2) return;
      ctx.beginPath();
      hist.forEach((v, i) => {
        const x = (i / (hist.length - 1)) * W;
        const y = H - 3 - (Math.min(v, 2.4) / 2.4) * (H - 6);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      ctx.strokeStyle = `hsla(${accent} / 0.9)`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = `hsla(${accent} / 0.08)`;
      ctx.fill();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const converged = progress > 0.985;
  if (reduced) return null;

  return (
    <aside
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-5 left-5 z-40 hidden lg:block transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div
        className={`panel w-[212px] p-3.5 font-mono text-[10px] leading-relaxed transition-colors duration-500 ${
          converged ? "border-[hsl(var(--good))]/50" : ""
        }`}
      >
        {/* corner ticks */}
        <span className="absolute -top-px -left-px h-2 w-2 border-t border-l border-[hsl(var(--accent))]/70" />
        <span className="absolute -top-px -right-px h-2 w-2 border-t border-r border-[hsl(var(--accent))]/70" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-[hsl(var(--accent))]/70" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[hsl(var(--accent))]/70" />

        <div className="flex items-center justify-between text-white/45 uppercase tracking-[0.2em]">
          <span>training run</span>
          <span className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                converged ? "bg-[hsl(var(--good))]" : "bg-[hsl(var(--accent))] animate-pulse"
              }`}
            />
            live
          </span>
        </div>

        <div className="mt-2.5 space-y-1 text-white/60">
          <div className="flex justify-between">
            <span className="text-white/35">run_id</span>
            <span>visitor-{runId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/35">epoch</span>
            <span className="text-[hsl(var(--accent))]">
              {epoch.index}/{epoch.total} · {epoch.name}
            </span>
          </div>
        </div>

        <canvas ref={canvasRef} className="mt-2.5 w-full h-9" />

        <div className="mt-1.5 flex justify-between text-white/60">
          <span>
            <span className="text-white/35">loss </span>
            {loss.toFixed(3)}
          </span>
          <span>
            <span className="text-white/35">step </span>
            {step.toLocaleString()}
          </span>
        </div>

        <div className="mt-2.5 h-1 bg-white/10 overflow-hidden rounded-full">
          <div
            className={`h-full rounded-full transition-[width] duration-150 ${
              converged ? "bg-[hsl(var(--good))]" : "bg-[hsl(var(--accent))]"
            }`}
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div
          className={`mt-2 uppercase tracking-[0.18em] ${
            converged ? "text-[hsl(var(--good))]" : "text-white/40"
          }`}
        >
          {converged ? "converged · verdict: hire ✓" : `optimizing · ${Math.round(progress * 100)}%`}
        </div>
      </div>
    </aside>
  );
}

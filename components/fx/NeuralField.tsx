"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * NeuralField: a canvas particle system where particles fly in from chaos and
 * assemble into text, like a network converging on a solution. Near the cursor,
 * particles link to each other and to the pointer, visualizing "attention".
 */

type Particle = {
  x: number;
  y: number;
  sx: number; // spawn position (chaos)
  sy: number;
  hx: number; // home position (text pixel)
  hy: number;
  vx: number;
  vy: number;
  g: 0 | 1 | 2; // color group: cyan / violet / amber
  sz: number;
  ph: number; // twinkle phase
  delay: number; // assembly stagger, seconds
};

const ASSEMBLE_SECONDS = 1.5;

function cssVar(name: string): string {
  if (typeof window === "undefined") return "183 100% 52%";
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || "183 100% 52%";
}

export default function NeuralField({
  text,
  className,
  centerY = 0.4,
}: {
  text: string;
  className?: string;
  centerY?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let links: Array<[number, number]> = [];
    let raf = 0;
    let running = false;
    let inView = true;
    let disposed = false;
    let w = 0;
    let h = 0;
    let bornAt = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const cyan = cssVar("--accent");
    const violet = cssVar("--accent-3");
    const amber = cssVar("--accent-2");
    const groupColor = [cyan, violet, amber];

    function buildParticles() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w < 10 || h < 10) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Render the text offscreen and sample lit pixels as particle homes.
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.round(w));
      off.height = Math.max(1, Math.round(h));
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      const family =
        getComputedStyle(document.documentElement).fontFamily ||
        "system-ui, sans-serif";
      const lines = w < 700 ? text.split(" ") : [text];

      // Fit font size so the longest line spans ~86% of the canvas width.
      octx.font = `800 100px ${family}`;
      const widest = Math.max(...lines.map((l) => octx.measureText(l).width), 1);
      const fontSize = Math.max(
        40,
        Math.min((w * 0.86) / (widest / 100), h * (lines.length > 1 ? 0.2 : 0.3))
      );
      octx.font = `800 ${fontSize}px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      const lineGap = fontSize * 1.06;
      const blockCenter = h * centerY;
      const firstY = blockCenter - ((lines.length - 1) * lineGap) / 2;
      lines.forEach((line, i) => octx.fillText(line, w / 2, firstY + i * lineGap));

      const img = octx.getImageData(0, 0, off.width, off.height).data;
      const small = w < 700;
      const gap = small ? 5 : 4;
      const maxCount = small ? 650 : 1500;
      const homes: Array<[number, number]> = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          if (img[(y * off.width + x) * 4 + 3] > 140) {
            homes.push([x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2]);
          }
        }
      }
      // Thin uniformly if oversampled.
      while (homes.length > maxCount) {
        homes.splice(Math.floor(Math.random() * homes.length), 1);
      }

      particles = homes.map(([hx, hy]) => {
        const fromEdge = Math.random();
        // Spawn scattered across and slightly beyond the canvas.
        const sx = fromEdge < 0.5 ? Math.random() * w : hx + (Math.random() - 0.5) * w * 0.9;
        const sy = fromEdge < 0.5 ? Math.random() * h : hy + (Math.random() - 0.5) * h * 0.9;
        const roll = Math.random();
        return {
          x: sx,
          y: sy,
          sx,
          sy,
          hx,
          hy,
          vx: 0,
          vy: 0,
          g: (roll < 0.78 ? 0 : roll < 0.92 ? 1 : 2) as 0 | 1 | 2,
          sz: Math.random() < 0.12 ? 2.4 : 1.6,
          ph: Math.random() * Math.PI * 2,
          delay: (hx / w) * 0.7 + Math.random() * 0.4,
        };
      });

      // Precompute a sparse set of neighbor links via a spatial hash so the
      // constellation look costs O(n) per frame, not O(n^2).
      const cell = 26;
      const grid = new Map<string, number[]>();
      particles.forEach((p, i) => {
        const key = `${Math.floor(p.hx / cell)},${Math.floor(p.hy / cell)}`;
        const arr = grid.get(key);
        if (arr) arr.push(i);
        else grid.set(key, [i]);
      });
      links = [];
      const maxLinks = small ? 700 : 1900;
      outer: for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.floor(p.hx / cell);
        const cy = Math.floor(p.hy / cell);
        let made = 0;
        for (let gx = cx - 1; gx <= cx + 1 && made < 2; gx++) {
          for (let gy = cy - 1; gy <= cy + 1 && made < 2; gy++) {
            const bucket = grid.get(`${gx},${gy}`);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.hx - q.hx;
              const dy = p.hy - q.hy;
              if (dx * dx + dy * dy < 24 * 24) {
                links.push([i, j]);
                if (links.length >= maxLinks) break outer;
                if (++made >= 2) break;
              }
            }
          }
        }
      }
      bornAt = performance.now() / 1000;
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.strokeStyle = `hsla(${cyan} / 0.10)`;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (const [a, b] of links) {
        ctx!.moveTo(particles[a].hx, particles[a].hy);
        ctx!.lineTo(particles[b].hx, particles[b].hy);
      }
      ctx!.stroke();
      for (const p of particles) {
        ctx!.globalAlpha = 0.85;
        ctx!.fillStyle = `hsla(${groupColor[p.g]} / 1)`;
        ctx!.fillRect(p.hx - p.sz / 2, p.hy - p.sz / 2, p.sz, p.sz);
      }
      ctx!.globalAlpha = 1;
    }

    function frame() {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      if (!running || particles.length === 0) return;

      const t = performance.now() / 1000;
      const age = t - bornAt;

      // Physics: ease from chaos to home during assembly, then spring + drift.
      for (const p of particles) {
        const prog = Math.min(Math.max((age - p.delay) / ASSEMBLE_SECONDS, 0), 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        const jx = Math.sin(t * 1.4 + p.ph) * 1.3;
        const jy = Math.cos(t * 1.1 + p.ph * 1.7) * 1.3;
        const tx = p.sx + (p.hx - p.sx) * ease + jx * ease;
        const ty = p.sy + (p.hy - p.sy) * ease + jy * ease;
        p.vx += (tx - p.x) * 0.085;
        p.vy += (ty - p.y) * 0.085;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 110;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((1 - d / R) * 5.2) / d;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
      }

      const assembleAlpha = Math.min(age / (ASSEMBLE_SECONDS + 0.6), 1);
      ctx!.clearRect(0, 0, w, h);

      // Link passes: a dim ambient web everywhere, a hot web near the cursor.
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (const [a, b] of links) {
        const pa = particles[a];
        const pb = particles[b];
        const mx = (pa.x + pb.x) / 2 - mouse.x;
        const my = (pa.y + pb.y) / 2 - mouse.y;
        if (mouse.active && mx * mx + my * my < 150 * 150) continue;
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
      }
      ctx!.strokeStyle = `hsla(${cyan} / ${0.09 * assembleAlpha})`;
      ctx!.stroke();

      if (mouse.active) {
        ctx!.beginPath();
        for (const [a, b] of links) {
          const pa = particles[a];
          const pb = particles[b];
          const mx = (pa.x + pb.x) / 2 - mouse.x;
          const my = (pa.y + pb.y) / 2 - mouse.y;
          if (mx * mx + my * my >= 150 * 150) continue;
          ctx!.moveTo(pa.x, pa.y);
          ctx!.lineTo(pb.x, pb.y);
        }
        ctx!.strokeStyle = `hsla(${amber} / 0.45)`;
        ctx!.stroke();

        // Attention rays: particles near the pointer reach out to it.
        ctx!.beginPath();
        let rays = 0;
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(mouse.x, mouse.y);
            if (++rays > 64) break;
          }
        }
        ctx!.strokeStyle = `hsla(${cyan} / 0.16)`;
        ctx!.stroke();
      }

      // Particle passes, one fillStyle per color group.
      for (let g = 0; g < 3; g++) {
        ctx!.fillStyle = `hsla(${groupColor[g]} / 1)`;
        for (const p of particles) {
          if (p.g !== g) continue;
          ctx!.globalAlpha =
            (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.1 + p.ph))) * assembleAlpha;
          ctx!.fillRect(p.x - p.sz / 2, p.y - p.sz / 2, p.sz, p.sz);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function syncRunning() {
      running = inView && !document.hidden;
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= -40 && mouse.y <= h + 40;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildParticles();
        if (reduced) drawStatic();
      }, 180);
    });
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        syncRunning();
      },
      { threshold: 0.02 }
    );
    const onVis = () => syncRunning();

    const fontsReady: Promise<unknown> =
      "fonts" in document ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 900))]).then(() => {
      if (disposed) return;
      buildParticles();
      if (reduced) {
        drawStatic();
        return;
      }
      ro.observe(canvas!);
      io.observe(canvas!);
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      syncRunning();
      raf = requestAnimationFrame(frame);
    });
    if (reduced) ro.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [text, centerY, reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

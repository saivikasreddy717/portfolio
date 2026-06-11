"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CustomCursor: a node + trailing reticle ring, desktop fine-pointers only.
 * The ring eases behind the dot and expands when locking onto interactive
 * elements. Native cursor is hidden via the html.cursor-fx class.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-fx");

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hot = false;
    let down = false;
    let shown = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
      }
      const el = e.target as Element | null;
      hot = !!el?.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
    };
    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      ringPos.x += (target.x - ringPos.x) * 0.2;
      ringPos.y += (target.y - ringPos.y) * 0.2;
      const ringScale = hot ? 1.7 : down ? 0.8 : 1;
      dot.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%) scale(${
        down ? 0.6 : 1
      })`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${ringScale})`;
      ring.style.borderColor = hot ? "hsl(var(--accent-2) / 0.9)" : "hsl(var(--accent) / 0.55)";
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-fx");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="hidden md:block">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] opacity-0 transition-opacity duration-200"
        style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.8)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] h-8 w-8 rounded-full border opacity-0 transition-opacity duration-200"
        style={{ borderColor: "hsl(var(--accent) / 0.55)" }}
      />
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

/**
 * Counter: animates metric strings like "3×", "<150ms", "98%", "8–9%" from
 * zero when scrolled into view, then settles on the exact original string.
 */

type Parsed = { prefix: string; target: number; suffix: string; original: string; isRange: boolean };

function parseValue(value: string): Parsed {
  if (value.startsWith("<")) {
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    return { prefix: "<", target: num, suffix: value.replace(/[<0-9]/g, ""), original: value, isRange: false };
  }
  if (value.includes("–")) {
    const max = parseInt(value.split("–")[1].replace(/[^0-9]/g, ""), 10) || 0;
    return { prefix: "", target: max, suffix: "%", original: value, isRange: true };
  }
  const num = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  return { prefix: "", target: num, suffix: value.replace(/[0-9]/g, ""), original: value, isRange: false };
}

export default function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = parseValue(value);
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(`${parsed.prefix}0${parsed.suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, parsed.target, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    const unsub = mv.on("change", (v) => {
      const n = Math.round(v);
      setDisplay(
        n >= parsed.target ? parsed.original : `${parsed.prefix}${n}${parsed.isRange ? "%" : parsed.suffix}`
      );
    });
    return () => {
      controls.stop();
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
